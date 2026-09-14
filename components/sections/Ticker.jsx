import { useTranslations } from 'next-intl'

// Praças na redação e na ordem do documento de copy do cliente; a lista vive
// em `Ticker.itens` nos quatro messages/*.json.
function Track({ ariaHidden, itens }) {
  return (
    <span
      className="flex items-center gap-11 whitespace-nowrap pr-11 text-[15px] font-bold uppercase tracking-[0.16em]"
      aria-hidden={ariaHidden || undefined}
    >
      {itens.map((item) => (
        <span key={item} className="flex items-center gap-11">
          {item} <i className="not-italic text-orange">/</i>
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  const t = useTranslations('Ticker')
  const itens = t.raw('itens')
  return (
    <div className="overflow-hidden bg-paper py-[19px] text-ink">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        <Track itens={itens} />
        <Track ariaHidden itens={itens} />
      </div>
    </div>
  )
}
