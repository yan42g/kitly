## MODIFIED Requirements

### Requirement: Routes placeholder partagées
L'application SHALL exposer deux routes — `/` (Catalogue) et `/category/:catId` (page catégorie) — rendues à l'intérieur du layout AppShell via `<Outlet />`. La route `/` (Catalogue) et la route `/category/:catId` SHALL afficher leur contenu réel (voir capabilities `catalogue`, `category-page`). La route `/template/:catId/:tplId` n'existe plus : le détail du template est rendu directement par la page catégorie. Plus aucune route n'est un placeholder.

#### Scenario: Route catalogue
- **WHEN** l'utilisateur ouvre `/`
- **THEN** la page Catalogue réelle s'affiche (grille des catégories)

#### Scenario: Route catégorie avec paramètre
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** la page Catégorie réelle s'affiche (détail du template : sélecteur de variante + previews)

#### Scenario: Ancienne route template supprimée
- **WHEN** l'application déclare ses routes
- **THEN** aucune route `/template/:catId/:tplId` n'est exposée
