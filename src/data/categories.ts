import {
  // Landing
  Megaphone,
  Tags,
  Sparkles,
  Quote,
  Rocket,
  PanelBottom,
  BarChart3,
  HelpCircle,
  Building2,
  Mail,
  // UI essentiels
  CreditCard,
  MousePointerClick,
  FormInput,
  SquareStack,
  Menu,
  Table,
  AppWindow,
  ChevronsUpDown,
  Bell,
  Tag,
  CircleUser,
  MessageSquare,
  ChevronDown,
  Slash,
  Ellipsis,
  // Layouts d'application
  LayoutDashboard,
  PanelLeft,
  Inbox,
  Settings,
  ListChecks,
  GitCommitVertical,
  User,
  Calendar,
  // Saisie & feedback
  Search,
  Upload,
  CalendarClock,
  SlidersHorizontal,
  LoaderCircle,
  Gauge,
  // Icônes de groupes (AppWindow déjà importé ci-dessus pour la catégorie tabs)
  LayoutTemplate,
  Component,
  Keyboard,
} from 'lucide-react'
import type { Category, CategoryGroup } from '../types'

/*
  Groupes (sections) du catalogue et de la sidebar, dans l'ordre d'affichage.
*/
export const categoryGroups: CategoryGroup[] = [
  { id: 'landing', label: 'Landing', icon: LayoutTemplate, color: 'violet' },
  { id: 'ui', label: 'Composants UI', icon: Component, color: 'blue' },
  { id: 'app', label: 'Application', icon: AppWindow, color: 'amber' },
  { id: 'input', label: 'Saisie & feedback', icon: Keyboard, color: 'emerald' },
]

/** Retourne la couleur d'accent d'un groupe (indigo par défaut). */
export function getGroupColor(groupId: string): string {
  return categoryGroups.find((g) => g.id === groupId)?.color ?? 'indigo'
}

/*
  Source de vérité unique des catégories.
  Pour AJOUTER une catégorie : importer une icône lucide ci-dessus et ajouter
  une entrée dans ce tableau (avec son `group`). Aucun autre fichier à modifier.
*/
export const categories: Category[] = [
  // ── Sections de landing page ──────────────────────────────────────────────
  { id: 'hero', name: 'Hero', icon: Megaphone, group: 'landing', description: 'Sections hero et en-têtes de landing page.' },
  { id: 'pricing', name: 'Pricing', icon: Tags, group: 'landing', description: 'Grilles et tableaux de tarification.' },
  { id: 'features', name: 'Features', icon: Sparkles, group: 'landing', description: 'Sections de mise en avant des fonctionnalités.' },
  { id: 'testimonials', name: 'Témoignages', icon: Quote, group: 'landing', description: 'Avis clients et citations.' },
  { id: 'cta', name: 'CTA', icon: Rocket, group: 'landing', description: "Sections d'appel à l'action." },
  { id: 'footers', name: 'Footers', icon: PanelBottom, group: 'landing', description: 'Pieds de page et liens secondaires.' },
  { id: 'stats', name: 'Stats / KPI', icon: BarChart3, group: 'landing', description: 'Chiffres clés et indicateurs.' },
  { id: 'faq', name: 'FAQ', icon: HelpCircle, group: 'landing', description: 'Questions fréquentes.' },
  { id: 'logos', name: 'Logos / Partenaires', icon: Building2, group: 'landing', description: 'Bandeaux de logos et références.' },
  { id: 'newsletter', name: 'Newsletter', icon: Mail, group: 'landing', description: "Blocs d'inscription à la newsletter." },

  // ── Composants UI essentiels ──────────────────────────────────────────────
  { id: 'cards', name: 'Cards', icon: CreditCard, group: 'ui', description: 'Cartes : contenu, média, produit, profil.' },
  { id: 'buttons', name: 'Boutons', icon: MousePointerClick, group: 'ui', description: 'Boutons et groupes d’actions.' },
  { id: 'forms', name: 'Forms', icon: FormInput, group: 'ui', description: 'Formulaires : connexion, contact, multi-étapes.' },
  { id: 'modals', name: 'Modals', icon: SquareStack, group: 'ui', description: 'Modales, dialogues et panneaux superposés.' },
  { id: 'navigation', name: 'Navigation', icon: Menu, group: 'ui', description: 'Barres de navigation et menus.' },
  { id: 'tables', name: 'Tables', icon: Table, group: 'ui', description: 'Tableaux de données.' },
  { id: 'tabs', name: 'Tabs', icon: AppWindow, group: 'ui', description: 'Onglets et panneaux commutables.' },
  { id: 'accordions', name: 'Accordéons', icon: ChevronsUpDown, group: 'ui', description: 'Sections repliables / dépliables.' },
  { id: 'alerts', name: 'Alertes / Toasts', icon: Bell, group: 'ui', description: 'Messages d’alerte et notifications.' },
  { id: 'badges', name: 'Badges', icon: Tag, group: 'ui', description: 'Badges, tags et pastilles de statut.' },
  { id: 'avatars', name: 'Avatars', icon: CircleUser, group: 'ui', description: 'Avatars et piles d’avatars.' },
  { id: 'tooltips', name: 'Tooltips / Popovers', icon: MessageSquare, group: 'ui', description: 'Infobulles et popovers.' },
  { id: 'dropdowns', name: 'Menus déroulants', icon: ChevronDown, group: 'ui', description: 'Menus contextuels et déroulants.' },
  { id: 'breadcrumbs', name: 'Fil d’Ariane', icon: Slash, group: 'ui', description: 'Fils d’Ariane de navigation.' },
  { id: 'pagination', name: 'Pagination', icon: Ellipsis, group: 'ui', description: 'Contrôles de pagination.' },

  // ── Layouts d'application ──────────────────────────────────────────────────
  { id: 'dashboards', name: 'Dashboards', icon: LayoutDashboard, group: 'app', description: 'Tableaux de bord : stats, graphiques, layouts.' },
  { id: 'sidebars', name: 'Sidebars', icon: PanelLeft, group: 'app', description: 'Barres latérales et navigation d’app.' },
  { id: 'empty-states', name: 'États vides', icon: Inbox, group: 'app', description: 'Écrans vides et invitations à l’action.' },
  { id: 'settings', name: 'Paramètres', icon: Settings, group: 'app', description: 'Panneaux et pages de réglages.' },
  { id: 'steppers', name: 'Steppers / Assistants', icon: ListChecks, group: 'app', description: 'Parcours en étapes et assistants.' },
  { id: 'timeline', name: 'Timeline', icon: GitCommitVertical, group: 'app', description: 'Chronologies et fils d’activité.' },
  { id: 'profile', name: 'Profil', icon: User, group: 'app', description: 'Cartes et pages de profil.' },
  { id: 'calendars', name: 'Calendriers', icon: Calendar, group: 'app', description: 'Vues calendrier et agendas.' },

  // ── Saisie & feedback ──────────────────────────────────────────────────────
  { id: 'search', name: 'Recherche', icon: Search, group: 'input', description: 'Barres et champs de recherche.' },
  { id: 'file-upload', name: 'Upload de fichiers', icon: Upload, group: 'input', description: 'Zones de dépôt et upload.' },
  { id: 'date-pickers', name: 'Date pickers', icon: CalendarClock, group: 'input', description: 'Sélecteurs de date et d’heure.' },
  { id: 'sliders', name: 'Sliders', icon: SlidersHorizontal, group: 'input', description: 'Curseurs et plages de valeurs.' },
  { id: 'loaders', name: 'Loaders / Skeletons', icon: LoaderCircle, group: 'input', description: 'Indicateurs de chargement et squelettes.' },
  { id: 'progress', name: 'Barres de progression', icon: Gauge, group: 'input', description: 'Barres et jauges de progression.' },
]
