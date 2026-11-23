import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { ArrowLink, SectionHeader } from '@/components/ui/primitives';
import { product } from '@/lib/product';
import { EngagementModels } from '@/components/sections/blocks';
import { ServiceChapters } from '@/components/sections/ServiceChapters';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { RiseText } from '@/components/motion/RiseText';
import { alsoServices, services } from '@/lib/content';
import { FoilBars } from '@/components/brand/FoilBars';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Seven areas epox builds in: web & SaaS, mobile apps, business software, AI, UI/UX & branding, cloud & DevOps, and launch, growth & support.',
};

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** /services (design brief §6): hero → 7 story chapters (sticky rail) → ways to work → contact. */
export default function ServicesPage() {
  return (
    <>
      <section className="hero" aria-labelledby="services-hero">
        <FoilBars className="hero-bars hero-bars--page" />
        <div className="container-x pt-[calc(72px+var(--space-10))] pb-[var(--space-9)]">
          <p className="t-label muted hero-after" style={d(0)}>/ Services</p>
          <RiseText as="h1" on="load" id="services-hero" className="t-h1 mt-8" style={{ maxWidth: '14ch' }}
            parts={['Seven areas, one team that', { t: 'stays', hl: true }, 'after launch.']} />
          <p className="t-lead muted mt-10 hero-after" style={{ maxWidth: '46ch', ...d(600) }}>
            Whatever you need built probably fits in one of these. If it doesn&apos;t, ask: we also build {alsoServices.map(a => a.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.
          </p>
        </div>
      </section>

      <section className="py-[var(--section-y)]" aria-label="Service areas">
        <div className="container-x"><ServiceChapters items={services} /></div>
      </section>

      <section className="section-tight border-t border-line" aria-labelledby="product-band">
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-[var(--gutter)]">
          <div className="lg:col-span-8">
            <p className="t-label muted">/ Our product</p>
            <h2 id="product-band" className="t-h2 mt-6" style={{ maxWidth: '18ch' }}>Run a restaurant or a shop?</h2>
            <p className="t-lead muted mt-6" style={{ maxWidth: '46ch' }}>{product.promise} Ready to use, with prices on the page.</p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end"><ArrowLink href={product.href}>See the restaurant system</ArrowLink></div>
        </div>
      </section>

      <section className="section soft" aria-labelledby="models-title">
        <div className="container-x">
          <SectionHeader id="models-title" label="Ways to work" title="Three ways to work with us" />
          <EngagementModels />
          <p className="mt-8 t-small muted">No price list: we agree the model and the number on a short call.</p>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
