# Linear: live notes (motion scan)

Scanned 2026-11-18 in Claude in Chrome (viewport 1536×639) + Playwright videos (1440×900 desktop, iPhone 13 mobile).
Pages: `/` (home), `/plan`, `/build` (+ `/ai`, `/customers` in videos/captures).

**Stack seen in the page:** Next.js + CSS Modules (hashed class names like `qM9FAa_…`). **No GSAP, no Lenis, no Three.js, no canvas/WebGL.**
Motion = plain CSS `@keyframes` + CSS transitions + a few Web Animations API calls (`element.animate`), plus looping AV1 `<video>` heroes on feature pages.
Native scroll (no smooth-scroll library). ~50 `@media (prefers-reduced-motion)` blocks, so **reduced motion is respected everywhere.**
Design tokens drive timing: `--speed-quickTransition`, `--ease-out-quad`, etc.

## Effects

### 1. Nav mega-menu that morphs between panels
- **Where:** header, all pages. **Trigger:** hover on "Product" / "Resources".
- **What:** a single dark popover drops in (`scaleIn` 0.18s ease). Moving from Product → Resources doesn't close/reopen: the *same* panel resizes (`--popup-width/height` CSS vars animate) and content cross-fades. Each panel item = title + one-line grey description, plus a right column of plain links and a bottom "New: …" strip.
- **Built:** Base UI / Radix-style NavigationMenu ("positioner/popup/viewport" pattern), CSS vars + transitions.
- **Feel:** premium, instant (100–180ms). Very cheap to build.
- **Video:** `videos/home-desktop.webm`, first ~10s (nav hovers).

### 2. Nav link hover
- **Trigger:** hover. Text colour + pill background fade, **0.1s cubic-bezier(0.25,0.46,0.45,0.94)** (easeOutQuad). "Sign up" is a white pill on dark.
- **Feel:** crisp, almost no motion. The speed itself says "fast product".

### 3. Product UI as the hero illustration ("scripted demo")
- **Where:** home hero + every feature section. **Trigger:** load / enters viewport.
- **What:** instead of screenshots, real HTML replicas of the app play little scenes: a Slack message types itself with a blinking cursor (`cursorBlink` 1.25s), then the send button fades from 0.2→1 opacity (**0.8s cubic-bezier(0.22,1,0.36,1)**, i.e. easeOutQuint), an AI agent panel streams a reply, an "agent" badge has a sweeping gradient border (`agentBorderSweep` 2s linear loop), shimmer text sweeps across "thinking…" labels.
- **Built:** CSS keyframes + WAAPI; DOM, not video, so text stays crisp.
- **Feel:** the most convincing part of the site. You *see* the product working. Heavy to build (needs real UI components).
- **Video:** `home-desktop.webm` ~0:10–0:40.

### 4. Cursor-following "shine" borders
- **Where:** product-UI frames and cards. **Trigger:** mouse move / scroll.
- **What:** a soft highlight on the frame edge follows the pointer: the element's `--mask-x / --mask-y` CSS vars are updated by JS; a radial-gradient mask uses them.
- **Feel:** subtle, premium "glass" feel; cheap (one CSS var update per mousemove).

### 5. Scroll-linked fixed glow backgrounds
- **Where:** home sections (Slack box, Initiatives box). **Trigger:** scroll.
- **What:** large blurred glow behind product frames stays fixed while content scrolls (`--bg-offset-y` updated on scroll), so it reads as light from above. Hero product frame sits on a grey vignette "stage".
- **Feel:** depth without 3D. Light.

### 6. Isometric line-art illustrations with dot-matrix loops
- **Where:** home "FIG 0.1 / 0.2 / 0.3" trio (Purpose-built / Powered by agents / Designed for speed); `/build` diagrams.
- **What:** thin-stroke isometric SVG (stacked plates, cubes, fanned cards). 5×5 dot grids animate with `grid-dot-upDown` (2.8s), `pong` (1.6s), `agent` (3.2s), all linear infinite. Paths animate `stroke-dashoffset` (`offsetIsometric`, 1s linear) to make "data flowing" lines.
- **Built:** inline SVG + CSS keyframes. Labels in mono ("FIG 0.1").
- **Feel:** technical, calm, very lightweight. Great for a dev shop.

### 7. Card stack carousel (feature pages)
- **Where:** `/plan`, `/build` feature cards. **Trigger:** timer / enters viewport.
- **What:** stacked cards cycle: outgoing card goes `translateY(±32px) scale(<1)` + blur + fade; incoming comes forward. **700ms cubic-bezier(0.645,0.045,0.355,1)** (easeInOutCubic) on transform, filter, opacity.
- **Feel:** smooth, "deck of updates". Good for testimonials or process steps.

### 8. Looping video heroes on feature pages
- **Where:** `/plan` (glowing dots on a tilted dark timeline), `/build` (tilted code diff in perspective).
- **What:** muted autoplay loop AV1 mp4 (`*.av1.crf24.mp4`), fades in with **opacity 1s cubic-bezier(0.215,0.61,0.355,1)** (easeOutCubic). Headline sits on top, bottom-left.
- **Feel:** cinematic, but a video, so cheap on CPU. Gives "3D" without WebGL.

### 9. Multiplayer-editing demo
- **Where:** `/plan` "Shape your product ideas". Fake collaborator cursors fly in (`cursorIn` 0.25s, 0.2s delay) and highlight text (`highlightReveal` 0.5s).

### 10. Changelog timeline, logo wall, testimonial cards
- Static mostly. Logo wall = monochrome white logos in one row with a tiny mono caption under it. Changelog = horizontal timeline with dots; the newest dot is coloured. Testimonials = two large cards, one pastel gradient, one acid-yellow (#e4f222-ish) for contrast.

### Mobile (Playwright `*-mobile.webm`)
- Header collapses to logo + "Sign up" + menu button; menu opens as full-screen sheet (`mobileMenuIn` 0.18s). Product-UI demos scale down and crop rather than reflow. Same motion, fewer simultaneous loops.

## Motion level: **moderate** (lots of small loops, but every one is cheap CSS; nothing blocks scrolling, no scroll-jacking)

## 3 best effects to borrow
1. **Scripted product-UI demos** (#3): for us, a fake "project dashboard / Slack thread with our PM / CI pipeline turning green" built in HTML. Shows *how we work* instead of telling.
2. **Isometric line-art + mono "FIG" labels** (#6): a technical illustration system that's light, on-brand for engineers, and easy to animate with CSS.
3. **Morphing mega-menu + 100–200ms easeOut micro-interactions** (#1/#2): fast, premium feel at near-zero cost. Plus full `prefers-reduced-motion` support as a quality bar.
