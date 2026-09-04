import LetterSwap from '@/components/ui/LetterSwap'

// Componente C1 do handoff de Plataformas: de 2 a 4 números grandes lado a
// lado, rótulo curto abaixo de cada um, sem parágrafo de apoio.
//
// A diferença para o `StatGrid` é o propósito. `StatGrid` é a faixa de números
// da marca, sempre com os mesmos quatro números de `lib/numeros.js`; este é o
// quadro de cada plataforma, com quantidade variável e dado que muda por
// página. Manter os dois separados evita que uma alteração na faixa da marca
// mexa nas nove páginas de plataforma, e vice-versa.
//
// Sem `stats` o componente não renderiza. É a regra do handoff: onde não há
// dado validado, a página fica sem o quadro em vez de inventar número.
const COLUNAS = {
  2: 'grid-cols-2 max-mob:grid-cols-1',
  3: 'grid-cols-3 max-tab:grid-cols-1',
  4: 'grid-cols-4 max-tab:grid-cols-2 max-xs:grid-cols-1',
}

export default function BigNumbers({ stats, className = '' }) {
  if (!stats?.length) return null

  const cols = COLUNAS[Math.min(Math.max(stats.length, 2), 4)]

  return (
    <div className={`overflow-hidden border-l border-ink/15 ${className}`}>
      <div className={`-mb-px grid ${cols}`}>
        {stats.map((stat, i) => (
          <div className="border-b border-r border-ink/15 px-7 py-[38px] max-mob:px-[22px] max-mob:py-[26px]" key={stat.label}>
            <div className="display text-[clamp(38px,5vw,64px)] leading-[0.9] text-orange">
              <LetterSwap delay={i * 0.18} text={stat.n} />
            </div>
            <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
