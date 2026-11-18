'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { scrollToTop, startLenis, whenIdle } from '@/lib/motion';

/** Inline in <head>: sets html.js + data-motion before first paint (no reveal flash, reduced motion respected). */
export const motionBootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.motion='reduced';}catch(e){}})();`;

/**
 * Site-wide motion: Lenis smooth scroll (fine pointers, lazy, after idle) + one IntersectionObserver
 * for [data-reveal] entrances (L4). Re-scans on every route change.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { if (mq.matches) document.documentElement.dataset.motion = 'reduced'; else delete document.documentElement.dataset.motion; };
    mq.addEventListener('change', sync);
    whenIdle(() => { startLenis(); });
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    scrollToTop();
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
