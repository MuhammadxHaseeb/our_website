import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Val } from '@/components/ui/primitives';
import { company, services } from '@/lib/content';

/** Footer: brand-black ground with the foil lockup (brand rule: foil only on Black). */
export function Footer() {
  const year = 2026;
  return (
    <footer className="dark" data-theme="dark">
      <div className="container-x border-t border-line pt-[var(--space-10)] pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <nav aria-label="Services" className="md:col-span-5">
            <p className="t-label muted">Services</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {services.map(s => <li key={s.slug}><Link className="link-quiet" href={`/services/${s.slug}`}>{s.title}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-3">
            <p className="t-label muted">Company</p>
            <ul className="mt-5 grid gap-2">
              {[['/work', 'Work'], ['/how-we-work', 'How we work'], ['/about', 'About'], ['/contact', 'Contact']].map(([h, t]) =>
                <li key={h}><Link className="link-quiet" href={h}>{t}</Link></li>)}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="t-label muted">Contact</p>
            <ul className="mt-5 grid gap-2">
              <li><Val v={company.email} /></li>
              <li><Val v={company.whatsapp} /></li>
              <li className="muted">{company.city}, {company.country} · {company.timezone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-[var(--space-10)] flex flex-col gap-8 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/" aria-label="epox home" className="block"><Logo lockup foil className="h-[64px] w-auto md:h-[88px]" /></Link>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 t-label muted">
            <Link href="/privacy" className="link-quiet">Privacy</Link>
            <span>© {year} <span className="normal-case">epox</span></span>{/* labels are capitals; the name never is */}
          </div>
        </div>
      </div>
    </footer>
  );
}
