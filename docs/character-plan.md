# Characters and character animation: plan (2026-11-19)

Status: **planned, paused. Owner will resume later.** Nothing from this is on the site yet. Supersedes "no characters at launch".

## Why
Hello Monday's characters are the most memorable thing on their site. Owner wants that kind of personality on Epox. We take the *idea* (a recurring pair, a scene per word/section, small idle motion), never their characters (see research/sites/hellomonday.md; frames studied from `research/raw/hellomonday/videos/home-desktop.webm` and `services-desktop.webm`).

## The cast (original)
- **Client**: tall, slim, white shirt, tie, curly hair (in redraw: straight side-parted hair so the silhouettes differ more).
- **Finder**: shorter, black blazer over a white tee, round glasses, curly hair. She finds the problem.
- Black ink on white, bold slightly wobbly line, simple faces, no grey, no gradients, no shadows, no text in the art.
- **One thin hand-drawn circle per scene marks the thing found or fixed.** Colour `#DE5849` on white/grey sections, **white on the coral hero** (coral on coral would vanish). Coral is used for nothing else in the art. Launch buttons etc. stay black.
- Client always left, Finder always right, one shared ground line, same scale in every scene.
- **Tone: professional and warm.** No gags that make the client look foolish (no sleeping, no tea sipping, no beetles). Decision made after the first hero set was rejected.

## Where, and what animates
| Place | Scenes | Motion |
|---|---|---|
| Home hero | 4: **Find, Plan, Build, Run** (same as the how-we-work steps); cycling word under the scene | scene swap ~3.6 s, characters rise + fade 400 ms, circle draws itself 700 ms, tiny idle bob |
| `/services` sticky rail | 7 service scenes (tight crops, work at small size) | idle loop 3 s, focus fade with the chapter |
| Service detail heroes | same 7, larger | plays once |
| How we work | the 4 steps (small) | circle draws on enter |
| Contact | Finder holds a "Found:" note; applause when the form sends | on success only |
| 404 | magnifier finds an empty picture frame | idle |
| Footer | working late by a window, day/night from the real Faisalabad time | slow |
Not on case cards or about (real product media / plain type work better).

## How it's built (no new library)
Inline SVG + GSAP (already bundled). Per scene: white silhouette + black ink + separate circle path (animated with stroke-dashoffset). Lazy-mounted after first paint, paused off-screen, **reduced motion = still frame with the circle drawn**, simpler on mobile. Files < 15 KB gz each. Limit of the traced approach: each scene is one layer, so whole-scene motion only; real per-limb animation (blink, wave) needs layered art, a later upgrade.
Tool: `scripts/trace-scenes.py SHEET.png OUT_DIR` traces a 2x2 sheet of scenes into those SVG layers and fits the circles (tested on the first hero set: ~30 KB raw / ~10 KB gz per scene).

## Art source
Reference sheet in the repo: `docs/characters/character-sheet-v1.png` (front, 3/4, side + 4 expressions for both). It shows the **first look** (Finder in a white lab coat). When attaching it to ChatGPT, add: "Finder wears a black blazer over a white tee, not the lab coat." Not served on the site (outside `site/`).
Owner generates reference images in ChatGPT with the prompts below; we trace/redraw them as our own SVG (the AI images themselves are not shipped as the final art). Owner takes responsibility for the licence of what they generate.

## Status of the art
- Character sheet: round 3 look approved (Client white shirt + tie, Finder black blazer + round glasses).
- **7 service scenes: approved** (web ruler, puzzle phone, paper to dashboard, AI chat bubble, UI pencil on button, server cable wrench, launch button + rising chart). Fixes when redrawn: launch button black not red; remove frame borders; straight hair for the Client.
- **Hero set: waiting on the owner**: the 4 images below (the first hero set with tea/sleeping gags was rejected and not used).
- Later sets to prompt: how-we-work steps (can reuse the hero 4), contact (note + applause), 404, footer (night/day).

## Prompt for the hero set (paste into the same ChatGPT chat as the approved characters)
```
Use the characters from the LAST set (Client: white shirt, tie, curly hair. Finder: black blazer over a white tee, round glasses). Draw 4 separate square images, FULL BODY head to feet, with empty white space around them. No border, no text. Client on the left, Finder on the right, one shared ground line, same size in every image. Black ink, bold wobbly line, no grey. Professional, warm and realistic, no jokes, nobody sleeping or sipping drinks. One hand-drawn coral (#DE5849) circle per image around the key detail.

1. Find: the Finder, standing, turns a laptop on a high table toward the Client. The screen shows a simple bar chart that drops sharply at the last bar. The Client leans in, listening. Circle on the dropped bar.
2. Plan: both stand at a whiteboard on legs. The Finder draws a simple timeline with 4 milestones; the Client points at the last one, nodding. Circle on the last milestone.
3. Build: the Finder sits at a laptop with a phone propped next to it, typing. The Client stands behind her holding a tablet showing a simple app screen. Circle on one button on the tablet screen.
4. Run: both stand side by side facing a large monitor with a rising line chart and a small round "live" dot. The Client gives a thumbs-up, the Finder smiles. Circle on the live dot.

At least 2000 px.
```

## Next steps when resuming
1. Owner sends the 4 hero images (and, if wanted, regenerates the 7 service scenes without borders).
2. `python3 scripts/trace-scenes.py hero.png site/public/art/hero`, then build `HeroScenes` (scene swap, cycling word Find/Plan/Build/Run, circle draw-on, reduced-motion still) on a branch `hero-characters`.
3. The hero's empty media area (logo-video placeholder) is replaced by the scene + word; the liquid-metal logo video stays pending for another place.
4. Screenshots + short recording for the owner, then merge. Then `/services` rail, how-we-work, 404, contact, footer.
