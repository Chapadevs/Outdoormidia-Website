import SectionHeading from '@/components/ui/SectionHeading'

// TODO(cliente): fases e entregáveis derivados do vocabulário do projeto.
// Confirmar com o time comercial e de operações.
const ETAPAS = [
  {
    num: '01',
    title: 'Planejamento',
    dark: false,
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
    dark: true,
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
    dark: false,
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
        <SectionHeading num="04" title="Como funciona" className="reveal mb-[18px]" />
        <p className="reveal mb-16 max-w-[520px] text-lg text-ink-soft max-mob:mb-10">
          Da primeira conversa ao relatório final, três etapas.
        </p>

        <div className="grid grid-cols-3 items-start gap-9 max-tab:grid-cols-1">
          {ETAPAS.map((etapa) => (
            <article
              className={`reveal group relative min-h-[360px] overflow-hidden rounded-[28px] border px-[38px] pb-12 pt-11 transition-[translate,box-shadow] duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-20px_rgba(22,17,13,0.35)] max-mob:min-h-0 max-mob:px-7 max-mob:pb-9 max-mob:pt-8 ${
                etapa.dark
                  ? 'border-orange bg-orange shadow-[0_20px_40px_-22px_rgba(255,77,0,0.5)]'
                  : 'border-[rgba(22,17,13,0.08)] bg-paper shadow-[0_16px_32px_-22px_rgba(22,17,13,0.25)]'
              }`}
              key={etapa.num}
            >
              <span
                aria-hidden="true"
                className={`display pointer-events-none absolute right-[18px] top-4 select-none text-[88px] leading-none text-transparent transition-[translate,scale,opacity] duration-[350ms] ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1 group-hover:scale-[1.04] ${
                  etapa.dark
                    ? '[-webkit-text-stroke:1.5px_rgba(22,17,13,0.2)]'
                    : '[-webkit-text-stroke:1.5px_rgba(22,17,13,0.12)]'
                }`}
              >
                {etapa.num}
              </span>

              <div className="relative z-[2]">
                <h3 className="display m-0 mb-2.5 max-w-[60%] text-[26px] leading-tight text-ink max-mob:max-w-[66%]">
                  {etapa.title}
                </h3>
                <div
                  className={`mb-[22px] h-[3px] w-9 ${etapa.dark ? 'bg-ink' : 'bg-orange'}`}
                ></div>

                <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {etapa.bullets.map((b) => (
                    <li className="flex items-start gap-3" key={b}>
                      <span
                        aria-hidden="true"
                        className={`flex-none font-extrabold leading-normal ${etapa.dark ? 'text-ink' : 'text-orange'}`}
                      >
                        —
                      </span>
                      <span
                        className={`text-[15.5px] leading-normal ${etapa.dark ? 'text-ink/80' : 'text-ink-soft'}`}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
