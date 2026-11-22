'use client';
import { useEffect, useRef } from 'react';
import { getLenis } from '@/lib/motion';
import { clamp01, inOutCubic, onStoryBounds, setStory, storyOn } from '@/lib/story';

/**
 * H16 · Home hero scroll story (docs/hero-scroll-story-plan.md). Desktop only (html[data-story], set before first paint).
 * The hero becomes a sticky stage pinned for 1.2 screens; one progress value p drives it:
 *   0 → .25  the headline, lead and CTAs step back; the foil bars split and fade; the 3D stage fades in
 *   .12 → .6 the glass wordmark turns from edge-on to face the visitor (GlassLogo reads p)
 *   ≈ .55    the four Found corners lock onto the glass word (bounds published by GlassLogo)
 *   .56 → .8 the proof strip rises in
 *   .8 → 1   one foil bar at the E angle sweeps across; behind it the Services section is already in place
 * Phases are CSS calc() on --p (opacity/transform only); the wipe is driven here. Everyone else: the normal hero.
 */
const TAN = Math.tan((15.3 * Math.PI) / 180);
const MQ = '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (min-height: 600px)';

export function HeroStory({ children, labelledBy }: { children: React.ReactNode; labelledBy: string }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const found = useRef<HTMLDivElement>(null);
  const wipe = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current; const st = stage.current; const w = wipe.current; const fd = found.current;
    if (!el || !st || !w || !fd) return;
    const html = document.documentElement;
    const mq = window.matchMedia(MQ);
    let raf = 0; let p = 0;

    const reset = () => { st.style.clipPath = ''; w.style.visibility = 'hidden'; el.style.removeProperty('--p'); el.removeAttribute('data-past'); setStory(0); };
    const update = () => {
      raf = 0;
      if (!storyOn()) { reset(); return; }
      const r = el.getBoundingClientRect(); const vh = window.innerHeight; const vw = window.innerWidth;
      p = clamp01(-r.top / Math.max(1, r.height - vh));
      el.style.setProperty('--p', p.toFixed(4));
      el.toggleAttribute('data-past', p > 0.18);
      setStory(p);
      // exit: the bar's trailing edge (at mid-height) runs from off-screen left to off-screen right; the stage is cut
      // along that slanted edge, so the section underneath shows behind the bar
      const e = inOutCubic((p - 0.8) / 0.2);
      if (e <= 0) { st.style.clipPath = ''; w.style.visibility = 'hidden'; return; }
      if (e >= 1) { st.style.clipPath = 'inset(0 0 0 100%)'; w.style.visibility = 'hidden'; return; }
      const barW = 0.26 * vw; const slant = (TAN * vh) / 2;
      const x = -barW - slant + e * (vw + barW + 2 * slant);
      st.style.clipPath = `polygon(${(x + slant).toFixed(1)}px 0, 100% 0, 100% 100%, ${(x - slant).toFixed(1)}px 100%)`;
      w.style.visibility = 'visible';
      w.style.transform = `translateX(${x.toFixed(1)}px) skewX(-15.3deg)`;
      w.style.backgroundPosition = `${(e * 100).toFixed(1)}% 0`;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(update); };

    // the window grew/shrank across the desktop threshold, or reduced motion was switched on: story on/off
    const sync = () => {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
      const ok = mq.matches && html.dataset.motion !== 'reduced' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !saveData;
      if (ok) html.dataset.story = 'on'; else delete html.dataset.story;
      kick();
    };
    const motionObs = new MutationObserver(sync);
    motionObs.observe(html, { attributes: true, attributeFilter: ['data-motion'] });

    // the Found corners hug the glass word wherever the 3D scene puts it
    const offBounds = onStoryBounds(b => {
      const pad = 22;
      fd.style.setProperty('--fx', `${(b.x - pad).toFixed(1)}px`); fd.style.setProperty('--fy', `${(b.y - pad).toFixed(1)}px`);
      fd.style.setProperty('--fw', `${(b.w + pad * 2).toFixed(1)}px`); fd.style.setProperty('--fh', `${(b.h + pad * 2).toFixed(1)}px`);
    });

    // keyboard: a focused link in the faded copy would be invisible, so bring the story back to its start
    const onFocus = (ev: FocusEvent) => {
      if (!storyOn() || p < 0.1 || !(ev.target as HTMLElement).closest('.hero-copy')) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top, { immediate: true }); else window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    mq.addEventListener('change', sync);
    el.addEventListener('focusin', onFocus);
    update();
    return () => {
      cancelAnimationFrame(raf); motionObs.disconnect(); offBounds();
      window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick);
      mq.removeEventListener('change', sync); el.removeEventListener('focusin', onFocus);
      reset();
    };
  }, []);

  return (
    <div ref={root} className="story">
      <section ref={stage} className="hero" aria-labelledby={labelledBy}>
        {children}
        <div ref={found} className="story-found" aria-hidden />
      </section>
      <div ref={wipe} className="story-wipe" aria-hidden />
    </div>
  );
}
