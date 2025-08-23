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
        learn: resolve(__dirname, "src/root/learn/index.html"),
        main: resolve(__dirname, "src/root/index.html"),
        share: resolve(__dirname, "src/root/share/index.html"),
        stats: resolve(__dirname, "src/root/stats/index.html")
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
