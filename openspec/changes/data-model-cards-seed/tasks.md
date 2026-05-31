## 1. Dépendances

- [x] 1.1 Installer `clsx` et `tailwind-merge`

## 2. Types du modèle de données

- [x] 2.1 Ajouter `Variant`, `Proposition`, `Template`, `ExploratoryDesign` dans `src/types/index.ts` sans casser `Category`
- [x] 2.2 Ajouter le champ optionnel `Template.exploratoryDesigns?: ExploratoryDesign[]`

## 3. Helpers dans src/lib/

- [x] 3.1 Créer `src/lib/colors.ts` : palette 14 couleurs + `getColor(name) → { bg, text, dot, ring }` (défaut indigo)
- [x] 3.2 Créer `src/lib/utils.ts` : `cn` (clsx + tailwind-merge)

## 4. Système de prompts (déjà présent)

- [x] 4.1 Vérifier que les 4 fichiers `prompts/*.ts` sont intacts (contenu inchangé)

## 5. Données Cards

- [x] 5.1 Créer `src/data/templates/cards.ts` : `Template` `categoryId: "cards"`, 4 propositions (id 1-4), variants, tags, descriptions PLANITICA
- [x] 5.2 Créer `src/data/templates/index.ts` : registry agrégeant les templates (cards)

## 6. Previews React Cards

- [x] 6.1 Créer `src/features/template/previews/cards.tsx` : maps de couleurs + helpers (`CountChip`, `AvatarStack`, `ActionButtons`, `CardLayers`, `hoverClasses`) + `resolve(src) => src`
- [x] 6.2 Porter `Design1`-`Design4` (Compact/Standard/Bannière/Showcase) fidèlement, via `getColor`/`cn`
- [x] 6.3 Neutraliser les textes (tooltip « Exporter », `SAMPLES` génériques avec images de démo)
- [x] 6.4 Exposer `CARDS_PREVIEWS: Record<number, (props) => ReactNode>`
- [x] 6.5 Créer `src/features/template/previews/exploratory/README.md` (convention, sans implémentation)

## 7. Vérification visuelle

- [x] 7.1 Rendu temporaire minimal de la matrice 4 × 3 (dans `CategoryPage` pour `cards`, sans boutons copier/voir)

## 8. Nettoyage

- [x] 8.1 Supprimer `TilesAndCardsPage.tsx` et `ContactCollectionPage.tsx` de `src/features/prompts/` (ne garder que les 4 `.ts`)

## 9. Build

- [x] 9.1 `pnpm build` passe (TS strict, aucun `any`)
- [x] 9.2 Vérification manuelle (commande fournie à l'utilisateur)
