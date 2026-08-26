// Praças na redação e na ordem do documento de copy do cliente.
const ITEMS = [
  'Curitiba e Região Metropolitana',
  'Litoral do PR',
  'Rodovias PR-SC',
  'Itajaí',
  'Joinville',
  'Balneário Camboriú',
  'Aeroporto',
  'Mídia Indoor',
]

function Track({ ariaHidden }) {
  return (
    <span
      className="flex items-center gap-11 whitespace-nowrap pr-11 text-[15px] font-bold uppercase tracking-[0.16em]"
      aria-hidden={ariaHidden || undefined}
    >
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-11">
          {item} <i className="not-italic text-orange">/</i>
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="overflow-hidden bg-paper py-[19px] text-ink">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
