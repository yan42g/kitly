## Context

Le shell (étape 4) et le modèle de données + seed Cards (étape 5) sont en place. `categories` (8 entrées) vit dans `src/data/categories.ts` ; les templates dans `src/data/templates/`. Seul Cards possède un template. La page `/` est un placeholder. CLAUDE.md impose : local-first, TS strict sans `any`, commentaires en français, séparation données / preview, design sobre et moderne.

## Goals / Non-Goals

**Goals:**
- Page d'accueil aboutie : en-tête simple + grille de cartes catégories.
- Compteur de templates par catégorie.
- Catégories vides visibles, badge « Bientôt », non cliquables.
- Recherche client-side (filtre en mémoire) sur la page.
- `pnpm build` vert (TS strict).

**Non-Goals:**
- Pas de page template finalisée (étape 7), pas de copie/modale (étape 9).
- Pas de DB / favoris / historique / recherche globale persistée (étape 10).
- Pas de recherche globale dans le Header (réservée, PRD §9).

## Decisions

### Comptage des templates par catégorie
Ajout de `countTemplatesByCategory(categoryId): number` dans `src/data/templates/index.ts` (compte les templates du registry pour cette catégorie). Une catégorie est « disponible » si le compte > 0. C'est la **seule** source pour décider lien actif vs badge « Bientôt » — pas de liste codée en dur.

### Catégories vides : visibles mais inertes
Les 8 catégories restent affichées (la vision produit complète motive l'utilisateur). Celles à 0 template :
- rendues en `div` (pas de `Link`), non focusables comme lien,
- opacité réduite + badge « Bientôt »,
- `cursor-default`, aucun `hover` d'invitation au clic.
Les catégories pourvues sont des `Link` vers `/category/:catId` avec affordance de survol.

### Recherche : pilotée par le Header, état partagé
Le champ de recherche **du Header** est fonctionnel et filtre le catalogue. L'état (`query`) est partagé via un **contexte React** (`SearchProvider` posé dans `AppShell`) : le Header écrit, la page Catalogue lit et filtre (`useMemo`). L'index par catégorie agrège : `name` + `description` + (tags et titres de propositions des templates). Comparaison insensible à la casse/accents (normalisation simple). Aucune persistance. Saisir depuis une autre route ramène sur `/`.

*Évolution depuis la version initiale :* la recherche vivait d'abord sur la page Catalogue ; elle est déplacée dans le Header à la demande, d'où le contexte partagé (le Header est global). Une seule barre de recherche au total. La recherche globale plus riche (Cmd+K, PRD §9) reste future.

### Présentation
En-tête : titre « Catalogue » + sous-titre court. Grille responsive (`grid` 1/2/3 colonnes). Carte : icône (accent), nom, description, pied avec compteur (« 1 template » / « Bientôt »). Tokens sémantiques existants (`bg-surface`, `border-border`, `text-muted`, `text-accent`, `rounded-card`). Sobre, cohérent avec le shell, dark/light.

## Risks / Trade-offs

- **Deux notions de recherche** (page vs Header) → risque de confusion. Mitigation : le Header reste un placeholder visuel non fonctionnel ; documenté comme « recherche globale à venir ». Une seule recherche active (page).
- **Couplage catalogue → registry templates** pour le comptage → assumé : c'est la donnée qui pilote l'UI (extensibilité : ajouter un template fait passer la catégorie en « disponible » sans toucher la page).
- **Normalisation des accents** → implémentation simple (`normalize('NFD')` + suppression diacritiques) suffisante pour un filtre local.
