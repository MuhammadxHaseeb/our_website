'use client';
import { useEffect, useState } from 'react';
import { scrollToTop } from '@/lib/motion';

// Re-mounts on every navigation:
//  · page enter transition (H2), skipped on the very first load so the hero (LCP) paints immediately;
//  · scroll reset (unless the URL has a #section);
//  · reveal observer (L4). It lives here because this effect runs only after the page inside has hydrated,
//    so setting data-in never races React's hydration.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
    if (!window.location.hash) scrollToTop();
    if (document.documentElement.dataset.motion === 'reduced') return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('main [data-reveal]'));
    const css = getComputedStyle(document.documentElement);
    const dur = parseFloat(css.getPropertyValue('--dur-enter')) || 800;
    const stagger = parseFloat(css.getPropertyValue('--stagger')) || 60;
    const rise = css.getPropertyValue('--rise').trim() || '16px';
    const ease = css.getPropertyValue('--ease-out-quint').trim() || 'ease-out';
    // Reveal with the Web Animations API: no attribute/class changes, so it can't clash with hydration.
    const reveal = (el: HTMLElement) => {
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
