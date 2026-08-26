import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollToButton from '@/components/widgets/ScrollToButton'

const ETAPAS = [
  {
    num: '01',
    title: 'Planejamento',
    dark: false,
    text: 'Objetivo e praça definidos, plataformas e pontos selecionados, audiência lida e proposta de mídia montada.',
  },
  {
    num: '02',
    title: 'Produção',
    dark: true,
    text: 'Especificação por formato, adequação do criativo ao ponto e preparo dos materiais, estáticos ou digitais.',
  },
  {
    num: '03',
    title: 'Veiculação e dados',
    dark: false,
    text: 'Instalação ou upload, conferência, monitoramento e entrega dos dados de audiência do período.',
  },
]

// O mesmo bloco serve a home e /sobre — editar aqui reflete nos dois. Em /sobre
// ele entra sob o título "Por que a Outdoormídia", que é a seção que ele passou
// a ocupar; o conteúdo não muda de uma página para a outra.
export default function Process({ num = '07', title = 'Gestão 360 OM' }) {
  return (
    <section className="bg-bone py-[110px] max-mob:py-[72px]" id="processo">
      <div className="wrap">
        <SectionHeading num={num} title={title} className="reveal mb-[18px]" />
        <p className="reveal mb-5 max-w-[520px] text-lg text-ink-soft">
          Do objetivo à notoriedade.
        </p>
        <p className="reveal mb-16 max-w-[60ch] text-ink-soft max-mob:mb-10">
          Você diz o objetivo, para quem e onde precisa aparecer. A Outdoormídia cruza praça, fluxo,
          formato, audiência e investimento para montar o melhor caminho da campanha.
        </p>

        <div className="grid grid-cols-3 items-stretch gap-9 max-tab:grid-cols-1">
          {ETAPAS.map((etapa) => (
            <article
              className={`reveal group relative flex h-full flex-col overflow-hidden rounded-[28px] border px-[38px] pb-12 pt-11 transition-[translate,box-shadow] duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-20px_rgba(22,17,13,0.35)] max-mob:px-7 max-mob:pb-9 max-mob:pt-8 ${
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
                <h3 className="display m-0 mb-2.5 flex min-h-[65px] max-w-[60%] items-start text-[26px] leading-tight text-ink max-mob:min-h-0 max-mob:max-w-[66%]">
                  {etapa.title}
                </h3>
                <div className={`mb-[22px] h-[3px] w-9 ${etapa.dark ? 'bg-ink' : 'bg-orange'}`}></div>

                <p
                  className={`m-0 text-[15.5px] leading-relaxed ${etapa.dark ? 'text-ink/80' : 'text-ink-soft'}`}
                >
                  {etapa.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-12 max-w-[70ch] text-ink-soft max-mob:mt-9">
          Em projetos de painel exclusivo, o Gestão 360 OM inclui ainda consultoria legal de
          licenciamento e instalação completa.{' '}
          <Link
            className="font-bold text-orange transition-colors duration-150 hover:text-ink"
            href="/plataformas/digital-signage"
          >
            Saiba mais
          </Link>
          .
        </p>

        <div className="reveal mt-9">
          <ScrollToButton className="btn btn-ghost" targetId="nova-campanha">
            Quero anunciar
          </ScrollToButton>
        </div>
      </div>
    </section>
  )
}
