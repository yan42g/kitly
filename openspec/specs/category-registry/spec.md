# category-registry Specification

## Purpose
TBD - created by archiving change app-shell. Update Purpose after archive.
## Requirements
### Requirement: Registry de catégories typé
L'application SHALL définir un type `Category` (au minimum : `id`, `name`, `icon` référençant une icône lucide, `description`) dans `src/types/index.ts`, et un tableau typé de catégories dans `src/data/categories.ts`. Aucun `any` ne SHALL être utilisé.

#### Scenario: Catégories typées disponibles
- **WHEN** le code importe le registry depuis `src/data/categories.ts`
- **THEN** il reçoit un tableau de `Category` typé statiquement
- **AND** chaque catégorie expose `id`, `name`, `icon` et `description`

### Requirement: Catégories seed
Le registry SHALL être seedé avec les catégories : Cards, Forms, Hero, Pricing, Modals, Navigation, Dashboards, Boutons.

#### Scenario: Sidebar alimentée par le registry
- **WHEN** l'application rend la sidebar
- **THEN** une entrée est affichée pour chaque catégorie du registry, avec son icône et son nom

### Requirement: Extensibilité par un seul fichier
Ajouter une catégorie SHALL nécessiter d'éditer uniquement `src/data/categories.ts` (et, le cas échéant, d'importer l'icône lucide voulue), sans modifier la sidebar ni les composants du shell.

#### Scenario: Ajout d'une catégorie
- **WHEN** une nouvelle entrée `Category` est ajoutée au tableau de `src/data/categories.ts`
- **THEN** elle apparaît automatiquement dans la sidebar
- **AND** aucun autre fichier n'a eu besoin d'être modifié

