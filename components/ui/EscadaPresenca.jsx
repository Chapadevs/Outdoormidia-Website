import { DEGRAUS } from '@/lib/diagnostico'

// A Escada da Presença nos dois estados previstos na copy: neutro (bloco
// educativo, antes das perguntas) e aceso (resultado, com o degrau da pessoa
// destacado). Um componente só, o estado vem do `ativo`.
//
// A barra laranja no topo de cada card cresce de 20% em 20% — é o que dá a
// leitura de escada sem precisar escalonar altura, que quebraria o grid no
// mobile empilhado.
export default function EscadaPresenca({ ativo = null, className = '' }) {
  const neutro = ativo === null

  return (
    <ol
      className={`m-0 grid list-none grid-cols-5 gap-3 p-0 max-tab:grid-cols-2 max-mob:grid-cols-1 ${className}`}
    >
      {DEGRAUS.map((degrau, i) => {
        const aceso = degrau.n === ativo
        const apagado = !neutro && !aceso
        return (
          <li
            aria-current={aceso ? 'step' : undefined}
            className={`flex flex-col gap-2 rounded-[16px] border p-5 transition-colors duration-200 max-tab:last:col-span-2 max-mob:last:col-span-1 max-mob:p-4 ${
              aceso
                ? degrau.card
                : apagado
                  ? 'border-line bg-paper text-ink-soft opacity-55'
                  : 'border-line bg-white text-ink'
            }`}
            key={degrau.key}
          >
            <span
              aria-hidden="true"
              className={`h-1 rounded-full ${aceso ? 'bg-current opacity-70' : 'bg-orange'} ${
                apagado ? 'opacity-40' : ''
              }`}
              style={{ width: `${(i + 1) * 20}%` }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
              Degrau {degrau.n}
            </span>
            <span className="text-[15px] font-extrabold leading-tight">{degrau.nome}</span>
            <p
              className={`m-0 text-[13.5px] leading-[1.45] ${
                aceso ? degrau.soft : 'text-ink-soft'
              }`}
            >
              {degrau.linha}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
