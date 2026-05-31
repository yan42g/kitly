import { useParams } from 'react-router'
import { categories } from '../data/categories'
import { getTemplateByCategory } from '../data/templates'
import { CARDS_PREVIEWS, SAMPLES } from '../features/template/previews/cards'

// Placeholder de la page Catégorie. Affiche le paramètre :catId.
// Le contenu réel (page template) viendra à l'étape 7.
export default function CategoryPage() {
  const { catId } = useParams<{ catId: string }>()
  const category = categories.find((c) => c.id === catId)

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">
        {category ? category.name : 'Catégorie inconnue'}
      </h2>
      <p className="mt-1 text-muted">
        {category
          ? category.description
          : `Aucune catégorie pour l’identifiant « ${catId} ».`}
      </p>

      {catId === 'cards' ? (
        <CardsVerification />
      ) : (
        <p className="mt-6 text-sm text-muted">
          Placeholder — la liste des templates de cette catégorie s’affichera ici.
        </p>
      )}
    </div>
  )
}

/*
  VÉRIFICATION TEMPORAIRE (étape 5) — rend la matrice propositions × variantes
  du template Cards pour confirmer visuellement le portage. Sans boutons
  copier/voir. À REMPLACER par la vraie page template à l'étape 7.
*/
function CardsVerification() {
  const template = getTemplateByCategory('cards')
  if (!template) return null

  return (
    <div className="mt-8 space-y-10">
      <p className="text-sm text-muted">
        Vérification — {template.propositions.length} propositions ×{' '}
        {template.variants.length} variantes.
      </p>

      {template.propositions.map((proposition) => {
        const Preview = CARDS_PREVIEWS[proposition.id]
        return (
          <section key={proposition.id} className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">
                {proposition.id}. {proposition.title}
              </h3>
              <p className="text-xs text-muted">{proposition.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {template.variants.map((variant, i) => (
                <div key={variant} className="space-y-1.5">
                  {Preview ? Preview({ s: SAMPLES[i], variant }) : null}
                  <p className="text-center text-[11px] uppercase tracking-wider text-muted">
                    {variant}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
