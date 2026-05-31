import { useParams } from 'react-router'
import { categories } from '../data/categories'

// Placeholder de la page Catégorie. Affiche le paramètre :catId.
// Le contenu réel (templates de la catégorie) viendra plus tard.
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
      <p className="mt-6 text-sm text-muted">
        Placeholder — la liste des templates de cette catégorie s’affichera ici.
      </p>
    </div>
  )
}
