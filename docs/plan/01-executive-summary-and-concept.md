# Part 01 — Executive Summary & Recommended Creative Concept

> Covers required output sections: **1. Executive summary**, **2. Recommended creative concept**
> Plan index: [README.md](README.md)

---

## Section 1 — Executive Summary

### What is being built

An interactive developer portfolio for **Cian O'Malley** at **`cianomalley.dev`** (primary) with **`cianomalley.works`** as a secondary document domain (CV, PDFs, downloadable dossiers). The site presents Cian as a developer, systems builder, technical researcher, and digital creator, and doubles as a full technical-content platform: written guides, step-by-step tutorials, software and equipment reviews, uploaded and YouTube-hosted videos with synchronized metadata, searchable transcripts, tutorial series/playlists, and video-supported project case studies.

The experience layer is **"The Digital District"** — a compact, cinematic cyberpunk environment rendered with one lazy-loaded Three.js scene, navigated through fixed camera nodes and clearly labeled hotspots. It is a *progressive enhancement* on top of a complete, accessible, server-rendered WordPress site. Every district maps 1:1 to real WordPress content; nothing exists only in 3D.

### Core architectural recommendation (detailed in Part 02)

- **WordPress** on a Hetzner VPS (Germany, GDPR-aligned) behind Cloudflare.
- **Oxygen Builder 6** is the *sole* production builder and owns all templates.
- **Breakdance Elements for Oxygen** provides reusable UI elements *inside* Oxygen only — Breakdance itself never owns templates, pages, or global settings on production.
- **ACF Pro** provides all structured fields and relationships.
- A site-specific plugin, **`cian-portfolio-core`**, owns post types, taxonomies, ACF registration, YouTube Data API sync, transcripts, chapters, REST endpoints, WP-CLI commands, admin dashboards, and conditional asset loading. No API logic lives in builder code blocks.
- **Three.js** powers exactly one interactive scene (the District hub), loaded on demand, with a full non-WebGL fallback site.
- **YouTube** is the default host for public tutorial videos; the site syncs metadata via the YouTube Data API v3 and serves cached data so the site never depends on live API availability. Local hosting is reserved for short demos, private videos, downloadable sources, and heavily optimized background clips.

### The 30-second promise

A first-time visitor on the Arrival Platform (or the accessible fallback homepage) sees, without any interaction beyond scrolling:

1. **Who** — "Cian O'Malley — Developer & Systems Builder, Germany" as immediate H1-level text.
2. **What** — a one-line positioning statement plus the six flagship project beacons (AI Operating System, Self-Hosted Knowledge Hub, Interactive Developer Portfolio, Tactical Streaming Interface, Home Server Platform, AI Research Workspace).
3. **Stack** — a technology strip (server-rendered text, not decoration).
4. **Best work** — featured projects are visually prioritized (largest beacons / first cards).
5. **Contact** — a persistent "Communications Relay" affordance and a plain contact link in the accessible menu.

### Priority order (governs every trade-off, per brief Section 34)

1. Professional clarity → 2. Easy navigation → 3. Strong project presentation → 4. High-quality written guides → 5. Reliable video integration → 6. Accessible transcripts and captions → 7. Maintainable WordPress architecture → 8. Mobile usability → 9. Performance → 10. Visual atmosphere → 11. Advanced interaction → 12. Optional spectacle.

Whenever visual ambition conflicts with items 1–9, visual ambition loses.

### Build order in one sentence

Foundation → content model → YouTube sync → **complete accessible non-3D site** → interactive environment → dynamic 3D integration → polish → optimization → testing → launch (Phases 0–11, Part 13).

### Stated assumptions

1. **Multi-file plan**: this plan is delivered as an ordered document set (`docs/plan/01…14`) preserving the brief's exact 44-section order via the index in `README.md`.
2. The repo README mentions `cianomalley.works` as the showcase domain; the brief is authoritative — `cianomalley.dev` is primary, `.works` is the document domain.
3. **ACF Pro** (paid) is assumed: repeaters, flexible content, options pages, and bidirectional relationship UX are required by the field model.
4. **Oxygen Builder 6** (current architecture, with its component system) is licensed and available, as is Breakdance Elements for Oxygen.
5. The YouTube channel exists; channel ID, playlist IDs, and existing video inventory are Phase 0 discovery inputs and are parameterized, not invented.
6. No professional employers, qualifications, clients, or achievements are invented anywhere in this plan; the Identity Chamber and Timeline use only content Cian supplies.

---

## Section 2 — Recommended Creative Concept

### Concept name: **The Digital District**

A compact orbital-industrial district at night: dark glass, deep purple light, silver structural lines, slow atmospheric fog, quiet data traffic. Not a city to get lost in — a **campus of eight labeled destinations** arranged around a central Arrival Platform, viewed through composed cinematic camera positions.

### Tone

Cinematic, dark, technical, futuristic, interactive, atmospheric, elegant, professional, memorable, responsive. The reference is a high-end engineering facility rendered as a film establishing shot — **not** a game level, not a neon collage, not Cyberpunk 2077/Blade Runner homage, not a Bruno Simon-style drivable world.

### The eight destinations and their 1:1 WordPress mapping

| # | District | Real content behind it | Fallback URL |
|---|----------|------------------------|--------------|
| 1 | **Arrival Platform** | Homepage: identity, positioning, featured work, entry points | `/` |
| 2 | **Project Sector** | `project` archive + single project case studies | `/projects/` |
| 3 | **Knowledge Archive** | `guide` + `article` archives and singles | `/guides/`, `/articles/` |
| 4 | **Tutorial Studio** | `video` + `tutorial_series` archives, playlists, transcripts | `/videos/`, `/series/` |
| 5 | **Review Laboratory** | `review` archive + single reviews | `/reviews/` |
| 6 | **Identity Chamber** | About page + `timeline_entry` timeline + skills | `/about/` |
| 7 | **Communications Relay** | Contact page, form, social links, CV download | `/contact/` |
| 8 | **Experimental Sector** | Experiments/lab page (prototype projects, status "Research"/"Prototype") | `/lab/` |

### How it feels to use (desktop happy path)

1. **Arrival (0–5 s):** A single establishing shot fades in — the Arrival Platform with Cian's name and role as crisp HTML text overlaid on the scene (never baked into WebGL). A subtle scanning light traverses the platform once. No autoplay audio, no flashing.
2. **Orientation (5–15 s):** Eight labeled beacons/structures are visible or one camera-glide away. Mouse movement produces gentle parallax (±2° camera sway, disabled under reduced motion). Hovering a district shows a holographic label + one-line description.
3. **Travel (15–30 s):** Clicking a district triggers a controlled camera transition (~1.2 s ease) to that district's node. The URL updates (`/projects/` etc.) via History API so every state is deep-linkable.
4. **Content:** Actual reading/watching happens in **DOM panels** (dark glass overlays) or on standard pages — never as text rendered inside WebGL. Opening a guide or long article navigates to the standard readable template and pauses 3D rendering.
5. **Always available:** a compact command control (bottom corner) opens the radial system menu: Projects, Guides, Tutorials, Videos, Reviews, About, Contact, Search, Map, Settings. `Esc` opens it too. "Return to hub", "Back", "Map", "Search", "Reset camera", "Simplified mode", "Disable animation", "Graphics quality" are always reachable from it.

### Visual vocabulary (from the brief's allowed list)

- **Structures:** dark-glass modular buildings, one orbital ring element above the district, server-stack towers in the Project Sector, a virtual documentation shelf wall in the Knowledge Archive, floating video screens and a holographic editing timeline in the Tutorial Studio, instrument benches in the Review Laboratory.
- **Light:** deep purple (`#3A006F`) ambient + electric violet (`#7C3AED`) key lights; moon-silver (`#C8CDD8`) rim lighting; cyan (`#22D3EE`) strictly for interactive/system indicators; red (`#FF315B`) strictly for warnings/errors.
- **Motion:** slow animated data lines along paths, drifting digital particles (density scales with graphics setting), subtle fog volumes, one periodic scanning light. All motion is slow, loopable, and fully disabled in reduced-motion/simplified mode.

### Explicitly rejected (per brief)

Permanent conventional navbar/sidebar dominating the experience; generic hero+cards portfolio; cluttered dashboard; open-world/WASD movement; WebGL-only site; autoplay audio; constant glitch/flash effects; excessive neon/bloom; rainbow gradients; tiny display-font UI text; large animated backgrounds behind long articles; stock cyberpunk city imagery.

### Feature classification (Section 34 format)

| Feature | User value | Implementation | Owner | Maint. cost | Perf impact | A11y impact | Privacy impact | Verdict |
|---|---|---|---|---|---|---|---|---|
| Accessible standard site (all templates) | Everyone can use everything | Oxygen templates + plugin | Oxygen + plugin | Low | Baseline | Positive (foundation) | Neutral | **Essential** |
| Digital District hub scene | Memorability, brand | One Three.js scene, lazy-loaded | Plugin JS (`world.js`) | Medium | Managed by budget | Neutral (full fallback) | Neutral (no external assets) | **Recommended** |
| Fixed camera-node navigation | Never lost, no gaming skills | Camera node graph + History API | Plugin JS | Low-Med | Low | Positive vs free-move | Neutral | **Essential** (if 3D ships) |
| Radial command menu | Fast access everywhere | DOM overlay component | Oxygen component + plugin JS | Low | Negligible | Positive (keyboard) | Neutral | **Essential** |
| Per-district micro-scenes (unique 3D per district) | Spectacle | Additional lazy GLTF chunks | Plugin JS | High | High | Neutral | Neutral | **Optional** (Phase 9+, budget-gated) |
| Ambient audio | Atmosphere | Opt-in toggle only | Plugin JS | Low | Low | Must be off by default | Neutral | **Optional** |
| First-person free movement | — | — | — | — | — | Harmful | — | **Rejected** |
| WebGL-rendered text/content | — | — | — | — | — | Harmful | — | **Rejected** |
