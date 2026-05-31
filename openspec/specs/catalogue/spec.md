# catalogue Specification

## Purpose
TBD - created by archiving change catalogue-page. Update Purpose after archive.
## Requirements
### Requirement: Catalogue groupé par sections
La page Catalogue (`/`) SHALL afficher un en-tête simple (titre + sous-titre) puis les catégories regroupées par section, dans l'ordre du registre `categoryGroups`. Chaque section affiche son label, puis une grille des cartes de ses catégories. Chaque carte SHALL présenter l'icône, le nom, la description et un compteur de templates de la catégorie.

#### Scenario: Toutes les catégories visibles, groupées
- **WHEN** l'utilisateur ouvre `/`
- **THEN** toutes les catégories du registry sont affichées, réparties sous le label de leur groupe
- **AND** chaque carte montre icône, nom, description et compteur de templates

#### Scenario: Sections vides masquées au filtrage
- **WHEN** une recherche ne laisse aucune catégorie dans un groupe
- **THEN** ce groupe (label inclus) n'est pas affiché

### Requirement: Cartes catégories visuelles
Chaque carte de catégorie SHALL être visuellement distinctive selon la couleur de son groupe : icône présentée dans une pastille colorée et accent (liseré) de la couleur du groupe.

#### Scenario: Accent de couleur par groupe
- **WHEN** une catégorie est affichée dans le catalogue
- **THEN** son icône apparaît dans une pastille de la couleur de son groupe
- **AND** la carte porte un accent visuel de cette couleur

### Requirement: Catégories disponibles vs à venir
Une catégorie SHALL être considérée disponible si elle possède au moins un template (compté via le registry). Les catégories disponibles SHALL être des liens vers `/category/:catId`. Les catégories sans template SHALL afficher un badge « Bientôt », être visuellement atténuées et NON cliquables.

#### Scenario: Catégorie pourvue cliquable
- **WHEN** l'utilisateur clique sur la carte « Cards » (1 template)
- **THEN** il navigue vers `/category/cards`

#### Scenario: Catégorie vide inerte
- **WHEN** une catégorie n'a aucun template
- **THEN** sa carte affiche le badge « Bientôt »
- **AND** elle n'est pas cliquable (aucune navigation)

### Requirement: Recherche du catalogue depuis le Header
La recherche SHALL être pilotée par le champ situé dans le Header (en haut à droite), via un état partagé. Elle SHALL filtrer les catégories affichées dans le catalogue, en mémoire et sans persistance, sur le nom et la description de la catégorie ainsi que sur les tags et titres de propositions de ses templates, de manière insensible à la casse et aux accents. La page Catalogue NE SHALL PAS comporter son propre champ de recherche. Saisir une recherche depuis une autre route SHALL ramener l'utilisateur au catalogue.

#### Scenario: Filtre par nom depuis le Header
- **WHEN** l'utilisateur saisit « card » dans le champ du Header
- **THEN** la catégorie « Cards » reste affichée dans le catalogue
- **AND** les catégories ne correspondant pas sont masquées

#### Scenario: Recherche déclenchée hors catalogue
- **WHEN** l'utilisateur se trouve sur une autre route et commence à saisir dans le champ du Header
- **THEN** il est ramené sur le catalogue (`/`) qui affiche les résultats filtrés

#### Scenario: Filtre par tag de template
- **WHEN** l'utilisateur saisit « avatar » (tag du template Cards)
- **THEN** la catégorie « Cards » est affichée

#### Scenario: Aucun résultat
- **WHEN** la saisie ne correspond à aucune catégorie
- **THEN** un état « aucun résultat » est affiché

