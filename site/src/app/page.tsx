import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { ArrowLink, AssetPlaceholder, Button, Label, Live, SectionHeader } from '@/components/ui/primitives';
import { CaseCard, EngagementModels, ProcessSteps, ServiceRows } from '@/components/sections/blocks';
import { RollCall, StatementReveal, StatsScoreboard } from '@/components/sections/interactive';
import { LiveDemo } from '@/components/sections/LiveDemo';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { RiseText } from '@/components/motion/RiseText';
import { ExpandOnScroll } from '@/components/motion/ExpandOnScroll';
import { alsoServices, cases, company, industries, services, stats } from '@/lib/content';

export const metadata: Metadata = {
  title: { absolute: 'Epox: we find the problem before you do' },
  description: 'Epox is a software house in Faisalabad building web, mobile and AI products since 2019. We find what is holding your product back, fix it, and stay to keep it running.',
};

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Home (design brief §6): hero → proof → services → work → process → built for → numbers → models → statement → contact. */
export default function Home() {
  return (
    <>
      {/* 1 · Hero (H3 intro, H14 media expand, L10 magnetic CTAs) */}
      <section aria-labelledby="hero-title">
        <div className="container-x pt-[calc(72px+var(--space-10))] pb-[var(--space-9)]">
          <p className="t-label muted hero-after" style={d(0)}>Epox · {company.city} · Since {company.founded}</p>
          <RiseText as="h1" on="load" id="hero-title" className="t-display mt-8" style={{ maxWidth: '11ch' }}
            parts={['We find the problem', { t: 'before you do.', emph: true }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <p className="t-lead muted hero-after lg:col-span-6" style={{ maxWidth: '44ch', ...d(650) }}>
              We build web, mobile and AI software, then stay to keep it running. If we reached out to you, we&apos;ve already found something worth fixing.
            </p>
            <div className="flex flex-wrap gap-3 hero-after lg:col-span-6 lg:justify-end" style={d(800)}>
              <Button href="/contact" size="lg" arrow magnetic>Let&apos;s talk</Button>
              <Button href="/work" size="lg" variant="secondary" magnetic>See our work</Button>
            </div>
          </div>
          <ExpandOnScroll className="mt-[var(--space-9)]">
            <AssetPlaceholder name="liquid-metal logo loop · 16:9 (4:5 on mobile) · WebM + MP4 + poster" ratio="16 / 9" />
          </ExpandOnScroll>

          {/* 2 · Proof strip */}
          <ul className="mt-[var(--space-8)] grid gap-6 border-t border-line pt-6 sm:grid-cols-3" aria-label="Epox in short">
            <li data-reveal style={{ '--i': 0 } as CSSProperties}><Label as="p">Since</Label><p className="mt-2 t-h3 t-num">{company.founded}</p></li>
            <li data-reveal style={{ '--i': 1 } as CSSProperties}><Label as="p"><Live>Live, run by us</Live></Label><p className="mt-2 t-h3">2 products</p></li>
            <li data-reveal style={{ '--i': 2 } as CSSProperties}><Label as="p">We build</Label><p className="mt-2 t-h3">Web · Mobile · AI</p></li>
          </ul>
        </div>
      </section>

      {/* 3 · Services (H7 stacking rows) */}
      <section className="section" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHeader id="services-title" label="Services" title="Seven ways we can help" action={<ArrowLink href="/services">All services</ArrowLink>} />
          <ServiceRows items={services} stacking />
          <p className="mt-8 t-small muted">Also: {alsoServices.join(' · ')}</p>
        </div>
      </section>

      {/* 4 · Selected work (H15 unveil, H9 hover) */}
      <section className="section soft" aria-labelledby="work-title">
        <div className="container-x">
          <SectionHeader id="work-title" label="Work" title="Two products, both still live" action={<ArrowLink href="/work">All work</ArrowLink>} />
          <div className="grid gap-[var(--gutter)]">{cases.map(c => <CaseCard key={c.slug} c={c} />)}</div>
        </div>
      </section>

      {/* 5 · How we work (L5 live demo) */}
      <section className="section" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeader id="process-title" label="Process" title="You'll always know what's happening" action={<ArrowLink href="/how-we-work">How we work</ArrowLink>} />
          <div data-reveal><LiveDemo /></div>
          <div className="mt-[var(--space-9)]"><ProcessSteps /></div>
        </div>
      </section>

      {/* 6 · Built for (H8 roll-call) */}
      <section className="section soft" aria-labelledby="industries-title">
        <div className="container-x">
          <SectionHeader id="industries-title" label="Built for" title="Industries we've shipped in" />
          <RollCall items={industries} />
        </div>
      </section>

      {/* 7 · Numbers (L7 count-up) */}
      <section className="section" aria-labelledby="numbers-title">
        <div className="container-x">
          <SectionHeader id="numbers-title" label="Numbers" title="The short version" />
          <StatsScoreboard stats={stats} />
        </div>
      </section>

      {/* 8 · Ways to work with us (no prices) */}
      <section className="section soft" aria-labelledby="models-title">
        <div className="container-x">
          <SectionHeader id="models-title" label="Ways to work" title="Three ways to work with us" />
          <EngagementModels />
          <p className="mt-8 t-small muted">No price list: we agree the model and the number on a short call, under NDA if you need it.</p>
        </div>
      </section>

      {/* 9 · Statement (H6) */}
      <section className="section" aria-label="Why Epox">
        <div className="container-x">
          <Label>/ Why Epox</Label>
          <div className="mt-10">
            <StatementReveal text="Most of our clients didn't come looking for us. We found a problem in their product, showed them the fix, and stayed to keep it working." />
          </div>
        </div>
      </section>

      {/* 10 · Contact block (+ footer from layout) */}
      <div id="contact" className="border-t border-line"><ContactBlock /></div>
    </>
  );
}
