# Epox website (`site/`)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MDX · GSAP + ScrollTrigger + Lenis (lazy).
Design source of truth: `../docs/design-brief.md`. Project memory: `../CLAUDE.md`.

## Run
```bash
npm install
npm run dev          # http://localhost:3000  (styleguide: /styleguide)
npm run build && npm start
```

## Font switch
- Default: **free** set (Inter Tight · Inter · Geist Mono), self-hosted by `next/font`.
- Licensed set (Helvetica Now): put the woff2 files in `public/fonts/licensed/` (git-ignored, never pushed), then run with
  `NEXT_PUBLIC_FONT_SET=licensed npm run dev`. Missing files fall back to the free set automatically.

## Where things live
- `src/styles/tokens.css`: **all** design tokens (colour scale, type scale, spacing, radius, motion). Tailwind maps to them in `src/app/globals.css` (`@theme`).
- `src/styles/components.css`: component styles (buttons, tags, header/mega-menu, form, motion states), token-only.
- `src/components/`: `brand/` (Logo) · `ui/primitives.tsx` (Button, Label, Tag, Live, SectionHeader, FactTable, AssetPlaceholder, Ph, CharacterSlot) · `sections/` (ServiceRows, CaseCard, EngagementModels, ProcessSteps, Faq, TrustStrip, StatsScoreboard, RollCall, StatementReveal, LiveDemo, ContactBlock, ContactForm) · `layout/` (Header, Footer) · `motion/` (MotionProvider).
- `src/lib/content.ts`: real content from `our-company.md`; gaps are `[PLACEHOLDER: …]`.
- `src/lib/motion.ts`: lazy GSAP/ScrollTrigger/Lenis loader; smooth scroll only on fine pointers; everything off under reduced motion.
- `src/app/api/contact/route.ts`: contact endpoint (Resend wiring at the contact-page step; until then it answers 501 honestly).
