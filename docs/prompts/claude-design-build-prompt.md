# Prompt — build the Digital District frontend (for Claude, with the repo zip)

Copy everything in the fenced block below into Claude (claude.ai / Artifacts), and attach `cianomalley-portfolio-main.zip` (the repository download). It instructs Claude to build the visual frontend **on top of** the already-built, verified plugin — reusing its design tokens, CSS classes, and shortcode markup — rather than inventing a new design.

---

```
You are a senior product designer + front-end engineer. I've attached
`cianomalley-portfolio-main.zip` — the repository for an interactive cyberpunk
developer portfolio ("The Digital District") for Cian O'Malley, built on
WordPress. The data layer, plugin, and design system already exist and are
verified. Your job is to design and build the VISUAL FRONTEND as self-contained,
responsive, accessible HTML/CSS artifacts that drop onto the existing plugin —
do not redesign the architecture or invent a new design language.

## Read these files in the zip FIRST (they are the source of truth)
- `AGENTS.md` — current state + architecture contract. Obey it.
- `docs/discovery.md` — confirmed decisions (they override the plan).
- `docs/plan/01`, `05`, `06`, `07` — creative concept, world map, design
  system, and the 3D "dense mini-city" concept.
- `docs/oxygen-templates.md` — the exact templates to build and which plugin
  shortcodes/markup go in each. Build THESE templates.
- `cian-portfolio-core/assets/css/tokens.css` — the ONLY colors/spacing/type you
  may use. Reference the CSS variables; never hard-code an off-token color.
- `cian-portfolio-core/assets/css/*.css` and `assets/js/src/*.js` — the existing
  component classes and behavior. Reuse them.
- `cian-portfolio-core/includes/render.php` — the exact HTML each component
  outputs (`.cian-card`, `.cian-facade`, `.cian-scores`, `.cian-chapters`,
  `.cian-command`, `.cian-step`, `.cian-proscons`, `.cian-related`, …). Match
  this markup so your design maps 1:1 onto the shortcodes.

## Hard constraints (from the plan/discovery — do not violate)
- **Design identity:** deep purple + electric violet + moon-silver + soft-white
  on near-black. Cyan (`--cyan-signal`) ONLY for interactive/system state; red
  (`--red-warning`) ONLY for warnings. No neon overload, no rainbow gradients,
  no constant glitch/flash, no autoplay audio, no large animated backgrounds
  behind long articles.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (code).
- **Domains:** primary portfolio is `cianomalley.works`; `cianomalley.dev` is for
  small demos. Use `.works` in any shown URLs.
- **Accessibility is non-negotiable (WCAG 2.2 AA):** the non-3D site is the
  baseline and must be fully usable without WebGL, mouse, hover, sound, or
  animation. Visible focus states, keyboard operability, skip link, semantic
  landmarks, reduced-motion support, ≥44px touch targets, contrast within the
  token ratios. The 3D layer is a strict progressive enhancement.
- **The 3D "Digital District":** a compact, DENSE mini-city — the camera sits at
  street level INSIDE the city; the viewer must NEVER be zoomed out far enough to
  see the model's edges (use a surrounding skyline shell + fog). Eight labeled
  destinations around a central Arrival Platform. Fixed camera nodes, no WASD,
  DOM hotspots over the canvas, full 2D fallback. Represent this as a designed
  concept — you don't need a working Three.js build, but show the intended look
  and the DOM hotspot/overlay treatment.
- **Never invent biography** — no employers, qualifications, clients, or
  achievements. Use realistic placeholder content only for the six projects and
  the guide/review topics named in `docs/discovery.md` (self-hosting, Hermes
  Agent, Oxygen, WordPress, JetBrains; IDE reviews; the Oxygen 6 review).

## What to produce (responsive, theme-aware, self-contained artifacts)
Build these as Artifacts, in this priority order (accessible core first). Each
uses the existing token variables and component classes so it can be rebuilt in
Oxygen against the plugin:
1. **Design-system page** — token swatches, type scale, and every component
   (buttons, chips, cards, callouts, score panel, facade, command block,
   chapter list) rendered live, in light AND dark.
2. **Home / Arrival Platform** — identity hero (name, role "Developer & Systems
   Builder, Germany", positioning line, tech strip) as real HTML, a placeholder
   for the `#district-root` 3D mount with the mini-city concept + DOM hotspots,
   then the accessible fallback sections (featured projects, latest guide + video,
   contact CTA). The 30-second-clarity test must pass with JS disabled.
3. **Guide single** — sticky TOC, meta (difficulty/time/last-verified/OS),
   numbered `.cian-step` sections with `.cian-command`/`.cian-code` blocks +
   copy buttons, callouts, an embedded consent-safe video facade, action bar,
   related grid.
4. **Video single** — `.cian-facade` (click-to-load, no iframe until click),
   chapter list, collapsible transcript panel, commands, "read the guide" panel.
5. **Review single** — product hero, `.cian-scores` panel with `<meter>`
   sub-scores, `.cian-proscons`, spec table, verdict.
6. **Project single** — case-study sections, gallery, links, related.
7. **An archive** (guides or videos) — filter bar + `.cian-card` grid (static
   thumbnails only on video archives — never a live player).

## Output rules
- Self-contained HTML per artifact: inline the token CSS (copy the variables from
  `tokens.css`), style both light and dark via `prefers-color-scheme`, use
  system-font fallbacks for the three families. Responsive: 480/768/1024/1366/1920
  breakpoints; cap content at 1200px, reading measure ~70ch; the page body must
  never scroll horizontally.
- Match the plugin's class names and DOM structure exactly (see `render.php`) so
  the design is a skin over the real markup, not a parallel one.
- Video facades and any embeds must show ZERO third-party requests until a click
  (privacy-first, GDPR).
- After each artifact, list: which plugin shortcode/classes it maps to, and any
  accessibility decisions (focus, contrast, reduced-motion).

Start by reading the files above and giving me a one-paragraph plan + the
design-system page. Then build the templates in order, pausing after each for
feedback.
```

---

## Notes for Cian

- This prompt makes Claude **reuse** the verified plugin (tokens, CSS classes, `render.php` markup) so whatever it designs can be rebuilt in Oxygen against `cian-portfolio-core` — not thrown away.
- It deliberately scopes the 3D district to a *designed concept* (Claude can't verify a real Three.js build in an Artifact), while keeping the accessible fallback as the real deliverable.
- If you want pure visual mockups instead of build-ready HTML, add: "Prioritize high-fidelity visual mockups over production markup." If you want the opposite, add: "Output must be production-ready HTML matching `render.php` exactly."
