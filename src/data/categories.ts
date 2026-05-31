import {
  CreditCard,
  FormInput,
  Megaphone,
  Tags,
  SquareStack,
  Menu,
  LayoutDashboard,
  MousePointerClick,
} from 'lucide-react'
import type { Category } from '../types'

/*
  Source de vérité unique des catégories.
  Pour AJOUTER une catégorie : importer une icône lucide ci-dessus et ajouter
  une entrée dans ce tableau. Aucun autre fichier à modifier.
*/
export const categories: Category[] = [
  {
    id: 'cards',
    name: 'Cards',
    icon: CreditCard,
    description: 'Cartes : contenu, média, produit, profil.',
  },
  {
    id: 'forms',
    name: 'Forms',
    icon: FormInput,
    description: 'Formulaires : connexion, contact, multi-étapes.',
  },
  {
    id: 'hero',
    name: 'Hero',
    icon: Megaphone,
    description: 'Sections hero et en-têtes de landing page.',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: Tags,
    description: 'Grilles et tableaux de tarification.',
  },
  {
    id: 'modals',
    name: 'Modals',
    icon: SquareStack,
    description: 'Modales, dialogues et panneaux superposés.',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: Menu,
    description: 'Barres de navigation, menus et fils d’Ariane.',
  },
  {
    id: 'dashboards',
    name: 'Dashboards',
    icon: LayoutDashboard,
    description: 'Tableaux de bord : stats, graphiques, layouts.',
  },
  {
    id: 'buttons',
    name: 'Boutons',
    icon: MousePointerClick,
    description: 'Boutons et groupes d’actions.',
  },
]
