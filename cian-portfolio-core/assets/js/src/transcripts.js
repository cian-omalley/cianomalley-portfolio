/*
 * Transcript panel (docs/plan/06 §20). Collapsed by default; lazy-fetched
 * from cian/v1/videos/{id}/transcript, paginated (≤ ~30 KB/page). Timestamp
 * click seeks; in-panel search highlights.
 */

(function () {
  "use strict";

  async function loadPage(panel, page) {
    const videoId = panel.getAttribute("data-video-id");
    const base = panel.getAttribute("data-endpoint"); // /wp-json/cian/v1/videos/{id}/transcript
    if (!videoId || !base) return;
    try {
      const res = await fetch(`${base}?page=${page}`);
      const data = await res.json();
      const frag = document.createDocumentFragment();
      (data.segments || []).forEach((seg) => {
        const p = document.createElement("p");
        p.className = "cian-transcript__seg";
        const t = document.createElement("time");
        t.textContent = msToClock(seg.start_ms);
        t.setAttribute("data-start", Math.floor(seg.start_ms / 1000));
        p.append(t, document.createTextNode(seg.text));
        frag.appendChild(p);
      });
      panel.querySelector("[data-transcript-body]").appendChild(frag);
    } catch (e) {
      /* leave the "Watch on YouTube" fallback in place */
    }
  }

  function msToClock(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  }

  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-transcript-toggle]");
    if (!toggle) return;
    const panel = document.getElementById(toggle.getAttribute("data-transcript-toggle"));
    if (!panel) return;
    panel.hidden = !panel.hidden;
    if (!panel.hidden && !panel.dataset.loaded) {
      panel.dataset.loaded = "1";
      loadPage(panel, 1);
    }
  });
})();
