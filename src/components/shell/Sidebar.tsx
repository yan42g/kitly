import { NavLink } from 'react-router'
import { LayoutGrid } from 'lucide-react'
import { categories } from '../../data/categories'

interface SidebarProps {
  /** Appelé à chaque navigation (sert à refermer la sidebar en petit écran). */
  onNavigate?: () => void
}

// Classes communes à une entrée de navigation, l'état actif étant fourni par NavLink.
function linkClasses(isActive: boolean): string {
  const base =
    'flex items-center gap-3 rounded-card px-3 py-2 text-sm transition-colors'
  return isActive
    ? `${base} bg-accent text-accent-foreground`
    : `${base} text-muted hover:bg-surface-2 hover:text-foreground`
}

// Barre latérale : lien Catalogue + une entrée par catégorie du registry.
export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) => linkClasses(isActive)}
      >
        <LayoutGrid className="size-4 shrink-0" />
        <span>Catalogue</span>
      </NavLink>

      <div className="mt-3 mb-1 px-3 text-xs font-medium uppercase tracking-wide text-muted">
        Catégories
      </div>

      {categories.map((category) => {
        const Icon = category.icon
        return (
          <NavLink
            key={category.id}
            to={`/category/${category.id}`}
            onClick={onNavigate}
            className={({ isActive }) => linkClasses(isActive)}
          >
            <Icon className="size-4 shrink-0" />
            <span>{category.name}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
