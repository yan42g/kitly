## Context

L'app sort du bootstrap (Tauri v2 + Vite + React 19 + TS strict, port 1421). `src/` ne contient qu'un `App.tsx` placeholder. On veut une coquille navigable avant d'introduire le métier. Contraintes du projet : local-first, TS strict sans `any`, code/commentaires en français, persistance future isolée derrière `src/lib/store` (donc on n'introduit aucune dépendance DB ici), extensibilité des catégories par un seul fichier.

## Goals / Non-Goals

**Goals:**
- Tailwind v4 CSS-first opérationnel (tokens via `@theme`, dark mode par classe).
- Routing react-router v7 avec un layout AppShell partagé et 3 routes placeholder.
- Shell complet : `AppShell`, `Sidebar`, `Header`, `ThemeToggle`.
- Registry de catégories typé, extensible par un seul fichier.
- Dark mode par défaut, basculable et persisté.

**Non-Goals:**
- Pas de contenu réel dans les pages (placeholders uniquement).
- Pas de DB/SQLite, pas de `src/lib/store` (viendra avec la persistance).
- Pas de shadcn/ui, pas de génération de prompts.
- Pas de recherche fonctionnelle (emplacement visuel placeholder seulement).

## Decisions

### Routing : `createBrowserRouter` + route layout
On utilise `createBrowserRouter([...])` avec une route racine qui rend `<AppShell />` et des routes enfants pour `/`, `/category/:catId`, `/template/:catId/:tplId`. `AppShell` rend `<Outlet />` dans sa zone de contenu.
- *Alternative écartée* : `BrowserRouter` + `<Routes>` déclaratifs. `createBrowserRouter` est l'API recommandée de react-router v7 et prépare le terrain (loaders/actions) si besoin plus tard.
- En environnement Tauri, l'app est servie sur `http://localhost:1421` : `createBrowserRouter` (history API) fonctionne sans config serveur particulière en dev.

### Tailwind v4 CSS-first
`@tailwindcss/vite` ajouté dans `vite.config.ts` ; `src/index.css` contient `@import "tailwindcss";` puis un bloc `@theme` définissant les tokens (couleurs de surface, texte, accent, bordure, rayons). Pas de `tailwind.config.js`.
- **Dark mode** : on configure la variante dark en mode « classe » via `@custom-variant dark (&:where(.dark, .dark *));` afin que `dark:` réagisse à la classe `dark` sur `<html>` (et non à `prefers-color-scheme`). Les couleurs sont exprimées en variables CSS redéfinies sous `.dark` pour un thème cohérent.
- *Alternative écartée* : `tailwind.config.js` avec `darkMode: 'class'` — interdit par les conventions (CSS-first, pas de config JS).

### Thème : helper `src/lib/theme.ts` + `localStorage`
Un module `src/lib/theme.ts` expose `getStoredTheme()`, `applyTheme(theme)` et `toggleTheme()`. Il lit/écrit la clé `kitly-theme` dans `localStorage` et applique/retire la classe `dark` sur `document.documentElement`. Le thème est appliqué le plus tôt possible (dans `main.tsx` avant le render, ou via un petit script inline) pour éviter un flash de thème clair.
- *Pourquoi `localStorage` et pas le store isolé ?* C'est une pure préférence UI, sans rapport avec les données métier portables. `localStorage` est dispo en Tauri (WebView) et reste trivialement portable web. On documente que ce n'est pas de la donnée métier.
- Dark par défaut : si aucune valeur stockée, on applique `dark`.

### Structure des fichiers
- `src/components/shell/` : `AppShell.tsx`, `Sidebar.tsx`, `Header.tsx`, `ThemeToggle.tsx`.
- `src/routes/` : `CataloguePage.tsx`, `CategoryPage.tsx`, `TemplatePage.tsx` (placeholders), plus la définition du router (dans `main.tsx` ou `src/router.tsx`).
- `src/data/categories.ts`, `src/types/index.ts`, `src/lib/theme.ts`.

### Icônes : composant lucide stocké dans `Category`
`Category.icon` référence un composant lucide (`LucideIcon`). La sidebar rend `<Icon />`. Cela garde l'ajout d'une catégorie à une seule ligne (importer l'icône + ajouter l'entrée).
- *Alternative écartée* : stocker un nom d'icône en string et résoudre via une map — ajoute un point de maintenance supplémentaire, contraire au principe « un seul fichier ».

## Risks / Trade-offs

- **Flash of light theme (FOUC)** au démarrage si le thème est appliqué trop tard → Mitigation : appliquer la classe `dark` avant le premier paint (dans `main.tsx` avant `createRoot().render`, ou script inline dans `index.html`).
- **Couplage `Category.icon` à lucide** → acceptable : lucide est dans la stack validée ; si portage, le type reste un composant React.
- **react-router v7 history en Tauri** : les liens profonds rechargés pourraient 404 en build packagé. Hors périmètre (navigation interne uniquement à cette étape) ; à surveiller si l'on ouvre des deep links plus tard.
- **`@theme` vs variables CSS sous `.dark`** : bien séparer les tokens « statiques » (rayons) des tokens dépendants du thème (couleurs) pour éviter des couleurs figées en dark → Mitigation : couleurs en variables CSS redéfinies sous `.dark`.
