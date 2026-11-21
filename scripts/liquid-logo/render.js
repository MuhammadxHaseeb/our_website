#!/usr/bin/env node
/*
 * render.js: render the epox liquid-metal logo loops (scripts/liquid-logo/renderer.html) and encode them.
 *
 * Usage:
 *   node scripts/liquid-logo/render.js --stills          4 stills per variant → scripts/liquid-logo/out/ (look check)
 *   node scripts/liquid-logo/render.js                   full loops → site/public/media/liquid-logo/*.webm|mp4|jpg
 *   node scripts/liquid-logo/render.js --only footer     one variant
 * Needs ffmpeg on PATH for the full render. 30 fps, 7 s seamless loop (time is an angle, frame N = frame 0).
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'site', 'public', 'media', 'liquid-logo');
const src = fs.readFileSync(path.join(ROOT, 'site', 'src', 'components', 'brand', 'wordmark-path.ts'), 'utf8');
const PATH = src.match(/WORDMARK_PATH = '([^']+)'/)[1];
const VIEWBOX = src.match(/WORDMARK_VIEWBOX = '([^']+)'/)[1];

const VARIANTS = {
  'hero-16x9': { w: 1920, h: 1080, fill: 0.56, cy: 0.5, crf: [36, 24] },
  'hero-4x5': { w: 1080, h: 1350, fill: 0.78, cy: 0.5, crf: [36, 24] },
};
const FPS = 30, SECONDS = 7, N = FPS * SECONDS;

const args = process.argv.slice(2);
const stills = args.includes('--stills');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist'] });
  for (const [name, v] of Object.entries(VARIANTS)) {
    if (only && only !== name) continue;
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
    await page.goto('file://' + path.join(__dirname, 'renderer.html'));
    await page.evaluate(o => window.setup(o), { w: v.w, h: v.h, path: PATH, viewBox: VIEWBOX, fill: v.fill, cy: v.cy });
    const save = (url, file) => fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
    if (stills) {
      const dir = path.join(__dirname, 'out'); fs.mkdirSync(dir, { recursive: true });
      for (const i of [0, Math.round(N / 4), Math.round(N / 2), Math.round((3 * N) / 4)]) save(await page.evaluate(([i, n]) => window.frame(i, n), [i, N]), path.join(dir, `${name}-${i}.png`));
      console.log('stills', name); await page.close(); continue;
    }
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `epox-liquid-${name}-`));
    const t0 = Date.now();
    for (let i = 0; i < N; i++) save(await page.evaluate(([i, n]) => window.frame(i, n), [i, N]), path.join(tmp, `f${String(i).padStart(4, '0')}.png`));
    await page.close();
    fs.mkdirSync(OUT, { recursive: true });
    const inp = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f%04d.png')];
    execFileSync('ffmpeg', [...inp, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(v.crf[0]), '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an', path.join(OUT, `${name}.webm`)]);
    execFileSync('ffmpeg', [...inp, '-c:v', 'libx264', '-crf', String(v.crf[1]), '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', path.join(OUT, `${name}.mp4`)]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(tmp, 'f0000.png'), '-q:v', '3', path.join(OUT, `${name}.jpg`)]);
    // the site shows this light WebP still first (LiquidLogo); the JPG is kept as a fallback / share image
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(tmp, 'f0000.png'), '-c:v', 'libwebp', '-quality', '74', path.join(OUT, `${name}.webp`)]);
    fs.rmSync(tmp, { recursive: true, force: true });
    const kb = f => Math.round(fs.statSync(path.join(OUT, f)).size / 1024);
    console.log(`${name}: ${N} frames in ${Math.round((Date.now() - t0) / 1000)}s · webm ${kb(name + '.webm')} KB · mp4 ${kb(name + '.mp4')} KB · jpg ${kb(name + '.jpg')} KB`);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
