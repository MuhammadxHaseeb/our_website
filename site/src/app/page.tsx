import { Button } from '@/components/ui/primitives';

// Temporary: the home page is built in Step 3. This keeps the dark hero + brand line in place.
export default function Home() {
  return (
    <section className="dark" data-header-tone="dark">
      <div className="container-x flex min-h-[100svh] flex-col justify-center pt-[72px]">
        <p className="t-label muted">Epox · Faisalabad · Since 2019</p>
        <h1 className="t-display mt-8" style={{ maxWidth: '11ch' }}>We find the problem <span className="emph">before you do.</span></h1>
        <p className="t-lead muted mt-10" style={{ maxWidth: '44ch' }}>The full home page is built in Step 3. Review the design system first.</p>
        <div className="mt-12"><Button href="/styleguide" arrow size="lg">Open the styleguide</Button></div>
      </div>
    </section>
  );
}
