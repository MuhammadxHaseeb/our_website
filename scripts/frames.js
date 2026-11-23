#!/usr/bin/env node
/*
 * frames.js: scroll a page in small steps and save one viewport frame per step, to study a scroll animation frame by
 * frame (timing, colours, when each element appears). Read-only: only scrolls and moves the mouse.
 *
 * Usage: node scripts/frames.js <out-name> <url> [--from 0] [--to 2700] [--step 25] [--settle 500] [--w 1440] [--h 900] [--wait 6000]
 *   --to      last scroll position in px          --step   px between frames
 *   --settle  ms to wait after each scroll (lets damped / lerped 3D catch up)
 *   --wait    ms after load before the first frame (preloaders, lazy 3D)
 * Output: research/raw/<out-name>/frames/f-<scrollY>.jpg + frames.json (scrollY, file) — then run
 *         `python scripts/frames-analyze.py <out-name>` for per-frame colours + a contact sheet.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i === -1 ? d : Number(args[i + 1]); };
const [NAME, URL] = args.filter((a, i) => !a.startsWith('--') && !(/^--(from|to|step|settle|w|h|wait)$/.test(args[i - 1] || '')));
if (!NAME || !URL) { console.error('Usage: node scripts/frames.js <out-name> <url> [--to px] [--step px] [--settle ms]'); process.exit(1); }
const FROM = opt('from', 0), TO = opt('to', 2700), STEP = opt('step', 25), SETTLE = opt('settle', 500), W = opt('w', 1440), H = opt('h', 900), WAIT = opt('wait', 6000);
const OUT = path.join(__dirname, '..', 'research', 'raw', NAME, 'frames');
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  // --gpu: render WebGL on the real GPU (Windows ANGLE / D3D11); heavy scenes (glass transmission) time out in software
  const gpuArgs = args.includes('--gpu') ? ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
  const browser = await chromium.launch({ args: gpuArgs });
  // --mobile: a touch phone (no hover, coarse pointer, mobile user agent), e.g. --w 390 --h 844
  const mobile = args.includes('--mobile');
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: mobile ? 2 : 1, ...(mobile ? { isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36' } : {}) });
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.addStyleTag({ content: '#onetrust-consent-sdk,#CybotCookiebotDialog,[class*="cookie-banner" i]{display:none!important}' });
  // move the mouse once (sites that load 3D on first interaction), then rest it mid-screen
  await page.mouse.move(W * 0.5, H * 0.45); await page.mouse.move(W * 0.52, H * 0.46);
  await sleep(WAIT);
  const frames = [];
  for (let y = FROM; y <= TO; y += STEP) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await sleep(SETTLE);
    const actual = await page.evaluate(() => Math.round(window.scrollY));
    const file = `f-${String(y).padStart(5, '0')}.jpg`;
    await page.screenshot({ path: path.join(OUT, file), type: 'jpeg', quality: 70, timeout: 90000 });
    frames.push({ y, actual, file });
    process.stdout.write(`\r[${NAME}] ${y}/${TO}`);
  }
  fs.writeFileSync(path.join(OUT, 'frames.json'), JSON.stringify({ url: URL, viewport: [W, H], step: STEP, settle: SETTLE, frames }, null, 1));
  console.log(`\n[${NAME}] ${frames.length} frames → ${path.relative(process.cwd(), OUT)}`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
