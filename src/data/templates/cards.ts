import type { Template } from '../../types'

// Données pures du template Cards (aucune dépendance React).
// Descriptions des propositions reprises de PLANITICA.
export const cardsTemplate: Template = {
  id: 'cards',
  categoryId: 'cards',
  name: 'Cards',
  description:
    'Tuiles / cartes déclinables : avatar, image, compteur et pile de membres.',
  tags: ['card', 'tuile', 'carte', 'avatar', 'membre', 'groupe', 'média'],
  variants: ['minimal', 'gradient', 'halo'],
  propositions: [
    {
      id: 1,
      title: 'Compact',
      description:
        'Avatar circulaire en ligne, format compact — idéal pour listes denses où la lecture rapide prime.',
    },
    {
      id: 2,
      title: 'Standard',
      description:
        'Squircle équilibré en ligne, plus de respiration — format polyvalent par défaut.',
    },
    {
      id: 3,
      title: 'Bannière',
      description:
        "Image en bannière haute + contenu structuré en dessous — met l'image en valeur sans la noyer.",
    },
    {
      id: 4,
      title: 'Showcase',
      description:
        'Image plein cadre avec texte en overlay — le plus impactant visuellement, pour mises en avant.',
    },
  ],
}
