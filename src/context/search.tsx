import { createContext, useContext, useState, type ReactNode } from 'react'

// État de recherche partagé entre le champ du Header et la page Catalogue.
// Pure préférence d'UI en mémoire (pas de persistance).
interface SearchContextValue {
  query: string
  setQuery: (q: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch doit être utilisé dans un SearchProvider')
  return ctx
}
