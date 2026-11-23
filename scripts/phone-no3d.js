// phone-no3d.js: phone frames of the home story while the 3D is missing (blocked) or late (DELAY=ms). Needs a prod server.
// Usage: BASE=http://localhost:3100 [DELAY=2500] [YS=540,570,…] [SETTLE=250] node scripts/phone-no3d.js <outDir>
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36' });
  let blocked = 0;
  page.on('pageerror', e => console.log('PAGEERROR', String(e).slice(0, 300)));
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text().slice(0, 300)); });
  const BASE = process.env.BASE || 'http://localhost:3000';
  if (!process.env.NOBLOCK) await page.route(/_next\/static\/chunks\/.*\.js/, async r => {
    const res = await r.fetch(); const body = await res.text();
    if (/MeshPhysicalMaterial|GlassLogo/.test(body)) { blocked++; if (process.env.DELAY) { await new Promise(f => setTimeout(f, +process.env.DELAY)); return r.fulfill({ response: res, body }); } console.log('blocked', r.request().url().slice(-60)); return r.abort(); }
    return r.fulfill({ response: res, body });
  });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const ys = (process.env.YS || '540,570,585,600,615,630,645,660,675,690,720').split(',').map(Number);
  for (const y of ys) {
    await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(+(process.env.SETTLE || 250));
    const st = await page.evaluate(() => { const s = document.querySelector('.story'); const sv = document.querySelector('.story .hero-bars'); const cp = document.querySelector('.story .hero-copy'); return { copyOp: cp && getComputedStyle(cp).opacity, heroH: document.querySelector('.story > .hero')?.getBoundingClientRect().top, tag: sv?.tagName, ctf: sv && getComputedStyle(sv).transform.slice(0, 50), anims: sv ? sv.getAnimations().map(a => (a.animationName || a.id || 'anim') + ':' + a.playState).join(',') : '', tf: sv?.style.transform.slice(0, 60), op: sv?.style.opacity, story: document.documentElement.dataset.story, p: s?.style.getPropertyValue('--p'), sy: Math.round(scrollY), through: s?.hasAttribute('data-through'), has3d: s?.hasAttribute('data-3d'), no3d: s?.hasAttribute('data-no3d'), slit: s?.style.getPropertyValue('--slit') }; });
    console.log(y, JSON.stringify(st));
    await page.screenshot({ path: path.join(out, `f-${String(y).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 70 });
  }
  console.log('blocked requests:', blocked);
  await b.close();
})();
