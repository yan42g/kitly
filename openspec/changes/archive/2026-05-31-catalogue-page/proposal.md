## Why

La route `/` n'affiche encore qu'un placeholder. C'est pourtant la page d'accueil de Kitly : le point d'entrée vers les catégories de composants. L'étape 6 en fait une vraie page Catalogue, aboutie, qui présente l'ensemble des catégories prévues (vision produit complète) tout en distinguant ce qui est réellement disponible.

## What Changes

- **Page Catalogue** (`src/routes/CataloguePage.tsx`) : en-tête simple (titre + sous-titre) puis catégories présentées en **sections groupées** (cartes soignées). Chaque carte affiche icône, nom, description et un **compteur de templates**.
- **Catégories sans template** : toutes les catégories sont affichées (vision complète). Celles sans template sont marquées d'un badge **« Bientôt »**, grisées et **non cliquables**. Seules les catégories pourvues (Cards aujourd'hui) sont des liens vers `/category/:catId`.
- **Recherche client-side depuis le Header** : le champ de recherche du Header (en haut à droite) devient fonctionnel et filtre les catégories du catalogue via un état partagé (contexte React), en mémoire (nom + description + tags/titres des templates). La page Catalogue n'a plus son propre champ. Pas de DB, pas de persistance.
- **Helper de comptage** : `countTemplatesByCategory(categoryId)` ajouté au registry `src/data/templates/index.ts`.
- **Expansion du registry de catégories** : ajout d'un champ `group` à `Category` et d'un registre ordonné de groupes (`categoryGroups`). Le seed passe de 8 à **39 catégories** réparties en 4 groupes : Sections de landing page, Composants UI essentiels, Layouts d'application, Saisie & feedback. Ajouter une catégorie reste **1 ligne** dans `src/data/categories.ts`.
- **Sidebar groupée** : la sidebar liste désormais les catégories par groupe (mêmes sémantiques de disponibilité que le catalogue), pour rester lisible avec ~40 entrées.
- **Responsive global** : la zone de contenu est centrée à largeur maximale (padding responsive) pour toutes les routes, afin d'éviter l'étirement plein écran sur grands moniteurs.
- La route `/` n'est donc plus un placeholder (mise à jour de la spec `app-shell`). Les routes `/category/:catId` et `/template/...` restent inchangées à cette étape.

## Capabilities

### New Capabilities
- `catalogue`: Page d'accueil listant les catégories par sections groupées (cartes soignées, compteur de templates, badge « Bientôt » pour les vides non cliquables, recherche client-side, navigation vers les catégories pourvues).

### Modified Capabilities
- `app-shell`: La route `/` ne rend plus un placeholder mais la page Catalogue réelle (les routes catégorie/template restent placeholder). La sidebar liste les catégories regroupées par groupe.
- `category-registry`: Ajout d'un champ `group` à `Category` et d'un registre ordonné de groupes ; seed étendu de 8 à 39 catégories réparties en 4 groupes.

## Impact

- **Fichiers modifiés** : `src/routes/CataloguePage.tsx` (page groupée, sans champ propre), `src/data/templates/index.ts` (helper de comptage), `src/types/index.ts` (champ `group` + couleur de groupe), `src/data/categories.ts` (groupes colorés + 39 catégories), `src/components/shell/Sidebar.tsx` (groupes repliables colorés), `src/components/shell/Header.tsx` (recherche fonctionnelle), `src/components/shell/AppShell.tsx` (SearchProvider).
- **Fichiers créés** : `src/context/search.tsx` (contexte de recherche partagé).
- **Champ de recherche du Header** : désormais **fonctionnel** (filtre le catalogue). La recherche globale plus riche (Cmd+K, PRD §9) reste une évolution future.
- **Aucune dépendance ajoutée** (icônes lucide vérifiées comme disponibles).
- **Note vision** : les 31 nouvelles catégories arrivent sans template (« Bientôt ») ; leur contenu (templates + prompts) se construira ensuite catégorie par catégorie.
- **Hors périmètre** : page template finalisée (étape 7), copie/modale (étape 9), DB / favoris / historique / recherche globale persistée (étape 10).
