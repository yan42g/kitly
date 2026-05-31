import { useState } from 'react'
import { NavLink } from 'react-router'
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react'
import { categories, categoryGroups } from '../../data/categories'
import { getColor } from '../../lib/colors'
import { cn } from '../../lib/utils'

interface SidebarProps {
  /** Appelé à chaque navigation (sert à refermer la sidebar en petit écran). */
  onNavigate?: () => void
}

// Persistance de l'état replié des groupes (pure préférence UI, comme le thème).
const STORAGE_KEY = 'kitly-sidebar-collapsed'

function readCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const arr: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(arr)
      ? new Set(arr.filter((x): x is string => typeof x === 'string'))
      : new Set()
  } catch {
    return new Set()
  }
}

function writeCollapsed(set: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // Ignore (préférence non bloquante).
  }
}

// Style d'un item de navigation : pastille surélevée quand actif, gris sinon.
function itemClasses(isActive: boolean): string {
  const base =
    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors'
  return isActive
    ? `${base} bg-surface-2 font-medium text-foreground shadow-sm`
    : `${base} text-muted hover:bg-surface-2/60 hover:text-foreground`
}

// Barre latérale : lien Catalogue + catégories regroupées par groupe coloré,
// repliables (style inspiré de la navigation PLANITICA).
export default function Sidebar({ onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => readCollapsed())

  function toggleGroup(id: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      writeCollapsed(next)
      return next
    })
  }

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) => itemClasses(isActive)}
      >
        <LayoutGrid className="size-4 shrink-0" />
        <span>Catalogue</span>
      </NavLink>

      {categoryGroups.map((group) => {
        const groupCategories = categories.filter((c) => c.group === group.id)
        if (groupCategories.length === 0) return null
        const col = getColor(group.color)
        const isCollapsed = collapsed.has(group.id)
        const GroupIcon = group.icon
        const Chevron = isCollapsed ? ChevronRight : ChevronDown

        return (
          <div key={group.id} className={cn(!isCollapsed && 'mb-2')}>
            {/* En-tête de groupe coloré : icône + label MAJUSCULE + chevron. */}
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={!isCollapsed}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-surface-2/50"
            >
              <GroupIcon className={cn('size-4 shrink-0', col.text)} />
              <span className={cn('flex-1 truncate text-left text-xs font-bold uppercase tracking-wide', col.text)}>
                {group.label}
              </span>
              <Chevron className={cn('size-4 shrink-0', col.text)} />
            </button>

            {/* Sous-items indentés avec trait vertical coloré. */}
            {!isCollapsed && (
              <div className="relative mt-1 pl-5">
                <span
                  className={cn('absolute inset-y-1 left-2.5 w-0.5 rounded-full', col.dot)}
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  {groupCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <NavLink
                        key={category.id}
                        to={`/category/${category.id}`}
                        onClick={onNavigate}
                        className={({ isActive }) => itemClasses(isActive)}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{category.name}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
