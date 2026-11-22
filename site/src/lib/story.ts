/**
 * Home hero scroll story (docs/hero-scroll-story-plan.md): one progress value p (0 → 1) while the hero stage is pinned.
 * HeroStory writes it; GlassLogo and FoilBars read it, the way they read the shared light (lib/light).
 * The glass logo publishes where the wordmark sits on screen, so the Found corners can lock onto the real glass word.
 *
 * Eligibility is decided before first paint by the boot script (html[data-story]): fine pointer, ≥1024 × 600,
 * motion allowed, no Data Saver. Everyone else keeps the normal hero (no pin, no story).
 */
export type Bounds = { x: number; y: number; w: number; h: number };

let p = 0;
const subs = new Set<(p: number) => void>();
const boundSubs = new Set<(b: Bounds) => void>();

export const storyOn = () => typeof document !== 'undefined' && document.documentElement.dataset.story === 'on';
export const getStory = () => p;

export function setStory(v: number) {
  p = v;
  subs.forEach(f => f(p));
}
export function onStory(fn: (p: number) => void) {
  subs.add(fn); fn(p);
  return () => { subs.delete(fn); };
}

export function setStoryBounds(b: Bounds) { boundSubs.forEach(f => f(b)); }
export function onStoryBounds(fn: (b: Bounds) => void) {
  boundSubs.add(fn);
  return () => { boundSubs.delete(fn); };
}

/** inline in <head> (with the motion boot script), so the pinned layout is there from the first paint: no layout shift */
export const storyBootScript = `(function(){try{var d=document.documentElement,c=navigator.connection;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(c&&c.saveData)&&matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px) and (min-height: 600px)').matches)d.dataset.story='on';}catch(e){}})();`;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (v: number) => { const t = clamp01(v); return t * t * (3 - 2 * t); };
export const inOutCubic = (v: number) => { const t = clamp01(v); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
