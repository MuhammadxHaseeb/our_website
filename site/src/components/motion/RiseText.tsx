import { Fragment, type CSSProperties } from 'react';

type Part = string | { t: string; emph?: boolean; hl?: boolean };

/**
 * Headline whose words rise out of a mask (H3 hero intro / H13 title rise).
 * Word spans only (never per character), so screen readers and copy/paste get normal text.
 *  · on="load": CSS animation on first paint (hero). Transform only, never opacity, so LCP is not delayed.
 *  · on="view": hidden by CSS until app/template.tsx plays it with Web Animations when it scrolls into view.
 * Reduced motion: words are simply visible.
 * Ice Mint emphasis: { hl } = the azure highlight, for ONE key word in a hero (the layout's one azure spot);
 * { emph } = a quieter second half of a headline, set in text-muted.
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
  const renderWords = (ws: { x: string; i: number }[]) => ws.map(({ x, i }, k) => (
    <Fragment key={i}>
      <span className="rw"><span style={{ '--w': i } as CSSProperties}>{x}</span></span>
      {k < ws.length - 1 ? ' ' : null}
    </Fragment>
  ));
  return (
    <As id={id} className={`${className} ${on === 'load' ? 'rise-load' : ''}`} style={style} data-rise={on === 'view' ? '' : undefined}>
      {groups.map((g, gi) => (
        <Fragment key={gi}>
          {g.cls
            ? <span className={g.cls} style={{ '--w0': total } as CSSProperties}>{renderWords(g.words)}</span>
            : renderWords(g.words)}
          {gi < groups.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </As>
  );
}
