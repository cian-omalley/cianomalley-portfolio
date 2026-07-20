// Builds the Digital District world bundle (docs/plan/07 §23).
// Entry: assets/js/src/world.js → assets/js/dist/world.js (ES module, Three.js
// bundled). loader.js dynamic-imports the output and calls initDistrict(cfg).
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "assets/js/src/world.js",
      formats: ["es"],
      fileName: () => "world.js",
    },
    outDir: "assets/js/dist",
    emptyOutDir: true,
    target: "es2020",
    minify: true,
    sourcemap: false,
  },
});
