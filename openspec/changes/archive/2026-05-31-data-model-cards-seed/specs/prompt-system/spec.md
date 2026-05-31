## ADDED Requirements

### Requirement: Système de prompts porté à l'identique
Le système SHALL inclure dans `src/features/prompts/` les 4 fichiers portés de PLANITICA — `base.ts`, `layouts.ts`, `surfaces.ts`, `build.ts` — dont le contenu (`BASE_PROMPT`, `LAYOUTS`, `TITLES`, `SURFACES`, `VARIANT_LABELS`, logique de `buildPrompt`) NE SHALL PAS être modifié. À la fin du portage, `src/features/prompts/` NE SHALL contenir QUE ces 4 fichiers `.ts`.

#### Scenario: Contenu inchangé
- **WHEN** on compare les 4 fichiers `.ts` à leur source PLANITICA
- **THEN** leur contenu est identique (aucune modification)

#### Scenario: Dossier nettoyé
- **WHEN** on liste `src/features/prompts/`
- **THEN** seuls `base.ts`, `layouts.ts`, `surfaces.ts`, `build.ts` sont présents
- **AND** les fichiers de référence `TilesAndCardsPage.tsx` et `ContactCollectionPage.tsx` en ont été retirés

### Requirement: Assemblage d'un prompt
Le système SHALL exposer `buildPrompt(propId, variant)` qui produit le prompt final en substituant les fragments de layout et de surface, et `promptTitle(propId, variant)`.

#### Scenario: Prompt assemblé pour une combinaison
- **WHEN** on appelle `buildPrompt(1, "halo")`
- **THEN** une chaîne non vide est retournée
- **AND** elle ne contient plus aucun placeholder `{{...}}`
