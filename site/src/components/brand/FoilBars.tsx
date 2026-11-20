'use client';
import { useEffect, useId, useRef } from 'react';

/**
 * The brand device (Ice Mint, assets/Brand device/epox-foil-bars.svg): three foil bars with slanted left ends that run
 * off an edge. Black grounds only. Decorative (aria-hidden).
 *
 * Interactive, like real holographic foil:
 *  · Light: the ice-blue → mint colours slide across the bars and a soft sheen follows the light source:
 *    the cursor on desktop, the phone's tilt where the browser gives it, otherwise the scroll position.
 *  · Depth: the E is cut into three layers (one per bar). At rest they join seamlessly; as the hero scrolls away
 *    they slide off to the right at different speeds, so the mark reads as three stacked layers.
 * Runs only while the hero is on screen; settles and stops when nothing moves. Reduced motion: static.
 *
 * Bars' right ends are extended past the viewBox (x 336 → 1336) so they run to the screen edge on any width; .hero clips them.
 */

// three slices of the E (bar + its part of the slanted spine), cut in the middle of each gap, overlapping 0.3 units
const SLICES = [
  '169.2,39 1336,39 1336,59.8 189.5,59.8 185.76,73.1 159.89,73.1',
  '159.98,72.8 185.85,72.8 182.2,85.8 1336,85.8 1336,106.6 177,106.6 173.27,119.9 147.14,119.9',
  '147.22,119.6 173.35,119.6 169.7,132.6 1336,132.6 1336,153.4 138,153.4',
];
const DEPTH = [10, 24, 40]; // user units each layer travels right over one hero height of scroll (top layer moves least)
const STOPS: [string, string][] = [['0', '#BFE3FF'], ['0.2', '#E2FFF4'], ['0.4', '#8FC9FF'], ['0.58', '#7FF5D0'], ['0.78', '#E4FBFF'], ['1', '#A8F0E0']];

export function FoilBars({ className = '' }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current; if (!el) return;
    if (document.documentElement.dataset.motion === 'reduced') return;
    const foil = el.querySelector<SVGLinearGradientElement>(`#f${id}`);
    const sheen = el.querySelector<SVGRadialGradientElement>(`#s${id}`);
    if (!foil || !sheen) return;
    const layers = Array.from(el.querySelectorAll<SVGGElement>('[data-layer]'));
    const hero = el.closest('section') ?? el.parentElement!;

    const target = { x: 0.5, y: 0.35, p: 0 }; // light position (0..1 across the viewport) + scroll progress through the hero
    const cur = { ...target };
    let raf = 0; let visible = true; let tiltSeen = false;

    const draw = () => {
      raf = 0;
      cur.x += (target.x - cur.x) * 0.08; cur.y += (target.y - cur.y) * 0.08; cur.p += (target.p - cur.p) * 0.18;
      // colours slide along the gradient (spreadMethod reflect keeps them flowing), a little more with scroll
      foil.setAttribute('gradientTransform', `translate(${((cur.x - 0.5) * 160 + cur.p * 120).toFixed(2)} ${((cur.y - 0.5) * 50).toFixed(2)})`);
      // sheen: where the light falls, mapped into the bars' own coordinates
      const r = el.getBoundingClientRect(); const k = 198 / r.width;
      const sx = 138 + (cur.x * window.innerWidth - r.left) * k; const sy = 39 + (cur.y * window.innerHeight - r.top) * k;
      sheen.setAttribute('cx', Math.max(110, Math.min(380, sx)).toFixed(1)); sheen.setAttribute('cy', Math.max(20, Math.min(175, sy)).toFixed(1));
      layers.forEach((g, i) => g.setAttribute('transform', `translate(${(cur.p * DEPTH[i]).toFixed(2)} 0)`));
      const moving = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) + Math.abs(target.p - cur.p) > 0.0006;
      if (moving && visible) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(draw); };

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onPointer = (e: PointerEvent) => { target.x = e.clientX / window.innerWidth; target.y = e.clientY / window.innerHeight; kick(); };
    const onScroll = () => {
      const h = hero.getBoundingClientRect();
      target.p = Math.min(1, Math.max(0, -h.top / Math.max(1, h.height)));
      // touch screens without tilt: the light travels with the scroll instead
      if (!fine && !tiltSeen) { target.x = 0.5 + Math.sin(window.scrollY / 260) * 0.45; target.y = 0.3 + target.p * 0.4; }
      kick();
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tiltSeen = true;
      target.x = 0.5 + Math.max(-1, Math.min(1, e.gamma / 30)) * 0.5;
      target.y = 0.5 + Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.5;
      kick();
    };

    if (fine) window.addEventListener('pointermove', onPointer, { passive: true });
    else window.addEventListener('deviceorientation', onTilt); // fires without a prompt on Android; iOS falls back to scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
    io.observe(el);
    onScroll(); kick();
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('pointermove', onPointer); window.removeEventListener('deviceorientation', onTilt); window.removeEventListener('scroll', onScroll);
    };
  }, [id]);

  return (
    <svg ref={svg} viewBox="138 39 198 114.4" className={`foil-bars ${className}`} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`f${id}`} gradientUnits="userSpaceOnUse" x1="138" y1="9.3" x2="336" y2="193" spreadMethod="reflect">
          {STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <radialGradient id={`s${id}`} gradientUnits="userSpaceOnUse" cx="240" cy="60" r="78">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {SLICES.map((pts, i) => (
        <g key={i} data-layer={i}>
          <polygon points={pts} fill={`url(#f${id})`} />
          <polygon points={pts} fill={`url(#s${id})`} />
          <polygon points={pts} fill="url(#ep-grain-bars)" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Shared SVG definitions for the foil (6 Ice Mint stops) and its fine diagonal grain, rendered once in the layout.
 * Kept out of display:none so every <Logo foil> and <FoilBars> can reference them.
 */
export function BrandDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="ep-foil" x1="0" y1="0" x2="1" y2="1">
          {STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <pattern id="ep-grain-word" patternUnits="userSpaceOnUse" width="9.19" height="9.19" patternTransform="rotate(-35)">
          <rect width="2.48" height="9.19" fill="#FFFFFF" fillOpacity="0.22" />
        </pattern>
        <pattern id="ep-grain-bars" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(-35)">
          <rect width="0.81" height="3" fill="#FFFFFF" fillOpacity="0.22" />
        </pattern>
      </defs>
    </svg>
  );
}
