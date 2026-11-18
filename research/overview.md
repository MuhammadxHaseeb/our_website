# Research overview

_Last updated: 2026-11-18 · Sites: 3 (Webisoft, Linear, Hello Monday) · Competitors (Services & pricing focus): none yet_

## Comparison

| Site | Focus | Vibe | Primary colour | Fonts | Motion level | Shows pricing | Price range | Main CTA | Standout feature |
|---|---|---|---|---|---|---|---|---|---|
| [Webisoft](sites/webisoft.md) | Corporate look | Swiss-editorial engineering lab: coral + black + grey, mono labels | `#de5849` coral on `#fff`/`#f0f1f4`, `#000` | Helvetica Now Display/Text + Suisse Intl Mono | Moderate→heavy (Lenis, GSAP 3, 3D canvas) | N | Not listed | "LET'S TALK →" + contact block with form + Book a call | Numbered everything + anonymized case studies with status lines + trust badge row |
| [Linear](sites/linear.md) | Animations & motion | Dark, techy, precise; product UI as hero | `#08090a` bg, `#f7f8f8` text, white pill CTA | Inter Variable + Berkeley Mono | Moderate (CSS only, no libs) | N/A | N/A | "Sign up" / "Get started" | Scripted HTML product demos; morphing mega-menu; 100–200ms micro-motion |
| [Hello Monday](sites/hellomonday.md) | Animations & motion + Creative presentation | Editorial, warm, witty; ink illustrations + big serif | `#000` on `#fff`/`#f8f6f5`; `#191919` dark blocks; colour from client work | Clarendon BT Light + NB International Pro | Heavy (GSAP 2, Lenis, WebGL, preloader, transitions) | N | Not listed | Footer emails ("Work with us"), /product "Ready to collaborate?" | Character-driven hero carousel; client roll-call; liquid image hover; award scoreboard |

---

## Best of each focus

### Corporate look (Webisoft)
- **Discipline over decoration:** one accent colour, B&W photography, grey panels, dotted 1px rules, strict 4-column grid, generous spacing.
- **A repeating section-header system:** `/ LABEL · Headline · /00N · VIEW ALL →`. Repetition = "big organised company".
- **Number and count everything:** S/001, I/001, PRDCT 001–011, "(11) services", "011 sectors", "007 stories", "002 / 007".
- **Trust stack, repeated in footer and beside every form:** since 2016 · Clutch 4.9/5 (23 reviews) · SOC 2 Type II · HIPAA · AWS Partner · Great Place To Work · offices (Montreal, Miami) · "90%+ senior" · "NDA available on request".
- **About page as a trust page:** 6-stat strip, principles ("Responsible by default"), leadership with accountability lines ("your senior escalation"), offices, FAQ.
- **Enterprise tone:** calm, short, risk-aware sentences ("we will tell you plainly if we are not the right fit").

### Animations & motion (Linear + Hello Monday)
- **Two opposite philosophies, both premium:**
  - *Linear:* zero libraries; CSS + tiny WAAPI; motion only to **demonstrate the product**; 100ms hovers, 180ms menus, 700–1000ms ease-out entrances, linear ambient loops; full `prefers-reduced-motion`.
  - *Hello Monday:* GSAP + Lenis + WebGL; motion for **personality** (preloader, character animations, liquid hovers, parallax grid, page transitions); heavy, no reduced-motion.
- **Shared winners:** hover micro-delights, scroll-focused chapters, looping muted video for "3D" moments, mega-menus that feel native.
- **Cheapest high-impact effects:** sticky stacking list (Webisoft), char colour reveal on scroll (Webisoft), roll-call names lighting up at centre (Hello Monday), bullet slide-in on card hover (Hello Monday), morphing menu (Linear), isometric SVG line art with CSS loops (Linear).

### Creative presentation (Hello Monday)
- **One brand idea played everywhere** ("make Mondays better": countdown widget, "Mondayteers", Code of Honor).
- **Recurring illustrated characters** in hero, services, footer, so the studio has a face without stock photos.
- **Services as 3 story chapters** with one opinionated paragraph each + 2 proof projects, not bullet lists.
- **Client roll-call** with project counts, **awards scoreboard** with big numerals, **productized offer page** with a named human contact.
- **Case studies = client microsites** (brand-colour hero, Type/Client/Deliverables strip, chapters per design element).

### Services & pricing (competitors)
- _No competitor sites yet._ From the two agencies so far:
  - **Neither shows prices.** Both push to a conversation (Webisoft: "Scope under NDA → scope, timeline and cost"; Hello Monday: email).
  - Webisoft names engagement models as services: **staff augmentation, outsourcing, nearshore, fractional CTO, team extension, full build, phased delivery, long-term maintenance**.
  - Webisoft structure: 5 pillars → 10–11 sub-services each; 11 industries with filter chips; 43-item tech-stack directory; 817-article SEO blog.
  - Hello Monday structure: 3 pillars + 1 productized offer; no industries, no tech stack, no process.

---

## Overall synthesis

### Adopt
1. **Webisoft's skeleton:** section-header system, numbered services → sub-services, industries directory, tech-stack directory, trust strip next to every form, "what happens next" 3 steps + form + Book a call.
2. **Anonymized case studies with a fact table** (Client descriptor · Sector · Engagement · Status) + Challenge / What we built / Result, *plus* the metrics Webisoft lacks.
3. **Linear's motion budget:** CSS-first, fast hovers, ease-out entrances, reduced-motion support; spend motion on **live HTML demos of our process** (board moving to Done, CI going green, weekly update in Slack).
4. **Hello Monday's personality layer, in a small dose:** one brand idea + illustrated team characters + a roll-call of clients/industries + a numbers scoreboard.
5. **A productized-offer page** (e.g. dedicated team / MVP sprint) with a named human contact and photo.

### Avoid
- Long preloaders and slow page transitions (Hello Monday), WebGL on every hover, heavy canvases on mobile.
- Splitting all text into per-character spans (hurts accessibility and copy/paste).
- No reduced-motion support (both agencies).
- Webisoft's weak spots: no logos, few hard numbers in results; menu hidden behind a burger on desktop.
- Hello Monday's weak spots: no form, no process, no pricing signal, no metrics. Fine for a famous studio, not for an offshore software house that must earn trust.

### Gaps no one fills (opportunities for us)
- **Pricing transparency:** none show even "from" prices or engagement-model comparisons. A clear **engagement models table** (dedicated developer / team / fixed-scope / retainer) with "starting from" ranges would stand out, especially for SMEs.
- **Process made visible:** nobody shows a week-by-week "how we work" with real artefacts (standups, demos, reports, tools). Linear-style live demos could own this.
- **Timezone & communication proof:** for an offshore team this is the #1 objection. Show overlap hours, response times, the PM you'll talk to.
- **Results with numbers:** case studies here are qualitative. Metrics (time saved, revenue, uptime, users) would beat both.
- **Team faces:** Webisoft uses initials, Hello Monday hides team behind illustrations. Real, well-shot B&W team photos + roles would add trust.
