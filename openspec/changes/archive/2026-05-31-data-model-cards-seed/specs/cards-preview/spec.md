## ADDED Requirements

### Requirement: Helper de palette de couleurs
Le système SHALL fournir `src/lib/colors.ts` exposant une palette de 14 couleurs (slate, red, orange, amber, yellow, green, emerald, teal, blue, indigo, violet, purple, pink, rose) et une fonction `getColor(name) → { bg, text, dot, ring }`. Pour un nom inconnu ou absent, `getColor` SHALL retourner la couleur par défaut (indigo).

#### Scenario: Couleur connue
- **WHEN** on appelle `getColor("violet")`
- **THEN** on obtient un objet avec les classes `bg`, `text`, `dot`, `ring`

#### Scenario: Repli par défaut
- **WHEN** on appelle `getColor(null)` ou un nom inconnu
- **THEN** on obtient la couleur indigo

### Requirement: Helper cn
Le système SHALL fournir `src/lib/utils.ts` exposant `cn(...)` combinant `clsx` et `tailwind-merge`.

#### Scenario: Fusion de classes
- **WHEN** on appelle `cn("p-2", condition && "hidden", "p-4")`
- **THEN** on obtient une chaîne de classes fusionnée (dernier `p-*` gagnant)

### Requirement: Previews React fidèles des Cards
Le système SHALL fournir `src/features/template/previews/cards.tsx` portant fidèlement les 4 designs (Compact, Standard, Bannière, Showcase) et leurs helpers (`CountChip`, `AvatarStack`, `ActionButtons`, `CardLayers`, `hoverClasses`) ainsi que les maps de couleurs (`HOVER_HALO`, `CHIP_TEXT`, `HALO_BG`, `GRAD_BG`, `GRAD_VIGNETTE`). Les images SHALL être résolues par une fonction locale `resolve(src) => src` (aucun proxy backend). Les textes spécifiques à PLANITICA SHALL être neutralisés (tooltip « Exporter », `SAMPLES` génériques).

#### Scenario: Adaptation sans backend
- **WHEN** on inspecte `cards.tsx`
- **THEN** il n'importe pas `resolvePhotoUrl` ni d'API backend
- **AND** il utilise `getColor` (depuis `src/lib/colors`) et `cn` (depuis `src/lib/utils`)

#### Scenario: Textes neutralisés
- **WHEN** on inspecte les tooltips et SAMPLES
- **THEN** le tooltip d'export affiche « Exporter »
- **AND** les échantillons n'utilisent pas le vocabulaire CRM de PLANITICA

### Requirement: Registry de previews Cards
Le système SHALL exposer `CARDS_PREVIEWS: Record<number, (props) => ReactNode>` mappant l'`id` de chaque proposition à son composant de preview.

#### Scenario: Mapping complet
- **WHEN** on lit `CARDS_PREVIEWS`
- **THEN** il fournit une preview pour chacun des id 1 à 4

### Requirement: Rendu de vérification de la matrice
Le système SHALL rendre, de manière minimale et temporaire, la matrice des 4 propositions × 3 variantes du template Cards, sans boutons copier/voir, afin de confirmer visuellement le portage. `pnpm build` SHALL passer en TypeScript strict sans `any`.

#### Scenario: Matrice visible
- **WHEN** l'utilisateur ouvre la vérification du template Cards
- **THEN** 4 × 3 = 12 previews sont rendues
- **AND** aucun bouton de copie/modale n'est présent
