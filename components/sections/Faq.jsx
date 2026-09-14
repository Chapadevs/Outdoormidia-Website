'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqHome, waLink } from '@/lib/whatsapp'

export default function Faq({ items }) {
  const t = useTranslations('Faq')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="faq">
      <div className="wrap">
        <SectionHeading title={t('titulo')} className="reveal mb-[34px]" />
        <Accordion
          items={items}
          idPrefix="faq-home"
          openIndex={openIndex}
          onToggle={setOpenIndex}
          className="reveal mx-auto max-w-[820px]"
        />
        <div className="reveal mx-auto mt-9 max-w-[820px]">
          <a className="btn btn-ghost" href={waLink(waFaqHome(items[openIndex]?.q))}>
            {t('falarEspecialista')}
          </a>
        </div>
      </div>
    </section>
  )
}
