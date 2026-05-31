## Context

`template-page` a livré deux pages : `CategoryPage` (liste des templates) et `TemplatePage` (détail : sélecteur de variante + previews via le registry). La taxonomie réelle (38 catégories au niveau « type de composant ») fait que chaque catégorie n'a qu'un template ; le niveau « template » de la navigation est donc redondant. On fusionne les deux pages en une seule, sans toucher au modèle de données ni au registry de previews. Contraintes : TS strict sans `any`, français, react-router v7 (`react-router`).

## Goals / Non-Goals

**Goals:**
- `/category/:catId` rend directement le détail du template (en-tête + sélecteur de variante + propositions).
- Supprimer la route `/template/:catId/:tplId` et la page `TemplatePage`.
- Conserver le type `Template`, les helpers `getTemplateByCategory`/`getTemplatesByCategory` et le registry de previews.

**Non-Goals:**
- Pas de copie/modale de prompt (étape 9), pas de DB (étape 10).
- Pas de suppression du type `Template` ni du registry (toujours utiles).

## Decisions

### Une seule page : `CategoryPage` absorbe le détail
`CategoryPage` devient la page de détail. Logique :
1. `category = categories.find(c => c.id === catId)` ; absente → message « Catégorie inconnue ».
2. `template = getTemplateByCategory(catId)` ; absent → message « Bientôt ».
3. sinon → rendu du détail : fil d'Ariane (Catalogue / `category.name`), en-tête (`category.name` + `template.description` + tags), sélecteur de variante (`useState<Variant>` initialisé sur `template.variants[0]`, `aria-pressed`, `VARIANT_LABELS`), grille des propositions via `renderPreview(template.categoryId, prop.id, variant, index)`.

Le composant de détail (sélecteur + grille) est extrait en sous-composant interne pour isoler le `useState` (rendu seulement quand un template existe). On réutilise quasi tel quel le corps de l'ancien `TemplateView`.

### Chargement par catégorie, pas par id
La page n'a plus de `:tplId` ; le template se charge via `getTemplateByCategory(catId)`. `getTemplateById` n'a plus d'appelant et est retiré pour éviter le code mort.

### Suppression de la route et de la page template
`src/router.tsx` : retrait de l'entrée `template/:catId/:tplId` et de l'import `TemplatePage`. Suppression du fichier `src/routes/TemplatePage.tsx`. Aucun lien interne ne pointe vers `/template/...` (les cartes du catalogue pointent déjà vers `/category/:catId`).

### Fil d'Ariane à deux niveaux
Catalogue / `category.name` (dernier niveau non cliquable). Le retour s'effectue vers le catalogue.

## Risks / Trade-offs

- **BREAKING** : tout lien/marque-page vers `/template/:catId/:tplId` cesse de fonctionner. Acceptable : app desktop locale mono-utilisateur, aucune URL externe.
- **Hypothèse 1 catégorie ↔ 1 template figée dans le routage** : si une catégorie devait un jour porter plusieurs templates, il faudrait réintroduire un niveau de navigation. Jugé improbable vu la granularité des catégories ; le type `Template` reste néanmoins en place pour ne pas fermer la porte côté données.
- **Dépendance de séquencement** : `template-page` doit être archivé avant l'application (les capabilities `category-page`/`template-page` doivent exister dans `openspec/specs/`).
