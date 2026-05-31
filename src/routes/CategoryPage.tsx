import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { categories } from '../data/categories'
import { getTemplateByCategory } from '../data/templates'
import { renderPreview } from '../features/template/previews'
import { VARIANT_LABELS } from '../features/prompts/surfaces'
import { cn } from '../lib/utils'
import type { Template, Variant } from '../types'

// Page Catégorie : rend directement le détail du template de la catégorie
// (en-tête, sélecteur global de variante, grille des propositions). Il n'existe
// plus de page template intermédiaire : une catégorie ↔ un template.
export default function CategoryPage() {
  const { catId } = useParams<{ catId: string }>()
  const category = categories.find((c) => c.id === catId)

  if (!category) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Catégorie inconnue
        </h2>
        <p className="mt-1 text-muted">
          Aucune catégorie pour l’identifiant « {catId} ».
        </p>
      </div>
    )
  }

  const template = getTemplateByCategory(category.id)

  if (!template) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {category.name}
        </h2>
        <p className="mt-1 text-muted">{category.description}</p>
        <p className="mt-10 text-center text-sm text-muted">
          Bientôt — aucun template n’est encore disponible pour cette catégorie.
        </p>
      </div>
    )
  }

  return <TemplateDetail categoryName={category.name} template={template} />
}

// Détail du template : isolé dans son propre composant pour que le `useState`
// de la variante ne soit monté que lorsqu'un template existe réellement.
function TemplateDetail({
  categoryName,
  template,
}: {
  categoryName: string
  template: Template
}) {
  const [variant, setVariant] = useState<Variant>(template.variants[0])

  return (
    <div>
      {/* Fil d'Ariane : Catalogue / Catégorie. */}
      <nav className="flex items-center gap-1 text-sm text-muted" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-foreground">
          Catalogue
        </Link>
        <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
        <span className="text-foreground">{categoryName}</span>
      </nav>

      <header className="mt-4">
        <h2 className="text-2xl font-semibold text-foreground">{categoryName}</h2>
        <p className="mt-1 text-muted">{template.description}</p>
        {template.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Sélecteur global de variante (segmented control). */}
      <div className="mt-6 inline-flex rounded-card border border-border bg-surface p-1" role="group" aria-label="Variante">
        {template.variants.map((v) => {
          const active = v === variant
          return (
            <button
              key={v}
              type="button"
              aria-pressed={active}
              onClick={() => setVariant(v)}
              className={cn(
                'rounded-[calc(var(--radius-card)-0.25rem)] px-3 py-1.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-surface-2 text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground',
              )}
            >
              {VARIANT_LABELS[v]}
            </button>
          )
        })}
      </div>

      {/* Grille des propositions, rendues dans la variante sélectionnée. */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {template.propositions.map((proposition, index) => (
          <section key={proposition.id} className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">{proposition.title}</h3>
              <p className="text-xs text-muted">{proposition.description}</p>
            </div>
            {renderPreview(template.categoryId, proposition.id, variant, index)}
          </section>
        ))}
      </div>
    </div>
  )
}
