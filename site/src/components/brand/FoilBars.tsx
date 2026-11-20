/**
 * The brand device (Ice Mint, assets/Brand device/epox-foil-bars.svg): three foil bars with slanted left ends
 * that run off an edge of the layout. Black grounds only. Decorative (aria-hidden).
 * Foil gradient + grain come from <BrandDefs /> (app/layout.tsx).
 */
const BARS = '169.2,39 336,39 336,59.8 189.5,59.8 182.2,85.8 336,85.8 336,106.6 177,106.6 169.7,132.6 336,132.6 336,153.4 138,153.4';

export function FoilBars({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="138 39 198 114.4" className={`foil-bars ${className}`} aria-hidden focusable="false">
      <polygon points={BARS} fill="url(#ep-foil-bars)" />
      <polygon points={BARS} fill="url(#ep-grain-bars)" />
    </svg>
  );
}

/**
 * Shared SVG definitions for the foil (6 Ice Mint stops) and its fine diagonal grain, rendered once in the layout.
 * Kept out of display:none so every <Logo foil> and <FoilBars> can reference them.
 */
export function BrandDefs() {
  const stops = [['0', '#BFE3FF'], ['0.2', '#E2FFF4'], ['0.4', '#8FC9FF'], ['0.58', '#7FF5D0'], ['0.78', '#E4FBFF'], ['1', '#A8F0E0']];
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="ep-foil" x1="0" y1="0" x2="1" y2="1">
          {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <linearGradient id="ep-foil-bars" gradientUnits="userSpaceOnUse" x1="138" y1="9.3" x2="336" y2="193">
          {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
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
