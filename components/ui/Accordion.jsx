// `**negrito**` é o único realce que a copy das respostas usa — o resto é texto
// corrido, e uma dependência de markdown aqui custaria mais que estas três
// linhas.
function comDestaque(texto) {
  return texto
    .split(/\*\*(.+?)\*\*/g)
    .map((parte, i) => (i % 2 ? <strong className="font-bold text-ink" key={i}>{parte}</strong> : parte))
}

// Controlado pelo pai: quem usa precisa do índice aberto para montar o link de
// WhatsApp com a pergunta em foco. `idPrefix` mantém os ids únicos quando mais
// de um acordeão convive na mesma página.
//
// A resposta aceita string ou lista de parágrafos, e `fonte` é a linha de
// atribuição em corpo reduzido abaixo dela.
export default function Accordion({ items, idPrefix, openIndex, onToggle, className = '' }) {
  return (
    <div className={`border-t border-ink ${className}`}>
      {items.map((item, i) => {
        const open = openIndex === i
        const panelId = `${idPrefix}-panel-${i}`
        const buttonId = `${idPrefix}-button-${i}`
        const paragrafos = Array.isArray(item.a) ? item.a : [item.a]
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
              {paragrafos.map((paragrafo, j) => (
                <p className={j > 0 ? 'mt-4' : ''} key={j}>
                  {comDestaque(paragrafo)}
                </p>
              ))}
              {item.fonte && (
                <p className="mt-4 text-[13px] text-ink-soft/75">{item.fonte}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
