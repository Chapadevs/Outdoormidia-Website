'use client'
import { useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqHome, waLink } from '@/lib/whatsapp'
import { FAQS } from '@/lib/faq'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="faq">
      <div className="wrap">
        <SectionHeading num="07" title="Perguntas frequentes" className="reveal mb-[34px]" />
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
