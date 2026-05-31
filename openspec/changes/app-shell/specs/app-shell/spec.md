## ADDED Requirements

### Requirement: Layout persistant
L'application SHALL afficher un layout persistant composé d'une barre latérale (sidebar), d'un en-tête (header) et d'une zone de contenu principale. La sidebar et le header SHALL rester visibles lors de la navigation entre les routes ; seule la zone de contenu change.

#### Scenario: Navigation sans rechargement du shell
- **WHEN** l'utilisateur navigue d'une route à une autre via la sidebar
- **THEN** la sidebar et le header restent montés et inchangés
- **AND** seule la zone de contenu (Outlet) est remplacée par la nouvelle page

### Requirement: Routes placeholder partagées
L'application SHALL exposer trois routes — `/` (Catalogue), `/category/:catId`, `/template/:catId/:tplId` — rendues à l'intérieur du layout AppShell via `<Outlet />`. À cette étape, chaque route SHALL afficher un contenu placeholder reflétant ses paramètres d'URL, sans contenu métier réel.

#### Scenario: Route catalogue
- **WHEN** l'utilisateur ouvre `/`
- **THEN** la page Catalogue placeholder s'affiche dans la zone de contenu

#### Scenario: Route catégorie avec paramètre
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** la page Catégorie placeholder s'affiche et indique le `catId` (`cards`)

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
