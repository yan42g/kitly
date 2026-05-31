// Spécifications de structure (layout) par proposition. Compactes, génériques,
// portables sur n'importe quelle app React + Tailwind v4. Décrivent la
// disposition / les tailles / le traitement de l'image — *pas* les effets de
// surface (séparés dans surfaces.ts).

export const LAYOUTS: Record<number, string> = {
  1: `**Compact — horizontal, avatar circulaire**
- Conteneur : \`group relative bg-card border border-border rounded-2xl p-5 overflow-hidden flex items-center gap-4\`
- Avatar (gauche) : \`h-14 w-14 shrink-0 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-card flex items-center justify-center\`
  - Fond : \`bg-{color}-100 dark:bg-{color}-900/40\`, anneau : \`ring-{color}-400\`
  - Image : \`<img className="h-full w-full object-cover">\`
  - Repli : icône \`Users\` \`w-6 h-6\`
- Corps (droite) : \`min-w-0 flex-1\`
  - Nom : \`<h3 className="font-semibold text-sm leading-tight truncate">{name}</h3>\`
  - Ligne sous le nom : \`flex items-center justify-between gap-2 mt-1.5\` — chip de comptage à gauche, pile d'avatars (\`h-7 w-7\`) à droite`,

  2: `**Standard — horizontal, squircle équilibré**
- Conteneur : \`group relative bg-card border border-border rounded-2xl p-5 overflow-hidden flex items-center gap-4\`
- Squircle (gauche) : \`h-16 w-16 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg bg-{color}-100 dark:bg-{color}-900/40\`
  - Image : \`<img className="h-full w-full object-cover">\`
  - Repli : icône \`Users\` \`w-7 h-7\`
- Corps (droite) : \`min-w-0 flex-1\`
  - Nom : \`text-base font-semibold leading-tight truncate\` (plus grand qu'en Compact)
  - Ligne sous le nom : \`flex items-center justify-between gap-2 mt-2\` (chip à gauche, pile d'avatars à droite)`,

  3: `**Bannière — vertical, image en haut + contenu en bas**
- Conteneur : \`group relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col\`
- Bannière (haut) : \`relative h-24 w-full overflow-hidden\`
  - Avec image : \`<img className="h-full w-full object-cover">\`
  - Sans image : fond \`bg-{color}-100 dark:bg-{color}-900/40\` + icône \`Users\` \`w-8 h-8\` centrée en \`text-{color}-700 dark:text-{color}-300\`
  - Les **boutons d'actions** sont posés en haut-droit *de la bannière* (\`absolute top-3 right-3\`). Utiliser le style **overlay** (\`bg-black/30 backdrop-blur-sm\` icônes blanches) quand il y a une image, le style **par défaut** (muted) quand pas d'image.
- Contenu (bas) : \`relative p-4\`
  - Nom : \`<h3 className="font-semibold text-sm leading-tight truncate">{name}</h3>\`
  - Ligne sous le nom : \`flex items-center justify-between gap-2 mt-2\` (chip à gauche, pile d'avatars à droite)`,

  4: `**Showcase — image plein cadre, texte en overlay**
- Conteneur : \`group relative h-44 rounded-2xl overflow-hidden border border-border\`
- Image de fond : \`<img className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105">\`. Sans image : \`<div className="absolute inset-0 bg-{color}-500">\` (couleur pleine \`-500\` pour bon contraste avec icône / texte blanc).
- Overlay dégradé sombre (lisibilité texte) : \`<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />\`
- Repli icône (uniquement si pas d'image) : \`<div className="absolute inset-0 flex items-center justify-center pointer-events-none"><Users className="w-10 h-10 text-white/70" /></div>\`
- **Boutons d'actions** : style **overlay** obligatoire (icônes blanches sur \`bg-black/30 backdrop-blur-sm\`, supprimer en \`hover:bg-red-500/70\`) — sinon illisibles sur image variable.
- Zone texte : \`absolute inset-x-0 bottom-0 p-4\`
  - Nom : \`font-semibold text-sm text-white leading-tight truncate drop-shadow\`
  - Ligne sous le nom : \`flex items-center justify-between gap-2 mt-1.5\`
    - Chip comptage : \`bg-white/20 text-white backdrop-blur-sm\` (puce \`bg-white\`)
    - Pile d'avatars : \`ringClass="ring-white/90"\` pour détacher les avatars sur le dégradé sombre`,
};

export const TITLES: Record<number, string> = {
  1: "Tuile Compact",
  2: "Tuile Standard",
  3: "Tuile Bannière",
  4: "Tuile Showcase",
};
