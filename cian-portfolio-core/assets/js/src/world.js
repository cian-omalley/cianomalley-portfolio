/*
 * Digital District scene bootstrap (docs/plan/07 §23; docs/discovery.md #6:
 * a DENSE mini-city — the camera lives INSIDE the streets, edges never
 * visible via fog + skyline shell).
 *
 * Built by Vite (`npm run build` in cian-portfolio-core/) into
 * assets/js/dist/world.js; loader.js dynamic-imports that bundle after
 * eligibility checks and calls initDistrict(cfg). Failing anything here is
 * silent — the accessible fallback beneath the canvas is always complete.
 *
 * v1 city is procedural (world/city.js); GLB detail chunks can replace blocks
 * later without changing this contract.
 */

import * as THREE from "three";
import { buildCity } from "./world/city.js";
import { CameraRig } from "./world/camera.js";
import { createHotspots } from "./world/hotspots.js";
import { RenderLoop, pixelRatioFor } from "./world/quality.js";

/** Fallback district registry if the REST fetch fails (labels + urls only). */
const DEFAULT_DISTRICTS = [
  { id: "arrival", label: "Arrival Platform", url: "/" },
  { id: "projects", label: "Project Sector", url: "/projects/" },
  { id: "knowledge", label: "Knowledge Archive", url: "/guides/" },
  { id: "studio", label: "Tutorial Studio", url: "/videos/" },
  { id: "lab", label: "Review Laboratory", url: "/reviews/" },
  { id: "identity", label: "Identity Chamber", url: "/about/" },
  { id: "relay", label: "Communications Relay", url: "/contact/" },
  { id: "experimental", label: "Experimental Sector", url: "/lab/" },
];

let booted = false;

/**
 * @param {{endpoint?: string, bundle?: string, models?: string}} cfg
 */
export async function initDistrict(cfg = {}) {
  if (booted) return;
  const root = document.getElementById("district-root");
  if (!root) return;
  booted = true;

  // 1. Content (cached REST payload; fall back to the static registry).
  let districts = DEFAULT_DISTRICTS;
  if (cfg.endpoint) {
    try {
      const res = await fetch(cfg.endpoint, { credentials: "omit" });
      const data = await res.json();
      if (Array.isArray(data.districts) && data.districts.length) {
        districts = data.districts;
      }
    } catch (e) {
      /* offline/API-down: static labels still navigate correctly */
    }
  }

  // 2. Scene + renderer.
  const { scene, anchors } = buildCity(districts.map((d) => d.id));
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(pixelRatioFor("automatic"));
  renderer.setSize(root.clientWidth, root.clientHeight || 480);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText =
    "display:block;width:100%;height:100%;opacity:0;transition:opacity .6s ease";

  root.style.position = "relative";
  root.appendChild(renderer.domElement);

  const overlay = document.createElement("div");
  overlay.className = "cian-world-overlay";
  overlay.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none";
  root.appendChild(overlay);
  // Buttons re-enable pointer events individually.
  overlay.addEventListener("click", () => {}, true);

  const rig = new CameraRig(root.clientWidth / (root.clientHeight || 480), anchors);

  const loop = new RenderLoop(() => {
    renderer.render(scene, rig.camera);
    hotspots.update();
  }, renderer.domElement);

  // 3. Hotspots: first activation travels there; activating the district you
  //    are already at opens its real page (canonical URL). Arrival = hub.
  const hotspots = createHotspots(overlay, districts, anchors, rig.camera, (d) => {
    if (rig.current === d.id && d.id !== "arrival") {
      window.location.assign(d.url);
      return;
    }
    rig.goTo(d.id, () => loop.invalidate()).then(() => {
      if (window.cianAnnounce) window.cianAnnounce("Arrived at " + d.label);
    });
  });
  for (const btn of overlay.querySelectorAll(".cian-hotspot")) {
    btn.style.pointerEvents = "auto";
  }

  // 4. Global controls (command-menu settings dispatch these).
  window.addEventListener("cian:world:hub", () => rig.goTo("arrival", () => loop.invalidate()));
  window.addEventListener("cian:world:reset", () => {
    rig.applyNode(rig.current);
    loop.invalidate();
  });

  window.addEventListener("resize", () => {
    const w = root.clientWidth;
    const h = root.clientHeight || 480;
    rig.camera.aspect = w / h;
    rig.camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    loop.invalidate();
  });

  // 5. First frame + progressive reveal.
  loop.invalidate();
  requestAnimationFrame(() => {
    renderer.domElement.style.opacity = "1";
  });

  // Test/debug handle (not used by production code paths).
  window.__cianWorldDebug = { rig, renderer, scene, districts };
}
