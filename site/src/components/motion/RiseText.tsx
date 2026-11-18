import { Fragment, type CSSProperties } from 'react';

type Part = string | { t: string; emph?: boolean };

/**
 * Headline whose words rise out of a mask (H3 hero intro / H13 title rise).
 * Word spans only (never per character), so screen readers and copy/paste get normal text.
 *  · on="load": CSS animation on first paint (hero). Transform only, never opacity, so LCP is not delayed.
 *  · on="view": hidden by CSS until app/template.tsx plays it with Web Animations when it scrolls into view.
 * Reduced motion: words are simply visible.
 */
export function RiseText({ parts, as: As = 'h2', on = 'view', className = '', style, id }:
  { parts: Part[]; as?: 'h1' | 'h2' | 'h3' | 'p'; on?: 'load' | 'view'; className?: string; style?: CSSProperties; id?: string }) {
  const words = parts.flatMap(p => {
    const t = typeof p === 'string' ? p : p.t;
    const emph = typeof p !== 'string' && !!p.emph;
    return t.split(/\s+/).filter(Boolean).map(w => ({ w, emph }));
  });
  return (
    <As id={id} className={`${className} ${on === 'load' ? 'rise-load' : ''}`} style={style} data-rise={on === 'view' ? '' : undefined}>
      {words.map((x, i) => (
        <Fragment key={i}>
          <span className={`rw${x.emph ? ' emph' : ''}`}><span style={{ '--w': i } as CSSProperties}>{x.w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </As>
  );
}
