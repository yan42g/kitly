## Context

Données et previews en place (étape 5) : `Template` (propositions + variants), `CARDS_PREVIEWS` + `SAMPLES` (cards.tsx), système de prompts (`buildPrompt`, `VARIANT_LABELS`). Routes déjà déclarées (`/category/:catId`, `/template/:catId/:tplId`). La page catégorie contient un bloc de vérification temporaire à retirer. Contraintes : TS strict sans `any`, français, séparation données/preview, responsive (déjà assuré par le conteneur du shell).

## Goals / Non-Goals

**Goals:**
- Page catégorie listant les templates et menant au détail.
- Page template avec sélecteur global de variante et previews des propositions.
- Découpler la page template des spécificités d'une catégorie (registry de previews).
- `pnpm build` vert (TS strict).

**Non-Goals:**
- Pas de copie/modale de prompt (étape 9).
- Pas de DB / favoris / historique (étape 10).
- Pas d'implémentation des designs exploratoires.

## Decisions

### Registry de previews par catégorie
Pour éviter que `TemplatePage` n'importe directement `CARDS_PREVIEWS`/`SAMPLES`, on crée `src/features/template/previews/index.ts` qui expose :
- `hasPreview(categoryId): boolean`
- `renderPreview(categoryId, propId, variant, index): ReactNode | null`

Pour `cards`, le renderer appelle `CARDS_PREVIEWS[propId]({ s: SAMPLES[index % SAMPLES.length], variant })`. Ajouter une catégorie avec previews = enregistrer un renderer ici. La page template reste générique.

### Échantillon par proposition
Le sélecteur de variante étant **global**, les 4 propositions s'affichent dans la même variante. Pour conserver la diversité d'échantillons (photo / logo / sans image), chaque proposition reçoit un sample par sa position (`index % SAMPLES.length`). On illustre ainsi la robustesse de chaque design sans multiplier les contrôles.

### Sélecteur de variante
Segmented control piloté par un `useState<Variant>` initialisé sur `template.variants[0]`. Labels via `VARIANT_LABELS` (réutilisé du système de prompts, non modifié). Accessible (boutons `aria-pressed`).

### Navigation catégorie → template
`/category/:catId` liste `getTemplatesByCategory(catId)` ; chaque template est un `Link` vers `/template/:catId/:templateId`. `/template/:catId/:tplId` charge `getTemplateById(tplId)` et vérifie la cohérence avec `catId` ; sinon, état « introuvable ». Fil d'Ariane simple (Catalogue / Catégorie / Template) pour le retour.

### Suppression de la vérification temporaire
Le bloc `CardsVerification` ajouté à l'étape 5 dans `CategoryPage` est retiré : la preview vit désormais sur la page template.

## Risks / Trade-offs

- **Catégorie à template unique** → la page liste paraît redondante (1 carte). Acceptable : le modèle passe à l'échelle dès qu'une catégorie aura plusieurs templates, et reste cohérent.
- **`renderPreview` renvoie `ReactNode`** appelé comme fonction (pas via JSX `<Comp/>`) → conserve la signature existante de `CARDS_PREVIEWS` ; les composants restent purement présentiels (pas de hooks internes), donc l'appel direct est sûr.
- **Double type `Variant`** (types vs surfaces) déjà documenté ; unions identiques, `VARIANT_LABELS` indexable par la variante du modèle.
