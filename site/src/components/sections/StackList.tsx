'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * The list of stacking service rows. CSS pins each row (sticky) a strip lower than the one before.
 * A sticky row lets go when its box reaches the bottom of the list, so rows of different heights let go
 * at different moments and the later rows slid over the earlier strips (05 cut, 06 gone).
 * Here every row's box is extended so that all of them reach the list bottom at the same scroll position:
 * row i is as tall as the last row + the strips still to come; the next row pulls back up by the same amount,
 * so the layout does not move. Each row's pinned strip is also measured (number + title, so a title that wraps
 * to two lines on a phone is not cut). CSS holds a fallback for one-line titles of equal-height rows.
 */
export function StackList({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = ref.current;
    if (!ol) return;
    const rows = Array.from(ol.children) as HTMLElement[];

    const fit = () => {
      const clear = () => rows.forEach(r => { r.style.removeProperty('padding-bottom'); r.style.removeProperty('margin-top'); r.style.removeProperty('top'); });
      clear();
      if (rows.length < 2 || getComputedStyle(rows[0]).position !== 'sticky') return;
      const stackTop = parseFloat(getComputedStyle(rows[0]).top);
      // each row keeps a strip of its own: down to the bottom of its number or title (a title may wrap to 2 lines on phones)
      const strip = rows.map(r => {
        // measured against the row's link: the reveal slide moves the link and its contents together, so it cancels out
        const link = r.firstElementChild as HTMLElement | null;
        if (!link) return 0;
        const linkTop = link.getBoundingClientRect().top;
        // the number's grid cell stretches to the row height, so count one line of it (line-height 1), not its box
        const num = r.querySelector<HTMLElement>('.svc-num');
        const title = r.querySelector<HTMLElement>('.svc-title');
        const numBottom = num ? num.getBoundingClientRect().top - linkTop + parseFloat(getComputedStyle(num).fontSize) : 0;
        const bottom = Math.max(numBottom, title ? title.getBoundingClientRect().bottom - linkTop : 0);
        return Math.ceil(parseFloat(getComputedStyle(r).borderTopWidth) + bottom + 12);
      });
      const tops: number[] = [];
      rows.forEach((_, i) => tops.push(i === 0 ? stackTop : tops[i - 1] + strip[i - 1]));
      // a row's own height = its border + its link (the padding we add is not content)
      const own = rows.map(r => {
        const link = r.firstElementChild as HTMLElement | null;
        return parseFloat(getComputedStyle(r).borderTopWidth) + (link?.offsetHeight ?? 0);
      });
      const n = rows.length;
      let pull = 0;
      rows.forEach((r, i) => {
        // every row's box ends at the same scroll position as the last row's, so they all let go together
        const pad = i === n - 1 ? 0 : Math.max(0, own[n - 1] + (tops[n - 1] - tops[i]) - own[i]);
        r.style.top = `${tops[i]}px`;
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
    addEventListener('resize', fit);
    document.fonts?.ready.then(fit); // titles can re-wrap once the web fonts land
    return () => { ro.disconnect(); mq.removeEventListener('change', fit); removeEventListener('resize', fit); };
  }, [count]);

  return <ol ref={ref} className="stack-rows" style={{ '--n': count } as CSSProperties}>{children}</ol>;
}
