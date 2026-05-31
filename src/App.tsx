import './App.css'

// App minimale pour l'étape de bootstrap : aucune dépendance (ni routing, ni DB,
// ni Tailwind). Ces briques seront ajoutées aux étapes suivantes.
function App() {
  return (
    <main className="app">
      <h1>Kitly</h1>
      <p>Bibliothèque de templates de composants UI — local-first.</p>
    </main>
  )
}

export default App
