import type { Template } from '../../types'
import { cardsTemplate } from './cards'

/*
  Registry des templates. Pour AJOUTER une catégorie : créer
  src/data/templates/<cat>.ts puis ajouter son template ici. Rien d'autre.
*/
export const templates: Template[] = [cardsTemplate]

/** Retourne le template d'une catégorie donnée, ou undefined. */
export function getTemplateByCategory(categoryId: string): Template | undefined {
  return templates.find((t) => t.categoryId === categoryId)
}
