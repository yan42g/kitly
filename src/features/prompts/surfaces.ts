// Spécifications de traitement de surface par variante. Décrivent uniquement
// les effets décoratifs (overlays, blobs, ombres) appliqués au-dessus de la
// structure définie dans layouts.ts. HALO_OVERRIDES permet à une proposition
// spécifique de redéfinir le halo (actuellement vide — toutes utilisent le
// rendu standard).

export type Variant = "minimal" | "gradient" | "halo";

export const VARIANT_LABELS: Record<Variant, string> = {
  minimal: "Minimaliste",
  gradient: "Dégradé subtil",
  halo: "Halo coloré",
};

export const SURFACES: Record<Variant, string> = {
  minimal: `Surface brute, aucun effet décoratif. Le rendu repose uniquement sur la structure de base (fond + bordure + image). À privilégier pour les listes denses où la sobriété compte.`,

  gradient: `Léger lavis de couleur diffusé depuis le coin bas-droit.

Couche \`absolute\` posée immédiatement après l'ouverture du conteneur (avant le contenu) :
\`\`\`tsx
<div className={cn("absolute inset-0 pointer-events-none", GRAD_BG[color])} />
\`\`\`

Map statique \`GRAD_BG\` pour les 14 couleurs de la palette (Tailwind ne génère pas les classes depuis variables) :
\`\`\`ts
const GRAD_BG: Record<string, string> = {
  violet: "bg-linear-to-br from-transparent via-transparent to-violet-100/80 dark:to-violet-900/40",
  // ... 13 autres entrées sur le même modèle
};
\`\`\`
Le \`via-transparent\` concentre la teinte dans la moitié bas-droite (rendu plus subtil que sans).

Pour les designs *plein cadre* (image en background) : remplacer le lavis par une vignette colorée posée sur l'image — \`bg-linear-to-br from-{color}-600/50 via-transparent to-transparent\` (pas de \`mix-blend\` — plus prévisible sur image variable).`,

  halo: `Blob flou permanent en coin + ombre teintée au survol.

Blob (à poser juste après l'ouverture du conteneur) :
\`\`\`tsx
<div className={cn("absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-50 pointer-events-none", HALO_BG[color])} />
\`\`\`

Map statique \`HALO_BG\` — fond plus saturé en mode clair (\`-300\` au lieu du \`-100\` trop délavé pour porter le flou) :
\`\`\`ts
const HALO_BG: Record<string, string> = {
  violet: "bg-violet-300 dark:bg-violet-500/30",
  // ... 13 autres entrées
};
\`\`\`

Important : le conteneur doit avoir \`overflow-hidden\` pour rogner le blob aux coins arrondis.

Ombre teintée au survol — remplacer \`hover:shadow-md\` par \`hover:shadow-xl\` combiné avec une classe colorée :
\`\`\`ts
const HOVER_HALO: Record<string, string> = {
  violet: "hover:shadow-violet-500/20",
  // ... 13 autres entrées
};
\`\`\`
Appliquée sur le conteneur : \`cn("hover:shadow-xl", HOVER_HALO[color])\`.

Pour les designs *plein cadre* : pas de blob (occulté par l'image qui remplit tout). Seule l'ombre teintée au survol s'applique.`,
};

// Aucune proposition n'override actuellement la variante halo. Conserver la
// structure pour pouvoir ajouter facilement plus tard une proposition avec un
// halo hover-only ou autre variation.
export const HALO_OVERRIDES: Record<number, string> = {};

export const HOVER_DESC: Record<Variant, string> = {
  minimal: "`hover:border-primary/30 hover:shadow-md transition-all duration-300` — ombre neutre standard.",
  gradient: "`hover:border-primary/30 hover:shadow-md transition-all duration-300` — ombre neutre standard.",
  halo: "`hover:border-primary/30 hover:shadow-xl transition-all duration-300` + ombre teintée via `HOVER_HALO[color]`.",
};

// Indicateur succinct des maps statiques à ajouter, injecté en bas du prompt.
export function colorMapsHint(variant: Variant): string {
  if (variant === "minimal") return "";
  const maps =
    variant === "gradient"
      ? "`GRAD_BG`"
      : "`HALO_BG`, `HOVER_HALO`";
  return `\n## Maps de couleurs à déclarer\nCette variante nécessite ${maps} (14 entrées chacune, voir la section « Variante » ci-dessus pour la forme exacte).`;
}
