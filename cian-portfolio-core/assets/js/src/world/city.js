/*
 * Procedural dense mini-city (docs/discovery.md #6, docs/plan/07 §23).
 *
 * The camera lives at street level INSIDE the city; fog + a surrounding
 * skyline shell guarantee the model's edges are never visible. v1 is fully
 * procedural (boxes + canvas window textures) — GLB detail chunks can replace
 * blocks later without changing the module contract.
 *
 * Token palette only: void #040805, surface #0B1010, violet #7C3AED,
 * cyan #22D3EE (sparse, "system" windows), silver #C8CDD8.
 */

import * as THREE from "three";

const VOID_BG = 0x040805;
const SURFACE = 0x0b1010;

/** Deterministic PRNG so the city is stable across visits. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Emissive window-grid texture drawn on a canvas (no external assets). */
function makeWindowTexture(rand, accent) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0b1010";
  ctx.fillRect(0, 0, 128, 256);
  for (let y = 4; y < 252; y += 8) {
    for (let x = 4; x < 124; x += 8) {
      const r = rand();
      if (r < 0.32) {
        ctx.fillStyle = r < 0.02 ? "#22D3EE" : accent ? "#A78BFA" : "#7C3AED";
        ctx.globalAlpha = 0.55 + rand() * 0.45;
        ctx.fillRect(x, y, 4, 5);
        ctx.globalAlpha = 1;
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Build the city into a fresh scene.
 * @returns {{scene: THREE.Scene, anchors: Map<string, THREE.Vector3>}}
 */
export function buildCity(districtIds) {
  const rand = mulberry32(40805);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(VOID_BG);
  // Fog is atmosphere AND edge concealment — beyond ~85 units nothing reads.
  scene.fog = new THREE.FogExp2(VOID_BG, 0.03);

  scene.add(new THREE.AmbientLight(0x3a006f, 1.4));
  const key = new THREE.DirectionalLight(0x7c3aed, 0.7);
  key.position.set(30, 60, 10);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc8cdd8, 0.25);
  rim.position.set(-40, 20, -30);
  scene.add(rim);

  // Ground.
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(140, 48),
    new THREE.MeshStandardMaterial({ color: 0x060a08, roughness: 0.9 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const box = new THREE.BoxGeometry(1, 1, 1);
  const winTex = makeWindowTexture(rand, false);
  const winTexAccent = makeWindowTexture(mulberry32(7), true);
  const wallMat = new THREE.MeshStandardMaterial({
    color: SURFACE,
    roughness: 0.6,
    metalness: 0.2,
    emissive: 0xffffff,
    emissiveMap: winTex,
    emissiveIntensity: 0.9,
  });
  const landmarkMat = wallMat.clone();
  landmarkMat.emissiveMap = winTexAccent;
  landmarkMat.emissiveIntensity = 1.2;
  const silhouetteMat = new THREE.MeshStandardMaterial({ color: 0x070c0a, roughness: 1 });

  function building(x, z, w, h, d, mat) {
    const m = new THREE.Mesh(box, mat);
    m.scale.set(w, h, d);
    m.position.set(x, h / 2, z);
    m.rotation.y = (rand() - 0.5) * 0.04;
    scene.add(m);
    return m;
  }

  // Dense street grid: blocks every 9 units, 2–3 buildings per block, with a
  // clear central plaza (radius 8) and streets left between blocks.
  for (let gx = -5; gx <= 5; gx++) {
    for (let gz = -5; gz <= 5; gz++) {
      const cx = gx * 9;
      const cz = gz * 9;
      const dist = Math.hypot(cx, cz);
      if (dist < 12) continue; // central plaza stays open
      const count = 2 + Math.floor(rand() * 2);
      for (let i = 0; i < count; i++) {
        const w = 2.4 + rand() * 2.6;
        const d = 2.4 + rand() * 2.6;
        const h = 5 + rand() * 14 + (dist > 30 ? rand() * 8 : 0);
        building(cx + (rand() - 0.5) * 4.5, cz + (rand() - 0.5) * 4.5, w, h, d, wallMat);
      }
    }
  }

  // Skyline shell: tall silhouettes past the playable ring so every direction
  // reads as "more city" through the fog — the edge is never visible.
  for (let a = 0; a < Math.PI * 2; a += 0.16) {
    const r = 62 + rand() * 22;
    building(
      Math.cos(a) * r,
      Math.sin(a) * r,
      5 + rand() * 6,
      18 + rand() * 26,
      5 + rand() * 6,
      silhouetteMat
    );
  }

  // District landmarks: one taller accent tower per destination, ringed around
  // the plaza. Anchor = hotspot position (mid-height of the tower).
  const anchors = new Map();
  const ring = districtIds.filter((id) => id !== "arrival");
  ring.forEach((id, i) => {
    const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * 24;
    const z = Math.sin(a) * 24;
    const h = 20 + rand() * 6;
    building(x, z, 5, h, 5, landmarkMat);
    anchors.set(id, new THREE.Vector3(x, h * 0.55, z));
  });
  // Arrival = the plaza itself.
  anchors.set("arrival", new THREE.Vector3(0, 2.5, 0));

  // Plaza beacon: a slim silver column marking the hub.
  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 9, 12),
    new THREE.MeshStandardMaterial({
      color: 0xc8cdd8,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.7,
    })
  );
  beacon.position.set(0, 4.5, 0);
  scene.add(beacon);

  return { scene, anchors };
}
