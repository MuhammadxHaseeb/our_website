# Webisoft: live notes (homepage + main pages)

Scanned 2026-11-18 in Claude in Chrome (1536×639) + Playwright videos (1440×900 desktop, iPhone 13 mobile).
Pages: `/` (home), `/case-studies`, service pages (in videos/captures).

**Stack seen in the page:** custom build (BEM-ish `c-…` classes), **Lenis** smooth scroll, **GSAP 3** (inline-style signature `translate: none; rotate: none; scale: none` = GSAP ≥3.12, bundled so not on `window`), **Swiper** (testimonials / "We engage with" slider), **3 canvases** (3D chrome "W" + stripe hero), Google Tag Manager + ads pixels. **No `prefers-reduced-motion` rules** found.

## Effects

### 1. Hero: animated stripe field + giant wordmark
- **Where:** home hero. **Trigger:** load + mouse move.
- **What:** coral-red (#e05a47-ish) full-bleed hero. Top-left "ID badge" logo card (light grey, mono "WBSFT® / DEVELOPMENT LABS", burger inside the card). Centre "AN ELITE TEAM OF SOFTWARE ENGINEERS" in uppercase. A row of mono meta labels (WBSFT® · MTL (CAN) · /2026 · ENGINEERING_). Then ~16 **black horizontal bars whose thickness ripples like a wave** (canvas), and a **huge "WEBISOFT®" wordmark** bleeding off the bottom with "/ EXPLORE +" mono link.
- **Feel:** bold Swiss/brutalist, confident, "engineering lab". Not classic blue corporate.
- **Video:** `home-desktop.webm` 0:00–0:16 (hero idle); **menu open 0:17–0:31** (logo card expands into left panel, page blurs: `videos/frames/home-desktop-25s.jpg`).

### 2. Scramble / decode text on mono labels
- **Where:** hero meta labels + section kickers (e.g. "ADVISORY / BLOCKCHAIN / PRODUCT DEVELOPMENT…" list over the 3D W). **Trigger:** scroll into view / hover.
- **What:** characters cycle through random glyphs before resolving ("BLOCKCHAIW", "ENGINEERIBIT" caught mid-scramble). `blink-animation` keyframes on a trailing underscore cursor.
- **Built:** JS text scramble (GSAP ScrambleText-style).
- **Feel:** techy, fits a dev company, cheap.

### 3. 3D chrome "W" that rotates with scroll
- **Where:** home section 2 (grey) and again above the footer. **Trigger:** scroll.
- **What:** large chrome/glass extruded "W" logo rotates and zooms as you scroll; headline "A North American team of specialists with profound technical expertise." + outline "CONTACT US →" button.
- **Built:** canvas (WebGL or image sequence).
- **Feel:** premium, memorable brand moment; heavier (GPU).

### 4. Paragraph colour reveal, character by character
- **Where:** service descriptions, intro paragraphs. **Trigger:** scroll.
- **What:** every character is a `<span class="c-fadein-paragraph_char">`; colour goes from light grey to black as the paragraph scrolls through the viewport (scrubbed). First line is indented (editorial style).
- **Feel:** classy reading effect, makes copy feel "alive". Cheap-ish (many spans).

### 5. Stacking service rows (sticky index)
- **Where:** home "SERVICES / Tech stacks for a rapidly evolving world: /005". **Trigger:** scroll.
- **What:** each service row (S/001 Advisory, S/002 Blockchain, S/003 Product Development, S/004 Enterprise Software, S/005 AI) has a number, title, short description, outline "EXPLORE →" button and a grey panel with a black geometric icon. As you scroll, each row **pins and collapses to just its title strip** under the previous one, building a numbered index at the top. Dotted 1px dividers.
- **Built:** CSS `position: sticky` with stepped `top` values (+ GSAP for the icon).
- **Feel:** organised, enterprise-grade, satisfying. Cheap. **Top candidate to borrow.**
- **Video:** `home-desktop.webm` ~0:35–0:44 (hovers on Advisory row + EXPLORE at 0:40–0:41).

### 6. Button hover: outline → solid fill
- Outline buttons (1px black border, mono uppercase label + →) fill black with white text on hover. Short, ~0.2–0.3s. Primary "LET'S TALK →" is solid black (on coral) or solid coral (on black).

### 7. "We engage with": client-type slider
- **Video:** `home-desktop.webm` ~0:45–0:47.
- **What:** Swiper slider of large light-grey cards: I/001 Startups, (Enterprises, …). Card = B&W photo bottom-left, title + paragraph + "BUILD WITH US →" right, pagination dots. Stacked/creative transition (cards slide over each other).

### 8. Expertise: giant counter + numbered list
- Big black "1" (then 2, 3) on the left; right: 01 EDGETECH / 02 IN-HOUSE / 03 EXPERIENCED rows with short claims ("over 90% of our developers are senior engineers", "local talent in your timezone, no outsourcing").

### 9. Testimonial over parallax team photo
- Full-width dark B&W office photo with **parallax scale** (`--parallax-scale` 1.0→1.17) and a huge white quote on top; Swiper for multiple quotes.

### 10. Big split headline + marquee
- "WE → DRIVE / YOUR SYSTEMS / FWRD" as giant split type over several lines; lines slide up into place (`translate3d(0, 0%, 0)` on line-inner spans); a horizontal marquee of text.

### 11. Footer
- Coral footer: wordmark, FRANÇAIS link, **trust badges row: EST 2016, AICPA SOC 2 Type II, HIPAA compliant, AWS Partner, Great Place To Work (Canada)**; columns SERVICES / COMPANY in mono caps.

### 12. Case studies page
- Black hero "Software our clients run on. Built by us, and still ours to maintain." + note that stories are told **without client names** (privacy) + coral "LET'S TALK". "007 STORIES" counter.
- Grid of **text-only cards** separated by dotted lines: red number (001), industry tag (PUBLIC SECTOR), client descriptor in mono caps ("A CANADIAN FEDERAL PUBLIC-SAFETY AGENCY"), outcome headline, 2-line summary, status line ("PHASE 1 DELIVERED", "SINCE APRIL 2022, ACTIVE", "FULL BUILD") + "READ THE STORY →". **Hover fills the whole card coral.**
- Bottom: black contact block "Facing something similar? Let's talk." + numbered reassurance list (001 We read every request…) + form (Industry dropdown, Company, Full name, Work email…) + "BOOK A CALL" button.

### Mobile (`*-mobile.webm`)
- Logo card shrinks to a compact bar with burger; stripes and wordmark scale down; stacking services become a simple list; slider becomes swipe.

## Motion level: **moderate→heavy** (Lenis + GSAP scroll scrubs + 3D canvas), but the type-led layout keeps it feeling controlled, not playful.

## 3 best effects to borrow
1. **Stacking numbered service rows** (#5): clear, enterprise-feeling way to list 5–8 services; sticky CSS, little JS.
2. **Anonymized text-only case study cards with status lines** (#12): solves NDA problems, signals long-term relationships ("since 2022, active").
3. **Mono labels + scramble text + character colour reveal** (#2/#4): cheap "engineering" personality without heavy 3D.
