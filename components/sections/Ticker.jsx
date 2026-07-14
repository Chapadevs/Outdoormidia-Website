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
    <span aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item}>
          {item} <i>/</i>
        </span>
      ))}
      &nbsp;
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
