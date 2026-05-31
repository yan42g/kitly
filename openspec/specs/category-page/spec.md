# category-page Specification

## Purpose
TBD - created by archiving change template-page. Update Purpose after archive.
## Requirements
### Requirement: Détail du template d'une catégorie
La page `/category/:catId` SHALL afficher directement le détail du template de la catégorie : un fil d'Ariane (Catalogue / Catégorie), le nom, la description et les tags du template, un sélecteur global de variante et la grille de ses propositions. Si la catégorie est inconnue, un message d'absence SHALL être affiché. Si la catégorie ne contient aucun template, un message « Bientôt » (ou équivalent) SHALL être affiché.

#### Scenario: Catégorie pourvue
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** le détail du template Cards s'affiche (nom, description, tags)
- **AND** le fil d'Ariane permet de remonter au catalogue
- **AND** aucune page liste intermédiaire n'est traversée

#### Scenario: Catégorie sans template
- **WHEN** l'utilisateur ouvre une catégorie sans template
- **THEN** un message « Bientôt » (ou équivalent) est affiché

#### Scenario: Catégorie inconnue
- **WHEN** l'utilisateur ouvre `/category/inconnue`
- **THEN** un message indiquant l'absence de catégorie est affiché

### Requirement: Sélecteur global de variante
La page catégorie SHALL fournir un sélecteur (segmented control) listant les variantes du template, initialisé sur la première. Changer de variante SHALL mettre à jour toutes les previews de propositions affichées.

#### Scenario: Bascule de variante
- **WHEN** l'utilisateur sélectionne la variante « Halo coloré »
- **THEN** toutes les propositions affichées passent en variante Halo

### Requirement: Preview des propositions
La page catégorie SHALL afficher chaque proposition du template (titre + description + preview rendue dans la variante sélectionnée), via le registry de previews (`renderPreview`). Aucune action de copie de prompt n'est présente à cette étape.

#### Scenario: Propositions rendues
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** les 4 propositions sont affichées avec leur preview
- **AND** aucun bouton de copie/modale n'est présent

