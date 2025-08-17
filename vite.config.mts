import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

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
  plugins: [
    VitePWA({
      includeAssets: ["favicon.ico"],
      manifest: {
        background_color: "#000000",
        description: "Fun daily word matching online puzzle game",
        display: "standalone",
        icons: [
          {
            sizes: "16x16",
            src: "icon16.png",
            type: "image/png"
          },
          {
            sizes: "32x32",
            src: "icon32.png",
            type: "image/png"
          },
          {
            purpose: "apple-touch-icon",
            sizes: "180x180",
            src: "apple-icon.png",
            type: "image/png"
          },
          {
            sizes: "192x192",
            src: "icon192.png",
            type: "image/png"
          },
          {
            sizes: "512x512",
            src: "icon512.png",
            type: "image/png"
          },
          {
            purpose: "any maskable",
            sizes: "512x512",
            src: "icon512.png",
            type: "image/png"
          }
        ],
        name: "Venn",
        short_name: "Venn",
        theme_color: "#000000"
      },
      registerType: "autoUpdate"
    })
  ],
  server: {
    open: true
  }
})
