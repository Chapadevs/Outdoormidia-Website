import SectionHeading from '@/components/ui/SectionHeading'

// TODO(cliente): fases e entregáveis derivados do vocabulário do projeto.
// Confirmar com o time comercial e de operações.
const ETAPAS = [
  {
    num: '01',
    title: 'Planejamento',
    bullets: [
      'Definição do objetivo e da praça.',
      'Seleção de plataformas e pontos.',
      'Simulação de alcance, frequência e CPM.',
      'Proposta com período e investimento.',
    ],
  },
  {
    num: '02',
    title: 'Produção',
    bullets: [
      'Especificação por formato.',
      'Adequação da arte ao ponto.',
      'Impressão de lona nos formatos impressos.',
      'Upload do criativo nos pontos digitais.',
    ],
  },
  {
    num: '03',
    title: 'Veiculação',
    bullets: [
      'Instalação e conferência em campo.',
      'Relatório fotográfico de veiculação.',
      'Câmeras ao vivo 24×7 nos pontos digitais.',
      'Dados de audiência ao fim do período.',
    ],
  },
]

export default function Process() {
  return (
    <section className="bg-bone py-[110px] max-mob:py-[72px]" id="processo">
      <div className="wrap">
        <SectionHeading num="04" title="Como funciona" className="reveal mb-[34px]" />
        <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
          Da primeira conversa ao relatório final, três etapas.
        </p>

        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
          {ETAPAS.map((etapa) => (
            <article
              className="ticks reveal flex flex-col gap-4 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
              key={etapa.num}
            >
              <span className="display text-[30px] leading-none text-orange">{etapa.num}</span>
              <h3 className="m-0 text-[21px] font-extrabold text-ink">{etapa.title}</h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {etapa.bullets.map((b) => (
                  <li className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft" key={b}>
                    <span aria-hidden="true" className="text-orange">
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
