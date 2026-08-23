'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import HeaderShell from '@/components/layout/HeaderShell'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CHAVE_BRIEFING } from '@/lib/constants'
import { enviarLead } from '@/lib/leads/enviarLead'

const PERIODOS = ['2 semanas (bi-semana)', '1 mês', '3 meses', '6 meses ou mais']

// Praças e formatos vêm da página (Firestore + catálogo). Não repetir a lista
// aqui: já houve divergência com o inventário real, oferecendo praça que a
// empresa não atende e escondendo praça que ela atende.
export default function ProposalForm({ pracas = [], formatos = [] }) {
  const router = useRouter()
  const [enviando, setEnviando] = useState(false)

  const opcoesPraca = [...pracas.map((p) => p.name), 'Outra praça']
  const opcoesFormato = [...formatos.map((f) => f.name), 'Ainda não sei']

  // O briefing é gravado no Firestore e também atravessa a navegação pelo
  // sessionStorage — o porquê do storage está em CHAVE_BRIEFING, em
  // lib/constants.js; quem o consome é o ObrigadoCta. A gravação nunca lança:
  // rede fora não pode impedir o visitante de chegar em /obrigado.
  async function handleSubmit(e) {
    e.preventDefault()
    const briefing = Object.fromEntries(new FormData(e.currentTarget))
    try {
      sessionStorage.setItem(CHAVE_BRIEFING, JSON.stringify(briefing))
    } catch {}

    setEnviando(true)
    const { nome, empresa, email, whatsapp, website, ...dados } = briefing
    await enviarLead({ origem: 'proposta', nome, empresa, email, whatsapp, website, dados })

    router.push('/obrigado?origem=proposta')
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

              {/* Honeypot: invisível para quem usa o site, irresistível para bot.
                  A rota descarta em silêncio o envio que vier com ele preenchido. */}
              <input
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                name="website"
                tabIndex={-1}
                type="text"
              />

              <button
                type="submit"
                disabled={enviando}
                className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px] disabled:opacity-60"
              >
                {enviando ? 'Enviando…' : 'Enviar briefing'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
