'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { waFaqPlataforma, waLink } from '@/lib/whatsapp'

export default function PlatformFaq({ faqs, platformName }) {
  const t = useTranslations('Faq')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <SectionHeading title={t('titulo')} rule={false} className="mb-6" />
      <Accordion
        items={faqs}
        idPrefix="faq-plataforma"
        openIndex={openIndex}
        onToggle={setOpenIndex}
        className="max-w-[820px]"
      />
      <p className="mt-9 max-w-[820px] text-[15px] text-ink-soft">
        {t('naoEncontrou')}{' '}
        <a
          href={waLink(waFaqPlataforma(platformName, faqs[openIndex]?.q))}
          className="font-bold text-orange hover:underline"
        >
          {t('faleTimeWhatsapp')}
        </a>
      </p>
    </div>
  )
}
