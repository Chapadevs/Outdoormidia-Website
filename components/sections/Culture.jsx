import SectionHeading from '@/components/ui/SectionHeading'

const NUMEROS = [
  { n: '66', label: 'Anos de história' },
  { n: '380M', label: 'Impactos por mês' },
  { n: '82', label: 'Equipamentos digitais' },
  { n: '2', label: 'Estados · PR + SC' },
]

const PILARES = [
  {
    title: 'A rua é o produto',
    text: 'Nossa mídia não vive numa aba do navegador. Está no caminho de casa, na rodovia, no aeroporto. Quem trabalha aqui vê o resultado do próprio trabalho dirigindo pela cidade.',
  },
  {
    title: '66 anos, mercado em movimento',
    text: 'A empresa é de 1959 e se digitalizou: 82 equipamentos digitais, dados de audiência por campanha e câmeras ao vivo 24×7. Estabilidade de quem atravessou seis décadas, com a tecnologia de quem não parou.',
  },
  {
    title: 'Time enxuto, dono do que faz',
    text: 'Da negociação ao ponto instalado, quem faz assina. São poucas camadas entre a ideia e a rua — e isso vale tanto para o cliente quanto para quem trabalha aqui.',
  },
]

export default function Culture() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cultura">
      <div className="wrap">
        <SectionHeading num="01" title="Por que a Outdoormídia" className="reveal mb-[34px]" />
        <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
          Somos a empresa que coloca marcas nas ruas do Paraná e de Santa Catarina desde 1959.
          Do outdoor impresso ao painel de LED, quem entra no time trabalha com mídia que a
          cidade inteira vê.
        </p>

        <div className="reveal mb-[54px] grid grid-cols-4 border-l border-ink/15 max-tab:grid-cols-2 max-xs:grid-cols-1">
          {NUMEROS.map((item) => (
            <div
              className="border-r border-ink/15 px-7 py-[38px] max-mob:px-[22px] max-mob:py-[26px] max-xs:border-b max-xs:border-r-0"
              key={item.label}
            >
              <div className="display text-[clamp(38px,5vw,64px)] leading-[0.9] text-orange">
                {item.n}
              </div>
              <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
          {PILARES.map((p) => (
            <article
              className="ticks reveal flex flex-col gap-4 border border-line bg-white p-7 max-mob:p-6"
              key={p.title}
            >
              <h3 className="m-0 text-[19px] font-extrabold text-ink">{p.title}</h3>
              <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
