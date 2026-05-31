# Kitly

App desktop **local-first** (usage perso) : bibliothèque de templates de composants UI
avec génération de prompts copiables, destinés à être collés dans Claude Code pour
générer des composants dans d'autres projets.

## Stack
- Tauri v2 + Vite + React 19 + TypeScript strict
- Tailwind v4 (CSS-first, PAS de tailwind.config.js — config dans index.css)
- shadcn/ui copié dans src/components/ui/
- SQLite via @tauri-apps/plugin-sql (PAS de backend Python)
- lucide-react (icônes)
- react-router v7 (package unique `react-router`, PAS react-router-dom)
- pnpm

## Principes d'architecture
- **Local-first** : aucune dépendance réseau bloquante.
- **Persistance isolée** : SEUL `src/lib/db.ts` connaît @tauri-apps/plugin-sql.
  Tout le reste passe par l'interface `src/lib/store`. Objectif : portage web
  futur (IndexedDB) en changeant une seule ligne.
- **Extensibilité** : ajouter une catégorie = créer `src/data/templates/<cat>.ts`
  + une ligne dans `src/data/categories.ts`. Rien d'autre.
- Routes génériques : `/category/:catId`, `/template/:catId/:tplId`.

## Conventions
- TypeScript strict, pas de `any`.
- Composants fonctionnels, hooks.
- Code prêt à l'emploi, pas de pseudo-code.

## Contraintes
- Pas de scope creep. Toute feature non planifiée doit être proposée, pas implémentée.
- Réponses et commentaires de code en français.

## Workflow
Ce projet utilise **OpenSpec** : les changements significatifs passent par une
proposition dans `openspec/changes/` avant implémentation.

## Documents de référence
- `PRD.md` : vision produit, périmètre, critères de succès.
- `openspec/` : propositions de changement et specs.