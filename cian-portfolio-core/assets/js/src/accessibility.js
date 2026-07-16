/*
 * Accessibility helpers (docs/plan/10 §29). Route-change focus management and
 * an aria-live announcer shared across the site and the 3D world.
 */

(function () {
  "use strict";

  // Ensure a single polite live region exists.
  function announcer() {
    let el = document.getElementById("cian-live");
    if (!el) {
      el = document.createElement("div");
      el.id = "cian-live";
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-atomic", "true");
      el.className = "visually-hidden";
      document.body.appendChild(el);
    }
    return el;
  }

  window.cianAnnounce = function (message) {
    announcer().textContent = String(message || "");
  };

  // On in-world navigation, move focus to the new main heading.
  window.addEventListener("cian:navigated", (e) => {
    const h1 = document.querySelector("main h1, h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus();
    }
    if (e.detail && e.detail.label) window.cianAnnounce(`Arrived at ${e.detail.label}`);
  });
})();
