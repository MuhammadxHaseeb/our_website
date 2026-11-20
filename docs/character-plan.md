# Characters and character animation: plan (2026-11-19, updated 2026-11-21)

Status: **PAUSED 2026-11-21 by the owner, mid-way through the art style question (§0.6).** Nothing from this is on the site yet. Supersedes "no characters at launch".

## 0. Update 2026-11-21: new cast (supersedes "The cast" below)
Owner's goal: a "Bugs Bunny"-level mascot, i.e. instantly recognisable and with real personality, that makes a cold prospect **trust** Epox. Sections 1+ below are the older Client + Finder plan, kept for history. Their motion, build and tracing notes still apply; cast, prompts and the 7 review issues partly don't.

### 0.1 Art rounds (all in `docs/characters/`)
- `character-sheet-v1.png`: Client + Finder (lab coat). Rejected: the two look alike, read as students, lab coat = doctor, mug = idle, AI hand errors.
- `character-sheet-v3.webp`: Client + Finder (bob + round glasses, blazer). Trustworthy but generic stock clip-art; the Finder (bob + fringe + glasses + magnifier) is too close to a famous cartoon detective.
- `character-sheet-v4.webp` + `moments-v4.webp`: **the owner's own two characters (current direction).** Personalities read well. Fixes still needed on the sheet: Character 1's hair drifts curly in the close-ups (must stay short and straight); Character 2 looks ~17 (needs a jaw, late 20s); Character 1's jacket swaps between overshirt and blazer; Character 2's pointing face looks angry; heights inconsistent (Character 2's head should reach Character 1's chin).

### 0.2 The cast: both are Epox, both men. Names: not chosen yet.
The client is no longer drawn: **the visitor is the client**, and the two look out of the screen and talk to them.
- **Character 1, the dev head.** Tall, lean, straight lines, short straight hair, trimmed beard, black overshirt over a white tee, smartwatch, earbuds, phone always in hand (checks what's new in tech). Nonchalant, very mature, responsible, endlessly patient ("always waits outside until you arrive"). Has no patience for childish talk or wasted time. At 2am when something breaks: "Ahh man, gotta clean this up." Smiles (dry smirk) when his friend embarrasses himself.
- **Character 2, the driver.** Shorter, broad, round shapes, big curly hair, white shirt with sleeves rolled up, black boots, hands free. Optimistic, never loses hope, keeps pushing ("if cornered, breaks the wall"). Main developer too, and handles client communication: reads people, talks to each in their own language, makes the final call ("the nudge"), keeps the group together, makes sure nobody is left out. When a plan breaks: "Don't worry, everything's fine," already working out the fix.

### 0.3 Trust filter (what reaches the site)
- Owner's "manipulative" → on the site: **reads people, explains clearly, calms you down.** Never salesy.
- "Doesn't give a f\*\*\*" → **calm under pressure, already has the plan.** Paired with Character 1's "gotta clean this up" = honest + reassuring (the trust formula).
- Slang ("chudmaxing", "aura") stays off the site (maybe social media). Keep the meaning: "Let's do something useful."
- Teasing only between the two of them, never at the client.

### 0.4 Scenes and lines (drafts)
| Place | Who | Moment / line |
|---|---|---|
| Contact | Character 1 | Leaning by a door, waiting patiently: "Take your time. We'll be here." (best v4 panel) |
| Form sent | Character 2 | "Got it. We'll take it from here." |
| 404 | Both | Character 2 trips over a cable (page "unplugged"): "Don't worry, everything's fine." Character 1: "Ahh man, gotta clean this up." (the only place for the trip gag) |
| How we work | Character 1 | "Fewer meetings. More useful work." |
| Support / retainers | Both | 2am fix: Character 1 at the laptop, Character 2 thumbs-up behind |
| Plan step / ways to work | Character 2 | The nudge (fix: Character 1 looks up from the phone toward where Character 2 points) |
| Home intro / footer | Both | Hello wave; footer: Character 2's arm around Character 1 |
| Hero + Project rescue (service 07) | Both | **"The one brick"** (below) |

**"The one brick"** replaces the wall-smash (owner: smashing doesn't fit the site). A wall blocks the path to the client's finished app → Character 1 finds the ONE brick (circle draws round it = "We find it first") → Character 2 pulls that brick and the wall comes down → both walk through to the live app and Character 2 waves the visitor along. Proposed as the **whole home hero as one continuous story** (Find / Plan / Build / Run) instead of 4 separate scenes. Signature moves: Character 1 = the circle, Character 2 = the pull.

### 0.5 Holo Foil theme (`docs/brand/holo-foil-board.jpg`, the business card theme)
Black `#0B0B0D`, pearl `#F4F4F5`, steel `#DCDCE1`, holo foil (logo/hero/print only), acid lime `#C6FF3D` and infrared `#FF3B30` (off-guard: one spot each per layout); Unbounded (display) + Manrope (text). **It is NOT the site's theme** (site = Webisoft coral, Inter Tight); whether it replaces it later is undecided.
If the characters live in Holo Foil: holo never on the characters (one allowed accent: Character 1's phone screen or the finished app); characters sit on pearl (on black: inside a pearl card); the found circle = **infrared** (3.2:1 on pearl, 5.5:1 on black; lime is invisible on pearl so lime stays for buttons); bolder, even line.
**Business card built:** `docs/card/` (front = Holo Foil board, back = "We find it first." + infrared circle + lime "Let's talk" + **dummy QR** + v4 Hello pair). Export: `node scripts/render-card.js`. Before real print: real QR once there's a domain (`our-website.vercel.app` belongs to someone else), final character art, and a foil layer if the printer offers foil.

### 0.6 Open question when resuming: the art style
Owner's friend: "if you make it holo foil theme, the art style doesn't fit." Agreed: the **personalities fit, the drawing style doesn't** (wobbly comic line vs precise geometry, too many small lines, comic grins, no link to the theme). Plan: keep the characters, redraw them in a style built from the theme. Test ONE pose (Hello) in 2 styles, put each on the card back, compare current / A / B with the friend, then lock the style for every future scene **before anything is traced**. Prompts (paste in the same ChatGPT chat as v4):

Style A, geometric line:
```
Redraw panel 6 (Hello: both waving at the viewer) with the same two characters, same pose, in a NEW style:
- Precise geometric vector line art. Every line the same thick weight with round ends. No wobble, no sketchiness.
- Shapes built from circles, rounded rectangles and straight lines, like a modern geometric typeface. Fewer lines: no clothing folds, simple hands.
- Minimal faces: dot eyes, one simple curved line for the mouth. Character 1's beard and Character 2's curls as clean solid black shapes with smooth edges.
- Near-black (#0B0B0D) on pearl white (#F4F4F5). No grey, no shading, no text.
- One accent only: Character 1's phone screen is filled with a soft holographic gradient (pastel lavender, mint, pale yellow, sky blue).
Square image, full body, plain pearl background.
```
Style B, bold flat shapes:
```
Redraw panel 6 (Hello: both waving at the viewer) with the same two characters, same pose, in a NEW style:
- Bold flat graphic style: solid flat shapes, almost no outlines, like cut paper. Big simple shapes, very few details.
- Only two colours: near-black (#0B0B0D) and pearl white (#F4F4F5). Pearl shapes are separated from the background by thin black edges only where needed.
- Faces reduced to the minimum: small dot eyes, short mouth line. Character 1's beard and Character 2's curls are the strongest shapes.
- Edges of hair and jacket cut at the same slight slant angle, like an italic letter.
- One accent only: Character 1's phone screen is filled with a soft holographic gradient (pastel lavender, mint, pale yellow, sky blue).
Square image, full body, plain pearl background.
```
Also still open: names; whether the two are based on real people (and should look like them); whether Holo Foil becomes the site theme.

---

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
