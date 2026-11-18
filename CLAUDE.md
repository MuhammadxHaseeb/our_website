# CLAUDE.md: Project memory

## Project overview
- **Who we are:** a software house in Pakistan (name, city, target clients, services: TODO, see `our-company.md`).
- **Current phase:** RESEARCH ONLY → next: company interview. No page design or website code until the user says so.
- **End goal:** design and build our own company website using this research plus `our-company.md`.

## Research status
| # | Site | Focus | Captured | Live-scanned | Analyzed | Notes |
|---|------|-------|----------|--------------|----------|-------|
| 1 | webisoft.com | Corporate look (+ full service pass) | ✅ 15 pages | ✅ Chrome + 6 videos | ✅ | [notes](research/sites/webisoft.md) |
| 2 | linear.app | Animations & motion | ✅ 5 pages | ✅ Chrome + 6 videos | ✅ | [notes](research/sites/linear.md) |
| 3 | hellomonday.com | Animations & motion + Creative presentation (+ full service pass) | ✅ 13 pages | ✅ Chrome + 10 videos | ✅ | [notes](research/sites/hellomonday.md) |
| 4 | (competitors) | Services & pricing | waiting for links | | | |

Overview and comparison: [research/overview.md](research/overview.md)

## Key insights so far
### Corporate look
- Webisoft signals scale with **Swiss-editorial discipline, not blue-corporate**: 1 accent (#de5849), B&W photos, grey panels, mono labels, dotted rules, strict grid.
- **Number everything** (S/001, "(11) services", "007 stories", "/005"). Counting the offer reads as scale.
- Trust stack beside every form: since 2016 · Clutch 4.9/23 · SOC 2 · HIPAA · AWS partner · GPTW · offices · "90% senior" · "NDA on request".
- **Anonymized case studies** (client descriptor + Sector/Engagement/Status table) solve NDA problems.
### Animations & motion
- Linear: premium with **zero animation libraries**: CSS keyframes, 100ms hovers, 180ms menus, 700–1000ms ease-out entrances, full reduced-motion.
- Best motion **demonstrates the product/process** (scripted HTML UI demos), not decoration.
- Hello Monday: GSAP + Lenis + WebGL for personality; heavy, slow first load, no reduced-motion. Borrow ideas, not weight.
### Creative presentation
- One brand idea everywhere ("make Mondays better"), recurring **illustrated characters**, services as 3 story chapters.
- **Client roll-call** (giant names light up + project count), **award scoreboard**, productized offer page with a named human.
### Services & pricing
- Neither agency shows prices; Webisoft names models as services (staff augmentation, nearshore, fractional CTO, team extension, full build).
- Gap: nobody shows engagement-model comparison, "from" prices, visible weekly process, or hard metrics.

## Ideas for our site
- Webisoft-style section header system + numbered services → sub-services + industries & tech-stack directories.
- Case studies: fact table + Challenge / What we built / Result **with metrics**; anonymized where under NDA.
- Linear-style **live HTML demos of how we work** (board → Done, CI green, weekly Slack update).
- Motion spec: CSS-first, 100–200ms UI, 700–800ms easeOutQuint entrances, reduced-motion on.
- Small personality layer: one brand idea (e.g. timezone "we ship while you sleep" widget) + illustrated team characters.
- Engagement models table with "starting from" ranges (gap in market).
- Stacking numbered service rows; client/industry roll-call; numbers scoreboard; trust strip near forms.
- Real B&W team photos with roles; named contact person on CTA.

## Notes & to-dos
- Gotcha: in Git Bash, `--pages /advisory` gets path-mangled. Use full URLs or `export MSYS_NO_PATHCONV=1`.
- Claude in Chrome viewport stuck at 1536×639 (resize ignored); phone-width motion comes from Playwright videos.
- Hello Monday lazy-loads images in its scroller → full-page PNGs show grey boxes; use `sections/*-slice.png` (`capture.js --slices`).
- Tools: `scripts/capture.js` (capture, `--text-only`, `--slices [--only a,b]`), `scripts/record.js` (videos + motion facts + events.json timestamps). Frames: `videos/frames/`.
- [x] Capture · [x] Live scan + videos · [x] Site notes + overview
- [ ] Company interview to fill `our-company.md` (in progress)
- [ ] Add competitor sites when the user sends them (Services & pricing focus)

## Open questions
- Company name, city, target clients and services were placeholders in the brief → interview.
- **Direct competitors** for Services & pricing: please send links. Suggestions to approve: arbisoft.com, 10pearls.com, devsinc.com, tkxel.com (Pakistan); netguru.com, simform.com (big offshore houses with visible engagement models).
- **Suggested new sites (not researched until approved):**
  - Corporate look: anduril.com (Awwwards technology; defence-grade corporate restraint), stripe.com (enterprise trust at scale), epam.com (global IT services corporate).
  - Animations & motion: lusion.co, activetheory.net, locomotive.ca (the studio that built Webisoft's site).
  - Creative presentation: basicagency.com (BASIC/DEPT®), instrument.com, bulletproof.com (Awwwards agency list).
  - Note: Awwwards agency/technology lists (2026-11) are dominated by small studio portfolios; picks above are the most relevant to a software house.

## Working rules
- Update CLAUDE.md whenever a step finishes, we learn something important, or the user tells us something, without being asked.
- Detailed notes live in research/ and company info in our-company.md. Read them when relevant instead of copying them in here.
- When the user gives new links later (with a focus), run the same capture → live scan → analyze steps and update research/overview.md.
- research/raw/ is private reference material. We take inspiration from other sites; we never copy their text, images, logos or code onto ours.
- Read only on reference sites: no form submits, sign-ups, chats or logins. Paraphrase; don't paste large chunks of copy.
- **Git: no AI contributor.** Commits and PRs go out under the user's name alone: no `Co-Authored-By` lines, no "Generated with Claude Code" or other AI attribution in commit messages, PR titles or descriptions. Remote: https://github.com/MuhammadxHaseeb/our_website
