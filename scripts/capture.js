#!/usr/bin/env node
/*
 * capture.js: save a reference site to research/raw/<site-name>/ for offline analysis.
 *
 * Usage:
 *   node scripts/capture.js <url> [--type agency|product] [--max 15]
 *                                 [--pages url1,url2,...] [--links-only] [--name site-name]
 *
 *   --type agency   (default) auto-picks services, pricing, portfolio + 2-3 case studies,
 *                   about, process, contact, careers, blog (capped by --max)
 *   --type product  homepage + the pages given in --pages (~4 pages that show the focus)
 *   --pages         explicit page list (overrides auto-pick; homepage always included)
 *   --links-only    only write links.json (to choose pages first)
 *
 * Per page -> research/raw/<site>/<page>/ : desktop-full.png, mobile-full.png, sections/,
 *             text.md, styles.json, meta.json
 *
 * Read-only: never submits forms or logs in. Cookie banners: clicks reject/necessary-only
 * if available, otherwise hides the banner (never clicks "accept").
 */
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

// ---------- args ----------
const argv = process.argv.slice(2);
const startUrl = argv.find(a => !a.startsWith('--'));
const opt = (name, def) => {
  const i = argv.indexOf('--' + name);
  if (i === -1) return def;
  const v = argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
};
if (!startUrl) {
  console.error('Usage: node scripts/capture.js <url> [--type agency|product] [--max 15] [--pages a,b] [--links-only] [--name x]');
  process.exit(1);
}
const TYPE = opt('type', 'agency');
const MAX = parseInt(opt('max', TYPE === 'agency' ? 15 : 5), 10);
const LINKS_ONLY = !!opt('links-only', false);
const EXPLICIT = opt('pages', null);
const origin = new URL(startUrl).origin;
const host = new URL(startUrl).hostname.replace(/^www\./, '');
const SITE = opt('name', host.split('.').slice(0, -1).join('-') || host);
const OUT = path.join(__dirname, '..', 'research', 'raw', SITE);
fs.mkdirSync(OUT, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const log = (...a) => console.log(`[${SITE}]`, ...a);

function pageSlug(u) {
  const p = new URL(u).pathname.replace(/\/+$/, '');
  if (!p) return 'home';
  return p.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 80);
}
function sameSite(u) {
  try { return new URL(u).hostname.replace(/^www\./, '') === host; } catch { return false; }
}
function norm(u) {
  const x = new URL(u, origin); x.hash = ''; x.search = '';
  return x.href.replace(/\/$/, '');
}

// ---------- in-page helpers ----------
async function dismissOverlays(page) {
  // 1) privacy-preserving click (reject / necessary only / close)
  await page.evaluate(() => {
    const isBanner = el => {
      const s = ((el.id || '') + ' ' + (el.className && el.className.baseVal === undefined ? el.className : '') + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
      return /cookie|consent|gdpr|onetrust|cky|cookiebot|privacy-banner|cc-window|termly|iubenda|usercentrics/.test(s);
    };
    const containers = [...document.querySelectorAll('div,section,aside,dialog,[role=dialog],[role=alertdialog]')].filter(isBanner);
    const rx = /^(reject( all)?|decline( all)?|deny|only (necessary|essential)|necessary only|essential only|use necessary cookies only|refuse|disagree|no,? thanks|close|×|✕)$/i;
    for (const c of containers) {
      const btn = [...c.querySelectorAll('button,a,[role=button]')].find(b => rx.test((b.innerText || b.getAttribute('aria-label') || '').trim()));
      if (btn) { btn.click(); return; }
    }
  }).catch(() => {});
  await sleep(500);
  // 2) hide anything consent-like or chat-like that is still covering content
  await page.addStyleTag({ content: `
    #onetrust-consent-sdk, #CybotCookiebotDialog, .cky-consent-container, .cc-window, #termly-code-snippet-support,
    [id*="cookie" i][class*="banner" i], [class*="cookie-banner" i], [class*="cookie-consent" i], [id*="cookie-consent" i],
    [class*="CookieConsent" i], #usercentrics-root, .iubenda-cs-container,
    #intercom-container, .intercom-lightweight-app, #hubspot-messages-iframe-container, #drift-widget-container,
    iframe[title*="chat" i], #tidio-chat, .crisp-client, #fc_frame, [id^="tawk"], .tawk-min-container
    { display: none !important; }` }).catch(() => {});
}

async function slowScroll(page, maxMs = 60000) {
  const t0 = Date.now();
  await page.mouse.move(700, 400).catch(() => {});
  let lastY = -1, stuck = 0;
  while (Date.now() - t0 < maxMs) {
    await page.mouse.wheel(0, 350).catch(() => {});
    await sleep(160);
    const { y, h, vh } = await page.evaluate(() => ({ y: window.scrollY, h: document.documentElement.scrollHeight, vh: innerHeight }));
    if (y + vh >= h - 5) { stuck++; if (stuck > 4) break; }
    else if (y === lastY) { stuck++; if (stuck > 12) break; }
    else stuck = 0;
    lastY = y;
  }
  await sleep(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, -100000).catch(() => {});
  await sleep(1500);
}

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await sleep(1000);
}

const extractText = () => {
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEMPLATE', 'IFRAME']);
  const visible = el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0 && el.tagName !== 'BODY') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const lines = [];
  const BLOCK = /^(H[1-6]|P|LI|BLOCKQUOTE|FIGCAPTION|DT|DD|TD|TH|LABEL|BUTTON|SUMMARY|CAPTION)$/;
  // an element whose descendants are all inline (e.g. text split into per-char/per-word spans)
  const tag = el => (el.tagName || '').toUpperCase();
  const txt = el => (el.innerText ?? el.textContent ?? '');
  const inlineOnly = el => [...el.querySelectorAll('*')].every(d => SKIP.has(tag(d)) || /^(inline|contents|none)/.test(getComputedStyle(d).display) || tag(d) === 'BR');
  const walk = el => {
    if (SKIP.has(tag(el)) || el instanceof SVGElement || !visible(el)) return;
    if (!BLOCK.test(el.tagName) && el.children.length && inlineOnly(el)) {
      const t = txt(el).replace(/\s+/g, ' ').trim();
      if (t) lines.push(el.tagName === 'A' ? `[link] ${t}` : t);
      return;
    }
    if (BLOCK.test(el.tagName)) {
      const t = el.innerText.replace(/\s+/g, ' ').trim();
      if (!t) return;
      if (/^H[1-6]$/.test(el.tagName)) lines.push('#'.repeat(+el.tagName[1]) + ' ' + t);
      else if (el.tagName === 'LI') lines.push('- ' + t);
      else if (el.tagName === 'BUTTON') lines.push('[button] ' + t);
      else if (el.tagName === 'BLOCKQUOTE') lines.push('> ' + t);
      else lines.push(t);
      return;
    }
    // direct text on non-block elements (div/span/a used as text)
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
    if (own && el.children.length === 0) {
      lines.push(el.tagName === 'A' ? `[link] ${own}` : own);
      return;
    }
    if (own) lines.push(own);
    for (const c of el.children) walk(c);
  };
  walk(document.body);
  const out = [];
  for (const l of lines) if (l !== out[out.length - 1]) out.push(l);
  return out.join('\n\n');
};

const extractStyles = () => {
  const hex = c => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    if (a === 0) return null;
    return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('') + (a < 1 ? `@${a}` : '');
  };
  const font = sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { selector: sel, sample: (el.innerText || '').trim().slice(0, 60), family: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight,
      lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, color: hex(cs.color) };
  };
  const top = (map, n = 10) => Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ value: k, weight: Math.round(v) }));
  const textC = {}, bgC = {}, btnBg = {}, btnText = {}, families = {}, sizes = {};
  const vw = innerWidth;
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
    if (own) {
      const c = hex(cs.color); if (c) textC[c] = (textC[c] || 0) + own.length;
      const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      families[f] = (families[f] || 0) + own.length;
      sizes[cs.fontSize + ' / ' + cs.fontWeight] = (sizes[cs.fontSize + ' / ' + cs.fontWeight] || 0) + own.length;
    }
    const bg = hex(cs.backgroundColor);
    if (bg) bgC[bg] = (bgC[bg] || 0) + Math.min(r.width, vw) * Math.min(r.height, 4000) / 1000;
    const isBtn = el.tagName === 'BUTTON' || el.getAttribute('role') === 'button' || (el.tagName === 'A' && /btn|button|cta/i.test(el.className && el.className.baseVal === undefined ? el.className : ''));
    if (isBtn) {
      if (bg) btnBg[bg] = (btnBg[bg] || 0) + 1;
      const c = hex(cs.color); if (c) btnText[c] = (btnText[c] || 0) + 1;
    }
  }
  const rootVars = {};
  try {
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const rule of rules) if (rule.selectorText === ':root' || rule.selectorText === 'html') {
        for (const p of rule.style) if (p.startsWith('--') && Object.keys(rootVars).length < 120) rootVars[p] = rule.style.getPropertyValue(p).trim();
      }
    }
  } catch {}
  return {
    viewport: { width: innerWidth, height: innerHeight },
    fonts: {
      body: font('body'), h1: font('h1'), h2: font('h2'), h3: font('h3'),
      button: font('button, a[class*="btn" i], a[class*="button" i], [role=button]'),
      link: font('main a, p a, a'), nav: font('nav a, header a'),
    },
    fontFamiliesByUsage: top(families, 8),
    fontSizeWeightByUsage: top(sizes, 15),
    textColors: top(textC), backgroundColors: top(bgC), buttonBackgrounds: top(btnBg, 6), buttonTextColors: top(btnText, 6),
    rootCssVariables: rootVars,
  };
};

const extractMeta = () => {
  const m = n => document.querySelector(`meta[name="${n}"],meta[property="${n}"]`)?.content || null;
  const og = {};
  document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]').forEach(e => og[e.getAttribute('property') || e.name] = e.content);
  const scripts = [...document.scripts].map(s => s.src).filter(Boolean);
  const links = [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href);
  const html = document.documentElement.outerHTML.slice(0, 400000);
  const clues = [];
  const test = (rx, label) => { if (rx.test(html) || scripts.some(s => rx.test(s))) clues.push(label); };
  test(/wp-content|wp-includes/, 'WordPress');
  test(/\/_next\//, 'Next.js');
  test(/__nuxt|\/_nuxt\//, 'Nuxt');
  test(/webflow/i, 'Webflow');
  test(/framerusercontent|framer\.com/i, 'Framer');
  test(/gatsby/i, 'Gatsby');
  test(/cdn\.shopify/, 'Shopify');
  test(/squarespace/i, 'Squarespace');
  test(/wixstatic|wix\.com/i, 'Wix');
  test(/elementor/i, 'Elementor');
  test(/hubspot|hs-scripts/i, 'HubSpot');
  test(/calendly/i, 'Calendly');
  test(/intercom/i, 'Intercom');
  test(/googletagmanager/i, 'Google Tag Manager');
  const libs = {
    gsap: !!window.gsap, ScrollTrigger: !!(window.ScrollTrigger || window.gsap?.plugins?.scrollTrigger),
    Lenis: !!(window.Lenis || window.lenis || document.documentElement.classList.contains('lenis')),
    locomotive: !!document.querySelector('[data-scroll-container]'),
    THREE: !!window.THREE || !!document.querySelector('canvas'), lottie: !!(window.lottie || window.bodymovin || document.querySelector('lottie-player,dotlottie-player')),
    Swiper: !!(window.Swiper || document.querySelector('.swiper')), barba: !!(window.barba || document.querySelector('[data-barba]')),
    AOS: !!(window.AOS || document.querySelector('[data-aos]')), framerMotion: /framer-motion/.test(html),
    video: document.querySelectorAll('video').length,
  };
  return {
    url: location.href, title: document.title, description: m('description'), canonical: document.querySelector('link[rel=canonical]')?.href || null,
    lang: document.documentElement.lang, generator: m('generator'), openGraph: og, platformClues: clues, libraryHints: libs,
    scripts: scripts.slice(0, 80), stylesheets: links.slice(0, 40), pageHeight: document.documentElement.scrollHeight,
  };
};

const collectLinks = () => {
  const pick = sel => [...document.querySelectorAll(sel)].map(a => ({ text: (a.innerText || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(), href: a.href })).filter(l => l.href.startsWith('http'));
  return { nav: pick('header a, nav a, [role=navigation] a'), footer: pick('footer a'), all: pick('a') };
};

const sectionBoxes = () => {
  const cands = [...document.querySelectorAll('main > section, main > div > section, body > section, section, footer, header')]
    .filter(el => !el.parentElement.closest('section'))
    .map(el => { const r = el.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), h: Math.round(r.height), name: (el.id || el.getAttribute('aria-label') || [...el.classList][0] || el.tagName).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) }; })
    .filter(b => b.h > 120)
    .sort((a, b) => a.y - b.y);
  const out = [];
  for (const b of cands) if (!out.some(o => b.y >= o.y && b.y + b.h <= o.y + o.h + 2)) out.push(b);
  return out;
};

// ---------- capture one page ----------
async function capturePage(browser, url, slug) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(path.join(dir, 'sections'), { recursive: true });
  const result = { url, slug, ok: true, notes: [] };

  // desktop
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    result.status = resp && resp.status();
    result.finalUrl = page.url();
    if (!sameSite(page.url())) result.notes.push('redirected off-site to ' + page.url());
    await settle(page);
    await dismissOverlays(page);
    await slowScroll(page);
    await dismissOverlays(page);
    await settle(page);
    const title = await page.title();
    if (/just a moment|attention required|access denied|verify you are human/i.test(title)) result.notes.push('possible bot block: ' + title);

    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(await page.evaluate(extractMeta), null, 2));
    fs.writeFileSync(path.join(dir, 'styles.json'), JSON.stringify(await page.evaluate(extractStyles), null, 2));
    fs.writeFileSync(path.join(dir, 'text.md'), `<!-- ${url} -->\n\n` + await page.evaluate(extractText));

    try { await page.screenshot({ path: path.join(dir, 'desktop-full.png'), fullPage: true, timeout: 90000 }); }
    catch (e) { result.notes.push('fullPage failed: ' + e.message.split('\n')[0]); await page.screenshot({ path: path.join(dir, 'desktop-full.png') }); }

    // sections
    const docH = await page.evaluate(() => document.documentElement.scrollHeight);
    let boxes = await page.evaluate(sectionBoxes);
    const useSlices = boxes.length < 3 || docH <= 1000;
    if (useSlices) {
      // fallback: step through by viewport height (works with custom scrollers too)
      result.notes.push('sections: viewport slices');
      let i = 0, prevY = -1;
      await page.evaluate(() => window.scrollTo(0, 0));
      for (let n = 0; n < 40; n++) {
        await sleep(700);
        const y = await page.evaluate(() => scrollY);
        if (n > 0 && y === prevY) break;
        await page.screenshot({ path: path.join(dir, 'sections', `${String(++i).padStart(2, '0')}-slice.png`) });
        prevY = y;
        await page.mouse.wheel(0, 900);
        await sleep(300);
      }
    } else {
      let i = 0;
      for (const b of boxes) {
        for (let y = b.y, part = 0; y < b.y + b.h && part < 6; y += 2400, part++) {
          const h = Math.min(2400, b.y + b.h - y, docH - y);
          if (h < 40) break;
          await page.screenshot({ path: path.join(dir, 'sections', `${String(++i).padStart(2, '0')}-${b.name}${part ? '-' + part : ''}.png`), fullPage: true, clip: { x: 0, y, width: 1440, height: h } }).catch(e => result.notes.push('section fail ' + b.name));
        }
      }
    }
  } catch (e) {
    result.ok = false; result.notes.push('desktop error: ' + e.message.split('\n')[0]);
  }
  await ctx.close();

  // mobile
  const { defaultBrowserType, ...iphone } = devices['iPhone 13'];
  const mctx = await browser.newContext(iphone);
  const mpage = await mctx.newPage();
  try {
    await mpage.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await settle(mpage);
    await dismissOverlays(mpage);
    await slowScroll(mpage, 45000);
    await dismissOverlays(mpage);
    await settle(mpage);
    await mpage.screenshot({ path: path.join(dir, 'mobile-full.png'), fullPage: true, timeout: 90000 })
      .catch(async e => { result.notes.push('mobile fullPage failed'); await mpage.screenshot({ path: path.join(dir, 'mobile-full.png') }); });
  } catch (e) { result.notes.push('mobile error: ' + e.message.split('\n')[0]); }
  await mctx.close();
  return result;
}

// ---------- page selection ----------
const CATS = [
  ['services', /\/(services?|solutions|what-we-do|capabilities|expertise)(\/|$)/i],
  ['pricing', /pricing|plans|engagement|hire|dedicated/i],
  ['portfolio', /\/(portfolio|work|projects|case-stud(y|ies)|our-work|clients)(\/|$)/i],
  ['about', /\/(about|about-us|company|who-we-are|studio|team)(\/|$)/i],
  ['process', /process|how-we-work|approach|methodology/i],
  ['contact', /contact|get-in-touch|lets-talk|start-a-project/i],
  ['careers', /careers?|jobs|join/i],
  ['blog', /\/(blog|insights|news|articles|journal)(\/|$)/i],
];

function choosePages(links) {
  const pool = [...links.nav, ...links.footer].filter(l => sameSite(l.href)).map(l => ({ ...l, href: norm(l.href) }));
  const uniq = [...new Map(pool.map(l => [l.href, l])).values()].filter(l => l.href !== norm(origin));
  const chosen = new Map();
  for (const [cat, rx] of CATS) {
    // shortest matching path = the index page of that category
    const hits = uniq.filter(l => rx.test(new URL(l.href).pathname)).sort((a, b) => a.href.length - b.href.length);
    if (hits[0] && !chosen.has(hits[0].href)) chosen.set(hits[0].href, cat);
  }
  // service subpages to fill the cap (leave room for 3 case studies)
  const svc = uniq.filter(l => CATS[0][1].test(new URL(l.href).pathname) && !chosen.has(l.href));
  for (const l of svc) { if (chosen.size >= MAX - 4) break; chosen.set(l.href, 'service-sub'); }
  return [...chosen.entries()].map(([href, cat]) => ({ href, cat }));
}

// ---------- main ----------
(async () => {
  const browser = await chromium.launch({ headless: true });

  // --slices: re-shoot sections/ for every captured page as viewport slices (for sites with custom
  // scrollers / in-view lazy loading, where full-page clips come out as grey placeholders)
  if (opt('slices', false)) {
    for (const d of fs.readdirSync(OUT)) {
      const mf = path.join(OUT, d, 'meta.json');
      if (!fs.existsSync(mf)) continue;
      const only = opt('only', null); // e.g. --only work-gemini,home
      if (only && !only.split(',').includes(d)) continue;
      const url = JSON.parse(fs.readFileSync(mf, 'utf8')).url;
      const sdir = path.join(OUT, d, 'sections');
      fs.mkdirSync(sdir, { recursive: true });
      for (const f of fs.readdirSync(sdir)) if (f.endsWith('.png')) fs.unlinkSync(path.join(sdir, f));
      const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const pg = await c.newPage();
      try {
        await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await settle(pg); await dismissOverlays(pg); await sleep(2500);
        await pg.mouse.move(1430, 450);
        let i = 0, prevY = -1;
        for (let n = 0; n < 40; n++) {
          await sleep(1300); // let in-view images load and reveal animations finish
          const y = await pg.evaluate(() => scrollY);
          if (n > 0 && y === prevY) break;
          await pg.screenshot({ path: path.join(sdir, `${String(++i).padStart(2, '0')}-slice.png`) });
          prevY = y;
          for (let k = 0; k < 6; k++) { await pg.mouse.wheel(0, 140); await sleep(60); }
        }
        log('slices:', d, i);
      } catch (e) { log('slices fail', d, e.message.split('\n')[0]); }
      await c.close(); await sleep(2000);
    }
    await browser.close(); return;
  }

  // --text-only: re-extract text.md for every already-captured page of this site (no screenshots)
  if (opt('text-only', false)) {
    for (const d of fs.readdirSync(OUT)) {
      const mf = path.join(OUT, d, 'meta.json');
      if (!fs.existsSync(mf)) continue;
      const url = JSON.parse(fs.readFileSync(mf, 'utf8')).url;
      const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const pg = await c.newPage();
      try {
        await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await settle(pg); await dismissOverlays(pg); await slowScroll(pg, 30000);
        fs.writeFileSync(path.join(OUT, d, 'text.md'), `<!-- ${url} -->\n\n` + await pg.evaluate(extractText));
        log('text.md refreshed:', d);
      } catch (e) { log('text-only fail', d, e.message.split('\n')[0]); }
      await c.close(); await sleep(2000);
    }
    await browser.close(); return;
  }
  const report = { site: SITE, startUrl, type: TYPE, capturedAt: new Date().toISOString(), pages: [] };

  // homepage links
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(p);
  const links = await p.evaluate(collectLinks);
  const sameNav = [...new Map([...links.nav, ...links.footer].filter(l => sameSite(l.href)).map(l => [norm(l.href), { text: l.text, href: norm(l.href) }])).values()];
  fs.writeFileSync(path.join(OUT, 'links.json'), JSON.stringify({ homepage: startUrl, finalUrl: p.url(), title: await p.title(), navAndFooterSameDomain: sameNav, nav: links.nav, footer: links.footer }, null, 2));
  log(`links.json: ${sameNav.length} same-domain nav/footer links; title="${await p.title()}"`);
  await ctx.close();
  if (LINKS_ONLY) { await browser.close(); return; }

  let plan = [{ href: norm(startUrl), cat: 'home' }];
  if (EXPLICIT) plan.push(...EXPLICIT.split(',').map(h => {
    const href = norm(new URL(h.trim(), origin).href);
    const hit = CATS.find(([, rx]) => rx.test(new URL(href).pathname));
    return { href, cat: hit ? hit[0] : 'explicit' };
  }));
  else if (TYPE === 'agency') plan.push(...choosePages(links));
  plan = plan.slice(0, MAX);
  log('plan:', plan.map(x => `${x.cat}:${new URL(x.href).pathname}`).join('  '));

  const done = new Set();
  for (let i = 0; i < plan.length; i++) {
    const { href, cat } = plan[i];
    if (done.has(href)) continue;
    done.add(href);
    const slug = pageSlug(href);
    log(`(${i + 1}/${plan.length}) ${cat} -> ${slug}`);
    const r = await capturePage(browser, href, slug);
    r.cat = cat;
    report.pages.push(r);
    if (r.notes.length) log('   notes:', r.notes.join(' | '));
    // after the portfolio index, queue 2-3 individual case studies
    if (cat === 'portfolio' && TYPE === 'agency') {
      const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const p2 = await ctx2.newPage();
      await p2.goto(href, { waitUntil: 'domcontentloaded' }).catch(() => {});
      await settle(p2);
      const base = new URL(href).pathname.replace(/\/$/, '');
      const kids = await p2.evaluate(() => [...document.querySelectorAll('main a, a')].map(a => a.href));
      await ctx2.close();
      const cs = [...new Set(kids.filter(sameSite).map(norm))].filter(u => {
        const pth = new URL(u).pathname;
        return (pth.startsWith(base + '/') || /case-stud|\/work\/|\/portfolio\/|\/projects\//.test(pth)) && !done.has(u) && !/\/(page|category|tag)\//.test(pth);
      }).slice(0, 3);
      const room = MAX - plan.length;
      plan.splice(i + 1, 0, ...cs.slice(0, Math.max(0, Math.min(3, room + 1))).map(h => ({ href: h, cat: 'case-study' })));
      if (plan.length > MAX) plan = plan.slice(0, MAX);
    }
    fs.writeFileSync(path.join(OUT, 'capture-report.json'), JSON.stringify(report, null, 2));
    await sleep(2500); // be polite
  }
  await browser.close();
  log('done:', report.pages.length, 'pages');
})().catch(e => { console.error(e); process.exit(1); });
