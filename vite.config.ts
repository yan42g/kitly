import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour Tauri v2.
// Port 1421 fixe (strictPort) pour cohabiter avec une autre app Tauri sur 1420.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
