const ITEMS = [
  'Curitiba',
  'Região Metropolitana',
  'Litoral do PR',
  'Rodovias',
  'Itajaí',
  'Joinville',
  'Balneário Camboriú',
  'Aeroporto',
  'Shoppings',
  'Mídia Móvel',
]

function Track({ ariaHidden }) {
  return (
    <span
      className="flex items-center gap-9 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.16em]"
      aria-hidden={ariaHidden || undefined}
    >
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-9">
          {item} <i className="not-italic text-orange">/</i>
        </span>
      ))}
      &nbsp;
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="overflow-hidden bg-paper py-[13px] text-ink">
      <div className="flex w-max animate-ticker gap-9 motion-reduce:animate-none">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
