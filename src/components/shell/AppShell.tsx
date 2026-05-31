import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { SearchProvider } from '../../context/search'

// Layout persistant de l'application : header en haut, sidebar à gauche,
// contenu (Outlet) à droite. Responsive : sur petit écran la sidebar devient
// un panneau coulissant masqué par défaut.
function AppShellInner() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <Header onToggleSidebar={() => setMobileSidebarOpen((open) => !open)} />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar statique sur écran moyen et plus. */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:block">
          <Sidebar />
        </aside>

        {/* Sidebar coulissante en petit écran (overlay + panneau). */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-surface shadow-xl">
              <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-y-auto">
          {/* Conteneur centré à largeur max : évite l'étirement plein écran sur
              grands moniteurs, padding responsive sur petits écrans. */}
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

// Fournit le contexte de recherche partagé (Header + Catalogue).
export default function AppShell() {
  return (
    <SearchProvider>
      <AppShellInner />
    </SearchProvider>
  )
}
