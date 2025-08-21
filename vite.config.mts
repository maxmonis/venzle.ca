import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    outDir: "../../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/root/index.html"),
        stats: resolve(__dirname, "src/root/stats/index.html"),
        "how-to-play": resolve(__dirname, "src/root/how-to-play/index.html"),
        "share-results": resolve(__dirname, "src/root/share-results/index.html")
      },
      output: {
        manualChunks(id) {
          if (id.includes("game/list")) return "games"
        }
      }
    }
  },
  plugins: [tsconfigPaths()],
  root: "src/root",
  server: { open: true }
})
