'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLink, CharacterSlot, Live, Tags } from '@/components/ui/primitives';
import { RiseText } from '@/components/motion/RiseText';
import { cases, serviceHref, serviceStories, type Service } from '@/lib/content';

/**
 * /services story chapters (H5 slot + H12 focus).
 * Desktop: a sticky left rail holds the big chapter number (rolls 01 → 07 as you scroll) and an index of all
 * service areas (current one in ink, links jump to the chapter). Right: the chapters.
 * Mobile: no rail; each chapter shows its own number. Reduced motion: number swaps without rolling.
 * CharacterSlot keeps the place for character art later (owner: no characters at launch).
 */
export function ServiceChapters({ items }: { items: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = ref.current; if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter)); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-x-[var(--gutter)] lg:grid-cols-12">
      {/* sticky rail (desktop) */}
      <aside className="hidden lg:col-span-4 lg:block" aria-label="Service areas">
        <div className="sticky top-[120px]">
          <CharacterSlot label="services-rail" fallback={
            <div className="chapter-num" aria-hidden>
              <span className="chapter-num-track" style={{ '--n': active } as CSSProperties}>
                {items.map(s => <span key={s.n} className="foil-text">{s.n}</span>)}
              </span>
            </div>
          } />
          <ol className="mt-10 grid gap-1">
            {items.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="chapter-index" aria-current={active === i ? 'true' : undefined}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* chapters */}
      <ol className="lg:col-span-8">
        {items.map((s, i) => {
          const story = serviceStories[s.slug];
          const related = story?.related ? cases.find(c => c.slug === story.related) : undefined;
          return (
            <li key={s.slug} id={s.slug} data-chapter={i} className="chapter border-t border-line py-[var(--space-9)] first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-[var(--space-9)]">
              <p className="t-rollcall foil-text lg:hidden" aria-hidden>{s.n}</p>
              <RiseText as="h2" className="t-h2 mt-4 lg:mt-0" style={{ maxWidth: '16ch' }} parts={[s.title]} />
              <p className="t-lead mt-6" style={{ maxWidth: '36ch' }}>{s.promise}</p>
              {story && <p className="mt-6 muted" style={{ maxWidth: '58ch' }}>{story.story}</p>}
              <div className="mt-8"><Tags items={s.tags} /></div>
              {related && (
                <Link href={`/work/${related.slug}`} className="related-case mt-10 grid gap-1 rounded-[var(--r-card)] bg-card p-6" data-reveal>
                  <span className="t-label muted flex flex-wrap items-center gap-x-3 gap-y-1">Case {related.n} · {related.sector}<Live>{related.status}</Live></span>
                  <span className="t-h3 mt-2" style={{ maxWidth: '24ch' }}>{related.headline}</span>
                </Link>
              )}
              <div className="mt-8"><ArrowLink href={serviceHref(s)}>Explore {s.title}</ArrowLink></div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
