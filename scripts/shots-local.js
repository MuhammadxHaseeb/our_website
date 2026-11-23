// Full-page review shots of local routes at desktop and phone width, with reveals forced on.
// Usage: node scripts/shots-local.js <outDir> /route [/route…]   (dev server on http://localhost:3000)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [out, ...routes] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  for (const [tag, vp] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    for (const r of routes) {
      errors.length = 0;
      await page.goto('http://localhost:3000' + r, { waitUntil: 'networkidle' });
      // scroll through so observers fire, then back to top
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += vp.height / 2) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
      await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const phText = await page.evaluate(() => (document.body.innerText.match(/\[(PLACEHOLDER|ASSET)[^\]]*\]/g) || []));
      const file = path.join(out, `${r.replace(/\//g, '_') || '_home'}-${tag}.png`);
      await page.screenshot({ path: file, fullPage: true });
      report.push({ route: r, tag, overflow, placeholders: phText, errors: [...errors] });
    }
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(report, null, 1));
})();
