'use client'
import { useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqPlataforma, waLink } from '@/lib/whatsapp'

export default function PlatformFaq({ faqs, num = '', platformName }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <SectionHeading num={num} title="Perguntas frequentes" rule={false} className="mb-6" />
      <Accordion
        items={faqs}
        idPrefix="faq-plataforma"
        openIndex={openIndex}
        onToggle={setOpenIndex}
        className="max-w-[820px]"
      />
      <p className="mt-9 max-w-[820px] text-[15px] text-ink-soft">
        Não encontrou sua dúvida?{' '}
        <a
          href={waLink(waFaqPlataforma(platformName, faqs[openIndex]?.q))}
          className="font-bold text-orange hover:underline"
        >
          Fale com o nosso time no WhatsApp.
        </a>
      </p>
    </div>
  )
}
