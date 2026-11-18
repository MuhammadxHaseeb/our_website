#!/usr/bin/env node
/*
 * record.js: record slow-scroll + hover videos and dump motion facts for a site.
 *
 * Usage: node scripts/record.js <site-name> <url1> [url2 ...] [--only desktop|mobile]
 *
 * Output (research/raw/<site-name>/):
 *   videos/<page>-desktop.webm, videos/<page>-mobile.webm
 *   videos/<page>-<mode>.events.json   timestamps of hovers/clicks/scroll positions (to find effects in the video)
 *   motion/<page>.json                  libraries, CSS transitions/animations on key elements, @keyframes,
 *                                       prefers-reduced-motion rules, canvas/video/lottie counts
 * Read-only: only hovers, scrolls and opens/closes menus. Never submits anything.
 */
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const pos = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--only');
const [SITE, ...URLS] = pos;
if (!SITE || !URLS.length) { console.error('Usage: node scripts/record.js <site-name> <url...> [--only desktop|mobile]'); process.exit(1); }
const OUT = path.join(__dirname, '..', 'research', 'raw', SITE);
const VID = path.join(OUT, 'videos'), MOT = path.join(OUT, 'motion');
fs.mkdirSync(VID, { recursive: true }); fs.mkdirSync(MOT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slug = u => (new URL(u).pathname.replace(/\/+$/, '').replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'home');

const hideConsent = `#onetrust-consent-sdk,#CybotCookiebotDialog,.cky-consent-container,.cc-window,[class*="cookie-banner" i],[class*="cookie-consent" i],[id*="cookie-consent" i],#usercentrics-root{display:none!important}`;

const motionFacts = () => {
  const out = { url: location.href };
  const html = document.documentElement.outerHTML;
  const scripts = [...document.scripts].map(s => s.src).filter(Boolean);
  out.libraries = {
    gsap: window.gsap ? (window.gsap.version || true) : false,
    ScrollTrigger: !!(window.ScrollTrigger || (window.gsap && window.gsap.core && window.gsap.core.globals && window.gsap.core.globals().ScrollTrigger)),
    SplitText: !!window.SplitText,
    Lenis: !!(window.Lenis || window.lenis || document.documentElement.className.match(/lenis/)),
    Locomotive: !!document.querySelector('[data-scroll-container],.has-scroll-smooth'),
    THREE: !!window.THREE || /three(\.module)?(\.min)?\.js/.test(scripts.join(' ')),
    PIXI: !!window.PIXI, Lottie: !!(window.lottie || window.bodymovin) || !!document.querySelector('lottie-player,dotlottie-player,[data-animation-path]'),
    Rive: /rive/i.test(scripts.join(' ')) || !!window.rive,
    Swiper: !!(window.Swiper || document.querySelector('.swiper,.swiper-container')), Splide: !!document.querySelector('.splide'),
    Barba: !!(window.barba || document.querySelector('[data-barba]')), Swup: !!window.swup,
    AOS: !!(window.AOS || document.querySelector('[data-aos]')), FramerMotion: /framer-motion|data-framer/.test(html),
    Webflow_IX2: !!document.querySelector('[data-w-id]'), Motion_one: /motion\.dev|@motionone/.test(scripts.join(' ')),
  };
  out.counts = { canvas: document.querySelectorAll('canvas').length, video: document.querySelectorAll('video').length,
    autoplayVideo: document.querySelectorAll('video[autoplay]').length, svgAnimate: document.querySelectorAll('animate,animateTransform').length,
    webglCanvases: [...document.querySelectorAll('canvas')].filter(c => { try { return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } }).length };
  // stylesheet scan
  const keyframes = {}, reduced = [], transitionsUsed = {}, easings = {};
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch { continue; }
    const visit = rs => { for (const r of rs) {
      if (r.type === 7) keyframes[r.name] = [...r.cssRules].map(k => k.keyText + ' {' + k.style.cssText.slice(0, 120) + '}').slice(0, 6);
      else if (r.type === 4) { if (/prefers-reduced-motion/.test(r.conditionText || r.media.mediaText)) reduced.push((r.conditionText || r.media.mediaText) + ' → ' + [...r.cssRules].map(x => x.cssText.slice(0, 160)).slice(0, 4).join(' ')); visit(r.cssRules); }
      else if (r.cssRules) visit(r.cssRules);
      if (r.style) {
        const t = r.style.transitionTimingFunction || r.style.animationTimingFunction; if (t) t.split(',').forEach(e => easings[e.trim()] = (easings[e.trim()] || 0) + 1);
        const d = r.style.transitionDuration; if (d) d.split(',').forEach(e => transitionsUsed[e.trim()] = (transitionsUsed[e.trim()] || 0) + 1);
      } } };
    visit(rules);
  }
  out.reducedMotionRules = reduced.slice(0, 20);
  out.reducedMotionInJS = /prefers-reduced-motion/.test([...document.scripts].map(s => s.textContent).join(' '));
  out.keyframes = Object.fromEntries(Object.entries(keyframes).slice(0, 40));
  out.cssTransitionDurations = Object.entries(transitionsUsed).sort((a, b) => b[1] - a[1]).slice(0, 15);
  out.cssEasings = Object.entries(easings).sort((a, b) => b[1] - a[1]).slice(0, 15);
  // computed transitions on key elements
  const pick = (label, sel, n = 4) => [...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().width > 0).slice(0, n).map(e => {
    const cs = getComputedStyle(e);
    return { label, text: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 40), cls: (typeof e.className === 'string' ? e.className : '').slice(0, 80),
      transition: cs.transition === 'all 0s ease 0s' ? null : cs.transition, animation: cs.animationName !== 'none' ? `${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction}` : null,
      willChange: cs.willChange !== 'auto' ? cs.willChange : null, transform: cs.transform !== 'none' ? cs.transform : null };
  });
  out.elements = [
    ...pick('button', 'button, a[class*="btn" i], a[class*="button" i], [role=button]', 6),
    ...pick('nav-link', 'header a, nav a', 6),
    ...pick('card', '[class*="card" i], article, [class*="tile" i], [class*="project" i] a', 6),
    ...pick('link', 'main p a, footer a', 3),
    ...pick('image', 'main img, [class*="media" i] img', 3),
  ];
  out.customCursor = !!document.querySelector('[class*="cursor" i]') || getComputedStyle(document.body).cursor === 'none';
  out.dataAttrs = [...new Set([...document.querySelectorAll('*')].flatMap(e => [...e.attributes].map(a => a.name)).filter(n => /^data-(scroll|anim|aos|speed|parallax|reveal|split|lag|motion|w-id|framer)/.test(n)))].slice(0, 30);
  return out;
};

async function run(browser, url, mode) {
  const name = `${slug(url)}-${mode}`;
  const size = mode === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 };
  const { defaultBrowserType, ...iphone } = devices['iPhone 13'];
  const ctxOpts = mode === 'desktop' ? { viewport: size } : { ...iphone };
  const tmpDir = path.join(VID, '_tmp'); fs.mkdirSync(tmpDir, { recursive: true });
  const ctx = await browser.newContext({ ...ctxOpts, recordVideo: { dir: tmpDir, size } });
  const page = await ctx.newPage();
  const t0 = Date.now(); const events = [];
  const ev = (what) => { const e = { t: +((Date.now() - t0) / 1000).toFixed(1), what }; events.push(e); };
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  ev('domcontentloaded');
  await page.addStyleTag({ content: hideConsent }).catch(() => {});
  await sleep(5000); ev('after load intro (5s)');
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

  if (mode === 'desktop') {
    fs.writeFileSync(path.join(MOT, `${slug(url)}.json`), JSON.stringify(await page.evaluate(motionFacts), null, 2));
    // hover nav items
    const nav = await page.$$('header a:visible, nav a:visible, header button:visible');
    for (const h of nav.slice(0, 7)) {
      const txt = (await h.innerText().catch(() => '')).trim().slice(0, 30);
      if (await h.isVisible().catch(() => false)) { await h.hover({ timeout: 2000 }).catch(() => {}); ev(`hover nav "${txt}"`); await sleep(900); }
    }
    await page.mouse.move(720, 500); await sleep(600);
  } else {
    // open + close mobile menu
    const btn = await page.$('button[aria-label*="menu" i]:visible, [class*="burger" i]:visible, [class*="hamburger" i]:visible, [class*="menu-toggle" i]:visible, [class*="menu-button" i]:visible, button[aria-controls*="menu" i]:visible');
    if (btn) { await btn.click({ timeout: 3000 }).catch(() => {}); ev('open mobile menu'); await sleep(3000); await btn.click({ timeout: 3000 }).catch(() => page.keyboard.press('Escape')); ev('close mobile menu'); await sleep(1500); }
    else ev('no mobile menu button found');
  }

  // slow scroll with hovers along the way
  const hovered = new Set();
  let lastY = -1, stuck = 0;
  const step = mode === 'desktop' ? 120 : 90;
  const tLimit = mode === 'desktop' ? 150000 : 100000;
  let n = 0;
  await page.mouse.move(size.width / 2, size.height / 2);
  while (Date.now() - t0 < tLimit) {
    if (mode === 'desktop') await page.mouse.wheel(0, step); else await page.evaluate(s => window.scrollBy(0, s), step);
    await sleep(110);
    n++;
    const { y, h, vh } = await page.evaluate(() => ({ y: Math.round(scrollY), h: document.documentElement.scrollHeight, vh: innerHeight }));
    if (n % 20 === 0) ev(`scrollY=${y} / ${h}`);
    if (mode === 'desktop' && n % 14 === 0) {
      // hover up to 2 visible interactive cards/buttons in view
      const targets = await page.$$('main a:visible, main button:visible, [class*="card" i]:visible, article:visible');
      let k = 0;
      for (const t of targets) {
        if (k >= 2) break;
        const b = await t.boundingBox().catch(() => null);
        if (!b || b.y < 80 || b.y + 40 > size.height || b.width < 60) continue;
        const key = Math.round(b.x) + ':' + Math.round(b.y + y);
        if (hovered.has(key)) continue; hovered.add(key);
        const txt = (await t.innerText().catch(() => '')).replace(/\s+/g, ' ').trim().slice(0, 35);
        await page.mouse.move(b.x + b.width / 2, b.y + Math.min(b.height / 2, 200), { steps: 8 }); ev(`hover "${txt}" @y=${y}`); await sleep(1100); k++;
      }
      await page.mouse.move(size.width - 30, size.height / 2, { steps: 5 });
    }
    if (y + vh >= h - 4) { stuck++; if (stuck > 15) break; }
    else if (y === lastY) { stuck++; if (stuck > 25) { ev('scroll stuck'); break; } }
    else stuck = 0;
    lastY = y;
  }
  ev('reached end'); await sleep(2000);
  const video = page.video();
  await ctx.close();
  const vp = await video.path();
  const dest = path.join(VID, `${name}.webm`);
  fs.renameSync(vp, dest);
  fs.writeFileSync(path.join(VID, `${name}.events.json`), JSON.stringify(events, null, 1));
  console.log(`[${SITE}] ${name}.webm  (${events[events.length - 1].t}s)`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const u of URLS) for (const m of ['desktop', 'mobile']) {
    if (only && only !== m) continue;
    try { await run(browser, u, m); } catch (e) { console.log(`[${SITE}] FAIL ${u} ${m}: ${e.message.split('\n')[0]}`); }
    await sleep(2000);
  }
  await browser.close();
  try { fs.rmSync(path.join(VID, '_tmp'), { recursive: true, force: true }); } catch {}
})();
