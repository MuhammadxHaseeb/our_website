'use client';
import { useEffect } from 'react';
import { startLenis, whenIdle } from '@/lib/motion';

/** Inline in <head>: sets html.js + data-motion before first paint (no reveal flash, reduced motion respected). */
export const motionBootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.motion='reduced';}catch(e){}})();`;

/**
 * Site-wide motion: keeps data-motion in sync with the OS setting and starts Lenis smooth scroll
 * (fine pointers only, lazy, after idle). Reveals + scroll reset live in app/template.tsx.
 */
export function MotionProvider() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { if (mq.matches) document.documentElement.dataset.motion = 'reduced'; else delete document.documentElement.dataset.motion; };
    mq.addEventListener('change', sync);
    whenIdle(() => { startLenis(); });

    // L10 button reward: on click, a ring pops outward from the button (CSS .btn[data-pop]); replaces the old magnetic drift
    const pop = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.btn');
      if (!el || el.matches('[disabled]')) return;
      el.removeAttribute('data-pop'); void el.offsetWidth; el.setAttribute('data-pop', '');
      window.setTimeout(() => el.removeAttribute('data-pop'), 600);
    };
    document.addEventListener('click', pop);
    return () => { mq.removeEventListener('change', sync); document.removeEventListener('click', pop); };
  }, []);
  return null;
}
