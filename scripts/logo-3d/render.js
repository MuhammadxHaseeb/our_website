#!/usr/bin/env node
/*
 * render.js: render the 3D logo options from scripts/logo-3d/lab.html (prototype, for choosing a direction).
 *   node scripts/logo-3d/render.js --stills        one still per option → scripts/logo-3d/out/
 *   node scripts/logo-3d/render.js --clips         + a 4 s seamless MP4 per option (needs ffmpeg)
 */
const fs = require('fs'); const os = require('os'); const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'site', 'src', 'components', 'brand', 'wordmark-path.ts'), 'utf8');
const D = encodeURIComponent(src.match(/WORDMARK_PATH = '([^']+)'/)[1]);
const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
const clips = process.argv.includes('--clips');
const W = 960, H = 540, FPS = 30, SEC = 4, N = FPS * SEC;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
  for (const v of ['A', 'B', 'C', 'D']) {
    const p = await b.newPage({ viewport: { width: W, height: H } });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    await p.goto(`file://${path.join(__dirname, 'lab.html')}?v=${v}&w=${W}&h=${H}&d=${D}`);
    await p.waitForFunction(() => window.ready === true, null, { timeout: 60000 }).catch(() => {});
    if (errs.length) console.log(v, 'errors', errs);
    const save = (u, f) => fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64'));
    save(await p.evaluate(() => window.renderAt(0.15)), path.join(OUT, `option-${v}.png`));
    if (clips) {
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `epox3d-${v}-`)); const t0 = Date.now();
      for (let i = 0; i < N; i++) save(await p.evaluate(t => window.renderAt(t), i / N), path.join(tmp, `f${String(i).padStart(4, '0')}.png`));
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png'), '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, `option-${v}.mp4`)]);
      fs.rmSync(tmp, { recursive: true, force: true }); console.log(v, 'clip', Math.round((Date.now() - t0) / 1000) + 's');
    }
    await p.close();
  }
  await b.close(); console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
