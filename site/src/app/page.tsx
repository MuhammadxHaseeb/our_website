import { Button } from '@/components/ui/primitives';
import { RiseText } from '@/components/motion/RiseText';

// Temporary: the home page is built in Step 3. This keeps the hero + brand line in place.
export default function Home() {
  return (
    <section>
      <div className="container-x flex min-h-[100svh] flex-col justify-center pt-[72px]">
        <p className="t-label muted hero-after" style={{ '--d': '0ms' } as React.CSSProperties}>Epox · Faisalabad · Since 2019</p>
        <RiseText as="h1" on="load" className="t-display mt-8" style={{ maxWidth: '11ch' }} parts={['We find the problem', { t: 'before you do.', emph: true }]} />
        <p className="t-lead muted mt-10 hero-after" style={{ maxWidth: '44ch', '--d': '650ms' } as React.CSSProperties}>The full home page is built in Step 3. Review the design system first.</p>
        <div className="mt-12 hero-after" style={{ '--d': '800ms' } as React.CSSProperties}><Button href="/styleguide" arrow size="lg" magnetic>Open the styleguide</Button></div>
      </div>
    </section>
  );
}
