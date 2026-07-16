/*
 * World loader (docs/plan/07 §23). Tiny, always-safe entry enqueued on the
 * front page. Decides whether to dynamic-import the Three.js bundle after
 * eligibility checks + idle time. The accessible fallback is already in the
 * DOM, so failing any check simply means "stay on the fallback".
 */

(function () {
  "use strict";

  const cfg = window.cianWorld;
  if (!cfg) return;

  function eligible() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (navigator.connection && navigator.connection.saveData) return false;
    if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory < 4) return false;
    if (window.innerWidth < 768) return false; // phones use guided 2D mode
    if (localStorage.getItem("cian_simplified") === "1") return false;
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl2")) return false;
    } catch (e) {
      return false;
    }
    return true;
  }

  function boot() {
    if (!eligible()) return;
    import(/* webpackIgnore: true */ cfg.bundle)
      .then((mod) => mod.initDistrict && mod.initDistrict(cfg))
      .catch(() => {
        /* silent — fallback remains */
      });
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(boot, { timeout: 3000 });
  } else {
    window.addEventListener("load", () => setTimeout(boot, 1200));
  }
})();
