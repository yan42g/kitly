## MODIFIED Requirements

### Requirement: Rendu de vérification de la matrice
Les previews des propositions Cards (4 propositions × variantes) SHALL être consommées par la page template via le registry de previews (`renderPreview`), et non plus par un bloc de vérification temporaire dans la page catégorie. `pnpm build` SHALL passer en TypeScript strict sans `any`.

#### Scenario: Previews rendues par la page template
- **WHEN** l'utilisateur ouvre la page template de Cards
- **THEN** les 4 propositions sont rendues dans la variante sélectionnée
- **AND** aucun bloc de vérification temporaire ne subsiste dans la page catégorie
