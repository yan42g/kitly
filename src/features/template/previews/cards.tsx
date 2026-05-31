import type { ReactNode } from 'react'
import { Download, Pencil, Trash2, Users } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { getColor } from '../../../lib/colors'
import type { Variant } from '../../../types'

// ─────────────────────────────────────────────────────────────────────────────
// Previews React des Cards — porté de PLANITICA (TilesAndCardsPage).
// Adaptations Kitly : pas de backend (resolvePhotoUrl → resolve), getColor/cn
// depuis src/lib, textes neutralisés. Seuls les 4 designs « propositions »
// (Compact/Standard/Bannière/Showcase) sont portés ; les exploratoires non.
// ─────────────────────────────────────────────────────────────────────────────

// Images de démonstration (réponses 200 directes).
const DEMO = {
  photo: 'https://i.pravatar.cc/400?img=15',
  logo: 'https://placehold.co/400x400/png?text=Logo',
}

// Avatars de démonstration pour la pile de membres.
const PROFILES = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=8',
  'https://i.pravatar.cc/100?img=12',
  'https://i.pravatar.cc/100?img=23',
  'https://i.pravatar.cc/100?img=33',
  'https://i.pravatar.cc/100?img=45',
  'https://i.pravatar.cc/100?img=49',
  'https://i.pravatar.cc/100?img=56',
]

export type Sample = {
  name: string
  count: number
  color: string
  src: string | null
  members: string[]
}

// Photo / Logo / Sans image → chaque variante d'une proposition reçoit un
// échantillon différent (colonne 0 = photo, 1 = logo, 2 = sans).
export const SAMPLES: Sample[] = [
  {
    name: 'Projet Alpha',
    color: 'violet',
    count: 24,
    src: DEMO.photo,
    members: [PROFILES[0], PROFILES[1], PROFILES[2], PROFILES[3]],
  },
  {
    name: 'Équipe Design',
    color: 'blue',
    count: 8,
    src: DEMO.logo,
    members: [PROFILES[4], PROFILES[5], PROFILES[6], PROFILES[7]],
  },
  {
    name: 'Composants UI',
    color: 'emerald',
    count: 5,
    src: null,
    members: [PROFILES[0], PROFILES[4], PROFILES[2], PROFILES[7]],
  },
]

// ── Maps de couleurs (statiques — Tailwind ne génère pas depuis variables) ──

// Halo flou coloré au hover (variante halo). Combiné avec hover:shadow-xl.
const HOVER_HALO: Record<string, string> = {
  slate: 'hover:shadow-slate-500/20',
  red: 'hover:shadow-red-500/20',
  orange: 'hover:shadow-orange-500/20',
  amber: 'hover:shadow-amber-500/20',
  yellow: 'hover:shadow-yellow-500/20',
  green: 'hover:shadow-green-500/20',
  emerald: 'hover:shadow-emerald-500/20',
  teal: 'hover:shadow-teal-500/20',
  blue: 'hover:shadow-blue-500/20',
  indigo: 'hover:shadow-indigo-500/20',
  violet: 'hover:shadow-violet-500/20',
  purple: 'hover:shadow-purple-500/20',
  pink: 'hover:shadow-pink-500/20',
  rose: 'hover:shadow-rose-500/20',
}

// Texte du compteur — variante plus sombre en mode clair. amber/yellow montent
// à -900 pour rester lisibles.
const CHIP_TEXT: Record<string, string> = {
  slate: 'text-slate-800 dark:text-slate-200',
  red: 'text-red-800 dark:text-red-300',
  orange: 'text-orange-800 dark:text-orange-300',
  amber: 'text-amber-900 dark:text-amber-300',
  yellow: 'text-yellow-900 dark:text-yellow-300',
  green: 'text-green-800 dark:text-green-300',
  emerald: 'text-emerald-800 dark:text-emerald-300',
  teal: 'text-teal-800 dark:text-teal-300',
  blue: 'text-blue-800 dark:text-blue-300',
  indigo: 'text-indigo-800 dark:text-indigo-300',
  violet: 'text-violet-800 dark:text-violet-300',
  purple: 'text-purple-800 dark:text-purple-300',
  pink: 'text-pink-800 dark:text-pink-300',
  rose: 'text-rose-800 dark:text-rose-300',
}

// Fond du blob halo — plus saturé en mode clair (pastel -100 trop délavé pour
// porter le flou). En mode sombre, /30 évite le sur-glow.
const HALO_BG: Record<string, string> = {
  slate: 'bg-slate-300 dark:bg-slate-500/30',
  red: 'bg-red-300 dark:bg-red-500/30',
  orange: 'bg-orange-300 dark:bg-orange-500/30',
  amber: 'bg-amber-300 dark:bg-amber-500/30',
  yellow: 'bg-yellow-300 dark:bg-yellow-500/30',
  green: 'bg-green-300 dark:bg-green-500/30',
  emerald: 'bg-emerald-300 dark:bg-emerald-500/30',
  teal: 'bg-teal-300 dark:bg-teal-500/30',
  blue: 'bg-blue-300 dark:bg-blue-500/30',
  indigo: 'bg-indigo-300 dark:bg-indigo-500/30',
  violet: 'bg-violet-300 dark:bg-violet-500/30',
  purple: 'bg-purple-300 dark:bg-purple-500/30',
  pink: 'bg-pink-300 dark:bg-pink-500/30',
  rose: 'bg-rose-300 dark:bg-rose-500/30',
}

// Lavis dégradé translucide pour la variante "gradient" (overlay sur bg-card).
const GRAD_BG: Record<string, string> = {
  slate: 'bg-linear-to-br from-transparent via-transparent to-slate-200/70 dark:to-slate-700/40',
  red: 'bg-linear-to-br from-transparent via-transparent to-red-100/80 dark:to-red-900/40',
  orange: 'bg-linear-to-br from-transparent via-transparent to-orange-100/80 dark:to-orange-900/40',
  amber: 'bg-linear-to-br from-transparent via-transparent to-amber-100/80 dark:to-amber-900/40',
  yellow: 'bg-linear-to-br from-transparent via-transparent to-yellow-100/80 dark:to-yellow-900/40',
  green: 'bg-linear-to-br from-transparent via-transparent to-green-100/80 dark:to-green-900/40',
  emerald: 'bg-linear-to-br from-transparent via-transparent to-emerald-100/80 dark:to-emerald-900/40',
  teal: 'bg-linear-to-br from-transparent via-transparent to-teal-100/80 dark:to-teal-900/40',
  blue: 'bg-linear-to-br from-transparent via-transparent to-blue-100/80 dark:to-blue-900/40',
  indigo: 'bg-linear-to-br from-transparent via-transparent to-indigo-100/80 dark:to-indigo-900/40',
  violet: 'bg-linear-to-br from-transparent via-transparent to-violet-100/80 dark:to-violet-900/40',
  purple: 'bg-linear-to-br from-transparent via-transparent to-purple-100/80 dark:to-purple-900/40',
  pink: 'bg-linear-to-br from-transparent via-transparent to-pink-100/80 dark:to-pink-900/40',
  rose: 'bg-linear-to-br from-transparent via-transparent to-rose-100/80 dark:to-rose-900/40',
}

// Vignette colorée pour la variante "gradient" du Showcase (sur image).
const GRAD_VIGNETTE: Record<string, string> = {
  slate: 'bg-linear-to-br from-slate-600/50 via-transparent to-transparent',
  red: 'bg-linear-to-br from-red-600/50 via-transparent to-transparent',
  orange: 'bg-linear-to-br from-orange-600/50 via-transparent to-transparent',
  amber: 'bg-linear-to-br from-amber-600/50 via-transparent to-transparent',
  yellow: 'bg-linear-to-br from-yellow-600/50 via-transparent to-transparent',
  green: 'bg-linear-to-br from-green-600/50 via-transparent to-transparent',
  emerald: 'bg-linear-to-br from-emerald-600/50 via-transparent to-transparent',
  teal: 'bg-linear-to-br from-teal-600/50 via-transparent to-transparent',
  blue: 'bg-linear-to-br from-blue-600/50 via-transparent to-transparent',
  indigo: 'bg-linear-to-br from-indigo-600/50 via-transparent to-transparent',
  violet: 'bg-linear-to-br from-violet-600/50 via-transparent to-transparent',
  purple: 'bg-linear-to-br from-purple-600/50 via-transparent to-transparent',
  pink: 'bg-linear-to-br from-pink-600/50 via-transparent to-transparent',
  rose: 'bg-linear-to-br from-rose-600/50 via-transparent to-transparent',
}

// ── Helpers ─────────────────────────────────────────────────────────────────

// Kitly n'a pas de proxy d'images : on retourne l'URL brute directement.
function resolve(src: string | null): string | null {
  return src
}

function CountChip({ color, count, className }: { color: string; count: number; className?: string }) {
  const col = getColor(color)
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold', col.bg, CHIP_TEXT[color] ?? col.text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', col.dot)} />
      {count} {count === 1 ? 'membre' : 'membres'}
    </span>
  )
}

function AvatarStack({
  members,
  total,
  max = 4,
  ringClass = 'ring-card',
  size = 'h-7 w-7',
}: {
  members: string[]
  total: number
  max?: number
  ringClass?: string
  size?: string
}) {
  if (!members.length) return null
  const visible = members.slice(0, max)
  const overflow = Math.max(0, total - visible.length)
  return (
    <div className="flex -space-x-2 shrink-0">
      {visible.map((src, i) => {
        const r = resolve(src)
        return r ? (
          <img
            key={i}
            src={r}
            alt=""
            className={cn('rounded-full ring-2 object-cover bg-muted', size, ringClass)}
          />
        ) : null
      })}
      {overflow > 0 && (
        <span
          className={cn(
            'rounded-full ring-2 flex items-center justify-center bg-muted text-[10px] font-semibold text-foreground',
            size,
            ringClass,
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}

// Actions de la carte (Exporter / Modifier / Supprimer). Variante `overlay`
// pour fond sombre (Showcase / bannière avec image).
function ActionButtons({ variant = 'default' }: { variant?: 'default' | 'overlay' }) {
  const isOverlay = variant === 'overlay'
  const btnCls = isOverlay
    ? 'p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors'
    : 'p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground transition-colors'
  const dangerCls = isOverlay
    ? 'p-1.5 rounded-lg bg-black/30 hover:bg-red-500/70 text-white backdrop-blur-sm transition-colors'
    : 'p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors'
  return (
    <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button type="button" title="Exporter" onClick={(e) => e.stopPropagation()} className={btnCls}>
        <Download size={13} />
      </button>
      <button type="button" title="Modifier" onClick={(e) => e.stopPropagation()} className={btnCls}>
        <Pencil size={13} />
      </button>
      <button type="button" title="Supprimer" onClick={(e) => e.stopPropagation()} className={dangerCls}>
        <Trash2 size={13} />
      </button>
    </div>
  )
}

// Couches de surface communes (Compact / Standard / Bannière). Le Showcase
// gère ses overlays lui-même (sa surface est une image).
function CardLayers({ color, variant }: { color: string; variant: Variant }) {
  return (
    <>
      {variant === 'gradient' && (
        <div className={cn('absolute inset-0 pointer-events-none', GRAD_BG[color])} />
      )}
      {variant === 'halo' && (
        <div className={cn('absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-50 pointer-events-none', HALO_BG[color])} />
      )}
    </>
  )
}

function hoverClasses(color: string, variant: Variant): string {
  if (variant === 'halo') return cn('hover:shadow-xl', HOVER_HALO[color])
  return 'hover:shadow-md'
}

// ── Proposition 1 — Compact (avatar circulaire en ligne) ────────────────────
function Design1({ s, variant }: { s: Sample; variant: Variant }) {
  const col = getColor(s.color)
  const src = resolve(s.src)
  return (
    <div className={cn(
      'group relative bg-card border border-border rounded-2xl p-5 overflow-hidden hover:border-primary/30 transition-all duration-300',
      hoverClasses(s.color, variant),
    )}>
      <CardLayers color={s.color} variant={variant} />
      <ActionButtons />
      <div className="relative flex items-center gap-4">
        <div className={cn('h-14 w-14 shrink-0 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-card flex items-center justify-center', col.bg, col.ring)}>
          {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <Users className={cn('w-6 h-6', col.text)} />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm leading-tight truncate">{s.name}</h3>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <CountChip color={s.color} count={s.count} />
            <AvatarStack members={s.members} total={s.count} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Proposition 2 — Standard (squircle large) ───────────────────────────────
function Design2({ s, variant }: { s: Sample; variant: Variant }) {
  const col = getColor(s.color)
  const src = resolve(s.src)
  return (
    <div className={cn(
      'group relative bg-card border border-border rounded-2xl p-5 overflow-hidden hover:border-primary/30 transition-all duration-300',
      hoverClasses(s.color, variant),
    )}>
      <CardLayers color={s.color} variant={variant} />
      <ActionButtons />
      <div className="relative flex items-center gap-4">
        <div className={cn('h-16 w-16 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg', col.bg)}>
          {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <Users className={cn('w-7 h-7', col.text)} />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base leading-tight truncate">{s.name}</h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <CountChip color={s.color} count={s.count} />
            <AvatarStack members={s.members} total={s.count} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Proposition 3 — Bannière (image en haut + contenu en bas) ───────────────
function Design3({ s, variant }: { s: Sample; variant: Variant }) {
  const col = getColor(s.color)
  const src = resolve(s.src)
  return (
    <div className={cn(
      'group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col',
      hoverClasses(s.color, variant),
    )}>
      <CardLayers color={s.color} variant={variant} />
      {/* Bannière haute */}
      <div className={cn('relative h-24 w-full overflow-hidden', !src && col.bg)}>
        {src ? (
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className={cn('w-8 h-8', col.text)} />
          </div>
        )}
        <ActionButtons variant={src ? 'overlay' : 'default'} />
      </div>
      {/* Zone contenu */}
      <div className="relative p-4">
        <h3 className="font-semibold text-sm leading-tight truncate">{s.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <CountChip color={s.color} count={s.count} />
          <AvatarStack members={s.members} total={s.count} />
        </div>
      </div>
    </div>
  )
}

// ── Proposition 4 — Showcase (image plein cadre, texte en overlay) ──────────
function Design4({ s, variant }: { s: Sample; variant: Variant }) {
  const col = getColor(s.color)
  const src = resolve(s.src)
  const hoverShadow = variant === 'halo' ? cn('hover:shadow-xl', HOVER_HALO[s.color]) : 'hover:shadow-lg'
  return (
    <div className={cn(
      'group relative h-44 rounded-2xl overflow-hidden border border-border transition-all duration-300',
      hoverShadow,
    )}>
      {src ? (
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
      ) : (
        <div className={cn('absolute inset-0', col.dot)} />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      {variant === 'gradient' && (
        <div className={cn('absolute inset-0 pointer-events-none', GRAD_VIGNETTE[s.color])} />
      )}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Users className="w-10 h-10 text-white/70" />
        </div>
      )}
      <ActionButtons variant="overlay" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-semibold text-sm text-white leading-tight truncate drop-shadow">{s.name}</h3>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {s.count} {s.count === 1 ? 'membre' : 'membres'}
          </span>
          <AvatarStack members={s.members} total={s.count} ringClass="ring-white/90" />
        </div>
      </div>
    </div>
  )
}

/**
 * Registry des previews Cards : mappe l'id de proposition à son composant.
 * Branche les données (Template.propositions) à leur rendu React.
 */
export const CARDS_PREVIEWS: Record<number, (props: { s: Sample; variant: Variant }) => ReactNode> = {
  1: Design1,
  2: Design2,
  3: Design3,
  4: Design4,
}
