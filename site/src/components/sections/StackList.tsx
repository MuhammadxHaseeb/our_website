'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * The list of stacking service rows. CSS pins each row (sticky) a strip lower than the one before.
 * A sticky row lets go when its box reaches the bottom of the list, so rows of different heights let go
 * at different moments and the later rows slid over the earlier strips (05 cut, 06 gone).
 * Here every row's box is extended so that all of them reach the list bottom at the same scroll position:
 * row i is as tall as the last row + the strips still to come; the next row pulls back up by the same amount,
 * so the layout does not move. CSS holds a fallback that is right when all rows are the same height.
 */
export function StackList({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    const rows = Array.from(ol.children) as HTMLElement[];

    const fit = () => {
      const clear = () => rows.forEach(r => { r.style.removeProperty('padding-bottom'); r.style.removeProperty('margin-top'); });
      if (rows.length < 2 || getComputedStyle(rows[0]).position !== 'sticky') { clear(); return; }
      const step = parseFloat(getComputedStyle(rows[1]).top) - parseFloat(getComputedStyle(rows[0]).top);
      // a row's own height = its border + its link (the padding we add is not content)
      const own = rows.map(r => {
        const link = r.firstElementChild as HTMLElement | null;
        return parseFloat(getComputedStyle(r).borderTopWidth) + (link?.offsetHeight ?? 0);
      });
      const last = own[own.length - 1];
      let pull = 0;
      rows.forEach((r, i) => {
        const pad = i === rows.length - 1 ? 0 : Math.max(0, last + (rows.length - 1 - i) * step - own[i]);
        r.style.paddingBottom = `${pad}px`;
        r.style.marginTop = i === 0 ? '' : `${-pull}px`;
        pull = pad;
      });
    };

    fit();
    const ro = new ResizeObserver(fit);
    rows.forEach(r => r.firstElementChild && ro.observe(r.firstElementChild));
    const mq = matchMedia('(min-height: 520px)');
    mq.addEventListener('change', fit);
    return () => { ro.disconnect(); mq.removeEventListener('change', fit); };
  }, [count]);

  return <ol ref={ref} className="stack-rows" style={{ '--n': count } as CSSProperties}>{children}</ol>;
}
