/*
 * Radial command menu + accessible system menu bridge (docs/plan/05 §16).
 * Opens via floating control, Esc, and Ctrl/Cmd+K. Focus-trapped while open,
 * focus restored on close. Works on every page (not just the 3D world).
 * Scaffold: wiring the open/close contract; full menu builds in Phase 6.
 */

(function () {
  "use strict";

  let lastFocus = null;
  const menu = () => document.getElementById("cian-command-menu");

  function open() {
    const el = menu();
    if (!el) return;
    lastFocus = document.activeElement;
    el.hidden = false;
    const first = el.querySelector("a, button, [tabindex]");
    if (first) first.focus();
  }

  function close() {
    const el = menu();
    if (!el) return;
    el.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open();
    } else if (e.key === "Escape") {
      const el = menu();
      if (el && !el.hidden) close();
      else open();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cian-command-open]")) open();
    if (e.target.closest("[data-cian-command-close]")) close();
  });
})();
