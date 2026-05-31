## 1. Données

- [x] 1.1 Ajouter `countTemplatesByCategory(categoryId): number` dans `src/data/templates/index.ts`

## 1bis. Expansion du registry de catégories

- [x] 1b.1 Ajouter le champ `group` à `Category` + type `CategoryGroup` dans `src/types/index.ts`
- [x] 1b.2 Ajouter le registre ordonné `categoryGroups` (4 groupes) dans `src/data/categories.ts`
- [x] 1b.3 Étendre le seed à 39 catégories rattachées à leur groupe (icônes lucide vérifiées)
- [x] 1b.4 Grouper le rendu de la sidebar (`Sidebar.tsx`) par `categoryGroups`

## 1ter. Design & navigation

- [x] 1t.1 Ajouter une couleur d'accent par groupe (`CategoryGroup.color`) + `getGroupColor`
- [x] 1t.2 Sidebar : groupes repliables (chevron animé, `aria-expanded`), état mémorisé en localStorage, icônes teintées + pastille colorée par groupe
- [x] 1t.3 Catalogue : cartes visuelles (pastille d'icône colorée + liseré latéral, couleur du groupe)
- [x] 1t.4 Titres de groupes raccourcis et sans majuscules (sidebar sur une ligne ; catalogue en H2)

## 1quater. Recherche dans le Header

- [x] 1q.1 Contexte partagé `src/context/search.tsx` (`SearchProvider` + `useSearch`)
- [x] 1q.2 `AppShell` enveloppe le shell avec `SearchProvider`
- [x] 1q.3 Header : champ de recherche fonctionnel (filtre le catalogue, ramène sur `/`)
- [x] 1q.4 Catalogue : suppression du champ local, lecture de la requête via `useSearch`

## 1quinquies. Responsive global

- [x] 1x.1 `AppShell` : conteneur de contenu centré à largeur max (`max-w-6xl`) + padding responsive, appliqué à toutes les routes

## 1sexies. Sidebar style PLANITICA

- [x] 1s.1 Ajouter `icon` à `CategoryGroup` + icône par groupe
- [x] 1s.2 En-têtes de groupe colorés : icône + label MAJUSCULE + chevron (↓/›) dans la couleur du groupe
- [x] 1s.3 Sous-items indentés le long d'un trait vertical coloré ; item actif en pastille surélevée (neutre)

## 2. Page Catalogue

- [x] 2.1 Réécrire `src/routes/CataloguePage.tsx` : en-tête (titre + sous-titre) + catégories en sections groupées (icône, nom, description, compteur)
- [x] 2.2 Catégories disponibles → `Link` vers `/category/:catId` ; catégories vides → non cliquables, atténuées, badge « Bientôt »
- [x] 2.3 Filtrage : index (nom + description + tags/titres des templates), `useMemo`, normalisation casse/accents (requête fournie par `useSearch`)
- [x] 2.4 État « aucun résultat »

## 3. Build & vérification

- [x] 3.1 `pnpm build` passe (TS strict, aucun `any`)
- [x] 3.2 Vérification manuelle (commande fournie à l'utilisateur)
