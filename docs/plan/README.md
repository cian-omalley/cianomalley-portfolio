# Cian O'Malley — Interactive Cyberpunk Portfolio: Master Plan

Complete design, technical, content, and implementation plan for the futuristic interactive developer portfolio at **cianomalley.dev** (with **cianomalley.works** as the secondary document domain), built on WordPress with Oxygen Builder 6, Breakdance Elements for Oxygen, ACF Pro, a site-specific plugin, one Three.js scene, and full YouTube Data API synchronization.

Produced from the authoritative brief `claude-cyberpunk-portfolio-planning-prompt.md`. The plan follows the brief's **Section 33 required output order exactly** — all 44 sections, mapped below.

**One-line architecture:** Oxygen 6 owns all templates; the `cian-portfolio-core` plugin owns data, sync, complex components, and JS; YouTube hosts public videos while WordPress remains the system of record; the accessible standard site is built and launchable *before* the 3D "Digital District" layer, which is a strict progressive enhancement.

## Required output sections 1–44 → where to find them

| # | Required section | Location |
|---|---|---|
| 1 | Executive summary | [Part 01](01-executive-summary-and-concept.md#section-1--executive-summary) |
| 2 | Recommended creative concept | [Part 01](01-executive-summary-and-concept.md#section-2--recommended-creative-concept) |
| 3 | Recommended builder architecture | [Part 02](02-builder-architecture.md#section-3--recommended-builder-architecture) |
| 4 | Oxygen versus Breakdance comparison | [Part 02](02-builder-architecture.md#section-4--oxygen-versus-breakdance-comparison) |
| 5 | Builder responsibility matrix | [Part 02](02-builder-architecture.md#section-5--builder-responsibility-matrix) |
| 6 | Information architecture | [Part 03](03-information-architecture-and-content-model.md#section-6--information-architecture) |
| 7 | WordPress content model | [Part 03](03-information-architecture-and-content-model.md#section-7--wordpress-content-model) |
| 8 | ACF field structure | [Part 03](03-information-architecture-and-content-model.md#section-8--acf-field-structure) |
| 9 | YouTube integration architecture | [Part 04](04-youtube-and-video-system.md#section-9--youtube-integration-architecture) |
| 10 | Video-upload workflow | [Part 04](04-youtube-and-video-system.md#section-10--video-upload-workflow) |
| 11 | Video synchronization workflow | [Part 04](04-youtube-and-video-system.md#section-11--video-synchronization-workflow) |
| 12 | Video and guide relationship model | [Part 04](04-youtube-and-video-system.md#section-12--video-and-guide-relationship-model) |
| 13 | Tutorial-series model | [Part 04](04-youtube-and-video-system.md#section-13--tutorial-series-model) |
| 14 | World map | [Part 05](05-world-and-navigation.md#section-14--world-map) |
| 15 | User journeys | [Part 05](05-world-and-navigation.md#section-15--user-journeys) |
| 16 | Navigation model | [Part 05](05-world-and-navigation.md#section-16--navigation-model) |
| 17 | Page and district specifications | [Part 05](05-world-and-navigation.md#section-17--page-and-district-specifications) |
| 18 | Design system | [Part 06](06-design-system-and-components.md#section-18--design-system) |
| 19 | Component inventory | [Part 06](06-design-system-and-components.md#section-19--component-inventory) |
| 20 | Video component system | [Part 06](06-design-system-and-components.md#section-20--video-component-system) |
| 21 | Guide component system | [Part 06](06-design-system-and-components.md#section-21--guide-component-system) |
| 22 | Animation system | [Part 07](07-animation-and-3d.md#section-22--animation-system) |
| 23 | 3D implementation strategy | [Part 07](07-animation-and-3d.md#section-23--3d-implementation-strategy) |
| 24 | Oxygen implementation plan | [Part 08](08-builder-implementation-plans.md#section-24--oxygen-implementation-plan-production) |
| 25 | Breakdance implementation plan | [Part 08](08-builder-implementation-plans.md#section-25--breakdance-implementation-plan-contingency-blueprint--executed-only-if-architecture-b-is-activated) |
| 26 | Custom-plugin architecture | [Part 09](09-plugin-and-api-architecture.md#section-26--custom-plugin-architecture-cian-portfolio-core) |
| 27 | API and data-flow diagrams | [Part 09](09-plugin-and-api-architecture.md#section-27--api-and-data-flow-diagrams) |
| 28 | Search architecture | [Part 09](09-plugin-and-api-architecture.md#section-28--search-architecture) |
| 29 | Accessibility plan | [Part 10](10-accessibility-responsive-performance.md#section-29--accessibility-plan) |
| 30 | Responsive plan | [Part 10](10-accessibility-responsive-performance.md#section-30--responsive-plan) |
| 31 | Performance plan | [Part 10](10-accessibility-responsive-performance.md#section-31--performance-plan) |
| 32 | SEO and structured-data plan | [Part 11](11-seo-privacy-admin.md#section-32--seo-and-structured-data-plan) |
| 33 | GDPR and privacy plan | [Part 11](11-seo-privacy-admin.md#section-33--gdpr-and-privacy-plan-germanyeu) |
| 34 | WordPress admin workflow | [Part 11](11-seo-privacy-admin.md#section-34--wordpress-admin-workflow) |
| 35 | Security and maintenance plan | [Part 12](12-security-maintenance-hosting.md#section-35--security-and-maintenance-plan) |
| 36 | Hosting plan | [Part 12](12-security-maintenance-hosting.md#section-36--hosting-plan) |
| 37 | Phased roadmap | [Part 13](13-roadmap-and-testing.md#section-37--phased-roadmap) |
| 38 | Testing matrix | [Part 13](13-roadmap-and-testing.md#section-38--testing-matrix) |
| 39 | Risk register | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-39--risk-register) |
| 40 | Plugin recommendations | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-40--plugin-recommendations) |
| 41 | Asset requirements | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-41--asset-requirements) |
| 42 | Documentation requirements | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-42--documentation-requirements) |
| 43 | Launch checklist | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-43--launch-checklist) |
| 44 | Future expansion roadmap | [Part 14](14-risks-plugins-assets-docs-launch-future.md#section-44--future-expansion-roadmap) |

## Mermaid diagram index (required by the brief)

| Diagram | Location |
|---|---|
| Site architecture | Part 03 §6 |
| WordPress content relationships | Part 03 §6 (ER) + Part 09 §27 |
| Builder ownership | Part 09 §27 |
| World navigation | Part 05 §14 |
| YouTube synchronization | Part 04 §9 (flow) + §11 (sequence) |
| Video and guide relationships | Part 04 §12 |
| Deployment architecture | Part 09 §27 |
| User journey | Part 05 §15 |
| Component hierarchy | Part 06 §19 |
| 3D load gating | Part 07 §23 |
| Phase flow | Part 13 §37 |

## Stated assumptions

See [Part 01 — Executive summary](01-executive-summary-and-concept.md#stated-assumptions): multi-file delivery preserving section order; `.dev` primary per the brief (overriding the repo README's `.works` phrasing); ACF Pro and Oxygen 6 licensed; YouTube channel details are Phase 0 inputs; nothing biographical is invented.
