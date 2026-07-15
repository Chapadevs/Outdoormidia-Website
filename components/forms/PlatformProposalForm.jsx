'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { WHATSAPP_URL } from '@/lib/constants'

const CIDADES = [
  'Curitiba — PR',
  'Região Metropolitana de Curitiba — PR',
  'Litoral do Paraná — PR',
  'Joinville — SC',
  'Itajaí — SC',
  'Balneário Camboriú — SC',
  'Outra praça',
]

const PERIODOS = ['2 semanas (bi-semana)', '1 mês', '3 meses', '6 meses ou mais']

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'
const SELECT = `${INPUT} select-caret cursor-pointer appearance-none pr-[38px]`

export default function PlatformProposalForm({ platformName, num }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="proposta">
      <div className="wrap">
        <SectionHeading num={num} title="Peça uma proposta" className="reveal mb-[34px]" />

        {sent ? (
          <div className="ticks max-w-[620px] border border-line bg-white p-[38px] max-tab:p-7">
            <div className="eyebrow">
              <b>Recebido</b>
            </div>
            <h3 className="display mb-0 mt-4 text-[clamp(32px,5vw,56px)] text-ink">
              Proposta
              <br />a caminho.
            </h3>
            <p className="mb-[30px] mt-6 max-w-[46ch] text-lg text-ink-soft">
              Obrigado! Nosso time comercial analisa as praças disponíveis para{' '}
              <b>{platformName}</b> e volta com uma sugestão sob medida em até{' '}
              <b>1 dia útil</b>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} className="btn btn-fill">
                Adiantar pelo WhatsApp
              </a>
              <Link href="/" className="btn">
                Voltar ao início
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[60px] max-tab:grid-cols-1 max-tab:gap-[34px]">
            <div className="reveal">
              <p className="text-lg text-ink-soft">
                Conte rápido sobre sua campanha em <b>{platformName}</b>. Em até 1 dia útil
                retornamos com praças e valores sob medida para o seu objetivo.
              </p>
            </div>

            <form
              className="ticks reveal flex flex-col gap-5 border border-line bg-white p-[38px] max-tab:p-7"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="formato" value={platformName} />

              <div className="flex flex-col gap-2">
                <label className={LABEL} htmlFor="nome">
                  Nome
                </label>
                <input
                  className={INPUT}
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="empresa">
                    Empresa
                  </label>
                  <input
                    className={INPUT}
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="whatsapp">
                    WhatsApp
                  </label>
                  <input
                    className={INPUT}
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="(41) 99999-0000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={LABEL} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={INPUT}
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@empresa.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="cidade">
                    Onde quer aparecer?
                  </label>
                  <select className={SELECT} id="cidade" name="cidade" required defaultValue="">
                    <option value="" disabled>
                      Selecione a praça
                    </option>
                    {CIDADES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="periodo">
                    Período da campanha
                  </label>
                  <select className={SELECT} id="periodo" name="periodo" required defaultValue="">
                    <option value="" disabled>
                      Selecione a duração
                    </option>
                    {PERIODOS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={LABEL} htmlFor="objetivo">
                  Objetivo da campanha <span className="font-semibold text-line-2">(opcional)</span>
                </label>
                <textarea
                  className={`${INPUT} min-h-24 resize-y`}
                  id="objetivo"
                  name="objetivo"
                  rows={4}
                  placeholder="Ex.: divulgar lançamento, gerar fluxo na loja, reforçar marca na região…"
                />
              </div>

              <button
                type="submit"
                className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px]"
              >
                Enviar briefing
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
