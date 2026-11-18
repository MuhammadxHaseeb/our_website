# Hello Monday / DEPT® (hellomonday.com)

**Focus:** Animations & motion **+** Creative presentation (two deep dives) **+** full service pass (agency).
**Who:** creative studio (part of DEPT®), offices New York, Copenhagen, Aarhus, Amsterdam. Clients: Google, YouTube, Strava, Meta, T-Mobile, LEGO, Samsung, Netflix…
**Files:** `research/raw/hellomonday/` (pages: home, work, services, product, about, stories + case studies aurorasolar, collective-health, dream-with-ai, gemini, the-web-can-do-what, epos-branding-meets-ecommerce, wove). Live notes: `raw/hellomonday/live-notes.md`. Videos: `raw/hellomonday/videos/` (home, services, work, product, work-aurorasolar × desktop/mobile).
**Capture note:** this site lazy-loads images only when in view inside a custom (Lenis) scroller, so **`desktop-full.png` shows grey placeholder boxes for project images. Use `sections/NN-slice.png` (viewport slices, images loaded) and the videos.**

---

## Focus deep dive 1: Animations & motion

**Stack:** GSAP 2 (TweenMax/TweenLite), Lenis smooth scroll (body `overflow:hidden`), one WebGL canvas for image distortion, sprite/image-sequence character animations, video.js; AJAX page transitions. **No `prefers-reduced-motion` support.**

| # | Effect | Trigger | Timing / feel | Cost |
|---|---|---|---|---|
| 1 | **Preloader:** black screen wiped away by a white liquid-edged blob | load | ~1.5s, playful | low (SVG) |
| 2 | **Hero word carousel** "We make digital (and magical)… Experiences / Products / Branding": word fades grey→black; **hand-drawn characters change pose/scene per word** (frame animation) | timer ~3s | warm, witty, signature | low (images) |
| 3 | **Liquid wave edge on project images** + bullet "•" slides in before title, tags darken | hover | wobbles then settles ~0.6–0.8s after leave | medium (WebGL) |
| 4 | **Parallax middle column** in the 3-column work grid (`col-2` translateY on scroll) + scroll-linked opacity on titles/tags | scroll | subtle, editorial | low |
| 5 | **Lenis smooth scroll** across the site | scroll | soft inertia; makes everything feel "floaty" | low–medium |
| 6 | **Page transitions:** page fades to white, next page fades in; case studies hold white for 3–5s on cold load | click | elegant but slow | medium |
| 7 | **Services chapters fade in/out** around screen centre (only the active chapter is full opacity) with **sticky illustration** on the left | scroll | calm, focused reading | low |
| 8 | **/product client roll-call:** giant serif client names turn grey→white at screen centre, revealing project count, one-line story and an image | scroll | bold, confident | low |
| 9 | **Footer hover label swap** ("Want to say hi?" → "Copy e-mail") | hover | tiny delight + useful | trivial |
| 10 | **Right-edge black wavy tab with ≡** opens the menu (visible in `services/desktop-full.png`, top right) | click | quirky, on-brand | low |
| 11 | Header hides on scroll down; "N days until Monday" countdown widget | scroll / live | personality | trivial |

Videos: `home-desktop.webm` (0:00–0:03 preloader, 0:03–0:15 word carousel, then grid hovers), `work-desktop.webm` (grid + hover waves), `services-desktop.webm` (chapter fades + sticky illustrations), `product-desktop.webm` (roll-call), `work-aurorasolar-desktop.webm` (case study modules). Timestamps per hover in `videos/*.events.json`.

**Motion level: heavy**, but every effect has a job (personality, focus, delight). Weak points: slow first paint on case studies, WebGL hover cost, no reduced-motion.

### Ideas worth adapting (motion)
1. **Character carousel in the hero** (see Creative #1): cheap and memorable; replace WebGL with sprite/Lottie.
2. **Image hover = mask reveal + bullet slide-in** (CSS `clip-path` wave or scale-in mask instead of WebGL).
3. **Chapter focus on scroll** (active section 100% opacity, others ~20%) for long services pages.
4. Skip: long preloader, slow page transitions. **Add reduced-motion support** (they don't).

---

## Focus deep dive 2: Creative presentation

What makes it memorable: **a cast of illustrated characters + a joke in the name + editorial serif typography + client names as the hero of the work page.** They present services and work as *stories*, not lists.

1. **A brand idea that runs through everything: "make Mondays better."** Countdown "5 days until Monday" in the header; staff are "Mondayteers"; about page has a numbered **"Code of Honor"** (01 Be nice … 08 Team up) presented as "the source code for Hello Monday". Copy is self-aware and funny ("we asked [design and technology] and they're totally okay with it"; awards section titled **"We Got Shiny Things"**: "We're supposed to say we're humbled, but we're actually proud").
2. **Recurring illustrated characters.** The same two hand-drawn people (tall man in overalls, woman in a striped dress) appear in the hero (different scene per word), as sticky illustrations beside each service, and in the footer (a person working late by a moonlit window). Black ink line style on white. Gives a whole agency a face without stock photos. (`home/sections/01-slice.png`, `services/sections/`)
3. **Services as three chapters with "We make (digital)…" kickers**: Products / Experiences / Branding. Each = huge serif title + one rich, opinionated paragraph + "View [service]" link + 2 project cards. No bullet lists of deliverables, no icons. (`services/desktop-full.png`)
4. **Awards as a scoreboard:** two-column list of award names with big serif numbers (FWA 121, Awwwards 58, Creative Circle 48, Webby 14, Cannes Lions 8, D&AD 5, Eurobest 2). Turns trust signals into a design element.
5. **/product = productized offer told as a story:** "A booster rocket for digital product teams" over a team video; origin story (helped Google improve Hangouts → Meet, 10 years ago); "napkin sketch → Minimum Loveable Product"; then the **client roll-call** (Google 24 projects, YouTube 11, LEGO 2…), one testimonial (Deutsche Telekom SVP Design), and a **named human contact** (Managing Partner & Head of Products, with personal email). (`product/sections/`, `videos/product-desktop.webm`)
6. **Case studies feel like the client's microsite:** hero in client's brand colour + the client's own animated mark; strip "Type · Client · Deliverables"; then chapters named after brand elements (Brandmark, Solar Grid, Colors / Logo Concept, Photography concept) with big media and short captions. Ends with "Related projects" ("A case a day keeps the doctor away"). **No metrics or results numbers**: it's about craft. (`work-aurorasolar/sections/`, `work-collective-health/sections/`)
7. **Work grid with filter** (Products / Experiences / Branding) and tags; 50+ projects; staggered 3 columns.
8. **Stories (blog)** cards with category + read time ("15 min. read"): mix of AI, culture ("Why eating together is important"), and build write-ups ("How we built the Google Cloud WebGL experience").

### Ideas worth adapting (creative)
1. **A brand idea we can play with everywhere** (theirs: Monday). For a Pakistani software house: something like "we ship while you sleep" (timezone advantage), turned into a live widget ("It's 3:10 AM in Lahore. Your sprint is still moving.").
2. **Illustrated team characters** (dev, PM, designer) with one scene per service. Huge personality, cheap to produce once, reusable in hero, services, 404, footer, social.
3. **Client/industry roll-call** for our clients or industries: big type, count of projects, one-line outcome, image.
4. **Awards/numbers scoreboard** in serif numerals (projects shipped, years, countries, Clutch reviews).
5. **Productized offer page with a named human** (like /product): e.g. a "Dedicated team" or "MVP in 8 weeks" page with origin story + roll-call + one contact person's photo and email.

---

## Design & style
- **Vibe:** editorial, warm and witty: black ink on white, big serif, hand-drawn characters, colourful project imagery.
- **Palette:** text `#000000`; muted/inactive text `#c6c5c5` and `#868686`; backgrounds `#ffffff`, warm off-white `#f8f6f5` (footer, placeholders), light greys `#f0f0f0`/`#f4f4f4` (case modules); dark sections `#191919` / `#202020` (/product, "booster rocket" block). No fixed brand accent: colour comes from client work (e.g. Aurora `#fec351` yellow).
- **Fonts:** **Clarendon BT Light** (300, slab-ish serif) for display: 80px home H1, 128–150px on /product, ~50px case titles, project titles ~22px. **NB International Pro** (regular/light) for body at a large **22px**, small 12–14px for tags/meta.
- **Homepage section by section** (`home/sections/`):
  1. Header: stacked logo "HELLO / MONDAY / DEPT." top-left; countdown widget top-right; black wavy menu tab on right edge.
  2. Hero: centred illustration + "We make digital (and magical)…" + giant cycling serif word + pulsing dot.
  3. Work grid: 3 staggered columns, ~45 projects (image, serif title, grey underlined tags), "View all projects".
  4. Dark "A booster rocket for digital product teams" block with team video + one line + "Discover more" → /product.
  5. Footer (`#f8f6f5`): illustration, 4 contact Q&As (collaborate / say hi / join / learn), offices with addresses + phones, "View on maps", privacy.
- **Navigation:** minimal; menu behind the right-edge tab (Work, Services, About, Stories, Product). "Jump ahead" anchor lists at the top of long pages (Services: Products / Experiences / Branding / Shiny Things; Product: Our Work / Quotes / Ready to Collaborate?).
- **Imagery:** client work (bold colour, 3D, product shots), team video, B&W ink illustrations; no stock, no icons.
- **Effects & animations:** heavy; see deep dive 1 and `live-notes.md`.
- **Standout components:** word carousel + illustration hero; staggered parallax grid with liquid hover; services chapters with sticky illustration; awards scoreboard; client roll-call; case-study info strip (Type/Client/Deliverables); footer Q&A contact with copy-email.
- **Mobile:** one column; hero illustration + word stays; grid → single column cards; menu tab → burger; long pages very tall (`work/mobile-full.png` 11MB) (`videos/*-mobile.webm`).

## Services & content
- **Hero / value prop (paraphrased):** a studio that makes digital (and magical) products, experiences and brands, aiming to make Mondays better.
- **Tone:** playful, warm, confident, self-aware humour; long flowing paragraphs; human ("make new friends").
- **Services:** 3 pillars: **Products** (innovation sprints, UX sprints, prototyping, user testing, ML/AI), **Experiences** (film, 360, VR/AR, 3D, campaigns), **Branding** (strategy → logo, type, colour, illustration, motion, sound, tone of voice). Plus productized **/product** offer for digital product teams (MLP, product reinvention). Tags on work: Products, Experiences, Branding, Platform, E-commerce.
- **Industries:** not framed by industry; framed by famous clients (tech, media, sport, retail, healthcare).
- **Tech stack advertised:** none explicitly (implied: WebGL, ML, AR/VR in stories).
- **Process:** not shown as steps. Only hinted ("agile before they called it agile", structured ideation → prototyping → user-testing).
- **Case study format:** brand-colour hero → Type/Client/Deliverables strip → context paragraph → chapters per design element with big media → related projects. **No problem/solution/results structure, no metrics.**
- **Trust signals:** award scoreboard (FWA 121, Awwwards 58, Creative Circle 48, Webby 14, Cannes Lions 8, D&AD 5, Eurobest 2); big-name client roll-call with project counts; one testimonial; 4 offices; part of DEPT®. No Clutch, no certifications, no team size.

## Pricing & engagement models
- **Prices shown:** Not listed.
- **Models:** Not listed (only "collaborate with startups and product departments"; "napkin sketch → Minimum Loveable Product").

## Conversion
- **CTAs:** soft. Footer email links (newbusiness@ / hello@ / product@), "Apply here" for jobs/interns, "Discover more" to /product, "View all projects". On /product: "Ready to Collaborate?" + named partner's email.
- **No contact form, no booking tool, no chat widget visible** (HubSpot/Intercom scripts exist). No lead magnet.

## Technical
- Custom build (`/build/js/main-*.js`), GSAP 2, Lenis, WebGL, video.js, Plausible + Cloudflare. Heavy pages (case studies 4–9MB screenshots, white screen for 3–5s on first load). No reduced-motion. `/about` sometimes failed to load in Chrome (error page once), fine in Playwright.

## Key screenshots & videos
- `home/sections/01-slice.png`: hero illustration + cycling word.
- `work/sections/03-slice.png`: staggered grid with a hover wave + bullet caught mid-effect.
- `services/desktop-full.png`: chapters + sticky illustrations + "Shiny Things" award scoreboard + menu tab.
- `product/sections/`: dark /product page and client roll-call.
- `about/sections/`: Code of Honor 01–08, Mondayteers.
- `work-aurorasolar/sections/`: brand-colour case study chapters.
- `videos/home-desktop.webm`: preloader + word carousel + grid hovers.
- `videos/product-desktop.webm`: roll-call scroll.
- `videos/services-desktop.webm`: chapter fades.
