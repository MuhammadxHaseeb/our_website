'use client';
import { useEffect, useState } from 'react';

// Re-mounts on every navigation → page enter transition (H2).
// Skipped on the very first load so the hero (LCP) paints immediately; disabled under reduced motion (CSS).
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => !firstLoad);
  useEffect(() => { firstLoad = false; }, []);
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
