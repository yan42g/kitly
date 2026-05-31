// Template de prompt — générique et portable. Aucune référence à un projet
// spécifique : utilisable pour reproduire la tuile dans n'importe quelle app
// React + Tailwind v4. Placeholders substitués par build.ts :
// {{TITLE}}, {{VARIANT_LABEL}}, {{LAYOUT}}, {{SURFACE}}, {{HOVER}},
// {{COLOR_MAPS_HINT}}.

export const BASE_PROMPT = `# {{TITLE}} — Tuile / carte (React + Tailwind v4)

## Stack
React 18+ avec Tailwind CSS v4 (CSS-first, pas de \`tailwind.config.js\`). Dark mode via préfixe \`dark:\` sur chaque utilitaire coloré.

## Props attendues (à adapter à ton modèle de données)
\`\`\`ts
type Props = {
  name: string;
  color: string;              // nom de palette Tailwind : "violet" | "red" | "emerald" | ...
  imageUrl: string | null;    // image principale (cover / icon)
  memberCount: number;        // nombre d'items associés affiché dans le chip
  memberAvatars?: string[];   // jusqu'à 4 URLs pour la pile d'avatars
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
};
\`\`\`
Palette \`color\` supportée (14 valeurs) : \`slate\`, \`red\`, \`orange\`, \`amber\`, \`yellow\`, \`green\`, \`emerald\`, \`teal\`, \`blue\`, \`indigo\`, \`violet\`, \`purple\`, \`pink\`, \`rose\`.

## Layout
{{LAYOUT}}

## Variante — {{VARIANT_LABEL}}
{{SURFACE}}

## Comportement au survol
- **Conteneur** : {{HOVER}}
- **Actions** en haut-droit (\`absolute top-3 right-3 z-10 flex gap-1\`), révélées via \`opacity-0 group-hover:opacity-100 transition-opacity\` :
  - Export → icône \`Download\` (lucide), \`onClick={onExport}\`
  - Modifier → icône \`Pencil\`, \`onClick={onEdit}\`
  - Supprimer → icône \`Trash2\`, hover destructif (\`hover:bg-destructive/10 text-destructive\` ou rouge), \`onClick={onDelete}\`
  - Chaque bouton : \`type="button"\`, \`title\` pour le tooltip, et \`onClick={(e) => { e.stopPropagation(); ... }}\` pour ne pas déclencher le clic carte.

## Pile d'avatars (si \`memberAvatars\` fourni)
Cercles superposés \`flex -space-x-2\`, chacun \`rounded-full ring-2 ring-card object-cover\`, max 4 visibles. Si \`memberCount > memberAvatars.length\`, ajouter à droite un chip \`+N\` (même taille, même ring) avec \`bg-muted text-foreground text-[10px] font-semibold\`.

## Chip de comptage
Pill : \`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold\`
- Puce : \`w-1.5 h-1.5 rounded-full bg-{color}-500\`
- Fond : \`bg-{color}-100 dark:bg-{color}-900/40\`
- Texte : \`text-{color}-800 dark:text-{color}-300\` (pour \`amber\` et \`yellow\`, monter à \`text-{color}-900\` en mode clair pour rester lisible sur fond pastel)

## Repli sans image
Si \`imageUrl\` est \`null\` : icône Lucide \`Users\` (ou \`Tag\` selon contexte) en \`text-{color}-700 dark:text-{color}-300\` sur fond \`bg-{color}-100 dark:bg-{color}-900/40\`.

## Qualité
- Chaque utilitaire coloré doit avoir sa variante \`dark:\`. Vérifier les deux thèmes.
- Tailwind v4 : utiliser \`bg-linear-to-X\` (\`bg-gradient-to-X\` est déprécié).
- Images décoratives : \`alt=""\`. Boutons d'action : \`title\` pour le tooltip.
- Carte cliquable via \`onClick\` sur le conteneur racine.
{{COLOR_MAPS_HINT}}

## Sortie attendue
Un composant React unique, autonome, avec son type de props et les maps de couleurs statiques nécessaires à la variante choisie (Tailwind ne génère pas les classes depuis des variables — déclarer les 14 entrées de palette explicitement).`;
