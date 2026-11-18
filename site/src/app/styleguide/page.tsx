import type { Metadata } from 'next';
import { Logo } from '@/components/brand/Logo';
import { ArrowLink, AssetPlaceholder, Button, CharacterSlot, FactTable, Label, Live, Ph, SectionHeader, Tag, Tags } from '@/components/ui/primitives';
import { CaseCard, EngagementModels, Faq, ProcessSteps, ServiceRows, TrustStrip } from '@/components/sections/blocks';
import { RollCall, StatementReveal, StatsScoreboard } from '@/components/sections/interactive';
import { LiveDemo } from '@/components/sections/LiveDemo';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { ContactForm } from '@/components/sections/ContactForm';
import { alsoServices, cases, industries, services, stats } from '@/lib/content';
import { contrast } from '@/lib/contrast';
import { RiseText } from '@/components/motion/RiseText';
import { ExpandOnScroll } from '@/components/motion/ExpandOnScroll';

export const metadata: Metadata = { title: 'Styleguide', robots: { index: false, follow: false } };

const SCALE: [string, string][] = [['50', '#F7F8F9'], ['100', '#F3F4F5'], ['200', '#E2E4E7'], ['300', '#C4C8CE'], ['400', '#A3A8AF'], ['500', '#80868E'], ['600', '#5C6168'], ['700', '#4B5058'], ['800', '#2A2D31'], ['900', '#141516'], ['950', '#0A0A0A']];
// light-first: white page (paper), soft-grey bands (surface n-100), cards n-50 on white / white on soft
const PAIRS: [string, string, string][] = [
  ['Body text on white', '#0A0A0A', '#FFFFFF'], ['Body text on soft band', '#0A0A0A', '#F3F4F5'], ['Body text on card', '#0A0A0A', '#F7F8F9'],
  ['Muted text on white', '#5C6168', '#FFFFFF'], ['Muted text on soft band', '#5C6168', '#F3F4F5'], ['Muted text on card', '#5C6168', '#F7F8F9'],
  ['Steel emphasis on white', '#4B5058', '#FFFFFF'], ['Steel emphasis on soft band', '#4B5058', '#F3F4F5'],
  ['Dimmed large text on white', '#80868E', '#FFFFFF'], ['Dimmed large text on soft band', '#80868E', '#F3F4F5'],
  ['Button text on ink', '#FFFFFF', '#0A0A0A'], ['Button text on steel (hover)', '#FFFFFF', '#4B5058'], ['Error on white', '#B3261E', '#FFFFFF'],
];
const TYPE = [
  ['display', 't-display', 'Found it.'], ['h1', 't-h1', 'A nutrition app with a real nutritionist inside'], ['h2', 't-h2', 'You\'ll always know what\'s happening'],
  ['h3', 't-h3', 'Business software'], ['rollcall', 't-rollcall', 'PropTech'], ['lead', 't-lead', 'We design, build and launch software, then stay on to keep it running and growing.'],
  ['body', 't-body', 'Tenants photograph the property at move-in into a tamper-proof record, then both sides compare it side by side at move-out. No more arguments over the deposit.'],
  ['small', 't-small', 'NDA available on request.'], ['label', 't-label', '/ Services · S/01 · Case 002 · Since 2019'],
];
const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192];
const MOTION = [
  ['L1', 'Button / link hover', '100ms ease-out-quad', 'Buttons, links below', 'Linear'],
  ['L2', 'Mega-menu open + morph', '180ms / 240ms ease-out-quint', 'Header: hover Services, then Company', 'Linear'],
  ['L3', 'Header hide on scroll / frosted', '240ms ease-out-quint', 'Scroll this page', 'Linear'],
  ['L4', 'Section entrance (fade + rise 16px, stagger 60ms)', '800ms ease-out-quint', 'Every section here', 'Linear'],
  ['L5', 'Live process demo', '6–10s loop, steps 600ms', '§ Live demo', 'Linear'],
  ['L6', 'Accordion', '240ms ease-out-quint', '§ FAQ', 'Linear'],
  ['L7', 'Count-up numbers', '1200ms ease-out-expo', '§ Scoreboard', 'Linear'],
  ['L8', 'Form states', '100–240ms', '§ Contact', 'Linear'],
  ['L10', 'Magnetic buttons (lean toward the cursor)', '500ms ease-out-quint spring-back', 'Hero buttons (mouse only)', 'Bolder pass'],
  ['H1', 'Lenis smooth scroll', 'lerp 0.1, mouse/trackpad only', 'Whole page (desktop)', 'Hello Monday'],
  ['H2', 'Page transition (enter)', '600ms ease-out-quint', 'Navigate via header', 'Hello Monday'],
  ['H3', 'Hero intro: headline words rise out of masks, then lead + buttons', '1000ms ease-out-quint, 70ms per word', 'Reload this page', 'Hello Monday'],
  ['H13', 'Section titles: words rise one by one', '1000ms, 60ms per word, once', 'Every section title', 'Bolder pass'],
  ['H14', 'Hero media opens to full width while scrolling', 'scrubbed (clip-path)', 'Hero logo placeholder (≥768px)', 'Bolder pass'],
  ['H15', 'Media wipes up + settles from zoom', '1100ms / 1400ms ease-out-quint', '§ Case cards', 'Bolder pass'],
  ['H6', 'Statement reveal (GSAP ScrollTrigger scrub)', 'scrubbed', '§ Statement', 'Hello Monday'],
  ['H7', 'Stacking service rows (sticky)', 'CSS sticky', '§ Service rows (tablet and up)', 'Webisoft'],
  ['H8', 'Roll-call lights at screen centre', '400ms', '§ Roll-call', 'Hello Monday'],
  ['H9', 'Case media hover + bullet slide-in', '600ms / 240ms', '§ Case cards', 'Hello Monday'],
] as const;

function Block({ id, label, title, children, tone, count }: { id: string; label: string; title: string; children: React.ReactNode; tone?: 'dark' | 'soft'; count?: string }) {
  return (
    <section id={id} className={`section ${tone === 'dark' ? 'dark' : tone === 'soft' ? 'soft' : ''}`} data-header-tone={tone === 'dark' ? 'dark' : undefined}>
      <div className="container-x" data-reveal>
        <SectionHeader label={label} title={title} count={count} />
        {children}
      </div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <>
      {/* hero: light, as on the home page */}
      <section>
        <div className="container-x pt-[calc(72px+var(--space-10))] pb-[var(--space-10)]">
          <p className="t-label muted hero-after" style={{ '--d': '0ms' } as React.CSSProperties}>Epox · Styleguide · Step 2</p>
          <RiseText as="h1" on="load" className="t-display mt-8" style={{ maxWidth: '11ch' }} parts={['We find the problem', { t: 'before you do.', emph: true }]} />
          <p className="t-lead muted mt-10 hero-after" style={{ maxWidth: '44ch', '--d': '650ms' } as React.CSSProperties}>Every token, component and motion effect in one place, built from <code className="t-label">docs/design-brief.md</code>. Review this before pages are built.</p>
          <div className="mt-12 flex flex-wrap gap-3 hero-after" style={{ '--d': '800ms' } as React.CSSProperties}><Button href="#contact" arrow size="lg" magnetic>Let&apos;s talk</Button><Button href="#cases" variant="secondary" size="lg" magnetic>See our work</Button></div>
          <ExpandOnScroll className="mt-[var(--space-9)]"><AssetPlaceholder name="liquid-metal logo loop · 16:9 · WebM + MP4 + poster" ratio="16 / 9" /></ExpandOnScroll>
        </div>
      </section>

      <Block id="colour" label="Colour" title="Liquid Silver, light first" count="11">
        <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {SCALE.map(([k, v]) => (
            <li key={k} className="flex aspect-[1/1.2] flex-col justify-between rounded-[var(--r-inner)] p-3 t-label" style={{ background: v, color: contrast(v, '#FFFFFF') > 4.5 ? '#FFFFFF' : '#0A0A0A', boxShadow: k === '50' ? 'inset 0 0 0 1px var(--line)' : undefined }}>
              <span>n-{k}</span><span>{v}</span>
            </li>
          ))}
        </ol>
        <div className="mt-12 overflow-x-auto"><table className="w-full min-w-[520px] t-small">
          <caption className="sr-only">Contrast ratios</caption>
          <thead><tr className="text-left"><th className="t-label muted pb-3 font-medium">Pair</th><th className="t-label muted pb-3 font-medium">Sample</th><th className="t-label muted pb-3 text-right font-medium">Ratio</th></tr></thead>
          <tbody>
            {PAIRS.map(([n, f, b]) => { const r = contrast(f, b); return (
              <tr key={n} className="border-t border-line"><td className="py-3">{n}</td>
                <td className="py-3"><span className="rounded-[var(--r-tag)] px-3 py-1.5" style={{ background: b, color: f, boxShadow: 'inset 0 0 0 1px var(--line)' }}>Aa 123</span></td>
                <td className="py-3 text-right t-num">{r.toFixed(2)}:1 · {r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'fail'}</td></tr>); })}
          </tbody>
        </table></div>
      </Block>

      <Block id="type" label="Type" title="Type scale" count="09">
        <dl>
          {TYPE.map(([k, cls, sample]) => (
            <div key={k} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline">
              <dt className="t-label muted md:col-span-3">{k} · .{cls}</dt>
              <dd className={`${cls} md:col-span-9`} style={{ maxWidth: cls === 't-body' ? '64ch' : undefined }}>{sample}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 t-small muted">Active font set is set by <code className="t-label">NEXT_PUBLIC_FONT_SET</code> (free: Inter Tight · Inter · Geist Mono / licensed: Helvetica Now, local only).</p>
      </Block>

      <Block id="space" label="Space" title="Spacing, grid and radius" tone="soft" count="11">
        <ol className="grid gap-3">
          {SPACE.map(s => (
            <li key={s} className="grid grid-cols-[5rem_1fr] items-center gap-4"><span className="t-label muted t-num">{s}px</span><span className="h-3 rounded-full bg-ink" style={{ width: s }} /></li>
          ))}
        </ol>
        <div className="mt-16 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`h-24 rounded-[var(--r-tag)] bg-n-200 ${i > 3 ? 'hidden md:block' : ''}`} />)}
        </div>
        <p className="mt-4 t-small muted">12 columns · max 1440px · gutter 24px (16px mobile) · margin clamp(20px, 4vw, 64px)</p>
        <div className="mt-16 flex flex-wrap gap-6">
          <div className="rounded-[var(--r-card)] bg-paper p-[var(--r-card-pad)]"><div className="grid h-32 w-48 place-items-center rounded-[var(--r-inner)] bg-n-200 t-label">card 16 / inner 8</div></div>
          <span className="tag self-center">tag 6</span><span className="btn self-center">pill</span>
          <div className="w-56 self-center"><input className="input" placeholder="input" aria-label="Input example" /></div>
        </div>
      </Block>

      <Block id="logo" label="Logo" title="The epox wordmark">
        <div className="grid gap-[var(--gutter)] md:grid-cols-2">
          <div className="grid aspect-[16/9] place-items-center rounded-[var(--r-card)] bg-surface"><Logo className="h-16 w-auto md:h-24" /></div>
          <div className="dark grid aspect-[16/9] place-items-center rounded-[var(--r-card)]"><Logo className="h-16 w-auto md:h-24" /></div>
        </div>
        <p className="mt-4 t-small muted">Helvetica Now Display Bold, outlined, −6.5%. Colour follows <code className="t-label">currentColor</code>. Minimum height 18px. The dark tile is only for media (logo video, photos); pages are light.</p>
      </Block>

      <Block id="buttons" label="Actions" title="Buttons and links">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-wrap items-center gap-3"><Button arrow>Let&apos;s talk</Button><Button variant="secondary">See our work</Button><Button size="lg" arrow>Let&apos;s talk</Button><Button disabled>Disabled</Button></div>
          <div className="flex flex-wrap items-center gap-3 rounded-[var(--r-card)] bg-card p-8"><Button arrow>Let&apos;s talk</Button><Button variant="secondary">See our work</Button></div>
          <div className="flex flex-wrap items-center gap-8"><ArrowLink href="#buttons">Read the case</ArrowLink><a href="#buttons" className="link">Inline text link</a></div>
        </div>
      </Block>

      <Block id="atoms" label="Atoms" title="Labels, tags, status and placeholders" tone="soft">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="grid content-start gap-6">
            <Label>/ Services</Label>
            <div className="flex flex-wrap gap-2"><Tag>iOS</Tag><Tag>Android</Tag><Tag>Cross-platform</Tag></div>
            <Live>Live · run by Epox</Live>
            <p>Copy gap inline: <Ph>[PLACEHOLDER: result metric]</Ph></p>
          </div>
          <div className="grid gap-4">
            <AssetPlaceholder name="case 001 hero · 16:10" />
            <p className="t-small muted">CharacterSlot (no art yet) renders its fallback:</p>
            <CharacterSlot label="service-02" fallback={<span className="t-rollcall muted">02</span>} />
          </div>
        </div>
      </Block>

      <Block id="facts" label="Facts" title="Fact table">
        <FactTable cols={4} facts={[{ k: 'Client', v: <Ph>[PLACEHOLDER: client descriptor]</Ph> }, { k: 'Sector', v: 'PropTech · Europe' }, { k: 'Platforms', v: 'iOS · Android · Web' }, { k: 'Status', v: <Live>Live</Live> }]} />
      </Block>

      <section id="services" className="section">
        <div className="container-x">
          <SectionHeader label="Services" title="Seven ways we can help" count="07" action={<ArrowLink href="/services">All services</ArrowLink>} />
          <ServiceRows items={services} stacking />
          <p className="mt-8 t-small muted">Also: {alsoServices.join(' · ')}</p>
        </div>
      </section>

      <Block id="cases" label="Work" title="Two products, both still live" tone="soft" count="02">
        <div className="grid gap-[var(--gutter)]">{cases.map(c => <CaseCard key={c.slug} c={c} />)}</div>
      </Block>

      <Block id="demo" label="Process" title="You'll always know what's happening">
        <LiveDemo />
        <div className="mt-[var(--space-9)]"><ProcessSteps /></div>
      </Block>

      <section id="rollcall" className="soft section">
        <div className="container-x">
          <SectionHeader label="Built for" title="Industries we've shipped in" count="02" />
          <RollCall items={industries} />
        </div>
      </section>

      <Block id="stats" label="Numbers" title="The short version" count="04">
        <StatsScoreboard stats={stats} />
      </Block>

      <Block id="models" label="Ways to work" title="Three ways to work with us" tone="soft" count="03">
        <EngagementModels />
      </Block>

      <section id="statement" className="section">
        <div className="container-x"><Label>/ Statement</Label><div className="mt-10"><StatementReveal text="Most of our clients didn't come looking for us. We found a problem in their product, showed them the fix, and stayed to keep it working." /></div></div>
      </section>

      <Block id="faq" label="FAQ" title="Questions we hear first" count="03">
        <Faq items={[
          { q: 'Do you work under NDA?', a: 'Yes. We can sign yours or send ours before you share anything.' },
          { q: 'Who owns the code?', a: <>You do. <Ph>[PLACEHOLDER: confirm ownership & handover terms]</Ph></> },
          { q: 'How do you price?', a: 'Fixed project, dedicated developers or a monthly retainer. We agree on the model and the number on a short call.' },
        ]} />
      </Block>

      <Block id="trust" label="Trust" title="Trust strip" tone="soft">
        <TrustStrip />
      </Block>

      <ContactBlock />

      <Block id="form-states" label="Form states" title="Success and error states" tone="soft">
        <div className="grid gap-16 md:grid-cols-2"><ContactForm forceState="success" /><ContactForm forceState="error" /></div>
      </Block>

      <Block id="motion" label="Motion" title="Motion spec, live on this page" count={String(MOTION.length).padStart(2, '0')}>
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] t-small">
          <caption className="sr-only">Motion effects</caption>
          <thead><tr className="text-left">{['#', 'Effect', 'Timing', 'See it', 'Style'].map(h => <th key={h} className="t-label muted pb-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>{MOTION.map(m => <tr key={m[0]} className="border-t border-line align-top">{m.map((c, i) => <td key={i} className={`py-3 pr-4 ${i === 0 ? 't-label' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table></div>
        <p className="mt-6 t-small muted">All effects switch off with prefers-reduced-motion. Lenis runs only for mouse/trackpad; touch keeps native scroll.</p>
      </Block>
    </>
  );
}
