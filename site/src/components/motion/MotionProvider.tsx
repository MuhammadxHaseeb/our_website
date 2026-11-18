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

    // L10 magnetic buttons: [data-magnetic] leans toward the cursor (mouse/trackpad only, not reduced motion)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let cur: HTMLElement | null = null;
    const release = () => { if (cur) cur.style.translate = ''; cur = null; };
    const move = (e: PointerEvent) => {
      if (document.documentElement.dataset.motion === 'reduced') return release();
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (el !== cur) release();
      if (!el) return;
      cur = el;
      const r = el.getBoundingClientRect();
      el.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.3).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.45).toFixed(1)}px`;
    };
    if (fine) { document.addEventListener('pointermove', move, { passive: true }); document.documentElement.addEventListener('pointerleave', release); }
    return () => {
      mq.removeEventListener('change', sync);
      document.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', release);
    };
  }, []);
  return null;
}
