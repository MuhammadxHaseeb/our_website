import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, Button, CharacterSlot } from '@/components/ui/primitives';
import { RiseText } from '@/components/motion/RiseText';
import { FoilBars } from '@/components/brand/FoilBars';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

/** 404 (design brief §6): the brand idea ("We find it first") as a joke on ourselves. CharacterSlot keeps room for art later. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="hero min-h-[100svh] pb-[var(--section-y)]">
        <FoilBars className="hero-bars hero-bars--page" />
      <div className="container-x pt-[calc(72px+var(--space-10))]">
        <CharacterSlot label="404" fallback={<p className="t-label muted">404 · Not found</p>} />
        <RiseText as="h1" on="load" id="nf-title" className="t-display mt-8" style={{ maxWidth: '12ch' }}
          parts={[{ t: 'Found:', hl: true }, "a page that doesn't exist."]} />
        <p className="t-lead muted mt-10" style={{ maxWidth: '40ch' }}>
          We usually find problems before our clients do. This one is ours. The link may be old, or the page may have moved.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/" size="lg" arrow>Back to the home page</Button>
          <ArrowLink href="/work">See our work</ArrowLink>
          <ArrowLink href="/services">Services</ArrowLink>
        </div>
        <p className="mt-16 t-small muted">Expected something here? <Link href="/contact" className="link">Tell us</Link> and we&apos;ll fix it.</p>
      </div>
    </section>
  );
}
