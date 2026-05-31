import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { getStoredTheme, toggleTheme, type Theme } from '../../lib/theme'

// Bouton de bascule clair/sombre. L'état initial reflète le thème déjà appliqué
// au démarrage (cf. main.tsx), donc pas de flash.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

  const handleToggle = () => {
    setTheme(toggleTheme())
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
      title={isDark ? 'Thème clair' : 'Thème sombre'}
      className="inline-flex size-9 items-center justify-center rounded-card border border-border bg-surface text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
