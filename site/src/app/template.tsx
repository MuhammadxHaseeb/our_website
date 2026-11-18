'use client';
import { useEffect, useState } from 'react';
import { scrollToTop } from '@/lib/motion';

// Re-mounts on every navigation:
//  · page enter transition (H2), skipped on the very first load so the hero (LCP) paints immediately;
//  · scroll reset (unless the URL has a #section);
//  · reveal observer: L4 section entrance [data-reveal], H13 title rise [data-rise], H15 media unveil [data-unveil]. It lives here because this effect runs only after the page inside has hydrated,
//    so setting data-in never races React's hydration.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
    if (!window.location.hash) scrollToTop();
    if (document.documentElement.dataset.motion === 'reduced') return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('main [data-reveal], main [data-rise], main [data-unveil]'));
    const css = getComputedStyle(document.documentElement);
    const dur = parseFloat(css.getPropertyValue('--dur-enter')) || 800;
    const stagger = parseFloat(css.getPropertyValue('--stagger')) || 60;
    const rise = css.getPropertyValue('--rise').trim() || '16px';
    const ease = css.getPropertyValue('--ease-out-quint').trim() || 'ease-out';
    // Reveal with the Web Animations API: no attribute/class changes, so it can't clash with hydration.
    const reveal = (el: HTMLElement) => {
      if (el.hasAttribute('data-rise')) {
        // words rise out of their masks, one after another
        el.querySelectorAll<HTMLElement>('.rw > span').forEach((w, i) =>
          w.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: dur * 1.25, delay: 80 + i * stagger, easing: ease, fill: 'forwards' }));
        return;
      }
      if (el.hasAttribute('data-unveil')) {
        // media wipes up from the bottom while the image settles from a slight zoom
        el.animate([{ clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }], { duration: dur * 1.4, delay: 120, easing: ease, fill: 'forwards' });
        (el.firstElementChild as HTMLElement | null)?.animate([{ scale: '1.18' }, { scale: '1' }], { duration: dur * 1.8, delay: 120, easing: ease });
        return;
      }
      const i = Number(el.style.getPropertyValue('--i')) || 0;
      el.animate([{ opacity: 0, transform: `translateY(${rise})` }, { opacity: 1, transform: 'none' }],
        { duration: dur, delay: i * stagger, easing: ease, fill: 'forwards' });
    };
    if (!('IntersectionObserver' in window)) { els.forEach(reveal); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { reveal(e.target as HTMLElement); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
