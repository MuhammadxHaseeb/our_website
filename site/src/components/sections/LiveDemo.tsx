'use client';
import { Check, CircleDashed, Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Live HTML demo of how we work (L5, Linear style): a "FOUND:" note appears, the ticket moves
 * To do → In progress → Done, CI checks turn green, and the weekly update types itself.
 * Runs only while visible. Reduced motion: final state. Mobile: same frames, simpler layout.
 */
const STEPS = 6; // 0 found · 1 ticket→in progress · 2 checks running · 3 checks green · 4 done · 5 update sent
const UPDATE = 'Week 6 update: checkout fix is live. Mobile conversion back to normal. Next: faster image loading.';

export function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(STEPS - 1);
  const [typed, setTyped] = useState(UPDATE.length);

  useEffect(() => {
    const el = ref.current; if (!el || prefersReducedMotion()) return;
    let timer = 0; let typer = 0; let visible = false; let s = 0;
    const run = () => {
      if (!visible) return;
      setStep(s);
      if (s === 5) {
        let n = 0; setTyped(0);
        typer = window.setInterval(() => { n += 2; setTyped(Math.min(n, UPDATE.length)); if (n >= UPDATE.length) window.clearInterval(typer); }, 28);
      }
      const wait = s === 5 ? 4200 : 1300;
      s = (s + 1) % STEPS;
      timer = window.setTimeout(run, wait);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      window.clearTimeout(timer); window.clearInterval(typer);
      if (visible) { s = 0; setTyped(0); run(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); window.clearInterval(typer); };
  }, []);

  const col = step >= 4 ? 2 : step >= 1 ? 1 : 0;
  const checks = [{ name: 'Unit tests', at: 3 }, { name: 'Build iOS + Android', at: 3 }, { name: 'Preview deploy', at: 3 }];

  return (
    <div ref={ref} className="demo grid gap-[var(--gutter)] lg:grid-cols-[1.4fr_1fr]" aria-label="Example of a week working with Epox: a problem is found, fixed, tested and reported" role="img">
      {/* board */}
      <div className="rounded-[var(--r-card)] border border-line bg-card p-[var(--r-card-pad)]">
        <div className="flex items-center justify-between px-3 py-2"><span className="t-label muted">Project board</span><span className="t-label muted">Sprint 6</span></div>
        <div className="grid grid-cols-3 gap-[var(--r-card-pad)]">
          {['To do', 'In progress', 'Done'].map((c, i) => (
            <div key={c} className="min-h-[220px] rounded-[var(--r-inner)] bg-card-inset p-3">
              <p className="t-label muted">{c}</p>
              {i === col && (
                <div key={col} className="demo-card mt-3 rounded-[6px] border border-line bg-card-raised p-3">
                  <p className="t-label" style={{ color: 'var(--muted)' }}>EPX-214</p>
                  <p className="t-small mt-1.5">Checkout fails on mobile Safari</p>
                  {step === 0 && <p className="t-label mt-3" style={{ color: 'var(--accent-on-light)' }}>Found: before your users did</p>}
                  {step >= 4 && <p className="t-label mt-3 flex items-center gap-1.5" style={{ color: 'var(--accent-on-light)' }}><Check className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />Shipped</p>}
                </div>
              )}
              {i !== col && <div className="mt-3 h-[58px] rounded-[6px] border border-dashed border-line opacity-40" />}
            </div>
          ))}
        </div>
      </div>
      {/* checks + update */}
      <div className="grid gap-[var(--gutter)]">
        <div className="rounded-[var(--r-card)] border border-line bg-card p-5">
          <p className="t-label muted">Checks</p>
          <ul className="mt-4 grid gap-3">
            {checks.map(c => {
              const state = step >= c.at ? 'pass' : step >= 2 ? 'run' : 'wait';
              return (
                <li key={c.name} className="t-small flex items-center gap-3">
                  {state === 'pass' ? <Check className="h-4 w-4" style={{ color: 'var(--accent-on-light)' }} strokeWidth={1.5} aria-hidden />
                    : state === 'run' ? <Loader className="demo-spin h-4 w-4 muted" strokeWidth={1.5} aria-hidden />
                    : <CircleDashed className="h-4 w-4 muted" strokeWidth={1.5} aria-hidden />}
                  <span className={state === 'pass' ? '' : 'muted'}>{c.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-[var(--r-card)] border border-line bg-card p-5">
          <p className="t-label muted">Weekly update · Friday</p>
          <p className="t-small mt-4 min-h-[4.5em]">
            {step >= 5 ? UPDATE.slice(0, typed) : ''}
            {step >= 5 && typed < UPDATE.length && <span className="demo-caret" aria-hidden />}
          </p>
        </div>
      </div>
    </div>
  );
}
