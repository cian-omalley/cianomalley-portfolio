# Part 10 — Accessibility Plan, Responsive Plan, Performance Plan

> Covers required output sections: **29. Accessibility plan**, **30. Responsive plan**, **31. Performance plan**
> Plan index: [README.md](README.md)

---

## Section 29 — Accessibility Plan

Target: **WCAG 2.2 AA** across the fallback site; the 3D layer is a strict enhancement that must never be the only path to anything.

### Independence guarantees (site fully usable without…)

| Without | How |
|---|---|
| WebGL | fallback site is the baseline, rendered server-side on every URL; 3D is additive |
| Mouse movement / hover | all hotspots are focusable buttons; labels shown on focus; touch uses tap-to-preview; nothing triggers on hover alone |
| Sound | sound is opt-in decoration only; no informational audio |
| Animation | reduced-motion + manual toggle produce a fully static experience (crossfades only) |
| YouTube | every video page has summary, transcript, chapters, and (where present) the written guide — knowledge never lives only on YouTube |
| Color recognition | status/difficulty/indicators always pair color with icon + text (e.g. "● Completed" chip has the word) |

### Mechanics

- **Keyboard:** logical tab order; skip links ("Skip to content", "Skip to navigation"); command menu on `Esc`/`Ctrl+K`; roving tabindex in radial menu; visible focus ring (2 px cyan outline + offset, never removed); no keyboard traps — verified per template; camera/hotspot interactions all reachable by keyboard (district list mirrors hotspots).
- **Focus management:** overlays/modals trap focus and restore it to the invoker on close; route changes move focus to the new page's H1 (`tabindex="-1"`), announced via `aria-live` region ("Arrived at Project Sector" in world mode).
- **Screen readers:** landmark structure (`banner/nav/main/contentinfo`), one H1 per page, canvas `aria-hidden="true"` (all meaning is in DOM), descriptive labels on icon buttons, `alt` required by editorial checklist (empty alt for decorative), tables with headers (spec tables), form fields with labels + error association (`aria-describedby`).
- **Video accessibility:** captions (VTT locally; YouTube captions maintained upstream), transcript panel (semantic, downloadable), chapter navigation, text summary, related written guide, iframe `title`, accessible player controls, **no autoplay anywhere**.
- **Forms:** visible labels, inline validation with text (not color alone), consent checkbox unticked by default, error summary link list on submit failure.
- **Touch:** ≥44×44 px targets, no fine-drag requirements (drag-to-inspect has button alternatives).
- **Testing (per release):** axe-core automated pass on all templates; manual keyboard walk; NVDA + VoiceOver spot checks; contrast re-verified on any token change; reduced-motion visual review. `/accessibility/` statement documents features + contact for issues.

---

## Section 30 — Responsive Plan

| Class | Breakpoint (approx) | Experience |
|---|---|---|
| **Desktop** | ≥1366 px, `hover: hover` | full interactive environment; mouse parallax; hover labels; High/Balanced graphics |
| **Laptop** | 1024–1365 px | same environment, Balanced default: reduced particle density, stable camera framing (no parallax sway), controlled effects |
| **Tablet** | 768–1023 px, coarse pointer | 3D optional (opt-in banner if capable); **drag-to-inspect** (one-finger orbit within node limits), tap hotspots (tap = label, tap again = go), reduced post-effects, larger controls |
| **Mobile** | <768 px | **no WebGL by default**: guided district navigation — swipeable 2D district panels (static renders + CSS shimmer), tap hotspots, bottom command button, standard content pages, click-to-load videos, zero hover dependence; capable devices get an explicit "Enter 3D District" opt-in |
| **Ultrawide** | ≥1920 px | content max-widths (1200 px layout / 70ch reading); world canvas composes wider FOV with safe-area framing so UI stays centered; article/video panels never stretch |

Cross-cutting: fluid type via `clamp()`; images `srcset/sizes` with mobile-first crops; filters collapse into a disclosure sheet on mobile; sticky TOC becomes a collapsible top disclosure; tables gain horizontal scroll containers; the command menu is identical in content across all classes (muscle memory).

---

## Section 31 — Performance Plan

### Budgets (measured at Phase 10, enforced at launch; mobile 4G / mid-range device)

| Asset class | Budget |
|---|---|
| HTML (any page, compressed) | ≤ 40 KB |
| CSS total (tokens+base+builder+template, compressed) | ≤ 90 KB |
| JS — baseline pages (menus/a11y/facades, compressed) | ≤ 60 KB |
| JS — Three.js world bundle (deferred, compressed) | ≤ 250 KB |
| Initial 3D assets (`district-core.glb` + KTX2) | ≤ 2.5 MB, loaded post-idle only |
| Deferred 3D detail chunks | ≤ 600 KB each, on approach |
| Images per viewport | ≤ 300 KB above the fold |
| Video thumbnails | ≤ 40 KB each (WebP, sized) |
| Fonts | ≤ 120 KB total woff2, ≤ 4 files preloaded |
| YouTube embeds | **0 bytes until click** (facade only) |
| Transcripts | 0 in initial HTML; ≤ 30 KB per fetched page segment |

**Core Web Vitals targets (fallback pages, p75 mobile):** LCP ≤ 2.0 s, INP ≤ 200 ms, CLS ≤ 0.05. World page: fallback LCP unchanged (canvas loads after idle, `content-visibility` reserved space → no CLS).

### Implementation measures

- Lazy Three.js (idle dynamic import, eligibility-gated) and lazy district chunks (Part 07).
- Click-to-load video players + static thumbnails everywhere; never an active player on archives.
- WebP/AVIF generation on upload (server-side), `loading="lazy"`, `decoding="async"`, explicit dimensions.
- Self-hosted subset fonts, `font-display: swap`, preload.
- Conditional script/style enqueueing per template (Part 09 asset policy).
- Model compression: Draco/meshopt + KTX2/Basis; texture atlas per district; total scene ≤ 60 draw calls at High.
- Adaptive pixel ratio, paused rendering on hidden tabs, on-demand render loop (Part 07).
- Cached YouTube metadata + thumbnails (local media library — no runtime hotlinks to `i.ytimg.com`).
- Cached transcripts (REST responses ETag'd + page-cached), transcript pagination.
- DB: custom relationship + transcript tables with proper indexes (Part 09); `autoload=no` for large options; object cache (Redis) for composed payloads.
- Page caching (server or cache plugin, Part 12) + Cloudflare CDN for static assets; cache busting via hashed filenames; sync writes purge affected URLs.
- Local video (rare) served with HTTP range support, `preload="none"`, poster image; multi-GB files excluded from WP uploads (SFTP + streaming-friendly hosting rule, Part 12).

### Never-do list (enforced in code review)

No active YouTube players on archives · no eager 3D model loading · no transcripts inlined in HTML · no unstreamed large local videos · no render loop while idle/hidden · no fonts from third-party CDNs.

### Graphics settings

Automatic (probe-driven default) / Low / Balanced / High — full definitions in Part 07 §23; persisted per device; exposed in settings panel and `/accessibility/`.
