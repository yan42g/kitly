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

/** Variante de surface appliquée à une proposition. */
export type Variant = 'minimal' | 'gradient' | 'halo'

/**
 * Proposition structurelle au sein d'un template.
 * `id` sert de clé vers les LAYOUTS/TITLES du système de prompts et vers le
 * registry de previews (ex. CARDS_PREVIEWS).
 */
export interface Proposition {
  id: number
  title: string
  description: string
}

/**
 * Design exploratoire : piste de design plus audacieuse, sans prompt ni
 * variantes associés. Emplacement réservé — aucun n'est implémenté à ce stade
 * (voir src/features/template/previews/exploratory/README.md).
 */
export interface ExploratoryDesign {
  id: number
  title: string
  description: string
}

/**
 * Template d'une catégorie : un ensemble de propositions structurelles
 * déclinables selon plusieurs variantes de surface.
 */
export interface Template {
  /** Identifiant stable du template. */
  id: string
  /** Catégorie de rattachement (cf. Category.id). */
  categoryId: string
  /** Nom affiché. */
  name: string
  /** Courte description. */
  description: string
  /** Mots-clés pour la recherche future. */
  tags: string[]
  /** Variantes de surface proposées. */
  variants: Variant[]
  /** Propositions structurelles (avec prompt + preview). */
  propositions: Proposition[]
  /** Designs exploratoires éventuels (sans prompt). Réservé, non implémenté. */
  exploratoryDesigns?: ExploratoryDesign[]
}
