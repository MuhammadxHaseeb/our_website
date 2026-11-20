# CLAUDE.md: Project memory

## ▶ Resume here (last updated 2026-11-20)
- **Where we are:** Steps 1–3 done. **Every planned page is built and live on `main`** (home, services + 7 service pages, work + 2 cases, how we work, about, contact with Resend wiring, privacy draft, 404). All branches (`design-2`, `avoid-ai-ish`, `menu-drawer`, `fix/stacking-and-polish`) are merged into `main`; nothing open. Pushes to `main` deploy to Vercel.
- **Next (owner-driven):** (1) owner sends the 4 hero character images (Find / Plan / Build / Run) → trace to SVG and animate in the coral hero (plan: `docs/character-plan.md`); (2) fill placeholders as owner sends facts/assets (list below); (3) owner adds `RESEND_API_KEY` + `CONTACT_TO` in Vercel, then test a real form send (never tested yet); (4) launch decisions (domain, noindex until ready, privacy review).
- **Ask first:** what the owner wants next: characters, filling placeholders, or a launch checklist.
- **Design = Webisoft palette + colour rhythm (branch `design-2`, merged into `main` 2026-11-19).** owner asked for Webisoft's exact palette across the site, then said it was "extremely white" → studied Webisoft per page and copied their **surface rhythm** too: inner-page heroes black (white text, coral CTA, coral emphasis), white sections with `#F0F1F4` cards, black bands (home roll-call, about principles, how-we-work communication, every contact block), coral home hero + footer, coral small section labels (`.kicker`), contact form in a grey panel. All pages a11y 100. Owner reviewed and asked to merge.
- **Characters (owner will start later): full plan in `docs/character-plan.md`.** Owner now wants Hello Monday-style illustrated characters (supersedes "no characters at launch"). Original duo (Client in white shirt + tie, Finder in black blazer + round glasses), black ink, one thin coral "found" circle per scene (white on the coral hero). Hero will cycle 4 real, professional scenes = **Find / Plan / Build / Run** (the first hero set with sleeping/tea/beetle gags was rejected as unprofessional). 7 service scenes approved for `/services`. **Waiting on the owner for the 4 hero images** (prompt in the plan). Tracing tool: `scripts/trace-scenes.py`. Nothing character-related is on the site yet.
- **Mobile menu = Hello Monday drawer (branch `menu-drawer`, merged into `main`):** the mobile menu is now a black full-screen panel whose S-curved edge sweeps in from the right in **900 ms** (close = same sweep reversed; first version used the measured ~0.45 s and the owner said it was "very fast"), links start at 420 ms and rise with a 60 ms stagger. Pure CSS `clip-path` polygons (same 19 points open/closed so they interpolate), no new library. Timings measured from `research/raw/hellomonday/videos/home-mobile.webm` (open ≈0.40 s, close ≈0.45 s; noted as #10b in `research/sites/hellomonday.md`). `prefers-reduced-motion` = 120 ms fade. The sheet now lives outside `<header>` (header's backdrop-filter would clip a fixed child); header tone flips to dark while open. Desktop keeps the mega-menu; Hello Monday's desktop right-edge tab was never recorded, so not copied.
- **unslop polish (branch `avoid-ai-ish`, merged into `main`):** added the **unslop** skill (`.claude/skills/unslop/`, CC BY 4.0, credit kept in SKILL.md/LICENSE/SOURCE.md) and ran it in **polish mode** (site had almost no AI tells: no gradients, glows, emoji, hype copy). Changes: (1) mono labels, tags, form labels and arrow links now **sentence case, tracking 0.01em** (was all caps 0.06em); (2) footer no longer repeats "2 products live / Since 2019" (the contact band above already says it); (3) `/services` chapters drop the repeated "We build" label. Not changed, suggest only: home repeats since 2019 / 2 products in the hero strip and again in the numbers section. Visuals pass skipped (no paid image generation; own art only). To revert the case change: restore `text-transform: uppercase` and `--tr-label: 0.06em`.
- **To run:** start "site" in the Browser pane (`.claude/launch.json`) or `npm --prefix site run dev` → http://localhost:3000 (styleguide: `/styleguide`).

## Project overview
- **Who we are:** **Epox**, software house in Faisalabad, Pakistan, founded 2019. Serves anyone; 7 service areas (see `our-company.md`).
- **How Epox sells:** **outbound**: finds a business's problem and reaches out with the fix. Site's job = confirm credibility fast for prospects arriving from cold outreach, then get a reply / call.
- **Current phase:** **DESIGN & BUILD done; content + characters next.** Step 1 ✅ · Step 2 ✅ · Step 3 ✅ (all pages built and on `main`). Site design: Webisoft palette (design-2).
- **Site:** `site/` (Next.js 16 · React 19 · TS · Tailwind v4 · MDX · GSAP/ScrollTrigger + Lenis lazy). Run: start "site" in the Browser pane (`.claude/launch.json`) or `npm --prefix site run dev` → http://localhost:3000/styleguide. Tokens: `site/src/styles/tokens.css`. See `site/README.md`.
- **Key docs:** `docs/design-brief.md` (direction, tokens, motion, sitemap, pages, components) · `docs/assets-needed.md` (asset checklist) · `docs/preview/index.html` (palettes + fonts in real UI) · `research/overview.md` · `our-company.md`.

## Build status
| Step | Status |
|---|---|
| 1. Design brief, assets list, preview page | ✅ approved |
| 2. Setup: site/ (Next.js + TS + Tailwind + MDX + GSAP/Lenis), tokens, /styleguide | ✅ approved 2026-11-19 (light first + bolder motion, c97c488) · Lighthouse mobile: home 97/100/96/100, styleguide 95/100/96/(SEO 60 = noindex by design) · CLS 0 · no overflow at 360/390px · reduced motion + keyboard menu tested · review shots `docs/review/step2/` |
| 3. Layout → home → services (+1 detail) → work (+2 cases) → about → contact → rest | ✅ **all pages done.** Later: design-2 palette, unslop polish, menu drawer merged · **home ✅ pushed · services ✅ pushed · 6 more service pages ✅ pushed (prod 98–100/100/100/100, shots `docs/review/step3-service-pages/`) · privacy + 404 ✅ pushed (privacy prod 99/100/100/100; 404 returns real 404 + noindex; `docs/review/step3-privacy-404/`) · contact ✅ pushed (prod mobile 100/100/100/100, `docs/review/step3-contact/`) · about ✅ pushed (prod mobile 98–100/100/96/100, `docs/review/step3-about/`) · how-we-work ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-how-we-work/`) · work + 2 cases ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-work/`) · mobile-apps ✅ pushed (prod mobile 99–100/100/96/100, `docs/review/step3-mobile-apps/`)** (services prod Lighthouse mobile 100/100/96/100, LCP 0.8 s, CLS 0; `docs/review/step3-services/`) · home: prod Lighthouse mobile 95–96 / 100 / 96 / 100 (LCP 0.9 s, CLS 0), desktop 100 · no overflow 390/1440 · shots + scroll video `docs/review/step3-home/` |

## Waiting on the owner
- **Hero character set (4 images: Find / Plan / Build / Run)**: prompt in `docs/character-plan.md`; then the 7 service scenes redone without borders (optional).
- **Resend:** create the API key, add `RESEND_API_KEY` + `CONTACT_TO` in Vercel (steps in `site/README.md`), then a test send.
- **Contact details:** email, WhatsApp, booking link (they auto-link once filled in `content.ts`).
- **Case facts:** client descriptors, durations, results, tech per project; what the nutrition app's website does; countries delivered to.
- **How we work facts:** overlap hours, update cadence, tools, code ownership + handover, payment terms, retainer scope, response times, AI data handling, design/infra tools, training offered.
- **Privacy draft review** (retention period, response time, legal name/address, date).
- Liquid-metal logo video from `docs/logo/epox-wordmark-white.svg`: hero is now **coral**, so decide its background (coral, or a black media tile).
- App screenshots/recordings for both cases.
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
| 2026-11-18 | ~~Palette **A · Liquid Silver**~~ (superseded 2026-11-19 by the Webisoft palette, design-2) (neutral scale n-50…n-950, silver n-300 emphasis on dark, steel n-700 on light) | Owner's pick |
| 2026-11-18 | Fonts: **Helvetica Now Display / Text**, self-hosted woff2, swap, preload Display 500; **no serif** | Owner's pick; licensed files git-ignored (public repo) |
| 2026-11-18 | Logo: **"epox"**, Helvetica Now Display Bold, lowercase, −6.5% (`docs/logo/epox-wordmark-*.svg`) | Owner's pick; best shape for liquid metal |
| 2026-11-18 | Mono font: **Geist Mono** instead of Suisse Int'l Mono | Suisse not available; owner: "use what suits best" |
| 2026-11-18 | Font licensing: owner takes responsibility | Owner: "don't worry" |
| 2026-11-18 | **Two font sets + switch**: `free` default (Inter Tight / Inter / Geist Mono), `licensed` optional (Helvetica Now Display / Text, local files only). Switch = `data-fonts` on `<html>`; site setting `NEXT_PUBLIC_FONT_SET` | Public repo can't carry Monotype files; owner wants Helvetica available locally |
| 2026-11-18 | Brand idea **"We find it first."** (+ live-status dot as proof device) | Matches outbound sales model |
| 2026-11-18 | ~~**Dark** home hero~~ (superseded 2026-11-19: light first, then coral with design-2) | Owner's pick |
| 2026-11-18 | **No characters at launch**; `CharacterSlot` kept in layouts | Owner has no art yet |
| 2026-11-18 | Contact form → **Resend** to owner's inbox (wire at /contact) | Owner accepted recommendation |
| 2026-11-19 | ~~**Light first**~~ (superseded by design-2 surface rhythm): every page section is white (`--paper`) or soft band (n-100); cards n-50 on white / white on soft; emphasis steel n-700; dimmed large text n-500. Dark tone kept only for media tiles. Home hero is now **light** (supersedes "Dark home hero"). Components use context tokens `--card / --card-inset / --card-raised / --emph / --dim` | Owner: dark sections hard to read; clients must read and focus easily |
| 2026-11-19 | ~~Dark sections use graphite~~ (superseded same day by light first). Dark sections use **graphite** surfaces, not pure black: section `#1A1B1E`, inset `#1E1F22`, raised panel `#232428`, card `#2C2E33`, hairline `#34373C`; footer matches sections. Pure ink `#0A0A0A` only for text/primary buttons | Owner: black background "way too strong" |
| 2026-11-19 | Free font weights trimmed to those in use (Inter Tight 300/500, Inter 400/500, Geist Mono 500), all preloaded | CLS 0.065 → 0 on mobile Lighthouse |
| 2026-11-19 | Dimmed states use AA-large colours: roll-call inactive n-600 on ink, statement unrevealed n-500 on white | Lighthouse colour-contrast; design rule |
| 2026-11-19 | **Bolder motion**: H3 hero intro (word masks), H13 title rise, H14 media expand, H15 media unveil, L10 magnetic buttons, on top of the spec; same guardrails | Owner: styleguide felt "quite static"; chose "Bolder" |
| 2026-11-19 | **Hosting: Vercel**, connected to GitHub `main` (Root Directory `site`); pushes to main = live site | Owner wants to see changes live |
| 2026-11-19 | **Branch `design-2`: Webisoft palette** (exact values from `research/raw/webisoft/home/styles.json`): coral `#DE5849` (home hero + footer backgrounds, case-card hover fill, live dot, large headline emphasis), coral-dark `#C63524` (small text, hovers), black `#000000` text/buttons, white pages, panels `#F0F1F4`, borders `#E2E3E6`, text greys `#666666` / `#777777` (large dimmed). Webisoft's `#A7A7A7` / `#B3B2B2` grey text fails AA, so only used as decoration. White emphasis on coral only for large text (3.75:1) | Owner: "apply exact color palette" of Webisoft |
| 2026-11-19 | **design-2 surface rhythm** (from measuring Webisoft pages: inner pages 24–38% black, home 46% white / 13% panel grey / 9% coral): black heroes on inner pages, black bands + contact block, grey panels, coral footer, coral kickers (`#C63524` on light, `#DE5849` on black, black on coral). Buttons on black = coral with black text, white outline secondary | Owner: site "extremely white"; match how Webisoft handles colour |
| 2026-11-19 | **unslop skill** added to the repo (`.claude/skills/unslop`); used in polish mode only. Rule for future runs: keep the owner-approved palette, fonts and brand idea; no paid image generation | Owner: avoid AI-looking UI |
| 2026-11-19 | **Characters wanted after all** (supersedes "No characters at launch"): original Client + Finder duo, ink style, thin coral circle = "found" marker only; scenes must be professional (no gags at the client's expense); hero cycles Find / Plan / Build / Run; built as inline SVG + GSAP, no new library; AI images are reference only, traced/redrawn as our SVG | Owner: wants Hello Monday-style personality; first gag-based hero rejected |
| 2026-11-18 | Stack: Next.js App Router + React 19 + TS + Tailwind + MDX + GSAP/ScrollTrigger + Lenis; R3F v9 only for rare WebGL; liquid-metal logo as video, not live shader; no liquid-glass-js | Owner's brief |

## Built so far (site/)
- Tokens (Webisoft palette: coral `#DE5849` / `#C63524`, black, white, panels `#F0F1F4`, borders `#E2E3E6`, greys; type scale, spacing, radius, motion) + font switch (`NEXT_PUBLIC_FONT_SET`). Section contexts: default white, `.soft` grey, `.dark` black, `.coral`.
- Layout: Header (morphing mega-menu on desktop, Hello Monday drawer on mobile, hide-on-scroll, tone follows `data-header-tone`), Footer (coral), MotionProvider (Lenis lazy, reveal observer), page-enter template (skipped on first load for LCP).
- Motion components: RiseText (H3/H13), ExpandOnScroll (H14); unveil (H15) via `data-unveil`, magnetic (L10) via `Button magnetic` / `data-magnetic`; all played from `app/template.tsx` + `MotionProvider`.
- Components: Logo, Button, ArrowLink, Label, Tag/Tags, Live, AssetPlaceholder, Ph/Val, CharacterSlot, SectionHeader, FactTable, ServiceRows (stacking), CaseCard, TrustStrip, EngagementModels, ProcessSteps, Faq, StatsScoreboard/CountUp, RollCall, StatementReveal (GSAP), LiveDemo, ContactBlock, ContactForm (+ /api/contact → Resend).
- Pages: `/privacy` (draft from what the site really does: form → Resend → inbox, Vercel logs, no analytics/cookies; retention, response time, legal name are placeholders). `not-found.tsx` ("Found: a page that doesn't exist.", links home/work/services, noindex). `/contact` (hero, form as main feature + what happens next + booking/email/WhatsApp (auto-link once real) + trust strip; form has consent line → /privacy). `/api/contact`: validates, honeypot + 2.5 s min fill time (bots get fake success), 503 if env missing, 502 on Resend error, reply_to = sender. `/about` (hero, statement "If you're reading this because we reached out…", StatsScoreboard, 4 principles incl. code ownership placeholder, where we are + LocalClock, contact; no team photos). `/how-we-work` (models comparison: table ≥1024px, cards below; process = LiveDemo + 4 steps from content.ts, not the brief's 5; communication: LocalClock (Asia/Karachi + gap to visitor) + 3 items from `communication`; FAQ with NDA/ownership/payment/outside Pakistan). `/work` (hero, case cards with h2, contact; filter chips skipped until there are enough projects). `/work/[slug]` case template: hero + live dot + expanding hero media, fact table, MDX story (`<Chapter n title>`, `<Media asset>`, `<Ph>` from `components/sections/caseMdx.tsx`), tech placeholder, next case, contact. Adding a project = entry in `cases` (content.ts) + MDX file + one line in the `stories` map. `/services/[slug]` template (hero + primary CTA, what we build, feature chapters with full-width visual, related cases, tech, FAQ, contact); all 7 slugs prerendered; features may omit `asset` (text-only chapter) and the tech section hides when empty; related cases only where the case really involved that area. `/services` (hero, 7 story chapters: sticky rail with rolling chapter number + index on desktop, number per chapter on mobile, related case card; ways to work; contact; copy in `serviceStories` in content.ts), `/styleguide` (noindex), `/` home (hero + proof strip, services, work, process demo, built for, numbers, ways to work, statement, contact).
- Prefetch 404s gone now that every linked page exists (best-practices 100). Section counts dropped from SectionHeader; stacking rows on every screen ≥520px tall (owner commit e20bf93); rental case is 001.

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
- If a CSS change doesn't show in dev (old rules still served after restart), stop the server and delete `site/.next/dev` (stale Turbopack cache).
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
