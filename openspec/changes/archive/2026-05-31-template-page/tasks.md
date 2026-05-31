## 1. Données & previews

- [x] 1.1 Ajouter `getTemplateById(id): Template | undefined` dans `src/data/templates/index.ts`
- [x] 1.2 Créer `src/features/template/previews/index.ts` : `hasPreview(categoryId)` + `renderPreview(categoryId, propId, variant, index)` (branche `cards`)

## 2. Page Catégorie

- [x] 2.1 Réécrire `src/routes/CategoryPage.tsx` : en-tête catégorie + liste des templates (cartes : nom, description, tags, nb propositions) liant vers `/template/:catId/:templateId`
- [x] 2.2 Cas catégorie sans template (« Bientôt ») et catégorie inconnue
- [x] 2.3 Supprimer le bloc de vérification temporaire (étape 5)

## 3. Page Template

- [x] 3.1 Réécrire `src/routes/TemplatePage.tsx` : chargement via `getTemplateById`, cohérence avec `catId`, état « introuvable »
- [x] 3.2 En-tête : fil d'Ariane (Catalogue / Catégorie / Template) + nom + description + tags
- [x] 3.3 Sélecteur global de variante (segmented, `VARIANT_LABELS`, `aria-pressed`), `useState` initialisé sur `variants[0]`
- [x] 3.4 Grille des propositions (titre + description + preview via `renderPreview`, échantillon par position)

## 4. Build & vérification

- [x] 4.1 `pnpm build` passe (TS strict, aucun `any`)
- [x] 4.2 Vérification manuelle (commande fournie à l'utilisateur)
