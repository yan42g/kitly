## Why

Le shell est navigable mais ne contient aucune donnée. Pour valider l'architecture de bout en bout (données pures → preview React → prompt copiable) on porte depuis PLANITICA la première catégorie réelle (**Cards**) : son modèle de données typé, son système de prompts (déjà générique et portable) et sa couche de preview React fidèle. C'est la fondation réutilisable pour toutes les catégories suivantes.

## What Changes

- **Types du modèle de données** (`src/types/index.ts`, sans casser `Category`) :
  - `Variant = "minimal" | "gradient" | "halo"`
  - `Proposition { id: number; title: string; description: string }`
  - `Template { id; categoryId; name; description; tags: string[]; variants: Variant[]; propositions: Proposition[] }`
  - `ExploratoryDesign { id; title; description }` + champ optionnel `Template.exploratoryDesigns?: ExploratoryDesign[]` (emplacement réservé, **non implémenté** à cette étape — voir Décision dans `design.md`).
- **Système de prompts** : copie **à l'identique** des 4 fichiers PLANITICA dans `src/features/prompts/` (`base.ts`, `layouts.ts`, `surfaces.ts`, `build.ts`). Contenu inchangé.
- **Seed Cards** (`src/data/templates/cards.ts`) : un `Template` `categoryId: "cards"`, 4 propositions (Compact/Standard/Bannière/Showcase, id 1-4), `variants: ["minimal","gradient","halo"]`, tags de recherche, descriptions reprises de PLANITICA.
- **Registry des templates** (`src/data/templates/index.ts`) : agrège les templates (cards pour l'instant). Ajouter une catégorie = 1 fichier + 1 ligne ici.
- **Helpers portés dans `src/lib/`** :
  - `src/lib/colors.ts` : palette 14 couleurs + `getColor(name) → { bg, text, dot, ring }`.
  - `src/lib/utils.ts` : `cn` (clsx + tailwind-merge, style shadcn).
- **Previews React** (`src/features/template/previews/cards.tsx`) : portage fidèle des composants `Design1-4` + helpers (`CountChip`, `AvatarStack`, `ActionButtons`, `CardLayers`, `hoverClasses`) + maps de couleurs (`HOVER_HALO`, `CHIP_TEXT`, `HALO_BG`, `GRAD_BG`, `GRAD_VIGNETTE`). Adaptations Kitly : `resolve(src) => src` (pas de proxy backend), `getColor`/`cn` depuis `src/lib/`, textes neutralisés (tooltip « Exporter », SAMPLES génériques). Registry `CARDS_PREVIEWS: Record<number, (props) => ReactNode>`.
- **Vérification visuelle** : rendu minimal et temporaire de la matrice 4 propositions × 3 variantes (sans boutons copier/voir).
- **Nettoyage** : suppression des 2 fichiers de référence `.tsx` de `src/features/prompts/` une fois le portage terminé.

## Capabilities

### New Capabilities
- `template-data-model`: Types du modèle (Variant, Proposition, Template, ExploratoryDesign) et registry extensible des templates avec le seed Cards.
- `prompt-system`: Assemblage de prompts portables (buildPrompt) porté tel quel de PLANITICA.
- `cards-preview`: Couche de preview React fidèle des 4 propositions Cards × 3 variantes, avec helpers couleur/utilitaires.

### Modified Capabilities
<!-- Aucune. `Category` (capability category-registry) n'est pas modifiée. -->

## Impact

- **Dépendances ajoutées** : `clsx`, `tailwind-merge` (pour `cn`).
- **Fichiers créés** : `src/data/templates/cards.ts`, `src/data/templates/index.ts`, `src/lib/colors.ts`, `src/lib/utils.ts`, `src/features/template/previews/cards.tsx`, `src/features/template/previews/exploratory/README.md`.
- **Fichiers modifiés** : `src/types/index.ts` (ajout de types, `Category` préservé), une page de vérification (rendu temporaire).
- **Fichiers déplacés/copiés** : 4 fichiers `prompts/*.ts` conservés tels quels ; les 2 `.tsx` de référence (`TilesAndCardsPage.tsx`, `ContactCollectionPage.tsx`) supprimés de `prompts/` après portage.
- **Hors périmètre (étapes suivantes)** : DB/SQLite (étape 10), page catalogue finalisée (étape 6), page template finalisée (étape 7), système copier/modale (étape 9), designs exploratoires (réservés seulement).
