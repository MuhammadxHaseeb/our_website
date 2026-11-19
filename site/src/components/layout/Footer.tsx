import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Live, Val } from '@/components/ui/primitives';
import { company, services } from '@/lib/content';

export function Footer() {
  const year = 2026;
  return (
    <footer className="coral">
      <div className="container-x border-t border-line pt-[var(--space-10)] pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <nav aria-label="Services" className="md:col-span-5">
            <p className="t-label muted">Services</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services.map(s => <li key={s.slug}><Link className="link-quiet" href={`/services/${s.slug}`}>{s.title}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-3">
            <p className="t-label muted">Company</p>
            <ul className="mt-4 grid gap-2">
              {[['/work', 'Work'], ['/how-we-work', 'How we work'], ['/about', 'About'], ['/contact', 'Contact']].map(([h, t]) =>
                <li key={h}><Link className="link-quiet" href={h}>{t}</Link></li>)}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="t-label muted">Contact</p>
            <ul className="mt-4 grid gap-2">
              <li><Val v={company.email} /></li>
              <li><Val v={company.whatsapp} /></li>
              <li className="muted">{company.city}, {company.country} · {company.timezone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-[var(--space-10)] flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Epox home"><Logo className="h-[26px] w-auto" /></Link>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 t-label muted">
            <Live>2 products live</Live>
            <span>Since {company.founded}</span>
            <Link href="/privacy" className="link-quiet">Privacy</Link>
            <span>© {year} Epox</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
