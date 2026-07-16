/*
 * Chapter list interaction (docs/plan/06 §20). Clicking a chapter seeks the
 * player; before the player is loaded, the click loads it then seeks.
 * Scaffold: click → dispatch a seek intent the player module consumes.
 */

(function () {
  "use strict";

  document.addEventListener("click", (e) => {
    const chapter = e.target.closest(".cian-chapters [data-start]");
    if (!chapter) return;
    const seconds = parseInt(chapter.getAttribute("data-start"), 10) || 0;
    const facade = document
      .getElementById(chapter.getAttribute("data-target") || "")
      || document.querySelector(".cian-facade");
    if (facade) {
      facade.dispatchEvent(new CustomEvent("cian:seek", { detail: { seconds }, bubbles: true }));
    }
  });
})();
