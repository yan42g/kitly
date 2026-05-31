import { Menu, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  /** Ouvre/ferme la sidebar en petit écran. */
  onToggleSidebar: () => void
}

// En-tête : bouton sidebar (mobile) + logo à gauche, recherche (placeholder)
// au centre, ThemeToggle à droite.
export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Afficher ou masquer la navigation"
        className="inline-flex size-9 items-center justify-center rounded-card text-muted transition-colors hover:bg-surface-2 hover:text-foreground md:hidden"
      >
        <Menu className="size-5" />
      </button>

      <span className="text-lg font-semibold tracking-tight text-foreground">
        Kitly
      </span>

      {/* Emplacement visuel pour la future recherche (sans logique à ce stade). */}
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-card border border-border bg-background px-3 py-1.5 text-sm text-muted sm:flex">
          <Search className="size-4" />
          <span>Rechercher…</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
