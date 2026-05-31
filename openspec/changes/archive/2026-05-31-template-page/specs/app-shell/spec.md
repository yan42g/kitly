## MODIFIED Requirements

### Requirement: Routes placeholder partagées
L'application SHALL exposer trois routes — `/` (Catalogue), `/category/:catId`, `/template/:catId/:tplId` — rendues à l'intérieur du layout AppShell via `<Outlet />`. Les routes `/` (Catalogue), `/category/:catId` (page catégorie) et `/template/:catId/:tplId` (page template) SHALL afficher leur contenu réel (voir capabilities `catalogue`, `category-page`, `template-page`). Plus aucune de ces routes n'est un placeholder.

#### Scenario: Route catalogue
- **WHEN** l'utilisateur ouvre `/`
- **THEN** la page Catalogue réelle s'affiche (grille des catégories)

#### Scenario: Route catégorie avec paramètre
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** la page Catégorie réelle s'affiche (liste des templates de la catégorie)

#### Scenario: Route template avec paramètres
- **WHEN** l'utilisateur ouvre `/template/cards/cards`
- **THEN** la page Template réelle s'affiche (sélecteur de variante + previews)
