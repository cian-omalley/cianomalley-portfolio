/*
 * Render loop policy (docs/plan/07 §22–23): ON-DEMAND rendering. The scene
 * renders only when something changed (camera tween, resize, hover feedback)
 * and only while the tab is visible and the canvas is in-viewport. Idle scene
 * = zero renders. Pixel ratio is clamped per tier.
 */

export function pixelRatioFor(tier) {
  const dpr = window.devicePixelRatio || 1;
  if (tier === "low") return Math.min(dpr, 1);
  if (tier === "high") return Math.min(dpr, 2);
  return Math.min(dpr, 1.5); // balanced / automatic default
}

export class RenderLoop {
  /** @param {() => void} renderFn */
  constructor(renderFn, canvas) {
    this.renderFn = renderFn;
    this.needsRender = false;
    this.visible = true;
    this.inViewport = true;
    this.raf = 0;

    document.addEventListener("visibilitychange", () => {
      this.visible = document.visibilityState === "visible";
      if (this.visible) this.invalidate();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        this.inViewport = entries.some((e) => e.isIntersecting);
        if (this.inViewport) this.invalidate();
      }).observe(canvas);
    }

    this.tick = this.tick.bind(this);
    this.raf = requestAnimationFrame(this.tick);
  }

  /** Mark the scene dirty — it will render on the next frame. */
  invalidate() {
    this.needsRender = true;
  }

  tick() {
    if (this.needsRender && this.visible && this.inViewport) {
      this.needsRender = false;
      this.renderFn();
    }
    this.raf = requestAnimationFrame(this.tick);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
  }
}
