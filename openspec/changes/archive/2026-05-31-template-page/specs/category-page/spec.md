## ADDED Requirements

### Requirement: Liste des templates d'une catégorie
La page `/category/:catId` SHALL afficher le nom et la description de la catégorie, puis la liste de ses templates sous forme de cartes (nom, description, tags, nombre de propositions). Chaque carte SHALL être un lien vers `/template/:catId/:templateId`.

#### Scenario: Catégorie pourvue
- **WHEN** l'utilisateur ouvre `/category/cards`
- **THEN** le template Cards est listé
- **AND** cliquer dessus mène à `/template/cards/cards`

#### Scenario: Catégorie sans template
- **WHEN** l'utilisateur ouvre une catégorie sans template
- **THEN** un message « Bientôt » (ou équivalent) est affiché
- **AND** aucune carte de template n'est listée

#### Scenario: Catégorie inconnue
- **WHEN** l'utilisateur ouvre `/category/inconnue`
- **THEN** un message indiquant l'absence de catégorie est affiché
