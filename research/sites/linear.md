# Linear (linear.app)

**Focus:** Animations & motion. Outside our industry (product company), so service/pricing sections are N/A.
**Files:** `research/raw/linear/` (pages: home, plan, build, ai, customers). Live notes: `raw/linear/live-notes.md`. Videos: `raw/linear/videos/` (home, plan, build × desktop/mobile) + `videos/frames/`.

---

## Focus deep dive: Animations & motion

**Core lesson:** Linear's site feels "premium and fast" with **no animation library at all**. No GSAP, no Lenis, no Three.js, no canvas. It's all **CSS keyframes, CSS transitions, a few `element.animate()` calls and looping videos**, timed with design tokens and fully disabled under `prefers-reduced-motion`. Motion is used to **demonstrate the product**, not to decorate the page.

### Motion vocabulary (timings & easing)
| Use | Duration | Easing |
|---|---|---|
| Nav link / button hover (colour + bg) | **100ms** | `cubic-bezier(0.25,0.46,0.45,0.94)` (easeOutQuad) |
| Menu / popover open-close, mobile menu | **180ms** | `ease` (`scaleIn` / `fadeIn` keyframes) |
| Element appearing inside a demo (button fade-in) | **800ms** | `cubic-bezier(0.22,1,0.36,1)` (easeOutQuint) |
| Card stack cycling (transform + blur + opacity) | **700ms** | `cubic-bezier(0.645,0.045,0.355,1)` (easeInOutCubic) |
| Hero video fade-in | **1000ms** | `cubic-bezier(0.215,0.61,0.355,1)` (easeOutCubic) |
| Ambient loops (dot grids, border sweeps, shimmer) | 1.25–3.2s | `linear`, infinite |

Rule of thumb they follow: **UI feedback ≤ 200ms; content entrances 700–1000ms with strong ease-out; ambient loops linear and slow.**

### What moves, and why it works
1. **Product UI replicas play scripted scenes** (home hero, every feature section): a Slack thread types itself, an AI agent replies, a PR panel appears, the send button fades in. It's real HTML (crisp text, small file size), not video. *Why it works:* shows the workflow in 5 seconds; the motion *is* the explanation. (`live-notes.md` #3, `videos/home-desktop.webm` ~0:08–0:30)
2. **Morphing mega-menu**: one popover that resizes between "Product" and "Resources" instead of closing and reopening. 180ms. Feels native-app quality. (#1, video 0:08–0:25)
3. **Isometric line-art "FIG 0.x" illustrations** with tiny animated dot matrices and dash-offset "data flow" lines. Pure SVG + CSS. (#6, `home/sections/`)
4. **Cursor-following shine** on product frames (`--mask-x/y` CSS vars → radial mask). (#4)
5. **Fixed glow behind product frames** that is scroll-linked, so it reads like light from above. (#5)
6. **Card stacks that cycle** (translateY ±32px + scale + blur) on /plan, /build. (#7)
7. **Looping AV1 videos** for "3D" hero scenes (tilted timeline with glowing points on /plan; perspective code diff on /build), fading in over 1s. 3D look without WebGL cost. (#8, `videos/plan-desktop.webm`, `build-desktop.webm`)
8. **Multiplayer cursors** flying in and highlighting text in the docs demo. (#9)

### What they *don't* do (also a lesson)
- No scroll-jacking, no smooth-scroll library, no preloader, no page-transition animation, no parallax on text, no custom cursor. Scrolling is native and instant.
- Section headings simply appear. Hardly any "fade-up on scroll" reveals for text. The motion budget goes to the product demos.

### Performance feel
- Very light; page interactive immediately. Dozens of infinite CSS loops run but they're GPU-cheap (opacity/transform on small SVG circles).
- Reduced motion: ~50 `@media (prefers-reduced-motion)` blocks; menu/scroll animations switch off.

### Ideas worth adapting for our site (motion)
1. **"Live" HTML mock-ups of how we work**: e.g. a Jira/Linear-style board where tickets move to Done, a CI pipeline turning green, a Slack thread with our PM sending a weekly update, a chat with an AI feature we built. Shows process + transparency, which is what offshore clients worry about.
2. **Motion tokens** borrowed as a spec: 100ms hover, 180ms menus, 700–800ms entrances with easeOutQuint, linear ambient loops; everything off under `prefers-reduced-motion`.
3. **Isometric line illustrations with mono "FIG" labels** for services (web, mobile, AI, cloud): animated with CSS only.
4. **Looping, muted, compressed video** for any "3D" hero moment instead of WebGL.
5. **Morphing mega-menu** for our services/industries menu.

---

## Design & style
- **Vibe:** dark, techy, precise. Near-black canvas, soft greys, product UI as the hero image.
- **Palette** (`home/styles.json`): backgrounds `#08090a` (page), `#0f1011` / `#101112` / `#161718` (raised surfaces), translucent white overlays `#ffffff` at 1–5% for cards/buttons; text `#f7f8f8` (primary), `#d0d6e0` (body), `#8a8f98` (secondary, also the grey second half of headlines), `#62666d` (tertiary); accents only inside product UI (warm `#f7bf8b`, brand indigo, status colours). Primary CTA = white pill with dark text.
- **Fonts:** **Inter Variable** for everything (H1 64px / weight 510 / letter-spacing −1.4px; H2 48px/510/−1.06px, often grey; H3 20px/590; body 15–16px/400; UI 12–14px), plus **Berkeley Mono** for labels/code ("FIG 0.1", logo-row caption). Odd weights (510, 590) from the variable font give a slightly softer bold.
- **Homepage, section by section** (`home/sections/`):
  1. Sticky dark header: logo · Product ▾ · Resources ▾ · Customers · Pricing · Now · Contact | Log in · **Sign up** (white pill).
  2. Hero: 2-line headline (~64px, white, tight tracking), small grey subline left, "New: …" link right; below it a large **product UI frame** on a grey vignette "stage" playing an agent demo.
  3. Logo row (OpenAI, Vercel, Salesforce, Figma, Cursor, Coinbase, Ramp) in white + mono caption "POWERING THE COMPANIES BUILDING THE FUTURE".
  4. Big statement paragraph: white first sentence, grey rest ("A new species of product tool…").
  5. Three "FIG 0.1–0.3" isometric illustrations with titles + 2-line descriptions, separated by vertical hairlines.
  6. Feature chapters (repeat ×4: Intake, Planning, AI & automations, Build/review): left big 2-line title, right paragraph + "Learn more →"; full-width product demo; "Features" row of small "+" links in two columns.
  7. Changelog strip: horizontal timeline with dots, 4 latest entries with dates, "View all →".
  8. Testimonials: two big cards (pastel gradient / acid yellow), quote + logo + name; "Linear powers over 50,000 product teams" + "Customer stories →".
  9. Final CTA + footer: 5 link columns (Product, Features, Company, Resources, Connect) in small grey text.
- **Navigation:** sticky, translucent dark bar; hover mega-menus with title + description items, right link column, bottom "New" strip.
- **Imagery:** 100% product UI (HTML), isometric line art, looping product videos. No people photos except tiny avatars in demos.
- **Effects & animations:** moderate; CSS-only; see deep dive + `live-notes.md`.
- **Standout components:** morphing mega-menu; feature "chapter" layout (title left / copy right / demo full-width); changelog timeline; "Features +" mini-index per chapter.
- **Mobile:** menu becomes full-screen sheet; demos scale/crop instead of reflowing; chapter titles stack above copy (`home/mobile-full.png`, `videos/home-mobile.webm`).

## Services & content
- **Hero (paraphrased):** the product-development system for teams and AI agents.
- **Tone:** confident, minimal, opinionated ("A new species of product tool"); short sentences; product-centric.
- Services / industries / process / case study format / trust signals for agencies: **N/A (outside our industry).** Note the trust pattern anyway: logo row + "50,000 teams" stat + customer stories page.

## Pricing & engagement models
- N/A (outside our industry). (They have a /pricing page for SaaS tiers; not relevant to us.)

## Conversion
- Primary: **Sign up** (white pill, header) / "Get started"; secondary: "Contact sales", "Learn more →", "Customer stories →".

## Technical
- Next.js, CSS Modules, Base UI-style primitives; AV1 videos; no animation libs; ~50 reduced-motion rules. Very fast.

## Key screenshots & videos
- `home/sections/`: hero + product frame, FIG illustrations, feature chapters.
- `videos/home-desktop.webm`: 0:08–0:25 nav mega-menu hovers; 0:28–0:50 scroll through demos + hovers.
- `videos/plan-desktop.webm`: video hero + card stack.
- `videos/build-desktop.webm`: code-diff demo, isometric diagrams.
- `videos/frames/home-desktop-12s.jpg`: Product mega-menu open over the hero.
- `videos/frames/home-desktop-40s.jpg`: code-diff demo frame.
- `videos/plan-desktop.events.json` / `build-desktop.events.json`: timestamps of every hover (e.g. /plan 8–23s nav, 26–57s feature hovers).
