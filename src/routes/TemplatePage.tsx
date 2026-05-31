import { useParams } from 'react-router'

// Placeholder de la page Template. Affiche les paramètres :catId et :tplId.
// La preview et la génération de prompt viendront aux étapes suivantes.
export default function TemplatePage() {
  const { catId, tplId } = useParams<{ catId: string; tplId: string }>()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">Template</h2>
      <p className="mt-1 text-muted">
        Catégorie : <span className="text-foreground">{catId}</span> · Template :{' '}
        <span className="text-foreground">{tplId}</span>
      </p>
      <p className="mt-6 text-sm text-muted">
        Placeholder — preview du composant et prompt copiable s’afficheront ici.
      </p>
    </div>
  )
}
