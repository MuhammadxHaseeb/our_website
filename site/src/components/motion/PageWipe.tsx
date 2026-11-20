'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Page change (H2): one foil bar, slanted at the E's angle, sweeps across the screen as the new page comes in.
 * Not on the first load (LCP) and not with reduced motion. Restarted by toggling a class, no React state.
 * `seen` starts at the first path, so React's dev double-run of effects on mount is a no-op.
 */
export function PageWipe() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(pathname);
  useEffect(() => {
    if (seen.current === pathname) return;
    seen.current = pathname;
    const el = ref.current;
    if (!el || document.documentElement.dataset.motion === 'reduced') return;
    el.classList.remove('run'); void el.offsetWidth; el.classList.add('run');
  }, [pathname]);
  return <div ref={ref} className="page-wipe" aria-hidden />;
}
