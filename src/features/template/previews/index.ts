import type { ReactNode } from 'react'
import type { Variant } from '../../../types'
import { CARDS_PREVIEWS, SAMPLES } from './cards'

/*
  Registry de previews par catégorie. Point d'entrée unique pour la page
  template, qui reste ainsi indépendante des spécificités d'une catégorie.
  Pour AJOUTER une catégorie avec previews : enregistrer son renderer ici.
*/

/** Indique si une catégorie dispose de previews enregistrées. */
export function hasPreview(categoryId: string): boolean {
  return categoryId === 'cards'
}

/**
 * Rend la preview d'une proposition dans la variante demandée.
 * `index` sélectionne l'échantillon de démonstration (par position de la
 * proposition), afin d'illustrer chaque design sur un contenu différent.
 * Retourne `null` si la catégorie ou la proposition n'a pas de preview.
 */
export function renderPreview(
  categoryId: string,
  propId: number,
  variant: Variant,
  index: number,
): ReactNode {
  if (categoryId === 'cards') {
    const Preview = CARDS_PREVIEWS[propId]
    if (!Preview) return null
    return Preview({ s: SAMPLES[index % SAMPLES.length], variant })
  }
  return null
}
