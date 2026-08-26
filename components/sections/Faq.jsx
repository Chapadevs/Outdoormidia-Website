'use client'
import { useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqHome, waLink } from '@/lib/whatsapp'
import { FAQS_HOME } from '@/lib/faq'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="faq">
      <div className="wrap">
        <SectionHeading num="09" title="Perguntas frequentes" className="reveal mb-[34px]" />
        <Accordion
          items={FAQS_HOME}
          idPrefix="faq-home"
          openIndex={openIndex}
          onToggle={setOpenIndex}
          className="reveal mx-auto max-w-[820px]"
        />
        <div className="reveal mx-auto mt-9 max-w-[820px]">
          <a className="btn btn-ghost" href={waLink(waFaqHome(FAQS_HOME[openIndex]?.q))}>
            Falar com um especialista →
          </a>
        </div>
      </div>
    </section>
  )
}
