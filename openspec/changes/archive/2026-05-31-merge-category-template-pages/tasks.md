## 1. Fusion dans la page catégorie

- [x] 1.1 Réécrire `src/routes/CategoryPage.tsx` : résoudre la catégorie (inconnue → message), charger `getTemplateByCategory(catId)` (absent → « Bientôt »), sinon rendre le détail
- [x] 1.2 Détail : fil d'Ariane (Catalogue / `category.name`), en-tête (nom + description + tags), sélecteur global de variante (`useState` sur `variants[0]`, `aria-pressed`, `VARIANT_LABELS`), grille des propositions via `renderPreview`
- [x] 1.3 Isoler le sélecteur + grille dans un sous-composant interne (le `useState` n'est monté que si un template existe)

## 2. Suppression de la route et de la page template

- [x] 2.1 `src/router.tsx` : retirer la route `template/:catId/:tplId` et l'import `TemplatePage`
- [x] 2.2 Supprimer `src/routes/TemplatePage.tsx`
- [x] 2.3 `src/data/templates/index.ts` : retirer `getTemplateById` (code mort)

## 3. Build & vérification

- [x] 3.1 `pnpm build` passe (TS strict, aucun `any`, aucun import mort)
- [x] 3.2 Vérification manuelle : `/category/cards` affiche directement les propositions + sélecteur de variante ; catégorie inconnue et sans template inchangées ; `/template/...` ne résout plus
