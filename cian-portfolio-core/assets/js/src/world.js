/*
 * Digital District scene bootstrap (docs/plan/07 §23; creative amendment in
 * docs/discovery.md #6: a DENSE mini city — camera lives INSIDE the streets,
 * never zoomed out far enough to see the model edges; a fog + skyline shell
 * hides the world edge in every direction).
 *
 * Built with Vite (library target) into assets/js/dist/world.js; source
 * modules (camera, hotspots, navigation, quality, data) are split out.
 * This is the Phase 7 entry contract — implementation lands then.
 *
 * export function initDistrict(cfg): void
 *   cfg = { endpoint, bundle, models }  (see includes/assets.php)
 */

export function initDistrict(cfg) {
  // TODO(Phase 7):
  //  1. fetch(cfg.endpoint) → districts + beacons (cached REST payload)
  //  2. create renderer (adaptive pixel ratio), scene, fog volume
  //  3. load district-core.glb (Draco/KTX2) from cfg.models
  //  4. build DOM hotspot overlay (real <button>s projected to 3D coords)
  //  5. street-level camera node graph — no overview node, edges never visible
  //  6. on-demand render loop (pause off-viewport / hidden tab)
  // Intentionally a no-op until Phase 7 so the fallback ships first.
  void cfg;
}
