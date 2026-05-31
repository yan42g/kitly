import { Menu, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import ThemeToggle from './ThemeToggle'
import { useSearch } from '../../context/search'

interface HeaderProps {
  /** Ouvre/ferme la sidebar en petit écran. */
  onToggleSidebar: () => void
}

// En-tête : bouton sidebar (mobile) + logo à gauche, recherche fonctionnelle
// (filtre le catalogue) au centre, ThemeToggle à droite.
export default function Header({ onToggleSidebar }: HeaderProps) {
  const { query, setQuery } = useSearch()
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(value: string) {
    setQuery(value)
    // La recherche s'applique au catalogue : on y ramène l'utilisateur dès
    // qu'il commence à saisir depuis une autre route.
    if (value && location.pathname !== '/') {
      navigate('/')
    }
  }

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

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-card border border-border bg-background px-3 py-1.5 focus-within:border-accent sm:flex">
          <Search className="size-4 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Rechercher une catégorie…"
            aria-label="Rechercher une catégorie"
            className="w-48 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
