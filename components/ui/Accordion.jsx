// Controlado pelo pai: quem usa precisa do índice aberto para montar o link de
// WhatsApp com a pergunta em foco. `idPrefix` mantém os ids únicos quando mais
// de um acordeão convive na mesma página.
export default function Accordion({ items, idPrefix, openIndex, onToggle, className = '' }) {
  return (
    <div className={`border-t border-ink ${className}`}>
      {items.map((item, i) => {
        const open = openIndex === i
        const panelId = `${idPrefix}-panel-${i}`
        const buttonId = `${idPrefix}-button-${i}`
        return (
          <div className="border-b border-line" key={item.q}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onToggle(open ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left text-[clamp(17px,2.2vw,20px)] font-extrabold text-ink transition-colors duration-150 hover:text-orange"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-5 w-5 flex-none text-orange transition-transform duration-200 ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current"></span>
                  <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current"></span>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-[22px] pr-9 text-[15.5px] leading-relaxed text-ink-soft"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
