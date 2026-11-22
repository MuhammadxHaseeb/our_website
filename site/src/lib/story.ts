/**
 * Home hero scroll story (docs/hero-scroll-story-plan.md): one progress value p (0 → 1) while the hero stage is pinned.
 * HeroStory writes it; GlassLogo and FoilBars read it, the way they read the shared light (lib/light).
 *
 * It is ONE continuous camera flight, no cross-fades:
 *   the camera flies straight at a point F on the middle foil bar, so the bars grow until the screen is all foil,
 *   passes through the foil, and keeps going toward the glass wordmark floating behind it; then the page simply scrolls on.
 * Flying straight at a point on a flat plane is the same as scaling the picture about that point, so the CSS fallback
 * (SVG bars scaled about F, before the 3D is ready) and the 3D camera draw the same frames and can swap mid-flight.
 *
 * Eligibility is decided before first paint by storyBootScript (html[data-story]): fine pointer, ≥1024 × 600,
 * motion allowed, no Data Saver. Everyone else keeps the normal hero (no pin, no story).
 */
export type Bounds = { x: number; y: number; w: number; h: number };
/** where the hero foil bars sit on the stage (px), as laid out (no transforms): left, top, width of the SVG box */
export type Anchor = { left: number; top: number; width: number; stageW: number; stageH: number };

// ---- the flight ----
export const Z0 = 2300;          // camera distance to the bars plane at rest (the bars' on-screen size = the SVG's)
export const LOGO_Z = -4000;     // the glass wordmark floats this far behind the bars
export const PASS = 0.42;        // p at which the camera passes through the bars
export const ARRIVE = 0.76;      // p at which the wordmark has arrived (camera Z0 in front of it)
export const F_USER = { x: 250, y: 96.2 }; // the point flown at: on the middle bar's centre line (SVG user units)
export const VB = { x: 138, y: 39, w: 198 }; // FoilBars viewBox origin + width

/** camera z for progress p: accelerates into the bars (z → 0 at PASS), then glides to the wordmark and settles */
export function camZ(p: number) {
  if (p <= PASS) { const u = Math.max(0, p) / PASS; return Z0 * (1 - u * u); }
  const v = clamp01((p - PASS) / (ARRIVE - PASS));
  return (LOGO_Z + Z0) * (1 - Math.pow(1 - v, 3));
}
/** the bars plane stays solid until the camera is right at it (by then one flat patch of foil fills the screen) */
export const barsAlpha = (z: number) => (z > 3 ? 1 : 0);
/** the logo scene exists only once the foil covers the whole screen */
export const LOGO_FROM_Z = 100;
/** behind the foil the space starts lit in the foil's own colour and darkens to brand black as the camera moves on */
export const glowAt = (z: number) => (z > 0 ? 1 : 1 - smooth(-z / 1500));

// ---- store ----
let p = 0;
let anchor: Anchor | null = null;
const subs = new Set<(p: number) => void>();
const boundSubs = new Set<(b: Bounds) => void>();
const anchorSubs = new Set<(a: Anchor) => void>();
const readySubs = new Set<() => void>();
let ready = false;

export const storyOn = () => typeof document !== 'undefined' && document.documentElement.dataset.story === 'on';
export const getStory = () => p;
export const getAnchor = () => anchor;

export function setStory(v: number) { p = v; subs.forEach(f => f(p)); }
export function onStory(fn: (p: number) => void) { subs.add(fn); fn(p); return () => { subs.delete(fn); }; }

export function setStoryBounds(b: Bounds) { boundSubs.forEach(f => f(b)); }
export function onStoryBounds(fn: (b: Bounds) => void) { boundSubs.add(fn); return () => { boundSubs.delete(fn); }; }

export function setAnchor(a: Anchor) { anchor = a; anchorSubs.forEach(f => f(a)); }
export function onAnchor(fn: (a: Anchor) => void) { anchorSubs.add(fn); if (anchor) fn(anchor); return () => { anchorSubs.delete(fn); }; }

/** the 3D scene has drawn its first frame: from now on it draws the bars too, and the SVG steps aside */
export function markStory3D() { ready = true; readySubs.forEach(f => f()); }
export function onStory3D(fn: () => void) { if (ready) fn(); readySubs.add(fn); return () => { readySubs.delete(fn); }; }
export function resetStory3D() { ready = false; }

/** inline in <head>, so the pinned layout is there from the first paint: no layout shift */
export const storyBootScript = `(function(){try{var d=document.documentElement,c=navigator.connection;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(c&&c.saveData)&&matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px) and (min-height: 600px)').matches)d.dataset.story='on';}catch(e){}})();`;

export function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
export const smooth = (v: number) => { const t = clamp01(v); return t * t * (3 - 2 * t); };
