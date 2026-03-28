import { defineConfig } from "vite";
import version from "vite-plugin-package-version";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "../../dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          let match = id.match(/\.puzzles\/list\.chunk(\d+)\.ts$/);
          if (match) {
            return `puzzles-${match[1]}`;
          }
        },
      },
    },
  },
  plugins: [tsconfigPaths(), version()],
  root: "src/root",
  server: {
    open: true,
  },
});
