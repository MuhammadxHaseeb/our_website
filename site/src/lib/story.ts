/**
 * Home hero scroll story (docs/hero-scroll-story-plan.md): one progress value p (0 → 1) while the hero stage is pinned.
 * HeroStory writes it; GlassLogo and FoilBars read it, the way they read the shared light (lib/light).
 *
 * ONE continuous camera flight, timed on Notiune's hero (measured frame by frame):
 *   the copy lifts away; the camera flies at a point F on the middle foil bar until the screen is all foil, passes
 *   through, the dark world behind lights up, the glass letters fly in and lock into the word, a slow push-in, then the
 *   camera dives through the hole of the "o" into black, which is the Services ground, and the page carries on.
 * Flying straight at a point on a flat plane is the same as scaling the picture about that point, so the CSS fallback
 * (SVG bars scaled about F, before the 3D is ready) and the 3D camera draw the same frames and can swap mid-flight.
 *
 * Eligibility is decided before first paint by storyBootScript (html[data-story]); see storyEligible below.
 * Phones and tablets get it too (Notiune runs its story on phones as well), with a portrait-tuned layout.
 */
export type Bounds = { x: number; y: number; w: number; h: number };
/** where the hero foil bars sit on the stage (px), as laid out (no transforms): left, top, width of the SVG box */
export type Anchor = { left: number; top: number; width: number; stageW: number; stageH: number };

// ---- the flight ----
// Timed on Notiune's hero, measured frame by frame (research/raw/notiune/frames, 900px window, story = 1950px of
// scroll = 2.17 screens): p = scroll / pin length. Our own objects and colours, their choreography.
export const Z0 = 2300;          // camera distance to the bars plane at rest (the bars' on-screen size = the SVG's)
export const PASS = 0.395;       // camera passes through the foil   (theirs: the band fills the screen at ~765px, black opens at 770)
export const SLIT_END = 0.467;   // the black slit has opened to the screen's edges (theirs: 770→910px)
export const GLIDE_END = 0.55;   // the glide behind the foil settles (theirs: dark breathing room 900–1080px)
export const GLIDE_Z = -700;
export const PUSH_Z = -1100;     // slow push-in while the word holds (theirs: 1170–1680px)
export const DIVE = 0.877;       // dive into the word, through the hole of the "o" (theirs: through the i's dot, 1710–1950px)
export const LOGO_Z = -3300;     // the glass wordmark, 2600 in front of the camera when it has assembled
export const DIVE_Z = LOGO_Z - 320;
export const F_USER = { x: 250, y: 96.2 }; // the point flown at: on the middle bar's centre line (SVG user units)
export const VB = { x: 138, y: 39, w: 198 }; // FoilBars viewBox origin + width

const easeOut3 = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
/** camera z for progress p */
export function camZ(p: number) {
  if (p <= PASS) { const u = Math.max(0, p) / PASS; return Z0 * (1 - u * u); }              // still at first, then accelerating into the foil
  if (p <= GLIDE_END) return GLIDE_Z * easeOut3((p - PASS) / (GLIDE_END - PASS));          // through, gliding to a stop in the dark
  if (p <= DIVE) return GLIDE_Z + (PUSH_Z - GLIDE_Z) * ((p - GLIDE_END) / (DIVE - GLIDE_END)); // slow push-in on the word
  return PUSH_Z + (DIVE_Z - PUSH_Z) * Math.pow(clamp01((p - DIVE) / (1 - DIVE)), 2.2);   // accelerating dive through the "o"
}
export const diveAt = (p: number) => clamp01((p - DIVE) / (1 - DIVE));
/**
 * How far the camera has moved onto F's line (0 = at rest, 1 = straight in front of F). Ahead of z it, so F drifts from
 * its place on the bars to the middle of the screen as the camera nears it: the band then opens evenly about the
 * middle, as Notiune's tube does (F's offset from the centre shrinks in step with z).
 */
export const centreAt = (z: number) => (z >= Z0 ? 0 : z <= 0 ? 1 : 1 - (z / Z0) * (z / Z0));
/**
 * Behind the foil, black opens from a line across the middle of the screen and keeps opening until the foil has gone
 * off the top and bottom edges: share of the screen height that is black (theirs, measured every 10px: half-height
 * 10, 24, 40, 62, 86 … 404, 450 from 770 to 910px, i.e. about t^1.4).
 */
export const slitAt = (p: number) => (p <= PASS ? 0 : Math.pow(clamp01((p - PASS) / (SLIT_END - PASS)), 1.4));
/** a thin foil horizon in the middle of the slit: on as it opens, slowly brighter in the dark, gone as the word forms */
export const horizonAt = (p: number) => (p <= PASS ? 0 : (0.55 + 0.45 * smooth((p - SLIT_END) / 0.08)) * smooth((p - PASS) / 0.012) * (1 - smooth((p - 0.525) / 0.06)));
/** the bars plane stays solid until the camera is right at it (by then one flat patch of foil fills the screen) */
export const barsAlpha = (z: number) => (z > 3 ? 1 : 0);
/** before the pass the black ground picks up the foil's tint, then darkens again as the foil fills (theirs: 300→660px) */
export const tintAt = (p: number) => (p < 0.154 ? 0 : p < 0.277 ? 0.2 * smooth((p - 0.154) / 0.123) : p < PASS ? 0.2 - 0.16 * smooth((p - 0.277) / 0.1) : 0);
/** the light of the world behind the foil (our bars behind the word): comes up in the dark, goes out for the dive */
// (peaks at 0.6, so the glass word stays the brightest thing on screen, as Notiune's word is on its dark sky)
// (starts once the slit is fully open, so the dark holds just the horizon for a moment, as theirs does 910→1080px)
export const worldAt = (p: number) => 0.6 * smooth((p - SLIT_END) / 0.13) * (1 - smooth((p - 0.95) / 0.045));
/** each letter flies in from its own place and locks into the word (theirs: 1110→1170px) */
export const letterAt = (p: number, i: number) => easeOut3((p - 0.52 - i * 0.016) / 0.085);
/** the copy fades and lifts away before the flight speeds up (theirs: 150→300px) */
export const copyAt = (p: number) => smooth((p - 0.04) / 0.12);

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

/**
 * Who gets the story: every screen tall enough for the pinned stage (≥560px: phones in portrait, tablets, desktops;
 * not phones in landscape), on a device with the power for the glass (4+ cores, 4GB+ memory where the browser says),
 * with motion allowed and no Data Saver. Everyone else keeps the normal hero. Same test in the boot script below.
 */
export function storyEligible(checkGL = true) {
  if (typeof window === 'undefined') return false;
  const n = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'reduced'
    && !n.connection?.saveData && window.matchMedia('(min-height: 560px)').matches
    && (n.hardwareConcurrency || 4) >= 4 && (!n.deviceMemory || n.deviceMemory >= 4) && (!checkGL || hasWebGL2());
}
let webgl2: boolean | null = null;
/** checked once, when the browser is idle (creating a context costs main-thread time); without it the story turns off */
export function hasWebGL2() {
  if (webgl2 === null) { try { webgl2 = !!document.createElement('canvas').getContext('webgl2'); } catch { webgl2 = false; } }
  return webgl2;
}
/** inline in <head>, so the pinned layout is there from the first paint: no layout shift. It also notes the visitor's
 *  first interaction (window.__epoxActed) for the 3D loader, in case it happens before the page has started up. */
export const storyBootScript = `(function(){try{['pointermove','pointerdown','touchstart','wheel','scroll','keydown'].forEach(function(k){addEventListener(k,function(){window.__epoxActed=true},{once:true,passive:true})});var d=document.documentElement,n=navigator,c=n.connection;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(c&&c.saveData)&&matchMedia('(min-height: 560px)').matches&&(n.hardwareConcurrency||4)>=4&&(!n.deviceMemory||n.deviceMemory>=4))d.dataset.story='on';}catch(e){}})();`;

export function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
export const smooth = (v: number) => { const t = clamp01(v); return t * t * (3 - 2 * t); };
