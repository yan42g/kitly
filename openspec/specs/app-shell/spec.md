# app-shell Specification

## Purpose
TBD - created by archiving change app-shell. Update Purpose after archive.
## Requirements
### Requirement: Layout persistant
L'application SHALL afficher un layout persistant composé d'une barre latérale (sidebar), d'un en-tête (header) et d'une zone de contenu principale. La sidebar et le header SHALL rester visibles lors de la navigation entre les routes ; seule la zone de contenu change.

#### Scenario: Navigation sans rechargement du shell
- **WHEN** l'utilisateur navigue d'une route à une autre via la sidebar
- **THEN** la sidebar et le header restent montés et inchangés
- **AND** seule la zone de contenu (Outlet) est remplacée par la nouvelle page

### Requirement: Routes placeholder partagées
L'application SHALL exposer trois routes — `/` (Catalogue), `/category/:catId`, `/template/:catId/:tplId` — rendues à l'intérieur du layout AppShell via `<Outlet />`. La route `/` SHALL afficher la page Catalogue réelle (voir capability `catalogue`). Les routes `/category/:catId` et `/template/:catId/:tplId` SHALL afficher un contenu placeholder reflétant leurs paramètres d'URL jusqu'à leur finalisation ultérieure.

#### Scenario: Route catalogue
- **WHEN** l'utilisateur ouvre `/`
- **THEN** la page Catalogue réelle s'affiche (grille des catégories)

#### Scenario: Route catégorie avec paramètre
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** la page Catégorie s'affiche et indique le `catId` (`cards`)

#### Scenario: Route template avec paramètres
- **WHEN** l'utilisateur ouvre `/template/cards/basic`
- **THEN** la page Template placeholder s'affiche et indique le `catId` et le `tplId`

### Requirement: Mise en évidence du lien actif
La sidebar SHALL mettre visuellement en évidence l'entrée correspondant à la route active.

#### Scenario: Entrée active surlignée
- **WHEN** l'utilisateur se trouve sur `/category/forms`
- **THEN** l'entrée « Forms » de la sidebar est mise en évidence
- **AND** les autres entrées ne le sont pas

### Requirement: Layout responsive
Le layout SHALL être responsive. Sur petit écran, la sidebar SHALL pouvoir être masquée ou repliée et ouverte à la demande, sans masquer définitivement la navigation.

#### Scenario: Sidebar masquable en petit écran
- **WHEN** la fenêtre est en dessous du point de rupture défini
- **THEN** la sidebar est masquée par défaut
- **AND** un contrôle permet de l'afficher puis de la masquer

### Requirement: Sidebar groupée et repliable
La sidebar SHALL présenter les catégories regroupées par groupe, dans l'ordre du registre `categoryGroups`. Chaque en-tête de groupe SHALL afficher l'icône du groupe, son label en majuscules et un chevron, tous teintés de la couleur du groupe (chevron orienté vers le bas si déplié, vers la droite si replié). Chaque groupe SHALL être repliable/dépliable via cet en-tête cliquable (avec `aria-expanded`), et l'état replié SHALL être persisté entre les sessions (localStorage). Lorsqu'un groupe est déplié, ses catégories SHALL être indentées le long d'un trait vertical de la couleur du groupe ; l'item actif SHALL être mis en évidence par une pastille surélevée. Le comportement responsive reste inchangé.

#### Scenario: Catégories listées par groupe
- **WHEN** l'application rend la sidebar
- **THEN** chaque catégorie apparaît sous le label de son groupe
- **AND** les groupes sont affichés dans l'ordre du registre

#### Scenario: Repli/dépli d'un groupe
- **WHEN** l'utilisateur clique sur l'en-tête d'un groupe
- **THEN** les catégories du groupe sont masquées ou affichées
- **AND** l'état est conservé au rechargement de l'application

### Requirement: Zone de contenu responsive à largeur maximale
La zone de contenu principale SHALL centrer son contenu dans un conteneur à largeur maximale et appliquer un padding responsive, afin d'éviter tout étirement plein écran sur grands moniteurs. Ce comportement SHALL s'appliquer à toutes les routes rendues dans l'`Outlet`.

#### Scenario: Pas d'étirement sur grand écran
- **WHEN** une page est affichée sur un très large écran
- **THEN** son contenu est contraint à une largeur maximale et centré
- **AND** il n'occupe pas toute la largeur disponible

#### Scenario: Marges adaptées sur petit écran
- **WHEN** la fenêtre est étroite
- **THEN** le padding latéral est réduit pour préserver l'espace utile

