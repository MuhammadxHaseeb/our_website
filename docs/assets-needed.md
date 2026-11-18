# Epox website: assets needed

_Every visual asset the site needs. Until an asset arrives, the site shows a clearly marked placeholder `[ASSET: name]`. Never use reference-site art or stock filler._
Drop files in `site/public/assets/incoming/` (or share a link) using the **file name** in the first column; I'll optimise them (AVIF/WebP, sizes, posters).

Legend: **P1** = needed for launch · **P2** = nice to have · ☐ = not received yet

## Launch: batch 1 (please send these first)
1. Logo wordmark (SVG, black + white) · L1–L2
2. Liquid-metal logo loop (MP4 + WebM + still) · L4
3. Case 001 + Case 002 app screenshots (or screen recordings) · C1–C4
4. Favicon source (or I derive it from the wordmark) · L5
5. Confirm illustration route (see "Characters": commission/draw, or launch without characters first)

---

## 1. Logo
| ☐ | File name | Where used | What / style notes | Size & ratio | Format | Priority |
|---|---|---|---|---|---|---|
| ☐ | `logo-wordmark-black.svg` (L1) | header on light, footer on light, OG images | clean wordmark "Epox"; geometric, tight tracking; must read at 20 px tall; no tagline in the file | vector; artboard trimmed to the letters | SVG (outlined text) | P1 |
| ☐ | `logo-wordmark-white.svg` (L2) | header on dark hero, footer, dark sections | same, white | vector | SVG | P1 |
| ☐ | `logo-mark.svg` (L3) | favicon, app icon, small spots | single-letter mark or "E" monogram derived from wordmark (optional) | square, 1:1 | SVG | P2 |
| ☐ | `logo-liquid-metal.webm` + `.mp4` + `logo-liquid-metal-poster.png` (L4) | **home hero** (large, beside/behind headline) and **footer** (small loop). **Not** a loading screen (no preloader rule). | exported from collidingScopes/liquid-logo; silver/chrome liquid on **solid ink background in the chosen palette's `ink` hex** (no transparency needed); seamless 6–8 s loop; slow, calm motion; logo centred with ~20% padding | hero: 1920×1080 (16:9) **and** 1080×1350 (4:5) for mobile; footer: 800×450 | WebM (VP9, ≤ 2.5 MB) + MP4 (H.264, ≤ 3 MB), 30 fps, no audio; poster = first frame PNG 1920×1080 | P1 |
| ☐ | `favicon.svg` / I generate `favicon.ico`, `apple-touch-icon.png` (L5) | browser tab, iOS home | wordmark "E" or mark, works at 16 px, on ink square | 512×512 source | SVG or PNG | P1 |

## 2. Case studies (one set per project)
| ☐ | File name | Where used | What / style notes | Size & ratio | Format | Priority |
|---|---|---|---|---|---|---|
| ☐ | `case-nutrition-hero.png` (C1) | home "Selected work" card, /work grid, case hero | best 2–3 phone screens of the nutrition app (meal log + chat with nutritionist) on a clean background; no client logo if anonymised | 2400×1500 (16:10) | PNG/JPG high quality (I convert) | P1 |
| ☐ | `case-nutrition-screens/*.png` (C2) | case page "What we built" gallery | 6–10 raw app screenshots (iOS/Android) + web if any: onboarding, meal logging, nutrition summary, nutritionist chat, booking | device-native resolution | PNG | P1 |
| ☐ | `case-nutrition-flow.mp4` (C3) | case page, optional home card hover | 10–20 s screen recording of a key flow (log a meal → ask the nutritionist) | 1080×2340 portrait or 1920×1080 | MP4 | P2 |
| ☐ | `case-rental-hero.png` (C1) | as above | inspection app: move-in photo walk-through + side-by-side comparison screen | 2400×1500 (16:10) | PNG/JPG | P1 |
| ☐ | `case-rental-screens/*.png` (C2) | case gallery | 6–10 screens: property setup, room-by-room photos, sealed record, move-out comparison, report/share | native | PNG | P1 |
| ☐ | `case-rental-flow.mp4` (C3) | case page | 10–20 s recording of the side-by-side comparison | as above | MP4 | P2 |
| ☐ | `case-*-colour.txt` (C4) | case hero background | one brand colour per app (hex) for the case hero band, *or* we keep cases in the site palette | n/a | text | P1 |
| ☐ | `case-*-web.png` (C5) | case gallery | screenshots of the websites (owner listed "website") | 1440 wide, full page | PNG | P2 |

## 3. Characters & illustrations (personality layer)
Style for all: **black ink line illustration on white**, confident uneven line, minimal fill (solid black areas allowed), no colour or only the palette's accent, the same characters every time. Feel reference only (do **not** copy): `research/raw/hellomonday/home/sections/01-slice.png` and `research/raw/hellomonday/services/sections/02-slice.png`. Our characters should be **our own**: e.g. an Epox team trio (developer, designer, project lead) who *find* problems (magnifier, sticky notes, phone in hand) to match the brand idea.
| ☐ | File name | Where used | What it shows | Size & ratio | Format | Priority |
|---|---|---|---|---|---|---|
| ☐ | `char-hero.svg` (+ optional `char-hero.lottie`) (I1) | home hero (only if hero uses characters; else skip) | the trio spotting a problem on a giant phone/laptop | 1200×1200 (1:1) | SVG (+ Lottie JSON for idle loop) | P2 |
| ☐ | `char-service-01…07.svg` (I2) | /services chapters (sticky left), service detail heroes | one scene per area: 01 web (building a browser window), 02 mobile (assembling a phone), 03 business software (spreadsheets turning into a dashboard), 04 AI (talking to a friendly bot), 05 UI/UX & branding (sketching), 06 cloud & DevOps (pipes/servers), 07 launch & support (watering a plant / rocket launch) | 800×800 (1:1) | SVG (+ Lottie optional) | P1 if we use characters; else P2 |
| ☐ | `char-404.svg` (I3) | 404 page | a character with a magnifier finding an empty frame ("Found: a page that doesn't exist") | 1000×800 (5:4) | SVG | P2 |
| ☐ | `char-footer.svg` (I4) | footer | one small idle scene (e.g. working at night by a window, but our own) | 600×600 | SVG | P2 |
| ☐ | `char-contact.svg` (I5) | contact page | character holding a note "FOUND:" | 800×800 | SVG | P2 |
**Decision needed:** commission/draw the characters (P1 for /services), or launch without characters and use case screens + type only (fully premium, less personality), adding characters later.

## 4. Photography (optional; no team photos for now)
| ☐ | File name | Where used | What / style | Size | Format | Priority |
|---|---|---|---|---|---|---|
| ☐ | `photo-office-*.jpg` (P1) | about, how-we-work | black & white documentary photos of the workspace (screens, desks, whiteboards), no faces needed | 2400×1600 (3:2) | JPG | P2 |
| ☐ | `photo-faisalabad.jpg` (P2) | about "Where we are" | B&W city/street detail of Faisalabad | 2400×1600 | JPG | P2 |
| ☐ | founder/contact portrait (P3) | later (owner TODO) | B&W, neutral background | 1600×2000 (4:5) | JPG | later |

## 5. Icons
| ☐ | Item | Where | Notes | Priority |
|---|---|---|---|---|
| n/a | **Lucide** icon set (open source, I add it) | arrows, menu, close, check, external link, chat, mail, phone, platform icons | 1.5 px stroke, 16/20/24 px only. No asset needed from you. | P1 |
| ☐ | Service area icons (optional) | service rows | only if you want custom glyphs (black geometric, one per area); otherwise numbers carry the rows | P2 |

## 6. SEO & sharing
| ☐ | File | Where | Notes | Size | Priority |
|---|---|---|---|---|---|
| (I make) | `og-default.png` | social shares of any page | wordmark + headline on ink, generated from tokens once logo + palette are chosen | 1200×630 | P1 |
| (I make) | `og-case-*.png` | case study shares | case headline + hero image | 1200×630 | P1 |
| (I make) | `og-service-*.png` | service shares | area name + number | 1200×630 | P2 |
| (I make) | favicons, `apple-touch-icon.png`, `manifest` icons | browser/devices | derived from L3/L5 | 16–512 | P1 |

## 7. Content files (text, not images, but blocking the same pages)
See `docs/design-brief.md` §8: contact email/WhatsApp/socials, booking link, client descriptors, platforms per case, durations, results/metrics, numbers for the scoreboard, extra industries, tech per service, process facts, FAQ terms, privacy text.
