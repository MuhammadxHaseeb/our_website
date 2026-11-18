# CLAUDE.md: Project memory

## Project overview
- **Who we are:** **Epox**, software house in Faisalabad, Pakistan, founded 2019. Serves anyone; 7 service areas (see `our-company.md`).
- **How Epox sells:** **outbound**: finds a business's problem and reaches out with the fix. Site's job = confirm credibility fast for prospects arriving from cold outreach, then get a reply / call.
- **Current phase:** **DESIGN & BUILD.** Step 1 (design brief + asset list + palette/font preview) **done, waiting for owner approval** → Step 2 setup (`site/`, Next.js) → Step 3 pages.
- **Key docs:** `docs/design-brief.md` (direction, tokens, motion, sitemap, pages, components) · `docs/assets-needed.md` (asset checklist) · `docs/preview/index.html` (palettes + fonts in real UI) · `research/overview.md` · `our-company.md`.

## Build status
| Step | Status |
|---|---|
| 1. Design brief, assets list, preview page | ✅ decisions made; wordmark pick pending |
| 2. Setup: site/ (Next.js + TS + Tailwind + MDX + GSAP/Lenis), tokens, /styleguide | ⏳ next, after owner OK |
| 3. Layout → home → services (+1 detail) → work (+2 cases) → about → contact → rest | ⏳ |

## Waiting on the owner
- **Pick wordmark** 1 / 2 / 3 (`docs/logo/`), then owner makes the liquid-metal video from it.
- **Suisse Int'l Mono** woff2 files (Regular + Medium): not in the zips; Geist Mono stands in.
- **Confirm web licences** for Helvetica Now + Suisse Int'l before launch (files are git-ignored; repo is public).
- Assets later: app screenshots/recordings for both cases.

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
| 2026-11-18 | Fonts: **Helvetica Now Display / Text + Suisse Int'l Mono** (labels, numbers, buttons), self-hosted woff2, swap, preload Display 500; **no serif** | Owner's pick; licensed files git-ignored (public repo) |
| 2026-11-18 | Brand idea **"We find it first."** (+ live-status dot as proof device) | Matches outbound sales model |
| 2026-11-18 | **Dark** home hero | Owner's pick |
| 2026-11-18 | **No characters at launch**; `CharacterSlot` kept in layouts | Owner has no art yet |
| 2026-11-18 | Contact form → **Resend** to owner's inbox (wire at /contact) | Owner accepted recommendation |
| 2026-11-18 | Stack: Next.js App Router + React 19 + TS + Tailwind + MDX + GSAP/ScrollTrigger + Lenis; R3F v9 only for rare WebGL; liquid-metal logo as video, not live shader; no liquid-glass-js | Owner's brief |

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
- Claude in Chrome viewport stuck at 1536×639; phone-width checks via Playwright.
- Hello Monday full-page PNGs show grey boxes; use `sections/*-slice.png`.

## Working rules
- Update CLAUDE.md whenever a step finishes, we learn something important, or the user tells us something, without being asked: phase, decisions log, what's built, open placeholders and missing assets.
- Detailed notes live in research/ and docs/; company info in our-company.md. Read them when relevant instead of copying them in here.
- research/raw/ is reference material. We take inspiration; we never copy their text, images, illustrations, logos or code, and never recreate their pages one-to-one.
- Read only on reference sites: no form submits, sign-ups, chats or logins.
- Use real content from our-company.md; mark gaps `[PLACEHOLDER: …]` and missing art `[ASSET: …]`.
- Commit after each finished page with a clear message. **Don't deploy anywhere until the owner says so.**
- Stop and wait for owner approval at the end of each step (brief → setup/styleguide → each page).
- **Git: no AI contributor.** Commits and PRs go out under the user's name alone: no `Co-Authored-By` lines, no "Generated with Claude Code" or other AI attribution. Remote: https://github.com/MuhammadxHaseeb/our_website
