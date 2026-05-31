## Context

On porte un système éprouvé de PLANITICA (CRM) vers Kitly (bibliothèque de templates). Trois couches arrivent ensemble : (1) le système de prompts, déjà 100 % générique et portable — à copier tel quel ; (2) le modèle de données typé ; (3) la couche preview React. PLANITICA dépend d'un backend FastAPI (proxy d'images, API contacts) absent ici : les seules adaptations portent sur ces points d'intégration, pas sur le rendu. CLAUDE.md impose la séparation **données pures (`src/data/`)** vs **preview React (`src/features/template/previews/`)**, TS strict sans `any`, commentaires en français.

## Goals / Non-Goals

**Goals:**
- Modèle de données typé (Variant, Proposition, Template) + registry extensible.
- Système de prompts copié à l'identique (aucune modification de contenu).
- Preview React fidèle des 4 propositions Cards × 3 variantes.
- Helpers réutilisables (`getColor`, `cn`) dans `src/lib/`.
- Emplacement typé et documenté pour les futurs designs exploratoires.
- `pnpm build` vert (TS strict, pas de `any`).

**Non-Goals:**
- Pas de DB (étape 10), pas de page catalogue/template finalisée (étapes 6/7), pas de copie/modale (étape 9).
- Aucun design exploratoire implémenté (réservation uniquement).
- Aucune retouche du contenu des prompts.

## Decisions

### Séparation données / preview / prompts
- `src/data/templates/cards.ts` ne contient **que des données** (objet `Template`), aucune dépendance React.
- `src/features/template/previews/cards.tsx` contient le rendu React et tout ce qui lui est propre (helpers `CountChip`/`AvatarStack`/`ActionButtons`/`CardLayers`/`hoverClasses`, maps de couleurs `HOVER_HALO`/`CHIP_TEXT`/`HALO_BG`/`GRAD_BG`/`GRAD_VIGNETTE`).
- Le lien data → preview se fait par l'`id` de proposition via `CARDS_PREVIEWS: Record<number, (props) => ReactNode>`.

### Type `Variant` : une seule source de vérité côté données
`surfaces.ts` (système de prompts) définit déjà un `Variant` identique — on n'y touche pas (copie conforme). On ajoute `Variant` dans `src/types/index.ts` pour le modèle de données. Les deux unions sont identiques donc mutuellement assignables ; la preview importe `Variant` depuis `src/types`.

### Helpers portés dans `src/lib/`
- `getColor` → `src/lib/colors.ts`. Palette 14 couleurs (slate…rose). Contrat de retour `ColorClasses { bg, text, dot, ring }`. Défaut **indigo** (comme PLANITICA, `COLORS[9]`).
- `cn` → `src/lib/utils.ts` : `clsx` + `tailwind-merge` (style shadcn). Ajoute deux dépendances légères.
- `resolvePhotoUrl` (proxy FastAPI) → remplacé par `resolve(src) => src` local dans `cards.tsx` (retourne l'URL brute).

### Neutralisation du vocabulaire PLANITICA
- Tooltip « Exporter les contacts » → « Exporter ».
- `SAMPLES` CRM → neutres : « Projet Alpha » (image photo), « Équipe Design » (image logo/placeholder), « Composants UI » (sans image). Avatars via `i.pravatar.cc`.
- Le reste du rendu (chip « membres », actions Export/Modifier/Supprimer) est conservé : il décrit la structure générique de la tuile, fidèle au `BASE_PROMPT`.

### Emplacement des designs exploratoires (réservation, sans implémentation) — **solution proposée**
Approche retenue, la plus propre et typée sans scope creep :
1. Type `ExploratoryDesign { id: number; title: string; description: string }` dans `src/types/index.ts` (un exploratoire n'a ni prompt ni variants).
2. Champ **optionnel** `Template.exploratoryDesigns?: ExploratoryDesign[]` — laissé `undefined` pour Cards à cette étape.
3. Dossier `src/features/template/previews/exploratory/` contenant **uniquement** un `README.md` qui documente la convention : les previews exploratoires (ex. `cards.tsx`) y seront ajoutées plus tard et branchées via un futur registry `*_EXPLORATORY_PREVIEWS`.

*Alternatives écartées* : un simple booléen `exploratory?: boolean` (ne porte pas le titre/description) ; tout mettre en commentaire (non typé, non vérifié par le compilateur).

### Rendu de vérification (temporaire)
La page `CategoryPage` (`/category/:catId`) affiche, **uniquement pour `cards`**, la matrice `template.propositions × template.variants` via `CARDS_PREVIEWS`. Bloc explicitement commenté « vérification temporaire » : il sera remplacé par la vraie page template (étape 7). Pas de boutons copier/voir.

## Risks / Trade-offs

- **Images externes (pravatar) en local-first** → ce sont des données de **démonstration** de preview, pas des données métier de l'app. Acceptable ; aucune dépendance réseau bloquante pour le fonctionnement (échec image = repli icône déjà géré).
- **Double définition de `Variant`** (surfaces.ts + types) → divergence possible si l'un change. Mitigation : unions identiques, et `surfaces.ts` est figé (copie conforme) ; on documente que la source data est `src/types`.
- **`cn` introduit clsx + tailwind-merge** → deux petites deps, standard de l'écosystème shadcn (déjà prévu dans CLAUDE.md). Acceptable.
- **Rendu de vérification dans CategoryPage** → risque d'empiéter sur l'étape 7. Mitigation : bloc minimal, isolé, commenté comme temporaire, sans logique de copie.
