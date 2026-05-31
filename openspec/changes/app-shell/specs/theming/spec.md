## ADDED Requirements

### Requirement: Design system Tailwind v4 CSS-first
L'application SHALL utiliser Tailwind v4 en mode CSS-first : Tailwind importé via `@import "tailwindcss";` dans `src/index.css` et activé par le plugin `@tailwindcss/vite`. Les tokens de design (couleurs, rayons…) SHALL être définis en CSS via `@theme` et des variables CSS. Il NE DOIT PAS exister de fichier `tailwind.config.js`.

#### Scenario: Pas de fichier de config JS
- **WHEN** on inspecte la racine du projet
- **THEN** aucun fichier `tailwind.config.js` n'est présent
- **AND** la configuration du thème est définie dans `src/index.css`

#### Scenario: Utilitaires Tailwind disponibles
- **WHEN** un composant utilise une classe utilitaire Tailwind
- **THEN** le style correspondant est appliqué après build

### Requirement: Bascule dark/light persistée
L'application SHALL permettre de basculer entre les thèmes sombre et clair via un contrôle dans le header. Le thème SHALL être piloté par la présence/absence de la classe `dark` sur l'élément `<html>`, et le choix SHALL être persisté en `localStorage`. Le thème par défaut SHALL être le sombre.

#### Scenario: Bascule de thème
- **WHEN** l'utilisateur active le ThemeToggle
- **THEN** la classe `dark` est ajoutée ou retirée de `<html>`
- **AND** l'apparence de l'interface change en conséquence

#### Scenario: Persistance au rechargement
- **WHEN** l'utilisateur a choisi le thème clair puis recharge l'application
- **THEN** le thème clair est réappliqué au démarrage depuis `localStorage`

#### Scenario: Thème par défaut
- **WHEN** aucun choix n'a encore été persisté
- **THEN** l'application démarre en thème sombre
