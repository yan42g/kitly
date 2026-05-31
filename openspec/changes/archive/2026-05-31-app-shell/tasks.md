## 1. Dépendances

- [x] 1.1 Installer `tailwindcss` et `@tailwindcss/vite` (pnpm)
- [x] 1.2 Installer `react-router` (PAS react-router-dom)
- [x] 1.3 Installer `lucide-react`

## 2. Tailwind v4 CSS-first

- [x] 2.1 Ajouter le plugin `@tailwindcss/vite` dans `vite.config.ts`
- [x] 2.2 Dans `src/index.css` : `@import "tailwindcss";`, variante dark en mode classe (`@custom-variant`), tokens via `@theme` + variables CSS (couleurs statiques) et redéfinition des couleurs sous `.dark`
- [x] 2.3 Vérifier l'absence de tout `tailwind.config.js`

## 3. Thème (dark/light)

- [x] 3.1 Créer `src/lib/theme.ts` : `getStoredTheme`, `applyTheme`, `toggleTheme` (clé `localStorage` `kitly-theme`, classe `dark` sur `<html>`, défaut sombre)
- [x] 3.2 Appliquer le thème avant le premier paint (dans `main.tsx` avant le render) pour éviter le flash

## 4. Types et registry de catégories

- [x] 4.1 Créer le type `Category` dans `src/types/index.ts` (`id`, `name`, `icon: LucideIcon`, `description`)
- [x] 4.2 Créer `src/data/categories.ts` : tableau typé seedé (Cards, Forms, Hero, Pricing, Modals, Navigation, Dashboards, Boutons) avec icônes lucide

## 5. Pages placeholder

- [x] 5.1 Créer `src/routes/CataloguePage.tsx` (placeholder Catalogue)
- [x] 5.2 Créer `src/routes/CategoryPage.tsx` (placeholder, affiche `:catId`)
- [x] 5.3 Créer `src/routes/TemplatePage.tsx` (placeholder, affiche `:catId` et `:tplId`)

## 6. Shell de l'application

- [x] 6.1 Créer `src/components/shell/ThemeToggle.tsx` (bouton soleil/lune, utilise `src/lib/theme.ts`)
- [x] 6.2 Créer `src/components/shell/Sidebar.tsx` (liste les catégories du registry, icône + nom, lien actif surligné via `NavLink`, responsive masquable)
- [x] 6.3 Créer `src/components/shell/Header.tsx` (logo Kitly à gauche, placeholder recherche, `ThemeToggle` à droite, bouton d'ouverture sidebar en petit écran)
- [x] 6.4 Créer `src/components/shell/AppShell.tsx` (assemble sidebar + header + zone de contenu avec `<Outlet />`, layout responsive)

## 7. Routing

- [x] 7.1 Définir le router (`createBrowserRouter`) avec route layout `AppShell` et routes enfants `/`, `/category/:catId`, `/template/:catId/:tplId`
- [x] 7.2 Brancher `RouterProvider` dans `src/main.tsx`
- [x] 7.3 Nettoyer `App.tsx`/CSS de démo devenus inutiles

## 8. Vérification

- [x] 8.1 `pnpm build` passe (TS strict, aucun `any`, aucune erreur)
- [x] 8.2 Vérifier manuellement (commande fournie à l'utilisateur) : navigation, lien actif, toggle dark/light persisté, responsive
