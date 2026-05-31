import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuration Vite pour Tauri v2.
// Port 1421 fixe (strictPort) pour cohabiter avec une autre app Tauri sur 1420.
// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 en mode CSS-first : tout se configure dans src/index.css.
  plugins: [react(), tailwindcss()],
  // Tauri gère son propre affichage : on évite que Vite efface ses logs.
  clearScreen: false,
  server: {
    port: 1421,
    strictPort: true,
    // Ne pas surveiller le dossier Rust pour éviter des reloads inutiles.
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
})
