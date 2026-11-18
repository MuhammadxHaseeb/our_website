# Epox website: design brief

_Step 1 of phase 2 · updated 2026-11-18 · Status: **Step 1 approved** (palette A, Helvetica Now Display/Text + Geist Mono, wordmark "epox" Bold lowercase, brand idea 1, dark hero, no characters at launch). Next: Step 2 setup._
Preview in real UI: `docs/preview/index.html` (serve over http, e.g. `npx serve docs/preview`; screenshots in `docs/preview/shots/`). Logo: `docs/logo/epox-wordmark-{black,white,currentcolor}.svg` (other options kept for the record).
Sources: `research/overview.md`, `research/sites/*.md`, `our-company.md`, design rules in `CLAUDE.md`.

---

## 1. Direction

Epox should feel like an **established engineering studio that happens to have taste**: a white, spacious, Swiss-editorial site with very large type, one disciplined accent colour, and proof everywhere. The **structure and trust** come from Webisoft (section-header system, numbered services, fact-table case studies, trust strip beside every form); the **interaction quality** comes from Linear (100–200 ms feedback, ease-out entrances, live HTML demos that *show* how we work); the **personality** comes from Hello Monday (one recurring brand idea, very large editorial type, smooth scroll, a roll-call, story-chapter services, and **slots for our own illustrated characters later**: the site launches without them and works fully without them). Restraint does the premium work: black and white carry ~90% of every page, the third colour appears only as emphasis, and every section has one obvious largest thing and one primary action. Because Epox sells **outbound**, every page is designed for a visitor who arrived from our message: within 10 seconds they must see *who we are, that we've solved problems like theirs, and how to reply*.

| Idea | From | Where we use it |
|---|---|---|
| Section-header system `/ LABEL · Headline · count` | Webisoft | Every content section on every page |
| Numbered services (S/01–S/07) + tags | Webisoft | Home services, /services |
| Stacking service rows (sticky index) | Webisoft | Home services (desktop) |
| Fact table on case studies (Client · Sector · Platforms · Engagement · Status) | Webisoft | Case cards, case pages |
| Trust strip beside forms | Webisoft | Contact block (every page footer CTA + /contact) |
| "What happens next" 3 steps next to the form | Webisoft | Contact block |
| Mono labels for numbers/kickers | Webisoft + Linear | Kickers, counters, tags, facts |
| 100 ms hover, 180 ms menus, 700–1000 ms ease-out entrances | Linear | All UI |
| Live HTML demos of a product/process | Linear | "How we work" demo on home + /how-we-work |
| Morphing mega-menu | Linear | Header (Services menu) |
| Feature "chapter" layout (title left, copy right, demo full-width) | Linear | Service detail pages |
| Recurring brand idea | Hello Monday | Hero, footer line, 404, case framing |
| Illustrated characters per service (**later**; layouts keep an empty `CharacterSlot`) | Hello Monday | /services chapters, 404, footer |
| Big editorial type moments (Now Display at display sizes; **no serif for now**) | Hello Monday | Hero emphasis line in silver, footer CTA line, roll-call names |
| Roll-call (names light up at screen centre) | Hello Monday | Home "Industries we've built for" |
| Numbers scoreboard | Hello Monday (awards) | Home + /about (our numbers, not awards) |
| Services told as story chapters | Hello Monday | /services page |
| Smooth scroll, page transitions, image hover reveal, parallax | Hello Monday | Site-wide, light versions only |
| **Gap we fill:** engagement-model comparison (no prices) | overview.md gaps | Home + /how-we-work |
| **Gap we fill:** visible weekly process | overview.md gaps | /how-we-work demo |
| **Gap we fill:** results with numbers | overview.md gaps | Case pages (as owner sends metrics) |

---

## 2. Brand idea: **chosen: 1 "We find it first."** (2's live-status dot is used as a proof device)

Rooted in `our-company.md`: Epox **finds a business's problem and reaches out with the fix**; both launched apps are **still live and still run by Epox**; the team is in **Faisalabad (UTC+5)**.

1. **"We find it first."** _(recommended)_
   Epox spots the problem before the client does. This is literally how Epox sells, so the site confirms the cold message the visitor just read.
   - Hero: _"We find the problem before you do."_
   - Recurring device: a mono **"FOUND:"** annotation (a small marker + note pointing at a problem) used in the hero demo, case studies ("What we found → What we built → What changed"), and the 404 ("Found: a page that doesn't exist").
   - Footer line: _"Have a problem worth solving? Let's talk."_
2. **"Built. Launched. Still here."**
   We don't hand over and vanish; every product we launched is still live and we still run it.
   - Recurring device: a **live status dot** ("● Live · run by Epox") on every case and in the footer; numbers scoreboard leads with "products still live".
   - Strong proof, but says less about *how* we win clients.
3. **"Your night shift."**
   Faisalabad is 5–10 hours ahead of Europe/US: we work while the client sleeps.
   - Recurring device: a **live clock** in the header ("Faisalabad 03:10 · building").
   - Memorable, but only fits clients in western time zones (owner serves anyone, including the Gulf).

Recommendation: **1 as the brand idea, with 2's live-status dot as its proof device.** (The preview page has a switch for all three.)

---

## 3. Design tokens

### 3.1 Colour: **chosen: A · Liquid Silver**
Full neutral scale (contrast vs white / vs ink n-950):
| Step | Hex | on white | on ink | Role |
|---|---|---|---|---|
| n-50 | `#F7F8F9` | 1.1 | 18.6 | subtle hover on white |
| n-100 | `#F3F4F5` | 1.1 | 18.0 | `surface`: soft panels, tags |
| n-200 | `#E2E4E7` | 1.3 | 15.5 | `line`: hairlines |
| n-300 | `#C4C8CE` | 1.7 | 11.8 | **silver**: emphasis on dark (`accentOnDark`), primary-dark hover |
| n-400 | `#A3A8AF` | 2.4 | 8.3 | `mutedOnDark` |
| n-500 | `#80868E` | 3.7 | 5.4 | large text only on white (≥ 24px); muted on dark |
| n-600 | `#5C6168` | 6.2 | 3.2 | `muted` text on white |
| n-700 | `#4B5058` | 8.1 | 2.4 | **steel**: emphasis on white (`accentOnLight`), primary hover, live dot |
| n-800 | `#2A2D31` | 13.8 | 1.4 | hairlines on dark |
| n-900 | `#141516` | 18.3 | 1.1 | `darkAlt`: footer / second dark section |
| n-950 | `#0A0A0A` | 19.8 | 1.0 | `ink`: dark sections, text, primary button |

Plus `paper #FFFFFF` and `onDark #F5F6F7`.
**Dark surfaces (graphite, 2026-11-19):** large dark areas never use pure ink. Section `dark-bg #1A1B1E` (text 15.9:1, muted 7.2:1, silver 10.3:1) · inset `#1E1F22` · raised panel/menu `#232428` · card `#2C2E33` (muted 5.7:1) · hairline `#34373C`. Ink `#0A0A0A` stays for text and the primary button on light. Roll-call inactive names use n-500 on graphite (4.7:1). **Rules:** on white, text uses n-600…n-950 (n-500 only ≥ 24px); on ink, text uses n-50…n-500; silver never as text on white; the metal gradient exists only inside the liquid-metal logo video.

<details><summary>Original three proposals (for the record)</summary>


All pairs below pass WCAG AA (computed in `docs/preview/palettes.js`; the preview shows the ratio for each). Black + white do ~90% of the work; the third colour is **emphasis only** (one hero word, live dot, primary-button hover, footer accent), never decoration.

| Token | A · Liquid Silver | B · Bone & Charcoal | C · Ink Navy | Use |
|---|---|---|---|---|
| `ink` | `#0A0A0A` | `#0B0B0A` | `#0A0A0A` | dark sections, text, primary button |
| `paper` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | page background |
| `surface` | `#F3F4F5` | `#EDE7DC` (bone) | `#EEF1F6` | soft panels, tags |
| `line` | `#E2E4E7` | `#DDD6C9` | `#D9DEE8` | hairlines in lists only |
| `text` | `#0A0A0A` | `#0B0B0A` | `#0A0A0A` | body + headings |
| `muted` | `#5C6168` (6.2:1) | `#615C54` (6.6:1) | `#556074` (6.3:1) | secondary text (never lighter) |
| `onDark` | `#F5F6F7` | `#EDE7DC` | `#FFFFFF` | text on ink |
| `mutedOnDark` | `#A3A8AF` (8.3:1) | `#A9A398` (7.9:1) | `#A7B2C6` (9.3:1) | secondary text on ink |
| `accentOnLight` | `#4B5058` steel | `#2B2A27` charcoal | `#0F1E3A` navy | emphasis on white |
| `accentOnDark` | `#C4C8CE` silver | `#EDE7DC` bone | `#9FB3D9` light navy | emphasis on ink |
| `darkAlt` | `#141516` | `#2B2A27` charcoal | `#0F1E3A` navy | footer / second dark section |

- **A Liquid Silver:** most "tech"; pairs with the liquid-metal logo. Silver is **never text on white** (1.6:1); on light it switches to steel.
- **B Bone & Charcoal:** most "premium agency": warm bone panels, charcoal footer.
- **C Ink Navy:** safest for enterprise buyers; navy replaces black in the footer and as heading emphasis.
- Full scale built above from palette A.

</details>

### 3.2 Light and dark sections: **light first (owner, 2026-11-19)**
Owner: dark/graphite sections were hard to read; clients should read and focus easily. Every page section is now light. Dark tone stays in the system only for media tiles (logo video, photos).

| Surface | Token | Value | Used for |
|---|---|---|---|
| Page | `--paper` | `#FFFFFF` | default section background |
| Soft band | `--surface` (`.soft`) | n-100 `#F3F4F5` | alternate sections, footer |
| Card on white | `--card` | n-50 `#F7F8F9` | cards, demo board |
| Card on soft band | `--card` inside `.soft` | `#FFFFFF` | case cards, models |
| Inset in a card | `--card-inset` | n-100 on white / n-50 on soft | board columns |
| Item on an inset | `--card-raised` | `#FFFFFF` + hairline | tickets |
| Emphasis | `--emph` | steel n-700 `#4B5058` | "before you do.", live dot |
| Dimmed large text | `--dim` | n-500 `#80868E` (3.7:1, AA large) | roll-call inactive, statement unrevealed |

| Section | Tone |
|---|---|
| Header, mega-menu, mobile sheet | light (white menu with hairline) |
| Home hero | **light** (was dark; superseded) |
| Services, work, about content | white / soft bands alternating |
| Live "how we work" demo | white section, cards in n-50 |
| Roll-call | soft band, grey → ink |
| Contact block | white; footer soft band |

Components read context tokens (`--card`, `--emph`, `--dim`, `--muted`, `--line`), so `.soft` and `.dark` re-tint them without per-component overrides.

### 3.3 Typography: **two font sets with one switch**
- **`free` (default, used for the public repo and any deploy unless switched):** **Inter Tight** (headings) · **Inter** (body) · **Geist Mono** (labels, numbers, buttons). All OFL; self-hosted woff2 in the build.
- **`licensed` (optional):** **Helvetica Now Display** · **Helvetica Now Text** · Geist Mono. Font files stay **only on the owner's machine** (git-ignored, never pushed). If the files are missing, the browser falls back to the free set automatically.
- **How to switch:** preview page has a "Font set" toggle (remembered per browser). In the site: one setting `NEXT_PUBLIC_FONT_SET=free|licensed` (env) → sets `<html data-fonts="…">`; all components use `--font-display`, `--font-text`, `--font-mono`, so nothing else changes. Only the active set's heading font (weight 500) is preloaded.

Original Helvetica Now plan (kept for reference):
| Role | Font | Weights | Fallback stack |
|---|---|---|---|
| Headings (display, h1–h3, roll-call) | **Helvetica Now Display** | 300, 400, 500, 700 | Inter Tight → Helvetica Neue → Arial |
| Body, lead, nav links | **Helvetica Now Text** | 400, 500 | Inter → Helvetica Neue → Arial |
| Labels, numbers, tags, **buttons** | **Geist Mono** (free, OFL; Suisse Int'l Mono not available) | 400, 500 | ui-monospace → Menlo |
| Editorial serif | **none for now** | n/a | n/a |

Setup: self-hosted **woff2** only, `font-display: swap`, **preload Helvetica Now Display 500** (hero/LCP font), subset to Latin, metric-matched fallbacks (`size-adjust`) to keep CLS < 0.05. Tokens: `--font-display`, `--font-text`, `--font-mono` (see `docs/preview/fonts.css`).
Status: Helvetica Now Display + Text received (`assets/font-1.zip`, `assets/font-2.zip`). Mono: owner said "use what suits best" → **Geist Mono** (closest neutral grotesque mono to Suisse Int'l Mono).
**Licence:** Helvetica Now (Monotype) is commercial; owner takes responsibility for licensing (2026-11-18). Self-hosting on a website needs a **web licence** covering the domain/traffic (a desktop licence doesn't cover it, and files taken from another site's CSS are licensed to that site, not to us). Font files are **git-ignored** (`assets/*.zip`, `**/fonts/licensed/`) because this repo is public; committing them would redistribute them. The build copies them from a local/private source at deploy time. Fallback plan if licences aren't bought: Inter Tight / Inter / Geist Mono (already wired as fallbacks).
Rules: mono is labels, numbers, tags and buttons only (uppercase, +0.04–0.06em tracking, `tabular-nums`), never body text; no italics except real emphasis; headings use `text-wrap: balance`, body uses `text-wrap: pretty`.

### 3.4 Type scale (fluid, 360 → 1920 px)
| Token | Size (clamp) | Line-height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `display` | clamp(56px, 9vw, 168px) | 0.92 | −0.045em | 500 | home hero headline |
| `h1` | clamp(44px, 6vw, 104px) | 0.98 | −0.04em | 500 | page heroes |
| `h2` | clamp(32px, 3.6vw, 64px) | 1.02 | −0.03em | 500 | section headlines |
| `h3` | clamp(22px, 1.8vw, 32px) | 1.15 | −0.02em | 500 | rows, cards |
| `rollcall` | clamp(48px, 8vw, 152px) | 0.95 | −0.04em | 300 (Now Display Light) | roll-call names |
| `lead` | clamp(19px, 1.5vw, 24px) | 1.45 | −0.01em | 400 | intro paragraphs |
| `body` | 17px (mobile 16px) | 1.6 | −0.005em | 400 | body |
| `small` | 14px | 1.5 | 0 | 400 | captions, meta |
| `label` | 11–12px | 1.3 | +0.05em, uppercase | 500 mono | kickers, tags, counters |
Max line length: 64ch body, 28ch headlines.

### 3.5 Spacing, grid, borders, radius
- **Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192. Section padding: 192/128 desktop (top/bottom), 96/72 mobile. Heading → content: 48–64. Related items: 12–24; unrelated: 64+ (group with space, not boxes).
- **Grid:** 12 columns, max content width 1440 px, outer margin `clamp(20px, 4vw, 64px)`, gutter 24 px (16 px under 768). Section header: kicker col 1–3, headline col 4–10, count col 12. Mobile: single column, 20 px margin (no horizontal scroll at 360 px).
- **Borders:** 1 px `line` hairlines only between list rows (services, facts, FAQ); no boxed sections, no dotted rules.
- **Radius:** sections 0 · cards & media 16 px · inner media in a card with 8 px padding → 8 px (nested rule: inner = outer − padding) · buttons & pills 999 px · tags 6 px · inputs 10 px.
- **Elevation:** none (no shadows) except the frosted header (`backdrop-filter: blur(16px)` + 80% paper/ink).
- **Icons:** one set (**Lucide**), 1.5 px stroke, sizes 16 / 20 / 24 only.

---

## 4. Motion spec

Easing tokens: `--ease-out-quad: cubic-bezier(.25,.46,.45,.94)` · `--ease-out-quint: cubic-bezier(.22,1,.36,1)` · `--ease-in-out-cubic: cubic-bezier(.645,.045,.355,1)` · `--ease-out-expo: cubic-bezier(.16,1,.3,1)`.
Durations: `--dur-fast: 100ms` · `--dur-menu: 180ms` · `--dur-ui: 240ms` · `--dur-enter: 800ms` · `--dur-hero: 1000ms`.
**Reduced motion** = global switch (`prefers-reduced-motion: reduce` → `data-motion="reduced"`): no Lenis, no transforms on scroll, no autoplay video (poster frame), no WebGL; colour/opacity feedback ≤ 100 ms stays.

### 4.1 UI & information (Linear style, CSS-first)
| # | Effect | Where | Duration / easing | Mobile | Reduced motion |
|---|---|---|---|---|---|
| L1 | Button/link hover: bg/colour/underline | everywhere | 100 ms ease-out-quad | press: `scale(.98)` 80 ms | colour only |
| L2 | Mega-menu open + morph between panels (one panel resizes) | header Services/Company | open 180 ms ease-out (opacity + scale .98→1), resize 240 ms ease-out-quint | full-screen sheet, slide-down 240 ms | instant show/hide |
| L3 | Header hide on scroll down / show on scroll up, frosted when stuck | header | 240 ms ease-out-quint | same | always visible, no slide |
| L4 | Section entrance: fade + rise 16 px, stagger 60 ms | headlines, rows, cards | 800 ms ease-out-quint, once | 600 ms, 12 px | none (visible) |
| L5 | **Live process demo** (HTML): ticket moves To do → In progress → Done; CI checks turn green; weekly update message types into a chat; a "FOUND:" marker appears | home "How we work", /how-we-work | 6–10 s loop; steps 400–800 ms ease-out-quint; runs only in viewport | 3 static frames that cross-fade every 3 s | final state, static |
| L6 | Accordion / tabs (FAQ, models) | /how-we-work, /services/[slug] | 240 ms ease-out-quint (`grid-template-rows`) | same | instant |
| L7 | Count-up numbers (tabular) | scoreboard | 1200 ms ease-out-expo, once | same | final number |
| L8 | Form states: focus ring, submit → spinner → ✓ success / inline error | contact | 100–240 ms | same | no spinner rotation (text "Sending…") |
| L9 | Lazy media/WebGL placeholder → fade in | media | 400 ms ease-out | same | instant |

### 4.2 Signature moments (Hello Monday style; GSAP + ScrollTrigger + Lenis)
| # | Effect | Where | Duration / easing | Mobile | Reduced motion |
|---|---|---|---|---|---|
| H1 | **Lenis smooth scroll** | site-wide | lerp 0.1 (~1.1 s settle) | **native scroll** (touch) | native |
| H2 | **Page transition**: content fades/rises out, ink curtain ≤ 0.35 s, new page lines rise in | route changes | out 250 ms ease-in, in 600 ms ease-out-quint (total ≤ 0.9 s) | fade only 300 ms | none |
| H3 | **Hero intro**: headline lines unmask upward (stagger 80 ms); liquid-metal logo video fades in; **no preloader** | home hero | 1000 ms ease-out-quint; text is in the DOM and visible within the first paint (LCP safe) | same, shorter (700 ms) | static |
| H4 | **Liquid-metal logo loop** (owner's video) | home hero, footer (small) | 6–8 s seamless loop, plays only when visible | poster frame + loop only on Wi-Fi/`saveData=false` | poster frame |
| H5 | **Character scenes: later.** At launch the slot holds the chapter's big number (S/01) in Now Display Light; when art arrives it's sprite/Lottie | /services chapters (sticky left), 404, footer | 2–4 s idle loops, ease-in-out | inline above text, 1 loop then still | still frame |
| H6 | **Statement reveal**: words go from muted to ink as you scroll (word spans, real text kept for screen readers) | home "About Epox" statement | scrubbed with scroll | per-line fade on enter | full ink |
| H7 | **Stacking service rows**: rows pin and collapse into an index | home services | CSS sticky (≥768px wide and ≥600px tall; row step 48–64px) | plain list | plain list |
| H8 | **Roll-call**: industry/project names grey → ink/white at screen centre, side info appears | home "Built for" | scrubbed; info fade 400 ms | each item lights on enter, no scrub | all lit |
| H9 | **Case image hover**: mask reveal + scale 1.03 + "•" bullet slides in before title | work grid, home work | 600 ms ease-out-quint | none (tap goes straight to case) | none |
| H10 | Optional **WebGL ripple** on case images (R3F, lazy, desktop + capable GPU only) | /work grid only | 700 ms | static (H9 only) | static |
| H11 | Parallax on large case media (yPercent 6–10) | case pages | scrubbed | off | off |
| H12 | Services chapter focus: active chapter 100% opacity, others 25% | /services | 400 ms ease-out | off | off |

### 4.2b Bolder pass (owner, 2026-11-19: "Bolder")
Owner found the styleguide too static and chose **bolder** motion. Added on top of 4.1/4.2, same guardrails (reduced motion off, transform/clip only, Lighthouse 90+):

| # | Effect | Where | Duration / easing | Mobile | Reduced motion |
|---|---|---|---|---|---|
| H3 | **Hero intro (built)**: every headline word rises out of its own mask (70 ms stagger), then label, lead and buttons fade up. CSS only, no JS, never opacity on the headline | home hero, page heroes | 1000 ms ease-out-quint | same | static |
| H13 | **Title rise**: section titles rise word by word when they enter the screen (`RiseText`, word spans, never characters) | every section title | 1000 ms, 60 ms per word, once | same | visible |
| H14 | **Media expand**: large hero media starts inset with big corners and opens to full width as you scroll (clip-path scrub) | hero media (logo video), case heroes | scrubbed | off | full width |
| H15 | **Media unveil**: images wipe up from the bottom while settling from 1.18× zoom | case cards, case pages | 1100 / 1400 ms ease-out-quint | same | visible |
| L10 | **Magnetic buttons**: primary buttons lean toward the cursor, spring back on leave (`translate`, separate from the press scale) | hero + key CTAs | 500 ms ease-out-quint | off (touch) | off |

Still to come with real pages/assets: full page-transition curtain (H2), liquid-metal logo loop (H4), case image hover on real images (H9), parallax on case media (H11), characters (H5, later).

### 4.3 Motion budget per page
- Max **1 WebGL** context per page (only /work, lazy, desktop); max **1 autoplay video** in view; max **2 scrubbed ScrollTriggers** visible at once.
- Motion JS ≤ ~60 KB gz total (GSAP core + ScrollTrigger + Lenis), loaded after first paint; demos/characters lazy-loaded per section.
- Never animate the LCP element from `opacity: 0`; hero text uses transform/clip only.
- Target: **Lighthouse ≥ 90 (mobile)** for performance, accessibility, best practices, SEO on every page; CLS < 0.05.

| Page | Linear-style | Signature |
|---|---|---|
| Home | L1–L5, L7 | H1, H2, H3, H4, H6, H7, H8, H9 |
| /services | L1–L4 | H1, H2, H5, H12 |
| /services/[slug] | L1–L6 | H1, H2, H9 |
| /work | L1–L4 | H1, H2, H9, (H10) |
| /work/[slug] | L1–L4 | H1, H2, H11 |
| /how-we-work | L1–L6 | H1, H2 |
| /about | L1–L4, L7 | H1, H2, H6 |
| /contact | L1–L4, L8 | H1, H2 |

**WebGL & effect libraries:** react-three-fiber v9 + drei only for H10 (optional). Liquid-metal logo = **owner's exported video**, not a live shader. `shadergradient`: **not proposed** for now (no dark section needs a moving background; revisit only if the contact section feels flat, palette tones only, and only if it keeps 90+). No liquid-glass-js; the frosted header uses CSS `backdrop-filter`.

---

## 5. Sitemap
```
/                       Home
/services               All 7 service areas (story chapters)
/services/[slug]        7 detail pages (build first: /services/mobile-apps)
/work                   All case studies (grid + filter by area)
/work/[slug]            Case study (MDX): nutrition-coaching-app, rental-inspection-app
/how-we-work            Engagement models + process + FAQ
/about                  Who we are, numbers, principles
/contact                Form + book a call + what happens next
/privacy                Privacy policy
/404                    Not found (brand-idea moment)
/styleguide             Tokens, components, motion (noindex, dev review)
```
Not at launch: Insights/blog (MDX-ready, add when there are posts), careers (owner: no hiring).
Service slugs: `web-saas-development`, `mobile-apps`, `business-software`, `ai-solutions`, `ui-ux-branding`, `cloud-devops`, `launch-growth-support`.

---

## 6. Page-by-page plan

### Home `/`
1. **Hero** (dark recommended). Kicker `EPOX · FAISALABAD · SINCE 2019`; display headline "We find the problem / **before you do.**" (second line in silver n-300 as emphasis); one-line lead; primary "Let's talk", secondary "See our work"; liquid-metal logo video. _Pattern:_ Webisoft hero restraint + Hello Monday editorial scale. _Content:_ basics, USP. `[ASSET: liquid-metal logo video]`
2. **Proof strip**: three small facts in mono + text: "Since 2019" · "2 products live, still run by us" · "Web · Mobile · AI". _Pattern:_ Linear logo-row caption. _Content:_ basics, portfolio status.
3. **Services** `/ SERVICES · Seven ways we can help · 07`: 7 stacking rows (S/01–S/07: title, one-line promise, tags, "Explore"). _Pattern:_ Webisoft stacking rows. _Content:_ 7 areas table.
4. **Selected work** `/ WORK · Two products, both still live · 02`: two large case cards (image, outcome headline, fact row, live dot). _Pattern:_ Webisoft fact cards + Hello Monday image hover. _Content:_ cases 001/002. `[ASSET: case hero images]`
5. **How we work (live demo, dark)** `/ PROCESS · You'll always know what's happening`: L5 demo + 4 numbered steps (Find → Plan → Build → Run). _Pattern:_ Linear scripted UI. _Content:_ USP + engagement. `[PLACEHOLDER: process step copy confirm]`
6. **Built for (roll-call, dark)**: Health & nutrition · PropTech · [PLACEHOLDER: more industries]. _Pattern:_ Hello Monday roll-call. _Content:_ case sectors.
7. **Numbers scoreboard**: Since 2019 · products launched `[PLACEHOLDER]` · countries `[PLACEHOLDER]` · still live 2/2. _Pattern:_ Hello Monday awards scoreboard. _Content:_ basics + TODOs.
8. **Ways to work with us** (surface): 3 models (Fixed project · Dedicated developers · Monthly retainer): what you get, best for, no prices → "Let's talk". _Pattern:_ overview gap. _Content:_ pricing section.
9. **Statement** (H6): one paragraph about finding problems first. _Pattern:_ Webisoft char reveal (as words).
10. **Contact block + footer** (dark): headline, 3 "what happens next" steps, short form, "Book a call" `[PLACEHOLDER: booking link]`, trust strip, footer columns. _Pattern:_ Webisoft contact block.

### Services `/services`
Hero (h1 + lead) → 7 **story chapters** (sticky left slot: large chapter number now, `CharacterSlot` for art later; kicker "We build", h2, one opinionated paragraph, tags, 1 related case if any, "Explore [area]") → engagement models → contact block. _Pattern:_ Hello Monday services chapters + Webisoft numbering.

### Service detail `/services/[slug]` (template; first: Mobile apps)
Hero (S/02 · Mobile apps, h1 specific to the area, lead) → "What we build" (4–6 numbered capabilities from the internal catalogue) → feature chapters (title left / copy right / visual full-width, Linear) → related case (nutrition + rental apps for mobile) → tech we use (tags) `[PLACEHOLDER: tech stack per area]` → FAQ (L6) → contact block.

### Work `/work`
Hero `/ WORK · Products we built and still run · 02` → filter chips by area → grid of case cards (H9, optional H10) → contact block.

### Case study `/work/[slug]` (MDX template)
Hero in case colour (outcome headline, client descriptor, live dot) → **fact table** (Client · Sector · Region · Platforms · Engagement · Status · Duration) → `01 / What we found` (challenge) → `02 / What we built` (numbered bullets + screens) → `03 / What changed` (metrics `[PLACEHOLDER: result metric]`) → media gallery (H11) → tech tags → next case → contact block. Adding a project = one MDX file with frontmatter.
- Case 001 headline draft: _"A nutrition app with a real nutritionist inside"_.
- Case 002 headline draft: _"Apps that settle rental disputes before they start"_.

### How we work `/how-we-work`
Hero → 3 engagement models (comparison table: what's included, team, timeline style, best for; no prices) → process (live demo L5 + steps: Find · Scope · Build · Launch · Run) → communication (tools, update cadence, overlap hours `[PLACEHOLDER]`) → FAQ (NDA, ownership of code, payment terms `[PLACEHOLDER]`) → contact block.

### About `/about`
Hero ("A software house from Faisalabad, building since 2019") → statement (H6) → numbers scoreboard → principles (4 numbered: We find it first · We stay after launch · Clear communication · Your code is yours `[PLACEHOLDER: confirm]`) → where we are (Faisalabad, time zone) → contact block. No team photos (owner decision; `[TODO: founder/contact later]`).

### Contact `/contact`
Hero ("Tell us the problem. We'll tell you how we'd fix it.") → form (topic chips: New project · Existing product · Dedicated developers · Other; name, email, company (optional), message; consent text) with loading/success/error states → "Book a call" `[PLACEHOLDER: booking link]` → what happens next (3 steps) → email `[PLACEHOLDER: email]` + WhatsApp `[PLACEHOLDER]`.

### 404 / privacy
404: "Found: a page that doesn't exist." in display type + links (`CharacterSlot` for later art). Privacy: plain text page `[PLACEHOLDER: legal text]`.

---

## 7. Components
| Component | Notes | From |
|---|---|---|
| Header + mega-menu | wordmark left; Services (mega: 7 areas with one-liners, morphing panel), Work, How we work, About; "Let's talk" pill right; frosted when stuck; mobile full-screen sheet; keyboard: arrow keys, Esc, focus trap | Linear |
| Footer | display CTA line ("Have a problem worth solving? **Let's talk.**", second sentence silver), columns (Services, Company, Contact), live dot "2 products live", © + since 2019, small logo loop | Webisoft + Hello Monday |
| Section header | kicker (mono) · headline (h2) · count (mono) · optional "View all →" | Webisoft |
| Buttons | primary (pill, ink/paper), secondary (outline), text link (underline offset 4 px); sizes md/lg; press + focus states | Linear |
| Tags | mono uppercase, `surface` bg, radius 6 | Webisoft |
| Numbered service row | number · title · promise · tags · Explore; stacking variant | Webisoft |
| Story chapter | sticky art left, text right, related case | Hello Monday |
| Case card | image (16:10), kicker (Case 00X · sector · region), outcome headline, facts row, live dot | Webisoft + Hello Monday |
| Fact table | dl grid, mono dt, tabular dd | Webisoft |
| Live demo frames | board, CI checks, chat update, "FOUND:" marker; HTML/CSS only | Linear |
| Stats scoreboard | big numerals (tabular, count-up), mono label | Hello Monday |
| Roll-call | `rollcall` names (Now Display Light), count + one-liner, image on desktop | Hello Monday |
| Engagement models table | 3 columns, rows of attributes, CTA under each | gap |
| Statement reveal | word-level scroll reveal | Webisoft |
| Contact block | headline, 3 steps, form, book-a-call, trust strip | Webisoft |
| Form fields | label above, 1 px line, focus ring, error text, chips | Webisoft |
| Trust strip | Since 2019 · 2 products live · NDA on request · Faisalabad, PK · [optional profiles later] | Webisoft |
| Media | video (poster, lazy, plays in view), image (AVIF/WebP, blur placeholder), `[ASSET]` placeholder | n/a |
| FAQ accordion | L6 | n/a |
| Page transition + smooth-scroll provider | H1/H2 with reduced-motion switch | Hello Monday |
| `CharacterSlot` | empty, layout-neutral slot (renders nothing or the section number until art is added via one prop) | Hello Monday (later) |
| Logo | inline SVG "epox" wordmark (`epox-wordmark-currentcolor.svg`), black/white via `currentColor`; min height 18px | n/a |

---

## 8. Content gaps (needed by pages)
| Gap | Needed on | Status |
|---|---|---|
| Contact email, WhatsApp, socials | footer, contact | owner adds later → `[PLACEHOLDER]` |
| Booking link (Cal.com / Calendly) | contact block | ask |
| Client descriptors for both cases | case cards/pages | ask |
| Platforms per case (iOS/Android/web) | facts | confirm |
| Project durations | facts | ask |
| Results/metrics | case "What changed", scoreboard | owner: later |
| Case screenshots / screen recordings | cards, case pages | asset batch 1 |
| Numbers: products launched, countries delivered to, clients served | scoreboard | ask |
| Industries delivered beyond health & proptech | roll-call | ask |
| Tech stack per service area | service pages | ask |
| Process facts: update cadence, tools, working hours overlap | /how-we-work | ask |
| Ownership/NDA/payment terms for FAQ | /how-we-work | ask |
| Privacy policy text | /privacy | ask (or generate a draft for review) |
| Logo wordmark | everywhere | asset batch 1 |

**Contact form destination (owner to pick before Step 3 contact page):**
1. **Resend (email API) via a Next.js route handler** → lands in Epox inbox; free tier; full control of states. _Recommended._
2. **Formspree / Basin** → no backend, quickest; free tier limits; branding on free plans.
3. **HubSpot free CRM form** → submissions become CRM contacts (useful for outbound pipeline); heavier script.
4. **Google Sheets via Apps Script** → free, simple log; weaker spam protection.
Spam protection: honeypot + Cloudflare Turnstile.

---

## Owner decisions (2026-11-18) and what's still open
| Item | Decision |
|---|---|
| Palette | **A · Liquid Silver** (scale in §3.1) |
| Fonts | **Helvetica Now Display / Helvetica Now Text** (self-hosted) + **Geist Mono**, no serif |
| Logo | **"epox", Helvetica Now Display Bold, lowercase, tracking −6.5%** (`docs/logo/epox-wordmark-*.svg`) |
| Brand idea | **1 · We find it first** |
| Home hero | **Dark** |
| Characters | **Not at launch**; layouts work without them; `CharacterSlot` kept |
| Assets | none yet → marked placeholders everywhere |
| Contact form | **Resend → owner's inbox** (wired when building /contact) |

**Open:** liquid-metal logo video (owner makes it from `epox-wordmark-white.svg`); app screenshots/recordings later; font files stay local (public repo, see CLAUDE.md).
