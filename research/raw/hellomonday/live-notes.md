# Hello Monday / DEPT: live notes (motion + creative scan)

Scanned 2026-11-18 in Claude in Chrome (1536×639) + Playwright videos (1440×900 desktop, iPhone 13 mobile).
Pages: `/` (home), `/services`, `/work`, `/work/aurorasolar` (case study), `/product`, `/about`, `/stories`.

**Stack seen in the page:** custom single bundle (`/build/js/main-*.js`), **GSAP 2 (TweenMax/TweenLite)**, **Lenis** smooth scroll (body `overflow:hidden`, custom scroller), 1 **WebGL canvas** (image distortion), video.js for video modules, Plausible analytics + Cloudflare.
**No `prefers-reduced-motion` rules found** (0 media blocks), so motion is NOT toned down for users who ask for it. Something to do better.
Page transitions: AJAX-style. Old page fades to white, new page fades/slides in (~1s+). Case-study pages show white for ~3–5s on first load (heavy).

## Effects

### 1. Preloader: black curtain with a liquid edge
- **Where:** first load, any page. **Trigger:** load.
- **What:** full-screen black, a white blob with a wavy (sine) edge sweeps from the left and wipes the black away, revealing the white page.
- **Built:** SVG path / canvas morph tweened with GSAP.
- **Feel:** playful, ~1.5s. Memorable but delays content.
- **Video:** `home-desktop.webm` 0:00–0:03.

### 2. Hero: rotating word + hand-drawn character scenes
- **Where:** home hero. **Trigger:** timer (~2.5–3s per word) + mouse hover.
- **What:** small line "We make digital (and magical)…" and below it a giant serif word that cycles **Experiences → Products → Branding**. Each word has its own black-and-white **hand-drawn illustration of the same two characters** (a tall man + a woman in a striped dress) doing something different: reading a newspaper, looking at a phone, applauding, waving. The word fades from grey to black when it lands. Characters are frame-by-frame sprite animations (blink, wave, scratch head). A small dot under the word pulses.
- **Built:** sprite-sheet / image-sequence animation + GSAP text tween.
- **Feel:** warm, human, witty. The single most memorable thing on the site. Light (just images).
- **Video:** `home-desktop.webm` 0:03–0:15.

### 3. "N days until Monday" header widget
- Top right: a tiny calendar icon + "5 days until Monday". It's a live countdown that turns the brand name into a running joke. Pure copy/personality, no heavy motion.

### 4. Three-column work grid with parallax middle column
- **Where:** home, `/work`. **Trigger:** scroll.
- **What:** project cards in 3 columns; the **middle column (`col-2`) moves at a different speed** (`translate3d(0, Npx, 0)` updated on scroll), so the grid feels staggered/masonry and alive. Card titles in serif, category tags in tiny grey underlined text. Text and tags fade in with scroll-linked opacity.
- **Feel:** elegant, editorial. Cheap if done with transforms.

### 5. Liquid / wavy image edge on card hover
- **Where:** every project card (home, /work, /services). **Trigger:** hover.
- **What:** on hover the image's top/bottom edge turns into a soft wave (like jelly) that wobbles and settles back after the mouse leaves. A **bullet "•" slides in before the title**, tags darken. Images are full-colour; lazy images show a warm grey `#f5f4f2` placeholder first.
- **Built:** WebGL canvas distortion (the page's WebGL canvas) or an SVG clip-path driven by GSAP; `cursor:none` is set on image containers.
- **Feel:** delightful, signature effect. Medium cost (WebGL).
- **Video:** `home-desktop.webm` hovers during grid scroll (~0:20–1:00); `work-desktop.webm`.

### 6. Filter list on /work
- Top of /work: "Filter:" + stacked list Products / Experiences / Branding. Hover shows a bullet dot next to the item; click filters the grid (cards re-flow with fade).

### 7. Services page = sticky illustration + big serif chapters
- **Where:** `/services`. **Trigger:** scroll.
- **What:** each service (Products, Branding, Experiences) is a chapter: a **sticky character illustration on the left** (same two characters in a new scene, e.g. diving board + pool for Experiences), a small grey kicker, a **huge serif title**, one rich paragraph, a "View [service]" underlined link, then 2 project cards. Each chapter **fades from ~0 → 1 opacity as it scrolls into the centre** (others stay faded), so focus moves down the page.
- **Feel:** calm, storybook-like. Easy to build (sticky + opacity).

### 8. Case study page: brand-coloured chapters
- **Where:** `/work/aurorasolar`. **Trigger:** scroll.
- **What:** full-bleed hero in the client's brand colour (deep maroon) with the client's animated mark (a dotted sphere) as a looping video; a coloured **info strip** (Type · Client · Deliverables); then the page background changes per chapter (yellow intro → light grey modules). Two-column story: serif title left, long narrative right. Big video/animation modules (e.g. a sun-ray loader animation) with short captions beside them.
- **Feel:** each case study feels like the client's own microsite. Strong but heavy (videos).

### 9. /product: client "roll-call" list (best creative pattern)
- **Where:** `/product` (their productized "booster rocket for digital product teams" offer). Dark theme (#1c1c1c).
- **What:** "Jump ahead" anchor nav at top (Our Work / Quotes / Ready to Collaborate?). Video of the team; then a giant centred serif statement that overlaps the video. Then **client names set huge in serif (Google, Strava, META, T-Mobile…)**, one per row. Rows are grey until they reach the middle of the screen, then turn white and reveal: "• 24 projects" counter on the left, a one-line story under the name with an underlined link, and an image/phone mockup on the right.
- **Built:** scroll position → active class; image fades/slides in.
- **Feel:** confident, memorable, very cheap. Perfect for showing clients/projects.
- **Video:** `product-desktop.webm`.

### 10. Footer contact: hover label swap + illustrations
- **What:** footer has a hand-drawn person working at night by a window; contact blocks as Q&A: "Want to collaborate? / Work with us / newbusiness@…", "Want to say hi?", "Want to join us?", "Want to learn?". **On hover the grey question changes to "Copy e-mail"** (click copies). Offices listed (New York, Copenhagen, Aarhus, Amsterdam) with "View on maps".
- **Feel:** friendly, useful micro-interaction. Trivial to build.

### 11. Navigation
- Header shows only the logo (stacked "HELLO / MONDAY / DEPT.") and the countdown. Main menu (Work, Services, About, Stories, Product) is hidden in a collapsible nav (`MainMenu` + burger). It wasn't visible at 1536px in Chrome; check desktop-full.png / video. The header hides on scroll down.

### Mobile (`*-mobile.webm`)
- Single column; the hero illustration + word cycle stays; the grid becomes one column with the same hover-less image reveals; burger menu.

## Motion level: **heavy** (preloader, page transitions, WebGL hover, parallax grid, smooth scroll, sprite animations), though each effect is purposeful and it rarely janks.

## 3 best effects to borrow
1. **Client/project roll-call** (#9): giant names that light up at screen centre with a one-line outcome + count. Cheap, bold, works great for "industries we serve" or "clients".
2. **Recurring illustrated characters** (#2/#7): one illustration style + the same mascots across hero, services and footer gives huge personality. For us: a small illustrated team (dev, PM, designer) in scenes per service.
3. **Hover micro-delights that are also useful** (#5/#10): bullet slide-in on cards, "Copy e-mail" label swap. If we skip WebGL, a CSS clip-path wave or a scale+mask reveal is enough.
