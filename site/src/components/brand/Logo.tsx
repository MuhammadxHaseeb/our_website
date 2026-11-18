import { WORDMARK_PATH, WORDMARK_VIEWBOX } from './wordmark-path';

/** "epox" wordmark: Helvetica Now Display Bold, outlined. Colour follows currentColor. */
export function Logo({ className = '', title = 'Epox' }: { className?: string; title?: string }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      <title>{title}</title>
      <path d={WORDMARK_PATH} />
    </svg>
  );
}
