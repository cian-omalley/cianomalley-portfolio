/*
 * DOM hotspot overlay (docs/plan/05 §16). Hotspots are REAL focusable
 * <button> elements positioned over the canvas by projecting the district
 * anchors — never raycast-only — so keyboard and screen-reader users get
 * native semantics. The canvas itself stays aria-hidden.
 */

import * as THREE from "three";

export function createHotspots(overlay, districts, anchors, camera, onSelect) {
  const items = [];
  const v = new THREE.Vector3();

  for (const d of districts) {
    const anchor = anchors.get(d.id);
    if (!anchor) continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cian-hotspot";
    btn.dataset.district = d.id;
    btn.textContent = d.label;
    btn.style.cssText =
      "position:absolute;transform:translate(-50%,-50%);min-width:44px;min-height:44px;" +
      "padding:8px 14px;border-radius:999px;border:1px solid rgba(200,205,216,.35);" +
      "background:rgba(11,16,16,.78);color:#F5F7FA;font:500 14px 'Space Grotesk',system-ui,sans-serif;" +
      "cursor:pointer;backdrop-filter:blur(6px)";
    btn.addEventListener("click", () => onSelect(d));
    overlay.appendChild(btn);
    items.push({ btn, anchor });
  }

  /** Re-project all hotspot positions; call after any render. */
  function update() {
    const w = overlay.clientWidth;
    const h = overlay.clientHeight;
    for (const { btn, anchor } of items) {
      v.copy(anchor).project(camera);
      const behind = v.z > 1;
      btn.style.display = behind ? "none" : "";
      if (!behind) {
        btn.style.left = ((v.x + 1) / 2) * w + "px";
        btn.style.top = ((1 - v.y) / 2) * h + "px";
      }
    }
  }

  return { update };
}
