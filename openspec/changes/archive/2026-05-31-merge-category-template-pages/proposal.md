## Why

Dans la taxonomie réelle de Kitly (38 catégories au niveau « type de composant » : cards, buttons, forms…), une catégorie ne contient qu'**un seul** template ; la diversité interne est déjà portée par les propositions et les variantes. Le niveau de navigation « template » est donc une redondance : la page catégorie n'affiche qu'une carte unique avant de mener au détail, imposant un clic sans valeur. On supprime ce niveau intermédiaire.

## What Changes

- **BREAKING** Suppression de la route `/template/:catId/:tplId` et de la page `TemplatePage`.
- **Page catégorie = détail du template** : `/category/:catId` affiche désormais **directement** le détail du template de la catégorie (en-tête, sélecteur global de variante, grille des propositions via le registry de previews), au lieu d'une liste de templates.
- **Fil d'Ariane simplifié** : Catalogue / Catégorie (plus de niveau Template).
- **Cas limites inchangés** : catégorie inconnue → message d'absence ; catégorie sans template → « Bientôt ».
- **Nettoyage** : retrait du helper `getTemplateById` (devenu inutilisé ; le chargement se fait via `getTemplateByCategory`). Le type `Template` et le registry de previews sont **conservés**.

## Capabilities

### New Capabilities
<!-- Aucune : on fusionne deux capabilities existantes. -->

### Modified Capabilities
- `app-shell`: l'application n'expose plus que deux routes (`/`, `/category/:catId`) ; la route `/template/:catId/:tplId` est supprimée.
- `category-page`: la page catégorie n'affiche plus une liste de templates mais directement le détail du template (sélecteur de variante + previews des propositions).
- `template-page`: capability supprimée — son comportement (en-tête, sélecteur de variante, preview des propositions, registry) est absorbé par `category-page`. Note : OpenSpec ne sait pas vider une capability via un delta (une spec doit garder ≥1 exigence) ; le dossier `openspec/specs/template-page/` est donc supprimé manuellement à l'archivage.

## Impact

- **Fichiers modifiés** : `src/router.tsx` (retrait de la route template), `src/routes/CategoryPage.tsx` (devient la page de détail), `src/data/templates/index.ts` (retrait de `getTemplateById`).
- **Fichiers supprimés** : `src/routes/TemplatePage.tsx`.
- **Conservés** : `src/features/template/previews/` (registry + previews), type `Template`, helpers `getTemplateByCategory` / `getTemplatesByCategory`.
- **Aucune dépendance ajoutée.**
- **Dépendance de séquencement** : ce change modifie/supprime les capabilities `category-page` et `template-page`, introduites par le change `template-page`. **`template-page` doit être archivé avant** d'appliquer ce change.
- **Hors périmètre** : copie/modale de prompt (étape 9), DB / favoris (étape 10).
