'use client';
// Lazy motion stack: GSAP + ScrollTrigger + Lenis are loaded only when needed, after first paint.
import type Lenis from 'lenis';

type GsapBundle = { gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger };
let gsapPromise: Promise<GsapBundle> | null = null;
let lenis: Lenis | null = null;

export const prefersReducedMotion = () =>
  typeof document !== 'undefined' && document.documentElement.dataset.motion === 'reduced';

/** Smooth scroll is for fine pointers (mouse/trackpad) only; touch keeps native scroll. */
export const canSmoothScroll = () =>
  typeof window !== 'undefined' && !prefersReducedMotion() && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function loadGsap(): Promise<GsapBundle> {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      if (lenis) lenis.on('scroll', st.ScrollTrigger.update);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return gsapPromise;
}

export async function startLenis() {
  if (lenis || !canSmoothScroll()) return lenis;
  const { default: LenisCtor } = await import('lenis');
  lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true, anchors: true });
  const raf = (t: number) => { lenis?.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  if (gsapPromise) gsapPromise.then(({ ScrollTrigger }) => lenis?.on('scroll', ScrollTrigger.update));
  return lenis;
}

export const getLenis = () => lenis;

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
}

export const whenIdle = (fn: () => void): number => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  return w.requestIdleCallback ? w.requestIdleCallback(fn, { timeout: 1500 }) : w.setTimeout(fn, 200);
};
export const cancelIdle = (id: number) => {
  const w = window as Window & { cancelIdleCallback?: (id: number) => void };
  if (w.cancelIdleCallback) w.cancelIdleCallback(id); else window.clearTimeout(id);
};
