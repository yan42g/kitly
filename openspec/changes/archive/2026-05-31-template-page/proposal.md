## Why

Le catalogue mène aux catégories, mais `/category/:catId` n'affiche encore qu'une grille de vérification temporaire (héritée de l'étape 5) et `/template/:catId/:tplId` reste un placeholder. L'étape 7 finalise ce parcours : page **catégorie** réelle (liste des templates) puis page **template** (preview des propositions avec sélection de variante). C'est l'expérience cœur de Kitly avant d'y brancher la copie de prompt (étape 9).

## What Changes

- **Page Catégorie** (`/category/:catId`) : remplace la vérification temporaire. Liste les templates de la catégorie (cartes cliquables : nom, description, tags, nombre de propositions) menant à `/template/:catId/:tplId`. Catégorie sans template → message « Bientôt ».
- **Page Template** (`/template/:catId/:tplId`) : page réelle. En-tête (fil d'Ariane + nom + description + tags), **sélecteur global de variante** (Minimal / Dégradé / Halo) et grille des propositions, chacune rendue dans la variante sélectionnée via le registry de previews. **Pas de copie de prompt** (étape 9).
- **Couche de previews généralisée** : `src/features/template/previews/index.ts` expose un point d'entrée par catégorie (`renderPreview(categoryId, propId, variant, index)` + `hasPreview`) ; pour l'instant, branche `cards`. La page template ne dépend pas des spécificités d'une catégorie.
- **Helper** : `getTemplateById(id)` dans `src/data/templates/index.ts`.
- Labels de variantes réutilisés depuis le système de prompts (`VARIANT_LABELS`).

## Capabilities

### New Capabilities
- `category-page`: Page listant les templates d'une catégorie et menant à leur détail.
- `template-page`: Page de détail d'un template : sélection globale de variante et preview des propositions.

### Modified Capabilities
- `app-shell`: Les routes `/category/:catId` et `/template/:catId/:tplId` ne sont plus des placeholders.
- `cards-preview`: La matrice n'est plus rendue via une vérification temporaire dans la page catégorie, mais consommée par la page template via le registry de previews.

## Impact

- **Fichiers modifiés** : `src/routes/CategoryPage.tsx` (page réelle, suppression de la vérif temporaire), `src/routes/TemplatePage.tsx` (page réelle), `src/data/templates/index.ts` (`getTemplateById`).
- **Fichiers créés** : `src/features/template/previews/index.ts` (point d'entrée des previews par catégorie).
- **Aucune dépendance ajoutée.**
- **Hors périmètre** : copie/modale du prompt (étape 9), DB / favoris / historique (étape 10), designs exploratoires (réservés), contenu des 38 catégories « Bientôt ».
