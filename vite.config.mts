import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "../../dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("game/list")) return "games"
        }
      }
    }
  },
  root: "src/root",
  server: { open: true }
})
