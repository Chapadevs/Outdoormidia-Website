'use client'
import { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { WHATSAPP_URL } from '@/lib/constants'

const FAQS = [
  {
    q: 'Em quais cidades e regiões vocês têm pontos?',
    a: 'Cobrimos Curitiba e região metropolitana (Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande), o litoral do Paraná, as principais rodovias de PR e SC, e em Santa Catarina: Joinville, Itajaí e Balneário Camboriú.',
  },
  {
    q: 'Quais formatos de mídia posso contratar?',
    a: 'São 8 plataformas: Front Light, Rodovias, Aeroporto, Outdoor Digital/LED, projetos Icônicos, Malls, MUB (mídia urbana em ônibus) e Mídia Móvel. Cada uma cobre um objetivo e um perfil de público diferente.',
  },
  {
    q: 'Nunca anunciei em mídia exterior. Consigo mesmo assim?',
    a: 'Sim. Nosso time acompanha você do começo ao fim — da escolha do melhor ponto para o seu objetivo até a orientação da arte. Você não precisa entender de mídia para começar.',
  },
  {
    q: 'O ponto é exclusivo ou divido espaço com concorrentes?',
    a: 'Trabalhamos com Face Única: cada ponto é exclusivo de um único anunciante. Sua marca não divide o espaço com a concorrência.',
  },
  {
    q: 'Consigo medir os resultados da campanha?',
    a: 'Sim. Com a tecnologia 4yousee/Everywhere você acompanha CPM, frequência, gênero, faixa etária e renda do público impactado. Além disso, todos os pontos digitais têm câmeras ao vivo 24×7.',
  },
  {
    q: 'Qual o alcance da rede?',
    a: 'São 380 milhões de impactos por mês, 82 equipamentos digitais e 138 telas espalhadas pelo Sul do Brasil.',
  },
  {
    q: 'Preciso produzir lona ou impressão?',
    a: 'Nos pontos digitais não há produção de lona — o criativo é trocado de forma dinâmica, direto na tela. Formatos impressos, como o Front Light, seguem com produção de material.',
  },
  {
    q: 'O MUB permite segmentar o público?',
    a: 'Sim. O MUB tem 6 circuitos segmentados — Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper — em 77 locais, somando 13 milhões de impactos por mês.',
  },
  {
    q: 'E onde a mídia fixa não chega?',
    a: 'A Mídia Móvel leva sua marca a praias, parques e calçadões, com ativações em pontos de grande fluxo onde o OOH fixo não alcança.',
  },
  {
    q: 'Como peço uma proposta?',
    a: 'É rápido: fale com nosso time comercial pelo WhatsApp ou preencha o briefing na página de proposta. A gente retorna com um plano sob medida para o seu objetivo.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="faq">
      <div className="wrap">
        <SectionHeading num="05" title="Perguntas frequentes" className="reveal mb-[34px]" />
        <div className="reveal mx-auto max-w-[820px] border-t border-ink">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            const panelId = `faq-panel-${i}`
            const buttonId = `faq-button-${i}`
            return (
              <div className="border-b border-line" key={item.q}>
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-5 py-[22px] text-left text-[clamp(17px,2.2vw,20px)] font-extrabold text-ink transition-colors duration-150 hover:text-orange"
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
        <p className="reveal mx-auto mt-9 max-w-[820px] text-[15px] text-ink-soft">
          Não encontrou sua dúvida?{' '}
          <a href={WHATSAPP_URL} className="font-bold text-orange hover:underline">
            Fale com o nosso time no WhatsApp.
          </a>
        </p>
      </div>
    </section>
  )
}
