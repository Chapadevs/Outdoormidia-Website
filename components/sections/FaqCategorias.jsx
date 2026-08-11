'use client'
import { useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { CATEGORIAS_FAQ, FAQS } from '@/lib/faq'
import { waFaqPage, waLink } from '@/lib/whatsapp'

// Uma pergunta aberta por vez em toda a página — o estado guarda a categoria e o
// índice dentro dela, porque o link de WhatsApp leva a pergunta em foco.
export default function FaqCategorias() {
  const [aberta, setAberta] = useState({ categoria: CATEGORIAS_FAQ[0], index: 0 })

  const grupos = CATEGORIAS_FAQ.map((categoria) => ({
    categoria,
    itens: FAQS.filter((f) => f.categoria === categoria),
  })).filter((g) => g.itens.length > 0)

  const emFoco = grupos
    .find((g) => g.categoria === aberta.categoria)
    ?.itens[aberta.index]?.q

  return (
    <>
      {grupos.map((grupo, i) => (
        <section className="pb-[110px] max-mob:pb-[72px]" key={grupo.categoria}>
          <div className="wrap">
            <SectionHeading
              num={String(i + 1).padStart(2, '0')}
              title={grupo.categoria}
              className="reveal mb-[34px]"
            />
            <Accordion
              items={grupo.itens}
              idPrefix={`faq-${i}`}
              openIndex={aberta.categoria === grupo.categoria ? aberta.index : -1}
              onToggle={(index) => setAberta({ categoria: grupo.categoria, index })}
              className="reveal mx-auto max-w-[820px]"
            />
          </div>
        </section>
      ))}

      <section className="pb-[110px] max-mob:pb-[72px]">
        <div className="wrap">
          <p className="reveal mx-auto max-w-[820px] text-[15px] text-ink-soft">
            Não encontrou sua dúvida?{' '}
            <a href={waLink(waFaqPage(emFoco))} className="font-bold text-orange hover:underline">
              Fale com um especialista no WhatsApp.
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
