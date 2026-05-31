## Why

Après le bootstrap technique (étape 3), l'application n'affiche qu'une fenêtre vide. Pour pouvoir y greffer ensuite les pages réelles (catalogue, catégories, templates), il faut d'abord poser l'ossature de navigation : un layout persistant, un système de routes et un design system minimal. Cette étape rend l'application **navigable** sans encore introduire de contenu métier, de persistance ni de génération de prompts.

## What Changes

- Mise en place de **Tailwind v4 en CSS-first** : dépendances `tailwindcss` + `@tailwindcss/vite`, plugin dans `vite.config.ts`, `@import "tailwindcss";` dans `src/index.css`, tokens de design (couleurs, rayons…) définis via `@theme` et variables CSS. **Pas de `tailwind.config.js`.**
- Mise en place de **react-router v7** (package `react-router`, pas `react-router-dom`) : `createBrowserRouter` + `RouterProvider` dans `main.tsx`.
- Trois routes partageant un **layout AppShell** commun (via `<Outlet />`), toutes en **placeholder** :
  - `/` → page Catalogue
  - `/category/:catId` → page Catégorie
  - `/template/:catId/:tplId` → page Template
- Ajout du **shell d'application** dans `src/components/shell/` : `AppShell`, `Sidebar`, `Header`, `ThemeToggle`.
- **Dark/light mode** piloté par une classe `dark` sur `<html>`, persisté en `localStorage` (pure préférence UI), dark par défaut.
- **Registry de catégories** typé : type `Category` dans `src/types/index.ts` et tableau seed dans `src/data/categories.ts` (Cards, Forms, Hero, Pricing, Modals, Navigation, Dashboards, Boutons). Ajouter une catégorie = éditer ce seul fichier.
- Ajout de `lucide-react` pour les icônes.

## Capabilities

### New Capabilities
- `app-shell`: Layout persistant (sidebar + header + zone de contenu) et système de routes placeholder partageant ce layout, responsive.
- `theming`: Design system Tailwind v4 CSS-first et bascule dark/light persistée, dark par défaut.
- `category-registry`: Source de vérité typée des catégories de composants, extensible par un seul fichier.

### Modified Capabilities
<!-- Aucune capability existante : openspec/specs/ est vide. -->

## Impact

- **Dépendances ajoutées** : `tailwindcss`, `@tailwindcss/vite`, `react-router`, `lucide-react`.
- **Fichiers modifiés** : `vite.config.ts` (plugin Tailwind), `src/index.css` (import Tailwind + tokens), `src/main.tsx` (RouterProvider), `index.html` (classe `dark` initiale éventuelle).
- **Fichiers créés** : `src/components/shell/{AppShell,Sidebar,Header,ThemeToggle}.tsx`, `src/routes/` (pages placeholder), `src/lib/theme.ts`, `src/data/categories.ts`, `src/types/index.ts`.
- **Hors périmètre (étapes suivantes)** : DB/SQLite, shadcn/ui, génération de prompts, contenu réel des pages.
