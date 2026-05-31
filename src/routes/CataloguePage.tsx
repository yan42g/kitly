import { categories } from '../data/categories'

// Placeholder de la page Catalogue. Le contenu réel (grille de catégories,
// recherche…) sera ajouté à une étape ultérieure.
export default function CataloguePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">Catalogue</h2>
      <p className="mt-1 text-muted">
        {categories.length} catégories disponibles. Sélectionne-en une dans la
        barre latérale.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <div
              key={category.id}
              className="rounded-card border border-border bg-surface p-4"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Icon className="size-5 text-accent" />
                <span className="font-medium">{category.name}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{category.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
