/*
  Gestion du thème clair/sombre.

  NOTE d'architecture : le thème est une *pure préférence UI*, pas une donnée
  métier. Il est donc volontairement persisté via localStorage et n'a pas à
  passer par l'interface de persistance isolée (src/lib/store) prévue pour les
  données portables. localStorage reste disponible en WebView Tauri et au web.
*/

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'kitly-theme'
const DEFAULT_THEME: Theme = 'dark'

/** Lit le thème persisté, ou le thème par défaut (sombre) si aucun choix. */
export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME
}

/** Applique le thème : classe `dark` sur <html> + persistance. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(STORAGE_KEY, theme)
}

/** Bascule entre clair et sombre, applique le résultat et le retourne. */
export function toggleTheme(): Theme {
  const next: Theme = getStoredTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
