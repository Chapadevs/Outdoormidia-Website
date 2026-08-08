'use client'
import { useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqHome, waLink } from '@/lib/whatsapp'

const FAQS = [
  {
    q: 'Em quais cidades e regiões vocês têm pontos?',
    a: 'Cobrimos Curitiba e região metropolitana (Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande), o litoral do Paraná, as principais rodovias de PR e SC, e em Santa Catarina: Joinville, Itajaí e Balneário Camboriú.',
  },
  {
    q: 'Quais formatos de mídia posso contratar?',
    a: 'São 9 plataformas: Outdoors Digitais, Front Lights, Projetos Icônicos, Gentileza Urbana, Green, Aeroporto, Shoppings, Mídia Móvel e MUB (mídia urbana em ônibus). Cada uma cobre um objetivo e um perfil de público diferente.',
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
        <Accordion
          items={FAQS}
          idPrefix="faq-home"
          openIndex={openIndex}
          onToggle={setOpenIndex}
          className="reveal mx-auto max-w-[820px]"
        />
        <p className="reveal mx-auto mt-9 max-w-[820px] text-[15px] text-ink-soft">
          Não encontrou sua dúvida?{' '}
          <a
            href={waLink(waFaqHome(FAQS[openIndex]?.q))}
            className="font-bold text-orange hover:underline"
          >
            Fale com o nosso time no WhatsApp.
          </a>
        </p>
      </div>
    </section>
  )
}
