'use client';
import { useEffect, useRef } from 'react';
import { cancelIdle, getLenis, whenIdle } from '@/lib/motion';
import { barsAlpha, camZ, clamp01, F_USER, onStory3D, onStoryBounds, PASS, resetStory3D, setAnchor, setStory, storyEligible, storyOn, VB, Z0 } from '@/lib/story';

/**
 * H16 · Home hero scroll story (docs/hero-scroll-story-plan.md, lib/story.ts). Desktops, tablets and phones in
 * portrait (html[data-story], set before first paint; storyEligible). One continuous camera flight while the hero stage is pinned (2.17 screens; 1.75 in portrait):
 *   the copy scrolls away; the camera flies into the middle foil bar until the screen is all foil, passes through it,
 *   and glides on to the glass wordmark floating behind, which turns to face you; the Found corners lock onto it and
 *   the proof strip slides up; then the page simply scrolls on into Services. No cross-fades.
 * The 3D scene (GlassLogo) draws the bars itself, pixel-matched to the SVG, so once it is up the SVG steps aside.
 * Until then (or without WebGL) the SVG bars are scaled about the same point here, which is the same picture.
 */

export function HeroStory({ children, labelledBy }: { children: React.ReactNode; labelledBy: string }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const found = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current; const st = stage.current; const fd = found.current;
    if (!el || !st || !fd) return;
    const svg = st.querySelector<SVGSVGElement>('.hero-bars');
    const html = document.documentElement;
    const mq = window.matchMedia('(min-height: 560px)'); // phone turned to landscape and back, window resized
    let raf = 0; let p = 0; let has3D = false; let glChecked = false;
    let a = { left: 0, top: 0, width: 0 };

    // where the SVG bars are laid out on the stage (computed values: no transforms, no entrance animation)
    const measure = () => {
      if (!svg) return;
      const cs = getComputedStyle(svg);
      a = { left: parseFloat(cs.left), top: parseFloat(cs.top), width: parseFloat(cs.width) };
      setAnchor({ ...a, stageW: st.clientWidth, stageH: st.clientHeight });
    };
    const clearFallback = () => { if (svg) { svg.style.transform = ''; svg.style.transformOrigin = ''; svg.style.opacity = ''; } };
    const reset = () => { clearFallback(); el.style.removeProperty('--p'); el.removeAttribute('data-past'); setStory(0); };

    const update = () => {
      raf = 0;
      if (!storyOn()) { reset(); return; }
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      p = clamp01(-r.top / Math.max(1, r.height - vh));
      el.style.setProperty('--p', p.toFixed(4));
      el.toggleAttribute('data-past', p > 0.12);
      el.toggleAttribute('data-through', p > PASS);
      el.toggleAttribute('data-done', p > 0.995); // all black now: let the stage go, Services is already underneath
      setStory(p);
      // fallback flight until the 3D scene is drawing: the same frames, as a 2D scale of the SVG about F
      if (!has3D && svg) {
        const z = camZ(p);
        const k = a.width / VB.w;
        svg.style.transformOrigin = `${((F_USER.x - VB.x) * k).toFixed(1)}px ${((F_USER.y - VB.y) * k).toFixed(1)}px`;
        svg.style.transform = z > 1 ? `scale(${(Z0 / z).toFixed(4)})` : 'scale(0)';
        svg.style.opacity = String(barsAlpha(z));
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(update); };

    // the window crossed the desktop threshold, or reduced motion was switched on: story on/off
    const sync = () => {
      const ok = storyEligible(glChecked);
      if (ok) html.dataset.story = 'on'; else delete html.dataset.story;
      measure(); kick();
    };
    const motionObs = new MutationObserver(sync);
    motionObs.observe(html, { attributes: true, attributeFilter: ['data-motion'] });

    const off3D = onStory3D(() => { has3D = true; clearFallback(); el.setAttribute('data-3d', ''); kick(); });

    // the Found corners hug the glass word wherever the 3D scene puts it
    const offBounds = onStoryBounds(b => {
      const pad = 22;
      fd.style.setProperty('--fx', `${(b.x - pad).toFixed(1)}px`); fd.style.setProperty('--fy', `${(b.y - pad).toFixed(1)}px`);
      fd.style.setProperty('--fw', `${(b.w + pad * 2).toFixed(1)}px`); fd.style.setProperty('--fh', `${(b.h + pad * 2).toFixed(1)}px`);
    });

    // keyboard: a focused link in the copy that has scrolled away would be invisible, so bring the story back to its start
    const onFocus = (ev: FocusEvent) => {
      if (!storyOn() || p < 0.06 || !(ev.target as HTMLElement).closest('.hero-copy')) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top, { immediate: true }); else window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    };
    const onResize = () => { measure(); kick(); };

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', sync);
    el.addEventListener('focusin', onFocus);
    sync(); update();
    // WebGL2 is tested once the page is idle (a test context costs main-thread time during start-up); without it, no story
    let idle = 0;
    const checkGL = () => { idle = whenIdle(() => { glChecked = true; sync(); }); };
    if (document.readyState === 'complete') checkGL(); else window.addEventListener('load', checkGL, { once: true });
    return () => {
      cancelAnimationFrame(raf); cancelIdle(idle); window.removeEventListener('load', checkGL); motionObs.disconnect(); offBounds(); off3D(); resetStory3D();
      window.removeEventListener('scroll', kick); window.removeEventListener('resize', onResize);
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
    </div>
  );
}
