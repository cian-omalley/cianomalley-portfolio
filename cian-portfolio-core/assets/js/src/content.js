/*
 * Reading-surface interactions (docs/plan/06 §21). Command-block copy button
 * with an accessible confirmation + a no-Clipboard-API fallback. Loaded on
 * guide/article/video/review/project singles (assets.php).
 */

(function () {
  "use strict";

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".cian-command__copy");
    if (!btn) return;
    var block = btn.closest(".cian-command");
    var code = block && block.querySelector("pre code, code");
    if (!code) return;

    var text = code.textContent || "";
    var done = function () {
      btn.textContent = "Copied";
      if (window.cianAnnounce) window.cianAnnounce("Command copied");
      setTimeout(function () { btn.textContent = "Copy"; }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  });
})();
