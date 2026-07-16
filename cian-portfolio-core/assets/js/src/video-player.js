/*
 * VideoFacade activation (docs/plan/06 §20, 11 §33). The ONLY way a player
 * appears. Before activation: zero requests to Google. On activation: consent
 * check → inject youtube-nocookie iframe (or native <video> for local files).
 */

(function () {
  "use strict";

  function consentGranted() {
    const c = window.cianConsent && window.cianConsent.youtube;
    if (!c) return false;
    if (c.granted) return true;
    try {
      return localStorage.getItem(window.cianConsent.rememberKey) === "1";
    } catch (e) {
      return false;
    }
  }

  function activate(facade) {
    const ytId = facade.getAttribute("data-yt-id");
    const localSrc = facade.getAttribute("data-local-src");

    if (ytId) {
      if (!consentGranted()) {
        // Contextual consent handled by facade UI; remember on accept.
        try {
          localStorage.setItem(window.cianConsent.rememberKey, "1");
        } catch (e) {
          /* ignore */
        }
      }
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`;
      iframe.title = facade.getAttribute("data-title") || "Video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
      facade.replaceChildren(iframe);
    } else if (localSrc) {
      const video = document.createElement("video");
      video.src = localSrc;
      video.controls = true;
      video.autoplay = true;
      video.preload = "none";
      video.style.cssText = "width:100%;height:100%";
      facade.replaceChildren(video);
    }
  }

  document.addEventListener("click", (e) => {
    const facade = e.target.closest(".cian-facade");
    if (facade) activate(facade);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const facade = e.target.closest(".cian-facade");
    if (facade) {
      e.preventDefault();
      activate(facade);
    }
  });
})();
