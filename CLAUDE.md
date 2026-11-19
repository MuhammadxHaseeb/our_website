# CLAUDE.md: Project memory

## ▶ Resume here (last updated 2026-11-19)
- **Where we are:** Step 2 approved (c97c488). **Step 3: home `/` built and pushed** (2866da8). **`/services` approved and pushed**. **`/services/mobile-apps` approved and pushed**. **`/work` + 2 case studies approved and pushed**. **`/how-we-work` approved and pushed**. **`/about` approved and pushed**. **`/contact` approved and pushed, Resend wired** (`/api/contact`, env `RESEND_API_KEY`, `CONTACT_TO`, optional `CONTACT_FROM`; setup in `site/README.md`). **`/privacy` (plain-language draft, marked for review) + 404 approved and pushed. Every planned page exists; remaining work: copy for the other 6 service pages (template ready), owner's assets/placeholders, Resend env vars in Vercel. Owner still has to create the Resend key and add the env vars in Vercel. Owner is connecting Vercel.
- **Last owner feedback (2026-11-19):** (1) wants a **light, easy-to-read palette**: white background with cards, no graphite/dark sections → done: whole site is light first (see decisions log), styleguide + temp home updated, a11y 100. (2) Felt the styleguide demo is **"quite static"** and asked whether the site will have animations/effects → answered: motion spec is built and running (Linear-style UI motion + Hello Monday-style scroll moments), but the biggest moments (hero intro, liquid-metal logo, case image hovers, page transitions between real pages, characters) need real pages/assets. Owner chose **bolder** → added hero intro (H3), word-by-word title rise (H13), hero media expand on scroll (H14), media unveil (H15), magnetic buttons (L10); brief §4.2b. Prod Lighthouse mobile unchanged (home 97, styleguide 95, CLS 0, a11y 100). Frames + video: `docs/review/step2-motion/`. Owner approved both ("commit this"). **Ask first: feedback on the home page?** Open question: logo video background must change from ink to white (or stay as a dark media tile) now that the hero is light.
- **Next:** owner reviews home → fix feedback → commit → **services** (+ /services/mobile-apps) → work (+ 2 case studies, MDX) → how-we-work → about → contact (wire **Resend**) → privacy + 404. For each page: say which assets it needs, build desktop + mobile, screenshot with Playwright, record a scroll video, check the Design rules + Lighthouse 90+, show the owner, wait for feedback, commit.
- **To run:** start "site" in the Browser pane (`.claude/launch.json`) or `npm --prefix site run dev` → http://localhost:3000/styleguide (live demo at `#demo`).
- **Still waiting on the owner:** liquid-metal logo video (from `docs/logo/epox-wordmark-white.svg`), app screenshots/recordings, contact email/WhatsApp/booking link, client descriptors, durations, results.

## Project overview
- **Who we are:** **Epox**, software house in Faisalabad, Pakistan, founded 2019. Serves anyone; 7 service areas (see `our-company.md`).
- **How Epox sells:** **outbound**: finds a business's problem and reaches out with the fix. Site's job = confirm credibility fast for prospects arriving from cold outreach, then get a reply / call.
- **Current phase:** **DESIGN & BUILD.** Step 1 ✅ · Step 2 ✅ · **Step 3 pages: home, services, mobile apps, work + 2 cases built, how-we-work, about, contact, privacy + 404 built: all planned pages done** (6 more service detail pages need copy only).
- **Site:** `site/` (Next.js 16 · React 19 · TS · Tailwind v4 · MDX · GSAP/ScrollTrigger + Lenis lazy). Run: start "site" in the Browser pane (`.claude/launch.json`) or `npm --prefix site run dev` → http://localhost:3000/styleguide. Tokens: `site/src/styles/tokens.css`. See `site/README.md`.
- **Key docs:** `docs/design-brief.md` (direction, tokens, motion, sitemap, pages, components) · `docs/assets-needed.md` (asset checklist) · `docs/preview/index.html` (palettes + fonts in real UI) · `research/overview.md` · `our-company.md`.

## Build status
| Step | Status |
|---|---|
| 1. Design brief, assets list, preview page | ✅ approved |
| 2. Setup: site/ (Next.js + TS + Tailwind + MDX + GSAP/Lenis), tokens, /styleguide | ✅ approved 2026-11-19 (light first + bolder motion, c97c488) · Lighthouse mobile: home 97/100/96/100, styleguide 95/100/96/(SEO 60 = noindex by design) · CLS 0 · no overflow at 360/390px · reduced motion + keyboard menu tested · review shots `docs/review/step2/` |
| 3. Layout → home → services (+1 detail) → work (+2 cases) → about → contact → rest | ⏳ **home ✅ pushed · services ✅ pushed · privacy + 404 ✅ pushed (privacy prod 99/100/100/100; 404 returns real 404 + noindex; `docs/review/step3-privacy-404/`) · contact ✅ pushed (prod mobile 100/100/100/100, `docs/review/step3-contact/`) · about ✅ pushed (prod mobile 98–100/100/96/100, `docs/review/step3-about/`) · how-we-work ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-how-we-work/`) · work + 2 cases ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-work/`) · mobile-apps ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-mobile-apps/`)** (services prod Lighthouse mobile 100/100/96/100, LCP 0.8 s, CLS 0; `docs/review/step3-services/`) · home: prod Lighthouse mobile 95–96 / 100 / 96 / 100 (LCP 0.9 s, CLS 0), desktop 100 · no overflow 390/1440 · shots + scroll video `docs/review/step3-home/` |

## Waiting on the owner
- Liquid-metal logo video, made from `docs/logo/epox-wordmark-white.svg`.
- Assets later: app screenshots/recordings for both cases.
- Fonts: Helvetica Now files stay **local only** (owner's decision). Site uses the **free set by default** with a font switch (see decisions log).

## Decisions log
| Date | Decision | Reason |
|---|---|---|
| 2026-11-18 | Case studies anonymized, data-driven template (one MDX per project) | NDA-friendly; easy to add projects |
| 2026-11-18 | No team photos/founder for now; general contact (email + form) | Owner's call; revisit later |
| 2026-11-18 | Site shows 7 service areas + "also" line; full catalogue internal only | Prospect just needs "they can help me" |
| 2026-11-18 | No prices; 3 models (fixed project, dedicated developers, monthly retainer) → "Let's talk" | Pricing discussed on calls |
| 2026-11-18 | No hiring/careers section | Owner's call |
| 2026-11-18 | Black + white base + one 3rd colour chosen by owner in real UI | Premium through restraint |
| 2026-11-18 | Motion: Linear style for UI/info, Hello Monday style for signature moments; reduced-motion + Lighthouse 90+ guardrails | Owner's brief (phase 2) |
| 2026-11-18 | Own art only; marked placeholders `[ASSET: …]`, `[PLACEHOLDER: …]` until owner sends | Never use reference art or stock filler |
| 2026-11-18 | Palette **A · Liquid Silver** (neutral scale n-50…n-950, silver n-300 emphasis on dark, steel n-700 on light) | Owner's pick |
| 2026-11-18 | Fonts: **Helvetica Now Display / Text**, self-hosted woff2, swap, preload Display 500; **no serif** | Owner's pick; licensed files git-ignored (public repo) |
| 2026-11-18 | Logo: **"epox"**, Helvetica Now Display Bold, lowercase, −6.5% (`docs/logo/epox-wordmark-*.svg`) | Owner's pick; best shape for liquid metal |
| 2026-11-18 | Mono font: **Geist Mono** instead of Suisse Int'l Mono | Suisse not available; owner: "use what suits best" |
| 2026-11-18 | Font licensing: owner takes responsibility | Owner: "don't worry" |
| 2026-11-18 | **Two font sets + switch**: `free` default (Inter Tight / Inter / Geist Mono), `licensed` optional (Helvetica Now Display / Text, local files only). Switch = `data-fonts` on `<html>`; site setting `NEXT_PUBLIC_FONT_SET` | Public repo can't carry Monotype files; owner wants Helvetica available locally |
| 2026-11-18 | Brand idea **"We find it first."** (+ live-status dot as proof device) | Matches outbound sales model |
| 2026-11-18 | ~~**Dark** home hero~~ (superseded 2026-11-19: light first) | Owner's pick |
| 2026-11-18 | **No characters at launch**; `CharacterSlot` kept in layouts | Owner has no art yet |
| 2026-11-18 | Contact form → **Resend** to owner's inbox (wire at /contact) | Owner accepted recommendation |
| 2026-11-19 | **Light first**: every page section is white (`--paper`) or soft band (n-100); cards n-50 on white / white on soft; emphasis steel n-700; dimmed large text n-500. Dark tone kept only for media tiles. Home hero is now **light** (supersedes "Dark home hero"). Components use context tokens `--card / --card-inset / --card-raised / --emph / --dim` | Owner: dark sections hard to read; clients must read and focus easily |
| 2026-11-19 | ~~Dark sections use graphite~~ (superseded same day by light first). Dark sections use **graphite** surfaces, not pure black: section `#1A1B1E`, inset `#1E1F22`, raised panel `#232428`, card `#2C2E33`, hairline `#34373C`; footer matches sections. Pure ink `#0A0A0A` only for text/primary buttons | Owner: black background "way too strong" |
| 2026-11-19 | Free font weights trimmed to those in use (Inter Tight 300/500, Inter 400/500, Geist Mono 500), all preloaded | CLS 0.065 → 0 on mobile Lighthouse |
| 2026-11-19 | Dimmed states use AA-large colours: roll-call inactive n-600 on ink, statement unrevealed n-500 on white | Lighthouse colour-contrast; design rule |
| 2026-11-19 | **Bolder motion**: H3 hero intro (word masks), H13 title rise, H14 media expand, H15 media unveil, L10 magnetic buttons, on top of the spec; same guardrails | Owner: styleguide felt "quite static"; chose "Bolder" |
| 2026-11-19 | **Hosting: Vercel**, connected to GitHub `main` (Root Directory `site`); pushes to main = live site | Owner wants to see changes live |
| 2026-11-18 | Stack: Next.js App Router + React 19 + TS + Tailwind + MDX + GSAP/ScrollTrigger + Lenis; R3F v9 only for rare WebGL; liquid-metal logo as video, not live shader; no liquid-glass-js | Owner's brief |

## Built so far (site/)
- Tokens (palette A scale, type scale, spacing, radius, motion) + font switch (`NEXT_PUBLIC_FONT_SET`).
- Layout: Header (morphing mega-menu, mobile sheet, hide-on-scroll, tone follows `data-header-tone`; all light now), Footer (soft band), MotionProvider (Lenis lazy, reveal observer), page-enter template (skipped on first load for LCP).
- Motion components: RiseText (H3/H13), ExpandOnScroll (H14); unveil (H15) via `data-unveil`, magnetic (L10) via `Button magnetic` / `data-magnetic`; all played from `app/template.tsx` + `MotionProvider`.
- Components: Logo, Button, ArrowLink, Label, Tag/Tags, Live, AssetPlaceholder, Ph/Val, CharacterSlot, SectionHeader, FactTable, ServiceRows (stacking), CaseCard, TrustStrip, EngagementModels, ProcessSteps, Faq, StatsScoreboard/CountUp, RollCall, StatementReveal (GSAP), LiveDemo, ContactBlock, ContactForm (+ /api/contact → Resend).
- Pages: `/privacy` (draft from what the site really does: form → Resend → inbox, Vercel logs, no analytics/cookies; retention, response time, legal name are placeholders). `not-found.tsx` ("Found: a page that doesn't exist.", links home/work/services, noindex). `/contact` (hero, form as main feature + what happens next + booking/email/WhatsApp (auto-link once real) + trust strip; form has consent line → /privacy). `/api/contact`: validates, honeypot + 2.5 s min fill time (bots get fake success), 503 if env missing, 502 on Resend error, reply_to = sender. `/about` (hero, statement "If you're reading this because we reached out…", StatsScoreboard, 4 principles incl. code ownership placeholder, where we are + LocalClock, contact; no team photos). `/how-we-work` (models comparison: table ≥1024px, cards below; process = LiveDemo + 4 steps from content.ts, not the brief's 5; communication: LocalClock (Asia/Karachi + gap to visitor) + 3 items from `communication`; FAQ with NDA/ownership/payment/outside Pakistan). `/work` (hero, case cards with h2, contact; filter chips skipped until there are enough projects). `/work/[slug]` case template: hero + live dot + expanding hero media, fact table, MDX story (`<Chapter n title>`, `<Media asset>`, `<Ph>` from `components/sections/caseMdx.tsx`), tech placeholder, next case, contact. Adding a project = entry in `cases` (content.ts) + MDX file + one line in the `stories` map. `/services/[slug]` template (hero + primary CTA, what we build, feature chapters with full-width visual, related cases, tech, FAQ, contact); only slugs in `serviceDetails` are prerendered, others show not-found (soft 404, noindex). `/services` (hero, 7 story chapters: sticky rail with rolling chapter number + index on desktop, number per chapter on mobile, related case card; ways to work; contact; copy in `serviceStories` in content.ts), `/styleguide` (noindex), `/` home (hero + proof strip, services, work, process demo, built for, numbers, ways to work, statement, contact).
- Known: Link prefetch 404s (best-practices 96) until the other Step 3 pages exist. Section counts dropped from SectionHeader; stacking rows on every screen ≥520px tall (owner commit e20bf93); rental case is 001.

## Open placeholders & missing assets
- Content: contact email/WhatsApp/socials; case platforms per project, durations, results; client descriptors; logo; founder/contact (later). Full list: design brief §8 "Content gaps".
- Assets: all of `docs/assets-needed.md` (nothing received yet; Helvetica Now fonts received). Use `[ASSET: …]` placeholders.
- **Licensed fonts never go into git** (`assets/*.zip`, `**/fonts/licensed/` are ignored). Check `git status` before every commit.

## Design rules (check every component/page against these before showing the owner)
- No filler badges, labels or decorations that don't carry information.
- Drop redundant labels (don't label what's already obvious).
- No random italics; italics only for real emphasis or editorial serif moments.
- Mono font only for labels, numbers, tags and code-style elements, never body text.
- Use the design tokens and components everywhere; no one-off colors, sizes or spacing.
- Make the main feature of each section clearly the largest thing in it.
- Group related things with spacing, not boxes and lines.
- Headlines must be specific to us ("Apps that settle rental disputes before they start"), never generic ("Innovative solutions for your business").
- One primary CTA per section, visually dominant; everything else secondary.
- Use the chosen palette's third color for emphasis only, never as decoration.
- One icon set, one stroke width, one size scale.
- No embellishments: no gradients, glows or shadows unless the design brief calls for them.
- Nested corners: inner radius = outer radius − padding.
- Text contrast passes WCAG AA (4.5:1 body, 3:1 large text); no light-gray body text.
- Headlines wrap cleanly: no single-word last lines (`text-wrap: balance`).
- Align optically: adjust icons, quotes and round shapes until they look aligned, not just pixel-aligned.
- Tabular numbers for stats, counters, tables and anything that changes.
- Loading and success/error states for the contact form and any lazy-loaded media or WebGL.
- Animate useful feedback (hover, press, submit, menu open) before decorative motion.

## Research summary (details in research/)
- Sites: Webisoft (corporate look), Linear (motion), Hello Monday (motion + creative); all captured, live-scanned, analyzed. Notes: `research/sites/*.md`; comparison: `research/overview.md`.
- Adopt: Webisoft structure (section headers, numbered services, trust strip, fact-table case studies); Linear motion budget + live HTML process demos; Hello Monday personality (brand idea, characters, roll-call, scoreboard, story chapters).
- Gaps we fill: engagement-model comparison, visible weekly process, timezone/communication proof, results with numbers.
- Competitor research (Services & pricing): still waiting for links. Suggested: arbisoft.com, 10pearls.com, devsinc.com, tkxel.com, netguru.com, simform.com.
- Other suggested references (not researched until approved): anduril.com, stripe.com, epam.com, lusion.co, activetheory.net, locomotive.ca, basicagency.com, instrument.com.

## Notes & tools
- `scripts/capture.js` (capture, `--text-only`, `--slices [--only a,b]`), `scripts/record.js` (videos + motion facts + events.json). In Git Bash use full URLs or `export MSYS_NO_PATHCONV=1`.
- Next 16 here uses `cacheComponents`: `export const dynamicParams` is not allowed; dynamic routes use `generateStaticParams` + `notFound()` + `export const instant = false`.
- Claude in Chrome viewport stuck at 1536×639; phone-width checks via Playwright.
- Hello Monday full-page PNGs show grey boxes; use `sections/*-slice.png`.

## Working rules
- Update CLAUDE.md whenever a step finishes, we learn something important, or the user tells us something, without being asked: phase, decisions log, what's built, open placeholders and missing assets.
- Detailed notes live in research/ and docs/; company info in our-company.md. Read them when relevant instead of copying them in here.
- research/raw/ is reference material. We take inspiration; we never copy their text, images, illustrations, logos or code, and never recreate their pages one-to-one.
- Read only on reference sites: no form submits, sign-ups, chats or logins.
- Use real content from our-company.md; mark gaps `[PLACEHOLDER: …]` and missing art `[ASSET: …]`.
- Commit after each finished page with a clear message. **Deploy = Vercel only** (owner approved 2026-11-19): Vercel project linked to the GitHub repo, Root Directory `site`; every push to `main` goes live, other branches get preview links. Don't deploy anywhere else.
- Stop and wait for owner approval at the end of each step (brief → setup/styleguide → each page).
- **Git: no AI contributor.** Commits and PRs go out under the user's name alone: no `Co-Authored-By` lines, no "Generated with Claude Code" or other AI attribution. Remote: https://github.com/MuhammadxHaseeb/our_website
