## ADDED Requirements

### Requirement: Types du modèle de template
Le système SHALL définir dans `src/types/index.ts`, sans casser le type `Category` existant, les types suivants, sans aucun `any` :
- `Variant = "minimal" | "gradient" | "halo"`
- `Proposition { id: number; title: string; description: string }`
- `Template { id: string; categoryId: string; name: string; description: string; tags: string[]; variants: Variant[]; propositions: Proposition[] }`

#### Scenario: Types disponibles et typés
- **WHEN** un module importe `Template`, `Proposition` ou `Variant` depuis `src/types`
- **THEN** ils sont fournis avec un typage statique strict
- **AND** le type `Category` reste exporté et inchangé

### Requirement: Réservation des designs exploratoires
Le système SHALL définir un type `ExploratoryDesign { id: number; title: string; description: string }` et un champ optionnel `Template.exploratoryDesigns?: ExploratoryDesign[]`. À cette étape, aucun design exploratoire n'est implémenté ; le champ reste non renseigné. Un dossier `src/features/template/previews/exploratory/` SHALL exister avec un `README.md` documentant la convention d'ajout.

#### Scenario: Emplacement réservé sans implémentation
- **WHEN** on inspecte le modèle et l'arborescence des previews
- **THEN** `ExploratoryDesign` et `Template.exploratoryDesigns?` existent
- **AND** le dossier `previews/exploratory/` ne contient qu'un `README.md` (aucun design implémenté)

### Requirement: Registry extensible des templates
Le système SHALL exposer un registry agrégeant les templates dans `src/data/templates/index.ts`. Ajouter une catégorie SHALL nécessiter uniquement de créer `src/data/templates/<cat>.ts` et d'ajouter une ligne dans ce registry. Les fichiers de `src/data/` ne SHALL contenir que des données (aucune dépendance React).

#### Scenario: Cards présent dans le registry
- **WHEN** un module lit le registry des templates
- **THEN** il y trouve le template `cards`

#### Scenario: Données pures
- **WHEN** on inspecte `src/data/templates/cards.ts`
- **THEN** il n'importe aucun composant React (séparation données / preview respectée)

### Requirement: Seed du template Cards
Le système SHALL fournir un `Template` pour les cards avec `categoryId: "cards"`, `variants: ["minimal","gradient","halo"]`, des `tags` pertinents pour la recherche future, et exactement 4 propositions d'`id` 1 à 4 (Compact, Standard, Bannière, Showcase) dont les descriptions sont reprises de PLANITICA.

#### Scenario: Quatre propositions ordonnées
- **WHEN** on lit `template.propositions` du seed cards
- **THEN** il contient 4 entrées d'id 1, 2, 3, 4
- **AND** chacune possède un `title` et une `description`
