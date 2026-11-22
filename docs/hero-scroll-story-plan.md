# Home hero scroll story: plan (2026-11-22)

> **Revised 2026-11-22 (owner: "what we are doing is fading, Notiune's was a seamless transition"):** the built version
> is ONE continuous camera flight, no cross-fades and no wipe. Pinned 1.6 screens: the copy scrolls away while the camera
> flies straight at a point on the middle foil bar until the screen is all foil (p 0 → .42); it passes through, and the
> space behind is lit in exactly that foil colour (fog in the same colour) and dims to brand black as the camera glides
> on to the glass wordmark floating 4000 units behind, which turns to face you (.42 → .76); the Found corners lock on
> (.72 → .8), the proof strip slides up (.74 → .92); then the stage unpins and the page scrolls on into Services.
> Seamless because the 3D scene draws the hero's foil bars itself, pixel-matched to the SVG (same gradient, sheen, grain),
> and flying straight at a point on a flat plane equals scaling the picture about that point, so the SVG fallback
> (scaled about the same point before the 3D is ready) and the 3D camera draw the same frames. Maths in `lib/story.ts`.
> The table below is the first (faded) version, kept for history.

Idea taken from Notiune (`research/sites/notiune.md`, motion idea 2): one hero object carries a single continuous scroll story (object → logo → proof → wipe into the content). We build **our own version from our own pieces**: the foil bars (the E), the holographic glass wordmark, the Found corners, the proof strip and the slanted foil wipe. We do not use their tube, their circle iris or their timing.

## The story (desktop, motion allowed)

The hero becomes one **sticky stage** (100svh) inside a taller wrapper, so it stays pinned for **~1.2 screens** of scroll. Notiune pins for ~2.5 screens, which is too long for a prospect who came from cold outreach. One scroll progress value `p` (0 → 1) drives everything.

| p | What the visitor sees | Built from |
|---|---|---|
| **0** | Same as today: label, headline with the Found scan on "before", lead, Let's talk + See our work, foil bars running off the right edge. The headline stays the LCP element, untouched. | as now |
| **0 → 0.25** · *step back* | The headline, lead and CTAs lift ~40px and fade. The three foil bar layers slide apart (FoilBars "split" already does this) and fade, while the 3D stage fades in behind with the same bars as its backdrop. | RiseText/hero DOM + `FoilBars` + `GlassLogo` |
| **0.25 → 0.6** · *the logo turns to face you* | The glass wordmark starts **edge-on** (a thin glass sliver) and turns to face the visitor (rotation.y ≈ 1.5 → 0 rad) while the camera eases back a little. The bars behind it bend through the glass as it turns. Cursor tilt keeps working on top. | `GlassLogo` (new `progress` input) |
| **≈0.55** · *found* | The **four Found corners lock onto the wordmark**, the same device as the headline highlight. This is where "We find it first" closes the loop. | Found-corner CSS from RiseText, positioned from the logo's projected screen bounds |
| **0.55 → 0.8** · *proof* | The proof strip rises in under the logo: **Since 2019 · 2 products, live (live dot) · Web · Mobile · AI**. It's real text, the same strip that sits under the hero today. | existing proof strip, moved into the stage |
| **0.8 → 1** · *open onto the content* | **One foil bar at the E angle sweeps across the stage** (the PageWipe look). Behind its trailing edge the stage is gone and the Services section is already there. The page then scrolls on normally. | `.page-wipe` styling, scroll-driven instead of timed |

**Why a foil sweep and not a circle:** the section after the hero (Services) is Black, like the hero. A circle opening black onto black would be invisible. The slanted foil bar is already our page-change signature, so the exit says "epox" instead of "Notiune". Alternative if the owner prefers it: **an iris through the "o" of the glass wordmark**. That only works if the next section is Paper, which means moving the home Services rows onto a `.soft` band (a design change).

## Other devices and settings
- **Phones, tablets, low-power desktops (no live 3D):** **no pin**. Pinning under a mobile address bar is jumpy, and the extra scroll costs time on a small screen. The layout stays as today (headline → glass loop video expanding → proof strip), and the stats rise in as they enter.
- **Reduced motion / Data Saver:** no pin, no story. The static layout stays as today.
- **No JS yet / slow load:** the extra wrapper height is only added when JS sets `.story-on` on capable desktops. Before that the hero is the normal hero, so there is never an empty scroll gap.

## How to build it

**New pieces**
1. `site/src/lib/story.ts`: a tiny progress store, like `lib/light.ts`: `setStory(p)`, `onStory(cb)`, plus a `--p` CSS variable on the stage. No React re-render per frame.
2. `site/src/components/brand/HeroStory.tsx` (client): wraps the hero. On capable desktops it adds `.story-on` and creates **one GSAP ScrollTrigger** (already lazy-loaded through `lib/motion.ts` and wired to Lenis) with `scrub`, `start: 'top top'` and `end: '+=120%'`. `onUpdate` writes `--p` and calls `setStory`. Cleanup kills the trigger and removes the class.

**Changed pieces**
3. `app/page.tsx`: the hero becomes `<HeroStory>` → `.hero-stage` (sticky) containing today's hero content, the logo layer (full-bleed, behind the text in story mode) and the proof strip. Outside story mode the DOM order and layout stay as today (logo below the text, `ExpandOnScroll`).
4. `GlassLogo.tsx`:
   - reads `onStory` and adds the story pose on top of the light tilt: an edge-on → front turn, a camera ease-back, and a small lift so the stats fit underneath.
   - each frame, it projects the logo's bounding box to screen coordinates and writes `--fx/--fy/--fw/--fh` on the corner overlay, so the Found corners hug the real glass word.
   - in story mode, `dpr` is capped at 1.25 because the canvas is now full screen.
5. `LiquidLogo.tsx`: a `stage` variant (full-bleed canvas). Until the 3D has drawn its first frame, the WebP still sits in its place and follows the same `--p` transforms (scale and turn faked with `scaleX`), so the story never waits for WebGL.
6. `styles/components.css`: phase rules written as `calc()` on `--p` (opacity and transform only, no layout properties), the sticky stage, the wrapper height under `.story-on`, and the scroll-driven `.story-wipe` (same gradient as `.page-wipe`, `translateX` from `--p`).
7. `app/styleguide/page.tsx`: add **H16 Hero scroll story** to the motion table.

**Details to get right**
- **Keyboard:** if focus enters the stage (Let's talk, See our work) while it has faded, scroll back to the story's start so focused buttons are never invisible.
- **Header:** the stage is Black, so the header tone stays dark; check it flips correctly when the wipe hands over to Services.
- **Found corners:** they appear once per visit going down. Scrolling back up hides them again, and they relock without replaying the full scan.
- **Resize / orientation:** recompute on `ScrollTrigger.refresh()`. If the window drops below 768px, remove `.story-on`.
- **Budgets:** Lighthouse desktop stays 100 and mobile ≥ 90; CLS 0 (story mode only adds height after load, below the fold, never above the headline); no overflow at 390 / 1440 / 2560.

## Steps
1. Build it on a branch (`hero-story`) with the `progress` hooks in GlassLogo first, then check it in the browser at 1440 and 2560 with a scroll video (`scripts/record.js` on the preview URL).
2. Owner reviews the Vercel preview link → tweak the timing (pin length, where the corners lock) → merge to `main`.

## Open choices for the owner
- **Exit:** foil sweep at the E angle (recommended) or iris through the "o" (needs Services on Paper).
- **Pin length:** 1.2 screens (recommended) or 1.5.
- **Found corners on the logo:** yes (recommended, it closes "We find it first") or keep them only on the headline.

## Related items from the Notiune list (separate steps)
- **Cursor label** that teaches the glass logo ("Move to tilt"): add it to the resting state of this same stage, so build it right after the story.
- **Live project viewer** with a Desktop / Phone switch for case studies (needs live builds or demos we're allowed to embed).
- **"concept" / "ours" labels** on work cards and case heroes.
- **"Set up in your name" + written handover guide** in Hosting / care and on `/how-we-work` (needs the owner's handover facts).
