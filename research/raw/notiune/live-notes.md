# Notiune: live notes (2026-11-22, Claude's built-in browser, 1440×900)

Read only: no form submits. Opened the project viewer, scrolled, hovered, held the hero.

## Home
- **Hero (sticky, ~2250px of scroll):** paper ground `#F1F0EC`, huge "Your notion, built." (Schibsted Grotesk 158px / 540, −0.055em). A **3D tube** (copper → violet gradient, soft shadow) runs across the screen with square-wave bends. A black circle cursor reads **"Click and hold"**, with small viewfinder corners. Holding stretches the tube toward the cursor. On release it springs back and wobbles (physics, not keyframes).
- **Scroll 0 → ~1100px:** the camera flies into the tube, so the screen fills with violet. The tube then becomes a **3D extruded "notiune" logo** standing on a dark violet horizon, with a glowing horizon line and a reflection. Small labels sit at the top: "Notiune is a studio of three" on the left, "Design and engineering" on the right. Three stats sit at the bottom: **6** Products shipped · **50** (brands) · **15** (years collective).
- **~1900px:** a paper-coloured **circle grows from the centre** (iris wipe) and opens onto the paper section.
- "One studio for brand, web and software." / "Three people, from the first call to long after launch." A thin copper → violet line sits above the 4 steps (Talk, Design, Build, Launch and after). The step numbers are violet `#6A35B5`.
- **What we do:** 5 big rows (Brand, Websites, Web apps, Software, Hosting and care). Each row is a name plus one line, separated by hairlines, and links to `/services#…`. The hover is quiet.
- **Recent work = "WorkRoom" (760vh section, black):** the project screenshots are **curved panels standing in a ring on a 3D grid floor**. Scrolling turns the ring, and the panels bend like paper as they pass the camera. The caption bottom-left reads "Joyland / Amusement park, concept", the counter bottom-right reads "12 of 12", and the top-right link is "All work, by service".
- **Our own products:** 6 huge names (Tiune, OptimismAI, Ask Richard…), each with one line on the right and ↗ (links to the external product).
- **Footer "horizon":** black, with the glowing edge of a planet at the bottom (violet → copper). **Two analog clocks** show "Your time" and "Sheridan, Wyoming". Big email and phone, a white "Let's talk" button, and "We reply within hours".

## Page change / load
- Black screen; the **"notiune" wordmark reveals letter by letter** (a mask from the bottom). On a cold load it holds about 3–4 s. On a route change it fades out over the new page, and you can see the 3D room through it.

## Work
- Opens straight into the same 3D room, with the link "All 12 as a list ↓". Below it is a filter (All / Websites / Web apps / Software) and a 3-column grid of screenshots, each with "Open →".
- **"Open" = a full-screen viewer (role=dialog) with the real site in an iframe** (`/showcase/neo-pizza/index.html`). It sits inside a browser frame with a **Desktop / Phone switch**, ← → arrows, "Visit ↗" and ×. The footer reads "2 of 12 · arrow keys to move, Esc to close". The concept sites are hosted on their own domain and are fully clickable.
- The work is honest: client-style projects are labelled **"concept"** (designed for local businesses, not commissioned), and their own products are labelled "ours".

## Services
- Hero "Brand, web and software." / "From the first call to launch, and after." Anchor chips sit at the right.
- Each service: a big visual on the left, the name + one line + "What's included" list on the right, and a "Talk to us about a website →" link (underline drawn in the accent). The Brand visual is their logotype on the planet horizon ("Our own logotype, drawn from three parts"). The Websites visual is a desktop + phone mockup of the concepts.
- Hosting and care: "Set up in your name" + "A written handover guide".
- FAQ "Straight answers." Answer to cost: "It depends on the scope. You get a quote before any work starts."

## Contact
- "So what are you making?" Topic chips (A website / An app or system / A brand / Something else), then Name, Email*, Phone, Company, What you need. Button "Send enquiry". Under it: "Goes to we@… We reply within hours. No mailing list."

## Tech seen
- React SPA (Vite, a lazy chunk per route: Work, WorkRoom, Services, Studio), Tailwind (`motion-reduce:` classes, 6 reduced-motion rules), three.js (2 canvases on home), Lenis (`html.lenis`).
- Durations 150 / 300 / 500 / 700 / 900 ms. Easings include expo-out `cubic-bezier(.16,1,.3,1)`, `(.23,1,.32,1)`, in-out `(.77,0,.175,1)` and a small overshoot `(.34,1.35,.64,1)`.
