import type { LucideIcon } from 'lucide-react'

/**
 * Catégorie de composants UI affichée dans la bibliothèque.
 * `icon` référence directement un composant d'icône lucide-react.
 */
export interface Category {
  /** Identifiant stable, utilisé dans les routes (/category/:catId). */
  id: string
  /** Nom affiché dans la sidebar. */
  name: string
  /** Icône lucide associée à la catégorie. */
  icon: LucideIcon
  /** Courte description du type de composants. */
  description: string
}
