import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { applyTheme, getStoredTheme } from './lib/theme'
import { router } from './router'
import './index.css'

// Applique le thème (classe `dark` sur <html>) avant le premier rendu pour
// éviter tout flash de thème clair au démarrage.
applyTheme(getStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
