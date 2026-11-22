# Notiune (notiune.xyz)

**Focus:** full pass (agency): motion + 3D, creative presentation, design & style, services, conversion.
**Who:** "design and engineering studio", **three people** (CEO, COO, CDO named, with LinkedIn links). Registered as Notiune LLC, Sheridan, Wyoming (US). The work is mostly concepts for Pakistani local businesses (Islamabad, Rawalpindi, prices in Rs), so it is effectively **a close peer of Epox**: a small Pakistan-linked studio selling brand + web + software. Six products of their own (Tiune, OptimismAI, Ask Richard, Ask the Founders, IsItTrue, Boulder Bubble).
**Files:** `research/raw/notiune/` (pages: home, studio, work, services, journal, contact). Live notes: `raw/notiune/live-notes.md`. Videos + motion facts: `raw/notiune/videos/`, `raw/notiune/motion/`.
**Capture note:** the home hero and work room are WebGL inside scroll-pinned sections, so `desktop-full.png` and several `sections/*.png` come out **black or blank**. Use the videos and the live notes for those parts. A preloader holds 3–4 s on a cold load, so screenshots taken too early only show the wordmark.

---

## Focus deep dive 1: Motion & 3D

**Stack:** React SPA (Vite, lazy chunk per route incl. a separate `WorkRoom` chunk), three.js (2 canvases on home), Lenis, Tailwind. **Has reduced-motion support** (`motion-reduce:` classes; the sticky hero turns relative). Durations 150/300/500/700/900 ms; expo-out `cubic-bezier(.16,1,.3,1)` for entrances, in-out `(.77,0,.175,1)` for wipes, a small overshoot `(.34,1.35,.64,1)`. From `motion/*.json`: the preloader is an `#intro-door` (letters rise in, then the door slides up 30vh; hidden with reduced motion), `.page-enter` 450 ms `(.23,1,.32,1)`, headline `.line-mask` lines rise over 1 s expo-out, `.roll-a/.roll-b` text roll on link hover, `.product-play` an 11 s alternating loop on the products.

1. **Physical hero object.** A 3D tube in the brand gradient (copper → violet) runs across the paper hero. The cursor becomes a black circle reading "Click and hold". Holding pulls the tube toward the cursor. Release = spring back with a wobble. It is one clear, toy-like interaction, and the cursor label teaches it.
2. **One continuous scroll story out of the hero.** The camera flies into the tube → the tube becomes the **3D extruded logo** on a violet horizon with a glowing line and reflection + 3 stats → a **paper circle grows from the centre** (iris wipe) into the content. Hero, logo reveal and stats all come from one object, so nothing feels pasted together.
3. **Work as a 3D room (760vh).** The project screenshots are curved panels in a ring on a grid floor, and scrolling turns the ring. The panels bend like paper near the camera. The caption + "n of 12" update. Impressive, but it is a long scroll (7.6 screens) before the visitor reaches anything else.
4. **Live project viewer.** "Open" on a project shows **the real site in an iframe** inside a browser frame, with a **Desktop / Phone switch**, ← → arrows, keyboard hints ("arrow keys to move, Esc to close") and "Visit ↗". This is the most useful idea on the site: the visitor uses the work instead of looking at a screenshot.
5. **Brand page transition.** A black screen with the wordmark revealed letter by letter, fading over the next page. On a cold load it holds 3–4 s (too long; Hello Monday has the same problem).
6. **Footer horizon.** The glowing edge of a planet (violet → copper) under the contact block, plus **two analog clocks** (visitor's time / studio's time).
7. Quiet UI motion elsewhere: rows and links shift colour, underlines in the accent, no magnetic or bouncy buttons.

### Ideas worth adapting (motion)
- **The live project viewer with a Desktop / Phone switch** for our case studies, once there are live builds or demos we're allowed to show. It proves the work far better than screenshots.
- **A cursor label that teaches the one interaction** ("Click and hold"). Our glass logo tilts toward the cursor, but nothing tells the visitor they can play with it.
- **The hero object carrying the scroll story** (object → logo → stats → wipe into content). Our foil bars + glass logo could do the same in one piece instead of separate moments, but only as a short pin (1–1.5 screens), not their 2.5.
- **Two clocks** (visitor's time + ours) in the contact block: we already have LocalClock with the time gap, and they confirm it's a trust signal worth keeping.

### Avoid (motion)
- A 7.6-screen pinned work room on the home page. A cold prospect from outreach wants proof fast.
- A 3–4 s preloader on every cold load.
- Mostly black, blank pages on capture and slow first paint. Fine for a portfolio piece, risky for a site whose job is quick credibility.

---

## Focus deep dive 2: Creative presentation & voice

- **Brand idea from the name:** "Notiune means notion" → "Your notion, built." Simple, owned, repeated (the title tag, the OG image, the hero).
- **Strong point of view in the copy.** Studio page: "Mediocrity got normalised. We didn't agree." · "What we won't trade: Soul." · a Durant/Aristotle quote on excellence as habit. Journal = "Notes from the studio. Mostly arguments we've already had internally." It reads like people, not a template.
- **Own products as proof.** "Six products, live and in people's hands" with one sentence on "what sits underneath each one" (the idea, not the feature). For a three-person studio, that is the main credibility device.
- **Honest labels:** concept work is labelled **"concept"** and their own work **"ours"**. Nothing pretends to be a client.
- **Counts in the nav:** Work (12), Services (5), Journal (5). A small signal that there is substance behind each link.
- Journal posts are only one paragraph (~50 words) each, so they read as a principles list split into pages, not as articles.

### Ideas worth adapting (creative)
- **"concept" / "ours" honesty labels** if we ever show concept or internal work next to client work.
- **A "what we won't trade" / principles page in a confident voice.** Our /about principles are already there; their tone is sharper and more personal.
- **Counts next to nav items** (Work (2), Services (7)): cheap, and fits our tabular-number rule.

---

## Design & style
- **Palette:** paper ground `#F1F0EC` (warm off-white), ink `#121212`, muted text `#5A5853` / `#6B6964`, black `#000` and near-black violet `#050108` / `#0D0912` for the 3D sections. **One brand gradient, copper → violet** (approx. `#C4704F` → `#7B3FC4`), accent text `#6A35B5`. The gradient only appears on the 3D tube, thin rules, the logo scene, the footer horizon and the small square before "Let's talk". The same restraint as our foil rule.
- **Type:** a single family, **Schibsted Grotesk** (variable, weights 400 / 500 / 540). Huge display (158px / 540 / −0.055em tracking on the hero, 100 / 78 / 72 / 52px below). Body 16–17px. **No labels in capitals**: small labels are 14px sentence case in grey.
- **Layout:** 64px side margin at 1440, wide left gutter for small section labels ("How a project runs", "What we do"), content offset to a right column. Hairline rows (`ink/10`). Black square buttons, no radius ("Let's talk" 1141×52, white text). Almost no cards.
- **Rhythm:** paper for reading, black for the 3D moments (hero logo scene, work room, footer).

## Services & content
- **5 services:** Brand, Websites, Web apps, Software (desktop apps for macOS + Windows), Hosting and care. Each one has a one-line promise, a "What's included" list (4–5 items) and its own CTA ("Talk to us about a website →").
- **Hosting and care, "Set up in your name":** domain, hosting, email, updates, **a written handover guide**. A clear answer to the "will we own it?" fear.
- **Process, 4 steps** (also on the home page): Talk (call → written scope + quote) · Design (real screens with your content, before any code) · Build (tested on real phones) · Launch and after.
- **FAQ "Straight answers.":** cost, time, ownership, editing it yourself, industries.
- No tech stack, no industries list, no case studies with results (only live demos).

## Pricing & engagement models
- No prices. "It depends on the scope. You get a quote before any work starts." No engagement models (project work only).

## Conversion
- "Let's talk" in the nav (with the gradient square), the hero, and every page's closing block "So what are you making?".
- The contact block shows the **email + phone big**, "We reply within hours" and the two clocks.
- **Form:** topic chips first (A website / An app or system / A brand / Something else), then Name, Email*, Phone, Company, What you need. Only email is required. Under the button: "Goes to we@… We reply within hours. No mailing list."
- Careers line on studio + contact ("always in search of great humans").

## Technical
- React + Vite SPA, client-rendered (the text appears after JS runs), three.js, Lenis, Tailwind. Routes are lazy chunks. Concept sites are self-hosted under `/showcase/<name>/`. HubSpot/Intercom were flagged by the capture script's clue matcher (nothing visible on the page). Cold load: preloader 3–4 s.

## Key screenshots & videos
- `home/sections/01-sticky.png`: hero with the tube + "Click and hold" cursor.
- `home/sections/06-relative.png`: the 3D work room (curved panels on the grid floor).
- `home/sections/04-relative.png`: the 4-step process with the gradient rule.
- `services/desktop-full.png`: services with "What's included" + per-service CTA.
- `work/desktop-full.png`: the filter + screenshot grid.
- `contact/desktop-full.png`: topic chips + short form.
- `videos/home-desktop.webm`: tube → logo → iris wipe → work room → footer horizon.
- `videos/work-desktop.webm`: the work room + grid.

## Relevance to Epox (summary)
They are the closest peer researched so far (small, Pakistan-linked, brand + web + software, outbound-friendly contact). Where they are ahead: the **live project viewer**, **own products as proof**, an **honest concept/ours label**, a **sharp voice**, a **"set up in your name" + handover** promise. Where we are ahead: faster to the point (no long pin or preloader), **server-rendered pages**, **engagement models compared**, **case studies with fact tables**, more services and a clearer offshore story (time zone, communication). Our Ice Mint + foil already uses the same "one gradient, used rarely" discipline, so nothing in their palette needs copying.
