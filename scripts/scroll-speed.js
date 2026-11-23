// scroll-speed.js: how fast a hard fling moves through the home scroll story (desktop wheel spin, phone swipes).
// Prints scroll position over time and the time spent inside the story's pinned range.
// Usage: node scripts/scroll-speed.js [http://localhost:3000] [desktop|phone]
const { chromium } = require('playwright');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const base = process.argv[2] || 'http://localhost:3000';
  const kind = process.argv[3] || 'desktop';
  const phone = kind === 'phone';
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage(phone
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36' }
    : { viewport: { width: 1440, height: 900 } });
  await page.goto(base + '/', { waitUntil: 'load' });
  await sleep(3500); // Lenis starts when the page is idle
  const info = await page.evaluate(() => {
    const el = document.querySelector('.story'); const top = el.getBoundingClientRect().top + scrollY;
    return { mode: document.documentElement.dataset.storyMode, lenis: document.documentElement.classList.contains('lenis'), top, end: top + el.offsetHeight - innerHeight };
  });
  console.log(kind, JSON.stringify(info));
  if (process.env.DEBUG) await page.evaluate(() => { window.__tl = []; addEventListener('touchmove', e => { if (window.__tl.length < 6) window.__tl.push([e.cancelable, e.defaultPrevented]); }, { passive: true }); });
  if (process.env.START) { await page.evaluate(v => window.scrollTo(0, +v), process.env.START); await sleep(600); }
  const samples = []; const t0 = Date.now();
  const sample = async () => samples.push({ t: Date.now() - t0, y: Math.round(await page.evaluate(() => scrollY)) });

  if (!phone) {
    await page.mouse.move(720, 450);
    for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 500); await sleep(15); await sample(); } // a hard spin: 20 000 px asked in ~1 s
  } else {
    const cdp = await page.context().newCDPSession(page);
    const swipe = async () => { // a fast flick: 600 px up in ~80 ms
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 750 }] });
      for (let k = 1; k <= 8; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y: 750 - k * 75 }] }); await sleep(10); }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    for (let i = 0; i < 6; i++) { await swipe(); await sleep(120); await sample(); }
  }
  for (let i = 0; i < 50; i++) { await sleep(100); await sample(); }
  if (process.env.DEBUG) console.log('touchmove [cancelable, prevented]', JSON.stringify(await page.evaluate(() => window.__tl)));
  const inside = samples.filter(s => s.y > info.top + 5 && s.y < info.end - 5);
  console.log(samples.filter((_, i) => i % 3 === 0).map(s => `${s.t}:${s.y}`).join(' '));
  const firstOut = samples.find(s => s.y >= info.end - 5);
  console.log(`story ${info.top}→${info.end} (${info.end - info.top}px); reached the end at ${firstOut ? firstOut.t + ' ms' : 'not reached'}; samples inside: ${inside.length}`);
  await browser.close();
})();
