# Designs exploratoires (réservé — non implémenté)

Ce dossier accueillera plus tard les **previews des designs exploratoires** :
des pistes de design plus audacieuses, **sans prompt associé** (à la différence
des propositions standard).

## Convention prévue

- Une preview exploratoire par catégorie, ex. `cards.tsx` ici.
- Branchée via un registry dédié, ex. `CARDS_EXPLORATORY_PREVIEWS: Record<number, (props) => ReactNode>`,
  sur le même modèle que `CARDS_PREVIEWS` (dans `../cards.tsx`).
- Les métadonnées côté données vivent dans le champ optionnel
  `Template.exploratoryDesigns?: ExploratoryDesign[]` (cf. `src/types/index.ts`).

## État actuel

Aucun design exploratoire n'est implémenté. PLANITICA en propose plusieurs
(Polaroid, Aurora, Mosaïque, Profile peek, Luxueux, Minimaliste, Corporate) ;
ils seront portés ici ultérieurement, à la demande.
