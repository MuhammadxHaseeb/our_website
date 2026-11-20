import { Fragment, type CSSProperties } from 'react';

type Part = string | { t: string; emph?: boolean; hl?: boolean };

/**
 * Headline whose words rise out of a mask (H3 hero intro / H13 title rise).
 * Word spans only (never per character), so screen readers and copy/paste get normal text.
 *  · on="load": CSS animation on first paint (hero). Transform only, never opacity, so LCP is not delayed.
 *  · on="view": hidden by CSS until app/template.tsx plays it with Web Animations when it scrolls into view.
 * Reduced motion: words are simply visible.
 *
 * { hl }: the "Found scan" (hero only, one key word). After the words rise, a thin foil scan line sweeps once across
 * the headline; the key word lights up in foil as it is passed and a small azure "Found" badge clicks in beside it:
 * the brand's promise ("we find the problem before you do") acted out in about a second. The badge is the layout's
 * one azure spot. Reduced motion: word already lit, badge shown, no scan.
 * { emph }: a quieter second half of a headline, set in text-muted.
 */
export function RiseText({ parts, as: As = 'h2', on = 'view', className = '', style, id }:
  { parts: Part[]; as?: 'h1' | 'h2' | 'h3' | 'p'; on?: 'load' | 'view'; className?: string; style?: CSSProperties; id?: string }) {
  let w = 0;
  const groups = parts.map(p => {
    const t = typeof p === 'string' ? p : p.t;
    const cls = typeof p === 'string' ? '' : p.hl ? 'hl' : p.emph ? 'emph' : '';
    const words = t.split(/\s+/).filter(Boolean).map(x => ({ x, i: w++ }));
    return { cls, words };
  });
  const total = w;
  const scan = on === 'load' && groups.some(g => g.cls === 'hl');
  const renderWords = (ws: { x: string; i: number }[], lit = false) => ws.map(({ x, i }, k) => (
    <Fragment key={i}>
      <span className="rw"><span className={lit ? 'lit' : undefined} style={{ '--w': i } as CSSProperties}>{x}</span></span>
      {k < ws.length - 1 ? ' ' : null}
    </Fragment>
  ));
  // scan starts once the last word has risen (same timing as the .rise-load word animation)
  const scanStyle = scan ? ({ '--scan-at': `${80 + total * 70 + 650}ms` } as CSSProperties) : undefined;
  return (
    <As id={id} className={`${className} ${on === 'load' ? 'rise-load' : ''} ${scan ? 'found-scan' : ''}`} style={{ ...style, ...scanStyle }} data-rise={on === 'view' ? '' : undefined}>
      {groups.map((g, gi) => (
        <Fragment key={gi}>
          {g.cls === 'hl'
            ? <span className="hl">{renderWords(g.words, true)}{scan && <span className="found-badge" aria-hidden>Found</span>}</span>
            : g.cls ? <span className={g.cls}>{renderWords(g.words)}</span> : renderWords(g.words)}
          {gi < groups.length - 1 ? ' ' : null}
        </Fragment>
      ))}
      {scan && <span className="scan-line" aria-hidden />}
    </As>
  );
}
