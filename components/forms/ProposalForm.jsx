'use client'
import { useState } from 'react'
import Link from 'next/link'
import HeaderShell from '@/components/layout/HeaderShell'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { waBriefing, waLink } from '@/lib/whatsapp'

const PERIODOS = ['2 semanas (bi-semana)', '1 mês', '3 meses', '6 meses ou mais']

// Praças e formatos vêm da página (Firestore + catálogo). Não repetir a lista
// aqui: já houve divergência com o inventário real, oferecendo praça que a
// empresa não atende e escondendo praça que ela atende.
export default function ProposalForm({ pracas = [], formatos = [] }) {
  const [briefing, setBriefing] = useState(null)

  const opcoesPraca = [...pracas.map((p) => p.name), 'Outra praça']
  const opcoesFormato = [...formatos.map((f) => f.name), 'Ainda não sei']

  function handleSubmit(e) {
    e.preventDefault()
    setBriefing(Object.fromEntries(new FormData(e.currentTarget)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <HeaderShell>
        <Link href="/" className="btn btn-ghost ml-auto">
          ← Voltar ao site
        </Link>
      </HeaderShell>

      <Breadcrumb items={[{ label: 'Solicitar Proposta' }]} />

      <section className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
        <div className="wrap">
          {briefing ? (
            <div className="max-w-[620px] pt-12">
              <div className="eyebrow">
                <b>Recebido</b>
              </div>
              <h1 className="display mb-0 mt-4 text-[clamp(44px,7vw,92px)] text-ink">
                Proposta
                <br />a caminho.
              </h1>
              <p className="mb-[30px] mt-6 max-w-[46ch] text-lg text-ink-soft">
                Obrigado! Nosso time comercial analisa as praças e formatos disponíveis e volta com
                uma sugestão sob medida em até <b>1 dia útil</b>.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={waLink(waBriefing(briefing))} className="btn btn-fill">
                  Adiantar pelo WhatsApp
                </a>
                <Link href="/" className="btn btn-ghost">
                  Voltar ao início
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[60px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow">
                  <span>Briefing</span> ·{' '}
                  <span>
                    <b>PR + SC</b>
                  </span>
                </div>
                <h1 className="display mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  Quero uma
                  <br />
                  proposta.
                </h1>
                <p className="mt-6 max-w-[34ch] text-lg text-ink-soft">
                  Conte rápido sobre sua campanha. Em até 1 dia útil retornamos com praças, formatos
                  e valores sob medida para o seu objetivo.
                </p>
              </div>

              <form
                className="ticks flex flex-col gap-5 rounded-[16px] border border-line bg-white p-[38px] max-tab:p-7"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="nome">
                    Nome
                  </label>
                  <input
                    className="field-input"
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label className="field-label" htmlFor="empresa">
                      Empresa
                    </label>
                    <input
                      className="field-input"
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="field-label" htmlFor="whatsapp">
                      WhatsApp
                    </label>
                    <input
                      className="field-input"
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      placeholder="(41) 99999-0000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className="field-input"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="voce@empresa.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label className="field-label" htmlFor="cidade">
                      Onde quer aparecer?
                    </label>
                    <select className="field-input field-select select-caret" id="cidade" name="cidade" required defaultValue="">
                      <option value="" disabled>
                        Selecione a praça
                      </option>
                      {opcoesPraca.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="field-label" htmlFor="formato">
                      Formato de interesse
                    </label>
                    <select className="field-input field-select select-caret" id="formato" name="formato" required defaultValue="">
                      <option value="" disabled>
                        Selecione o formato
                      </option>
                      {opcoesFormato.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="periodo">
                    Período da campanha
                  </label>
                  <select className="field-input field-select select-caret" id="periodo" name="periodo" required defaultValue="">
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

                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="objetivo">
                    Objetivo da campanha <span className="font-semibold text-line-2">(opcional)</span>
                  </label>
                  <textarea
                    className="field-input min-h-24 resize-y"
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
    </div>
  )
}
