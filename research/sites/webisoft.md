# Webisoft (webisoft.com)

**Focus:** Corporate look (+ full service pass, as an agency/software house)
**Who:** Montreal-based custom software firm, "in business since 2016", ~North American senior team. Site designed by **Locomotive®** (the studio behind Locomotive Scroll).
**Files:** `research/raw/webisoft/` (pages: home, advisory, artificial-intelligence-ai, product-development, enterprise-software, blockchain, expertise, industries, case-studies + 3 case studies, about, contact, articles). Live notes: `raw/webisoft/live-notes.md`. Videos: `raw/webisoft/videos/`.

---

## Focus deep dive: Corporate look (how it signals scale and trust)

**Big surprise:** it does *not* use the usual "blue SaaS corporate" look. It signals trust through **editorial Swiss discipline**: a strict grid, one accent colour, mono "spec sheet" labels, numbered everything, and very calm copy. It looks like an engineering lab's documentation more than a sales site.

### 1. Restraint & colour discipline
- Exactly **one accent: coral red `#de5849`** (hover/dark `#c63524`), used for the hero, footer, CTAs on dark, red numbers on case cards and the card hover fill. Everything else is black `#000`, white, and a cool grey ramp (`#f0f1f4` panels, `#e2e3e6`, `#b4b5b8`, `#666` secondary text).
- Imagery is **black & white** only (team/office photos, VR person). The only colour in photos comes from the 3D chrome logo. This keeps the page "quiet" so the red reads as brand.
- Screens: `home/sections/01-cheader.png` (coral hero), `home/sections/05-…png` (grey card on white), `case-studies/desktop-full.png`.

### 2. Grid & spacing
- 4-column editorial grid on 1440: column 1 = mono kicker (e.g. "/ SERVICES"), columns 2–3 = headline/content, column 4 = counter ("/005") and "VIEW ALL →" link. **Every section starts with the same header row**: `/ LABEL ……… Headline ……… /00N`. This repetition is the main "big company" signal.
- Rows separated by **1px dotted rules** (not solid lines, not cards with shadows). Generous vertical space (120–200px between sections).
- Panels: light grey `#f0f1f4` rounded-4px blocks with content pinned to corners (number top-left, CTA bottom).

### 3. Typography
- **Helvetica Now Display** (500) for headlines, **Helvetica Now Text** (400) for body, **Suisse Intl Mono** (400, uppercase, 10–12px) for labels, numbers, buttons, nav. Three fonts, one family feel.
- Scale: 200px footer wordmark (clamp 200/1440 vw) · ~80px hero/split headlines · 42px H2 · 32px H3 · 24px · 19px lead · 16px body · 12px mono labels. Tight line-height (1.0 on headlines), no letter-spacing tricks.
- Editorial details: first-line indent on paragraphs; headlines set in sentence case; huge split headline "WE → DRIVE / YOUR SYSTEMS / FWRD" across columns.

### 4. Numbering system everywhere ("spec sheet" voice)
- Services S/001–S/005; client types I/001–I/003; sub-services PRDCT 001–011, AI 001–010; benefits B001–B004; how-we-work H001–H004; FAQ 001–005; case studies 001/007 and "002 / 007"; sections "01 / THE CHALLENGE, 02 / WHAT WE BUILT, 03 / THE RESULT".
- Counters next to headings: "(11)", "/005", "011 SECTORS", "007 STORIES". **Counting your offer is a scale signal**: it says "we have a catalogue".

### 5. How they show trust
| Signal | Where / how |
|---|---|
| Years in business | "In business since 2016" + "EST 2016" laurel badge (footer + industries "Certified and verified" row) |
| Compliance | **AICPA SOC 2 Type II** badge, **HIPAA compliant** badge; "Compliance built in from day one" as a benefit; "NDA available on request" under the form |
| Partners / awards | AWS Partner (Select Tier), **Great Place To Work Certified (Canada, Sep 2026–Sep 2027)** |
| Reviews | **Clutch 4.9/5 · 23 reviews** widget in footer |
| Team quality | "over 90% of our developers are senior engineers"; "in-house, local talent in your timezone, no outsourcing"; "one accountable team, one point of contact" |
| Offices | Footer tabs CANADA / UNITED STATES with full Montreal address + phone; FRANÇAIS link (bilingual = established local company); /montreal SEO page |
| Clients | No logo wall! Anonymous client descriptors ("A Canadian federal public-safety agency", "A 13-dealership automotive group"); one named testimonial (Sr. Producer, Amber Studio) |
| Longevity | Case study status lines: "Since April 2022, active", "built and run with the same team since 2018" |
| Stats strip (About) | 6 big numbers in a row: **2016** transforming since · **90%+** senior team · **11** industries · **4.9/5** Clutch · **5** service lines · **2** offices (Montreal + Miami) |
| Principles (About) | "Responsible by default" R001–R004: Security & compliance (SOC 2, HIPAA, audit trails) · Responsible AI ("AI drafts, people decide") · **Confidential by default (never publish client names)** · Built to hand over (docs, admin tools, no lock-in) |
| Leadership (About) | 4 cards L001–L004 with **initials avatars (no photos)**, name, title, 2–3 line bio with concrete numbers ("15+ blockchain projects, 50+ smart contracts"), tenure ("SINCE 2016") and an accountability line ("YOUR SENIOR ESCALATION": can make commitments on the spot) |
| Own products | TenderOS, CoinKit, Portal, Email Triage ("proven products that get you to results faster"), so they read as a builder, not only a vendor |

### 6. Enterprise tone of voice
- Short, factual, outcome-first sentences; zero exclamation marks; plain promises ("We will tell you plainly if we are not the right fit", "Someone who has worked in your sector, not a sales queue").
- Talks about **operations, compliance, integrations, maintenance**: the enterprise buyer's fears, not "cool tech".
- Brand codename in mono ("WBSFT®", "MTL (CAN)", "/2026", "ENGINEERING_") makes it feel like a product/lab.

### 7. Motion supports seriousness
- Lenis + GSAP 3, but effects are "precise" not playful: text scramble on mono labels, grey→black character reveal on paragraphs, sticky stacking service rows, chrome 3D "W" turning on scroll, wavy stripe hero. See `live-notes.md`.

### Ideas worth adapting for our site (corporate)
1. **Section header row system** (`/ LABEL · Headline · /00N · VIEW ALL →`) + numbered items: instantly makes a small company look organised and scaled. Cheap.
2. **One accent colour + B&W photography + grey panels.** We pick one ownable accent; everything else neutral. Our team photos in B&W will look premium even if shot on a phone.
3. **Trust strip in the footer and near the form:** years in business, Clutch rating, PSEB/P@SHA registration, ISO/SOC/GDPR practices, AWS/Google partner badges, "NDA available on request".
4. **Anonymized case studies with status lines** (see Services). Ideal if our clients are under NDA.
5. **Mono "spec" labels** (city code, year, discipline) as brand texture, e.g. `LHE (PK) / 2026 / ENGINEERING_`.

---

## Design & style

- **Vibe:** Swiss-editorial engineering lab: bold coral + black + grey, strict grid, mono spec labels; calm and expensive.
- **Palette:** primary/accent `#de5849` (coral red), hover `#c63524`; text `#000000`; secondary text `#666666` / `#aaaaaa`; backgrounds `#ffffff`, panels `#f0f1f4`, borders `#e2e3e6`; dark sections `#000000`.
- **Fonts:** Helvetica Now Display 500 (headings), Helvetica Now Text 400 (body 16px, lead 19px), Suisse Intl Mono 400 uppercase (labels 10–12px, buttons). Easing tokens: power2/power3-out `cubic-bezier(.165,.84,.44,1)`.
- **Homepage, section by section** (`home/sections/`):
  1. **Header/hero (coral):** ID-badge logo card top-left (logo, "WBSFT® / DEVELOPMENT LABS", burger). Centre H1 "AN ELITE TEAM OF SOFTWARE ENGINEERS". Black "LET'S TALK →" top-right. Mono meta row; animated stripe field; giant WEBISOFT® wordmark; "/ EXPLORE +".
  2. **Who we are (grey, 3D):** chrome extruded "W" rotating on scroll; scrambling service list; headline "A North American team of specialists with profound technical expertise." + outline CONTACT US.
  3. **Services:** header row "/ SERVICES · Tech stacks for a rapidly evolving world: · /005"; 5 sticky-stacking rows (number, title, 2-line description, EXPLORE, grey icon panel with black geometric glyph).
  4. **We engage with (/003):** slider of client types: Startups / Enterprises / Web3 companies, each with B&W photo, description and a tailored CTA ("Build with us", "Shape what's next", "Take your product further").
  5. **Tabs: Expertise / Values / Methodology:** giant counter number left; 3 numbered claims right (EDGETECH, IN-HOUSE, EXPERIENCED).
  6. **Testimonial:** full-bleed dark B&W office photo with parallax; huge white quote; name + title + company in mono.
  7. **SEO block:** "Custom software development" paragraph with dotted-underline internal links.
  8. **Closing CTA:** giant split headline "WE → DRIVE YOUR SYSTEMS FWRD" + "Digital architectures for an ever-shifting world." + LET'S TALK.
  9. **3D W again** (full-bleed chrome close-up) then **coral footer:** wordmark, FRANÇAIS, badge row, Clutch widget, Services / Company / Insights / Social columns, office tabs, address, phone, legal, "Designed by Locomotive®".
- **Navigation:** no visible top menu. The logo card **expands downward into a left-side panel** (light grey, ~33% width) while the page behind **blurs and tints dark** (`videos/frames/home-desktop-25s.jpg`, video 17–31s). Items numbered 01–05 in mono, active/hover in coral; coral "CONTACT US / LET'S TALK →" bar pinned at the bottom of the panel. Everything lives in the logo card's burger: full menu with 01 Services (expands S01–S05), 02 Industries, 03 Products, 04 About, 05 Contact + "Contact us / Let's talk". Persistent "LET'S TALK" button top-right. Header card sticks and shrinks on scroll.
- **Imagery:** B&W documentary photos (office, VR), 3D chrome logo renders, black geometric service glyphs on grey; no stock illustrations, no icons-in-circles.
- **Effects & animations:** moderate→heavy; Lenis + GSAP 3 + canvas 3D; best effects: stacking service rows, scramble text, char colour reveal, card hover coral fill. Details: `raw/webisoft/live-notes.md`.
- **Standout components:** stacking numbered service list; industry directory with filter chips and counts (ALL 011 / REGULATED 003 …); tech-stack directory with 16 filter chips and 43 numbered entries (`expertise/`); anonymized case-study cards; contact block with 3-step "what happens next" + form + "Book a call".
- **Mobile:** single column; logo card becomes compact top bar; hero stripes + wordmark scale; 3D section shrinks; services become plain stacked list; client-type slider becomes horizontal swipe; footer columns stack (`home/mobile-full.png`).

## Services & content

- **Hero / value prop (paraphrased):** an elite, senior, North-American software engineering team that modernizes companies with AI, automation and blockchain.
- **Tone:** calm, precise, enterprise; outcome and risk language; short sentences; numbered.
- **Services (5 pillars → many sub-services):**
  - S/001 **Advisory (11)**: fractional CTO, technical due diligence, **IT staff augmentation**, frontend/backend/fullstack specialists, DevOps, IT & cloud consulting, **software development outsourcing**, **nearshore development** ("senior engineers in Montreal, on Eastern Time, working inside your team"). This is where their team-extension / dedicated-developer offer lives.
  - S/002 **Blockchain**: smart contracts, tokenomics, ZK proofs, L1/L2.
  - S/003 **Product Development (11)**: fast prototyping, MVP, SaaS, legacy transition, digital transformation, project takeover, custom CRM, enterprise software, sports software, web dev, mobile apps.
  - S/004 **Enterprise Software**: custom platforms, integrations, ERP, support.
  - S/005 **AI (10)**: AI strategy, LLM/GPT integration, automated decision systems, OCR, **MCP servers**, AI development/automation/ML, AI agents.
  - Service page template: H1 + "N SERVICES" counter → intro with 5–6 numbered capability chips → list of sub-services (code + title + one sentence + EXPLORE) → closing CTA.
- **Industries (11):** grouped by filter chips Regulated / Operations / Commerce & Media / Digital Assets: Automotive, Oil & Gas/Energy, Distribution & Supply Chain, Healthcare (HIPAA), E-commerce, Insurance, Fintech, Real Estate/PropTech, Research & Public Sector, Media & OOH, Crypto/Web3. Each: one-line outcome + 3 capability tags. Plus FAQ (5) and "see also" SEO links.
- **Tech stack:** `expertise/` page, 43 technologies with filter chips (Language, Framework, Backend, Frontend, Mobile, Cloud, Blockchain, API…). Python, React/React Native, Django, ERPNext, Rust, Solidity, Go, Node, .NET, Next.js, AWS, Stripe/HubSpot/Salesforce APIs, etc.
- **Process / how we work:** not a separate diagram. Expressed as (a) contact steps "001 We read every request → 002 We reply with a first view → 003 Scope under NDA (scope, timeline, cost)", (b) H001–H004 principles (senior team only, compliance from day one, fits what you run, one accountable team), (c) homepage tabs Expertise / Values / Methodology.
- **Case study format** (`case-studies-*/`): anonymous client descriptor + industry; outcome headline; summary; **fact table: CLIENT · SECTOR · ENGAGEMENT · STATUS**; `01 / THE CHALLENGE` (paragraph), `02 / WHAT WE BUILT` (B001–B004 bullets), `03 / THE RESULT` (short, qualitative: "four years in, still active"), tech tags (PYTHON, .NET…), then contact form and prev/next ("002 / 007"). **Few hard metrics**; the trust comes from longevity and specificity.
- **Trust signals:** see table above (Clutch 4.9/23, SOC 2 Type II, HIPAA, AWS Partner, GPTW, since 2016, offices CA/US, 90% senior, bilingual).

## Pricing & engagement models
- **Prices shown:** Not listed.
- **Models mentioned:** staff augmentation / nearshore / outsourcing as named services (Advisory ADVSR 003, 010, 011), fractional CTO ("tailored to your budget"), team extension ("engineers working inside the client team", "Team extension, with project work alongside"), full build / phased delivery ("Full build", "Phase 1 delivered"), long-term maintenance ("same team since 2018"), fractional CTO (Advisory). Quote process: "Scope under NDA → scope, timeline and cost".
- **Tiers:** Not listed.

## Conversion
- **Primary CTA:** "LET'S TALK →" (header, hero, closing section, footer); on service/industry/case pages a full **contact block** at the bottom.
- **Secondary:** "CONTACT US", per-audience CTAs ("Build with us", "Shape what's next"), "EXPLORE" per service, "READ THE STORY".
- **Form fields:** Industry (dropdown), Company, Full name*, Work email*, Phone (optional), "What do you want to improve?"; note "NDA available on request"; **"BOOK A CALL"** button (scheduler) next to the form.
- **/contact page:** short form with topic chips (New project / Job application / Vendor or partner / Other), Full name, Phone (optional), Email, Message; submit button labelled "TRANSMIT"; H1 is a deliberately playful sci-fi line about a "neural link". One wink in an otherwise serious site. "Rather talk? BOOK A CALL".
- **About page structure** (`about/`): EST. 2016 kicker → mission H1 → "Who we are" + 6-stat strip → What we do (S001 Services / I001 Industries / P001 Products cards) → Responsible by default (R001–R004) → Recognition (Clutch, SOC 2, HIPAA, AWS) → Leadership (L001–L004) → Offices (O001 Montreal / O002 Miami) → FAQ (005) → contact block.
- **Chat / other:** HubSpot + Intercom scripts present (chat widget likely), GTM + ad pixels. No lead magnet seen. **Content/SEO engine:** `articles/` has **817 articles** (numbered ART/808…, filters, search), many "Top [X] companies in [city/country] (2026)" listicles, plus podcasts and city landing pages (/montreal). Every service/industry page ends with "see also" SEO links.

## Technical
- Custom front-end by Locomotive (not WordPress/Webflow); Lenis, GSAP 3, Swiper, canvas/WebGL; HubSpot, Intercom, GTM.
- Performance feel: hero and 3D sections are heavy-ish but smooth; text split into per-character spans (bad for copy/paste and our text extractor).
- No `prefers-reduced-motion` handling found. FR version at /fr.

## Key screenshots & videos
- `home/sections/01-cheader.png`: coral hero, ID-badge logo card, H1, CTA.
- `home/sections/03-…png` / `04-…-1.png`: services stacking list (S/001–S/005).
- `home/sections/05-…png`: "We engage with" client-type card.
- `home/sections/11-cfooter.png`: footer with trust badges + Clutch.
- `home/mobile-full.png`: whole homepage at phone width.
- `case-studies/desktop-full.png`: anonymized case grid.
- `case-studies-offshore-logistics-erp/desktop-full.png`: case study template with fact table.
- `industries/desktop-full.png`: industry directory with filter chips.
- `expertise/desktop-full.png`: tech-stack directory.
- `videos/home-desktop.webm`: hero stripes, scramble text, 3D W, stacking services.
- `videos/case-studies-desktop.webm`: card hover fill.
