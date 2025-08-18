import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("game/list")) return "games"
        }
      }
    }
  },
  server: { open: true }
})
