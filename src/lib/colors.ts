// Palette de couleurs portée de PLANITICA. Fournit, pour chacune des 14
// couleurs supportées, les classes Tailwind associées. Tailwind ne génère pas
// les classes depuis des variables : la palette est donc déclarée en statique.

/** Classes Tailwind associées à une couleur de la palette. */
export interface ColorClasses {
  /** Fond pastel (clair + sombre). */
  bg: string
  /** Couleur de texte. */
  text: string
  /** Puce / pastille pleine. */
  dot: string
  /** Anneau (ring). */
  ring: string
}

// 14 couleurs : slate, red, orange, amber, yellow, green, emerald, teal, blue,
// indigo, violet, purple, pink, rose.
const PALETTE: Record<string, ColorClasses> = {
  slate: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', ring: 'ring-slate-400', dot: 'bg-slate-500' },
  red: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-400', dot: 'bg-red-500' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-400', ring: 'ring-orange-400', dot: 'bg-orange-500' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-400', dot: 'bg-amber-500' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-400', ring: 'ring-yellow-400', dot: 'bg-yellow-500' },
  green: { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-400', ring: 'ring-green-400', dot: 'bg-green-500' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-400', ring: 'ring-emerald-400', dot: 'bg-emerald-500' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-400', ring: 'ring-teal-400', dot: 'bg-teal-500' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-400', ring: 'ring-blue-400', dot: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-400', ring: 'ring-indigo-400', dot: 'bg-indigo-500' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-400', ring: 'ring-violet-400', dot: 'bg-violet-500' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-400', ring: 'ring-purple-400', dot: 'bg-purple-500' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-400', ring: 'ring-pink-400', dot: 'bg-pink-500' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-400', ring: 'ring-rose-400', dot: 'bg-rose-500' },
}

/** Retourne les classes d'une couleur, indigo par défaut si inconnue/absente. */
export function getColor(name: string | null | undefined): ColorClasses {
  return (name && PALETTE[name]) || PALETTE.indigo
}
