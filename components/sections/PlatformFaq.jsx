'use client'
import { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { WHATSAPP_URL } from '@/lib/constants'

export default function PlatformFaq({ faqs, num = '' }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <SectionHeading num={num} title="Perguntas frequentes" rule={false} className="mb-6" />
      <div className="max-w-[820px] border-t border-ink">
        {faqs.map((item, i) => {
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
      <p className="mt-9 max-w-[820px] text-[15px] text-ink-soft">
        Não encontrou sua dúvida?{' '}
        <a href={WHATSAPP_URL} className="font-bold text-orange hover:underline">
          Fale com o nosso time no WhatsApp.
        </a>
      </p>
    </div>
  )
}
