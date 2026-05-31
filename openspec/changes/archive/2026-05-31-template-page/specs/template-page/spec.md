## ADDED Requirements

### Requirement: En-tête du template
La page `/template/:catId/:tplId` SHALL afficher un fil d'Ariane (Catalogue / Catégorie / Template), le nom, la description et les tags du template. Si le template est introuvable ou incohérent avec `catId`, un état « introuvable » SHALL être affiché.

#### Scenario: Template existant
- **WHEN** l'utilisateur ouvre `/template/cards/cards`
- **THEN** le nom, la description et les tags du template Cards sont affichés
- **AND** le fil d'Ariane permet de remonter à la catégorie et au catalogue

#### Scenario: Template introuvable
- **WHEN** l'utilisateur ouvre `/template/cards/inexistant`
- **THEN** un état « introuvable » est affiché

### Requirement: Sélecteur global de variante
La page template SHALL fournir un sélecteur (segmented control) listant les variantes du template, initialisé sur la première. Changer de variante SHALL mettre à jour toutes les previews de propositions affichées.

#### Scenario: Bascule de variante
- **WHEN** l'utilisateur sélectionne la variante « Halo »
- **THEN** toutes les propositions affichées passent en variante Halo

### Requirement: Preview des propositions
La page template SHALL afficher chaque proposition du template (titre + description + preview rendue dans la variante sélectionnée), via le registry de previews. Aucune action de copie de prompt n'est présente à cette étape.

#### Scenario: Propositions rendues
- **WHEN** l'utilisateur ouvre la page template de Cards
- **THEN** les 4 propositions sont affichées avec leur preview
- **AND** aucun bouton de copie/modale n'est présent

### Requirement: Registry de previews par catégorie
Le rendu des previews SHALL passer par un point d'entrée `src/features/template/previews/index.ts` (`hasPreview`, `renderPreview`), de sorte que la page template ne dépende pas des spécificités d'une catégorie.

#### Scenario: Rendu via le registry
- **WHEN** la page template rend une proposition de la catégorie `cards`
- **THEN** elle obtient la preview via `renderPreview('cards', propId, variant, index)`
