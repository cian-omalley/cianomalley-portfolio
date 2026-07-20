/*
 * Camera rig: fixed street-level nodes + eased tweens (docs/plan/05 §14,
 * 07 §22). No free flight, no WASD, and NO overview node — every node sits
 * inside the city so the model's edges stay hidden. Reduced motion turns
 * tweens into instant cuts.
 */

import * as THREE from "three";

const EASE = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
const DURATION_MS = 1100;

export class CameraRig {
  constructor(aspect, anchors) {
    this.camera = new THREE.PerspectiveCamera(58, aspect, 0.1, 220);
    this.nodes = new Map();
    this.current = "arrival";
    this.tween = null;

    // Arrival: standing at the plaza's south edge, looking across the open
    // plaza toward the northern towers — streets and landmarks frame the view.
    this.nodes.set("arrival", {
      pos: new THREE.Vector3(0, 3.0, 10),
      look: new THREE.Vector3(0, 8, -26),
    });

    // District nodes: pulled back toward the plaza from each landmark for a
    // framed medium shot — street height, gentle upward gaze, tower centered
    // with neighboring blocks visible around it.
    for (const [id, anchor] of anchors) {
      if (id === "arrival") continue;
      const toPlaza = anchor.clone().setY(0).normalize().multiplyScalar(-20);
      this.nodes.set(id, {
        pos: new THREE.Vector3(anchor.x + toPlaza.x, 3.4, anchor.z + toPlaza.z),
        look: new THREE.Vector3(anchor.x, anchor.y * 0.35, anchor.z),
      });
    }

    this.applyNode("arrival");
  }

  applyNode(id) {
    const node = this.nodes.get(id);
    if (!node) return;
    this.camera.position.copy(node.pos);
    this.camera.lookAt(node.look);
    this.current = id;
  }

  reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /**
   * Tween to a node. Resolves when arrived. A new call retargets smoothly
   * (no queuing walls — docs/plan/07 §22 interruption rule).
   * @param {string} id
   * @param {() => void} requestRender called every tween frame
   * @returns {Promise<void>}
   */
  goTo(id, requestRender) {
    const node = this.nodes.get(id);
    if (!node) return Promise.resolve();
    if (this.reducedMotion()) {
      this.applyNode(id);
      requestRender();
      return Promise.resolve();
    }

    const fromPos = this.camera.position.clone();
    const fromQuat = this.camera.quaternion.clone();
    const probe = this.camera.clone();
    probe.position.copy(node.pos);
    probe.lookAt(node.look);
    const toQuat = probe.quaternion.clone();
    const start = performance.now();
    this.current = id;

    return new Promise((resolve) => {
      const step = (now) => {
        if (this.current !== id) return resolve(); // retargeted
        const t = Math.min(1, (now - start) / DURATION_MS);
        const k = EASE(t);
        this.camera.position.lerpVectors(fromPos, node.pos, k);
        this.camera.quaternion.slerpQuaternions(fromQuat, toQuat, k);
        requestRender();
        if (t < 1) {
          this.tween = requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      this.tween = requestAnimationFrame(step);
    });
  }
}
