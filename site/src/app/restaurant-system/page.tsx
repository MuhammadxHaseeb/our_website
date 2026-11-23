import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { BarChart3, Bike, Gift, MonitorSmartphone, ShoppingBag, type LucideIcon } from 'lucide-react';
import { ArrowLink, Button, SectionHeader, Tags } from '@/components/ui/primitives';
import { Faq } from '@/components/sections/blocks';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { RiseText } from '@/components/motion/RiseText';
import { FoilBars } from '@/components/brand/FoilBars';
import { forWho, modules, pricing, pricingNote, product, productFaq, setupSteps } from '@/lib/product';

export const metadata: Metadata = {
  title: 'Restaurant system',
  description: 'Point of sale, online ordering, delivery riders, loyalty and reports for restaurants and shops, in one system built by epox. Plans from $25 per branch a month.',
};

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;
const ICONS: Record<string, LucideIcon> = { pos: MonitorSmartphone, ordering: ShoppingBag, riders: Bike, loyalty: Gift, reports: BarChart3 };

/** epox's own product: hero → modules → who it's for → setup → pricing (the only prices on the site) → FAQ → contact. */
export default function RestaurantSystemPage() {
  return (
    <>
      <section className="hero" aria-labelledby="product-title">
        <FoilBars className="hero-bars hero-bars--page" />
        <div className="container-x pt-[calc(72px+var(--space-10))] pb-[var(--space-9)]">
          <p className="t-label muted hero-after" style={d(0)}>/ Our product · <span className="normal-case">{product.name}</span></p>
          <RiseText as="h1" on="load" id="product-title" className="t-h1 mt-8" style={{ maxWidth: '15ch' }}
            parts={['Every order, every branch,', { t: 'one', hl: true }, 'system.']} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <p className="t-lead muted hero-after lg:col-span-6" style={{ maxWidth: '46ch', ...d(600) }}>
              The till, your own ordering website and app, delivery riders, loyalty and reports, built by us and run as one system. Counter, online and delivery-app orders land in the same place.
            </p>
            <div className="flex flex-wrap gap-3 hero-after lg:col-span-6 lg:justify-end" style={d(750)}>
              <Button href="#contact" size="lg" variant="accent" arrow>Book a demo</Button>
              <Button href="#pricing" size="lg" variant="secondary">See pricing</Button>
            </div>
          </div>
        </div>
      </section>

      {/* modules */}
      <section className="section soft" aria-labelledby="modules-title">
        <div className="container-x">
          <SectionHeader id="modules-title" label="What's inside" title="Five parts, one login" />
          <ol className="grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => {
              const Icon = ICONS[m.slug];
              return (
                <li key={m.slug} className="border-t border-line pt-6" data-reveal style={{ '--i': i % 3 } as CSSProperties}>
                  <span className="svc-icon" aria-hidden><Icon strokeWidth={1.9} /></span>
                  <h3 className="t-h3 mt-6">{m.title}</h3>
                  <p className="mt-3 font-medium" style={{ maxWidth: '34ch' }}>{m.line}</p>
                  <ul className="mt-5 grid gap-2.5">
                    {m.points.map(p => <li key={p} className="t-small muted flex gap-3"><span aria-hidden className="mt-[0.6em] h-px w-3 flex-none bg-current opacity-50" />{p}</li>)}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* who it's for + setup */}
      <section className="section" aria-labelledby="setup-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-[var(--gutter)]">
            <h2 className="t-label muted lg:col-span-3 lg:pt-1.5">/ Built for</h2>
            <div className="lg:col-span-9"><Tags items={forWho} /></div>
          </div>
          <div className="mt-[var(--space-10)]">
            <SectionHeader id="setup-title" label="Setup" title="Live at your first branch in four steps" />
            <ol className="grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {setupSteps.map((s, i) => (
                <li key={s.n} className="border-t border-line pt-6" data-reveal style={{ '--i': i } as CSSProperties}>
                  <span className="t-label muted">{s.n}</span>
                  <h3 className="t-h3 mt-4">{s.title}</h3>
                  <p className="mt-3 muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="section soft scroll-mt-20" aria-labelledby="pricing-title">
        <div className="container-x">
          <SectionHeader id="pricing-title" label="Pricing" title="Pay per branch, add parts as you grow" />
          <div className="grid gap-[var(--space-10)]">
            {pricing.map(g => (
              <div key={g.title}>
                <div className="flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="t-h3">{g.title}</h3>
                  <p className="t-small muted">{g.line}</p>
                </div>
                <ul className={`mt-8 grid gap-[var(--gutter)] sm:grid-cols-2 ${g.plans.length === 3 ? 'lg:grid-cols-3' : g.plans.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                  {g.plans.map((p, i) => (
                    <li key={p.name} className="card-o flex flex-col rounded-[var(--r-card)] p-8" data-reveal style={{ '--i': i } as CSSProperties}>
                      {p.for && <span className="t-label muted">{p.for}</span>}
                      <h4 className={`font-medium ${p.for ? 'mt-3' : ''}`}>{p.name}</h4>
                      <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                        <span className="t-num" style={{ font: '500 clamp(2.5rem, 2rem + 1.6vw, 3.5rem)/1 var(--font-display)', letterSpacing: 'var(--tr-h1)' }}>{p.price}</span>
                        <span className="t-small muted">{p.unit}</span>
                      </p>
                      <ul className="mt-8 grid gap-3 border-t border-line pt-6">
                        {p.points.map(x => <li key={x} className="t-small flex gap-3"><span aria-hidden className="mt-[0.6em] h-px w-3 flex-none bg-current opacity-50" />{x}</li>)}
                      </ul>
                      <div className="mt-auto pt-10"><ArrowLink href="#contact">Book a demo</ArrowLink></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 t-small muted">{pricingNote}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container-x">
          <SectionHeader id="faq-title" label="FAQ" title="Questions owners ask first" />
          <Faq items={productFaq} />
        </div>
      </section>

      <div id="contact"><ContactBlock /></div>
    </>
  );
}
