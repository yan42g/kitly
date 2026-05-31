import { useMemo } from 'react'
import { Link } from 'react-router'
import { categories, categoryGroups } from '../data/categories'
import {
  countTemplatesByCategory,
  getTemplatesByCategory,
} from '../data/templates'
import { getColor } from '../lib/colors'
import { cn } from '../lib/utils'
import { useSearch } from '../context/search'
import type { Category } from '../types'

// Normalise une chaîne pour une comparaison insensible à la casse et aux accents.
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

// Construit l'index de recherche d'une catégorie : nom + description + tags et
// titres de propositions de ses templates.
function searchIndex(category: Category): string {
  const templates = getTemplatesByCategory(category.id)
  const parts = [category.name, category.description]
  for (const template of templates) {
    parts.push(...template.tags)
    parts.push(...template.propositions.map((p) => p.title))
  }
  return normalize(parts.join(' '))
}

// Page d'accueil : catégories groupées, filtrées par la recherche du Header.
export default function CataloguePage() {
  const { query } = useSearch()

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return categories
    return categories.filter((c) => searchIndex(c).includes(q))
  }, [query])

  return (
    <div>
      <header>
        <h2 className="text-2xl font-semibold text-foreground">Catalogue</h2>
        <p className="mt-1 text-muted">
          Choisis une catégorie de composants pour explorer ses templates et
          copier le prompt associé.
        </p>
      </header>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          Aucune catégorie ne correspond à « {query} ».
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {categoryGroups.map((group) => {
            const groupCategories = filtered.filter((c) => c.group === group.id)
            if (groupCategories.length === 0) return null
            return (
              <section key={group.id}>
                <h3 className="text-xl font-semibold text-foreground">
                  {group.label}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      color={group.color}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Carte d'une catégorie : lien si des templates existent, sinon « Bientôt ».
// `color` est la couleur d'accent du groupe (pastille d'icône + liseré latéral).
function CategoryCard({ category, color }: { category: Category; color: string }) {
  const Icon = category.icon
  const col = getColor(color)
  const count = countTemplatesByCategory(category.id)
  const available = count > 0

  const inner = (
    <>
      {/* Liseré latéral coloré (couleur du groupe). */}
      <span className={cn('absolute inset-y-0 left-0 w-1', col.dot)} aria-hidden="true" />
      <div className="flex items-start gap-3 pl-2">
        <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-card', col.bg)}>
          <Icon className={cn('size-5', col.text)} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">{category.name}</span>
            {available ? (
              <span className="shrink-0 text-xs font-medium text-muted">
                {count} {count === 1 ? 'template' : 'templates'}
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                Bientôt
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted">{category.description}</p>
        </div>
      </div>
    </>
  )

  if (!available) {
    // Catégorie sans template : visible mais inerte.
    return (
      <div className="relative cursor-default overflow-hidden rounded-card border border-border bg-surface p-4 opacity-60">
        {inner}
      </div>
    )
  }

  return (
    <Link
      to={`/category/${category.id}`}
      className="relative block overflow-hidden rounded-card border border-border bg-surface p-4 transition-all hover:border-accent hover:bg-surface-2 hover:shadow-md"
    >
      {inner}
    </Link>
  )
}
