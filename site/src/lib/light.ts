/**
 * One light source for every foil surface on the site (Ice Mint "foil that shifts as you move").
 * Desktop: the cursor. Android: the phone's tilt. Other touch screens: the scroll position.
 * Smoothed in one rAF loop that runs only while the light is moving. It writes --lx / --ly (0..1) on <html>
 * for CSS foil (text, markers) and notifies subscribers (SVG gradients: logo, bars, icons).
 * Reduced motion: never starts, so everything keeps its resting look.
 */
export type Light = { x: number; y: number };

const subs = new Set<(l: Light) => void>();
const target: Light = { x: 0.5, y: 0.35 };
const cur: Light = { ...target };
let raf = 0;
let started = false;

function tick() {
  raf = 0;
  cur.x += (target.x - cur.x) * 0.08;
  cur.y += (target.y - cur.y) * 0.08;
  const s = document.documentElement.style;
  s.setProperty('--lx', cur.x.toFixed(4));
  s.setProperty('--ly', cur.y.toFixed(4));
  subs.forEach(f => f(cur));
  if (Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.0006) raf = requestAnimationFrame(tick);
}
const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

export function onLight(fn: (l: Light) => void) {
  subs.add(fn); fn(cur);
  return () => { subs.delete(fn); };
}

export function startLight() {
  if (started || typeof window === 'undefined') return;
  if (document.documentElement.dataset.motion === 'reduced') return;
  started = true;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let tilt = false;
  if (fine) {
    window.addEventListener('pointermove', (e) => { target.x = e.clientX / window.innerWidth; target.y = e.clientY / window.innerHeight; kick(); }, { passive: true });
  } else {
    // fires without a prompt on Android; iOS would need a permission prompt, so it falls back to scroll
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null || e.beta == null) return;
      tilt = true;
      target.x = 0.5 + Math.max(-1, Math.min(1, e.gamma / 30)) * 0.5;
      target.y = 0.5 + Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.5;
      kick();
    });
    // While the home scroll story is pinned, the scroll drives the camera, not the light: each light step restyles the
    // whole page (and the hugely scaled foil bars), which on a phone-speed CPU kept the main thread busy every frame and
    // starved the 3D loader (measured: 3D ready ~10 s after load instead of ~3 s).
    let story: Element | null = null;
    const storyPinned = () => {
      if (document.documentElement.dataset.story !== 'on') return false;
      if (!story || !story.isConnected) story = document.querySelector('.story'); // (page changes keep the light running)
      return !!story && story.getBoundingClientRect().bottom > window.innerHeight + 1;
    };
    window.addEventListener('scroll', () => {
      if (tilt || storyPinned()) return;
      target.x = 0.5 + Math.sin(window.scrollY / 260) * 0.45;
      target.y = 0.5 + Math.cos(window.scrollY / 410) * 0.3;
      kick();
    }, { passive: true });
  }
  kick();
}
