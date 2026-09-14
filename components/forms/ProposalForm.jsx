'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useRouter } from 'next/navigation'
import HeaderShell from '@/components/layout/HeaderShell'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CHAVE_BRIEFING } from '@/lib/constants'
import { enviarLead } from '@/lib/leads/enviarLead'

// O valor de cada opção fixa segue em português nos quatro idiomas: é o que
// vai para o lead, que o comercial lê em português. O que o visitante vê é a
// tradução da `chave` em `ProposalForm.opcoes` (messages/*.json).
const PERIODOS = [
  { chave: 'biSemana', valor: '2 semanas (bi-semana)' },
  { chave: 'umMes', valor: '1 mês' },
  { chave: 'tresMeses', valor: '3 meses' },
  { chave: 'seisMeses', valor: '6 meses ou mais' },
]
const OUTRA_PRACA = { chave: 'outraPraca', valor: 'Outra praça' }
const NAO_SEI = { chave: 'naoSei', valor: 'Ainda não sei' }

// Praças e formatos vêm da página (Firestore + catálogo). Não repetir a lista
// aqui: já houve divergência com o inventário real, oferecendo praça que a
// empresa não atende e escondendo praça que ela atende.
export default function ProposalForm({ pracas = [], formatos = [] }) {
  const t = useTranslations('ProposalForm')
  const router = useRouter()
  const [enviando, setEnviando] = useState(false)

  const opcoesPraca = [
    ...pracas.map((p) => ({ valor: p.name, rotulo: p.name })),
    { valor: OUTRA_PRACA.valor, rotulo: t(`opcoes.${OUTRA_PRACA.chave}`) },
  ]
  const opcoesFormato = [
    ...formatos.map((f) => ({ valor: f.valor ?? f.name, rotulo: f.name })),
    { valor: NAO_SEI.valor, rotulo: t(`opcoes.${NAO_SEI.chave}`) },
  ]

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
          {t('voltarSite')}
        </Link>
      </HeaderShell>

      <Breadcrumb items={[{ label: t('breadcrumb') }]} />

      <section className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
        <div className="wrap">
          <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[60px] max-tab:grid-cols-1 max-tab:gap-[34px]">
            <div>
              <div className="eyebrow">
                <span>{t('eyebrow')}</span> ·{' '}
                <span>
                  <b>PR + SC</b>
                </span>
              </div>
              <h1 className="display mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                {t('tituloA')}
                <br />
                {t('tituloB')}
              </h1>
              <p className="mt-6 max-w-[34ch] text-lg text-ink-soft">
                {t('lead')}
              </p>
            </div>

            <form
              className="ticks flex flex-col gap-5 rounded-[16px] border border-line bg-white p-[38px] max-tab:p-7"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="nome">
                  {t('campos.nome')}
                </label>
                <input
                  className="field-input"
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder={t('placeholders.nome')}
                />
              </div>

              <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="empresa">
                    {t('campos.empresa')}
                  </label>
                  <input
                    className="field-input"
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder={t('placeholders.empresa')}
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
                  {t('campos.email')}
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
                    {t('campos.cidade')}
                  </label>
                  <select className="field-input field-select select-caret" id="cidade" name="cidade" required defaultValue="">
                    <option value="" disabled>
                      {t('placeholders.cidade')}
                    </option>
                    {opcoesPraca.map((c) => (
                      <option key={c.valor} value={c.valor}>
                        {c.rotulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="field-label" htmlFor="formato">
                    {t('campos.formato')}
                  </label>
                  <select className="field-input field-select select-caret" id="formato" name="formato" required defaultValue="">
                    <option value="" disabled>
                      {t('placeholders.formato')}
                    </option>
                    {opcoesFormato.map((f) => (
                      <option key={f.valor} value={f.valor}>
                        {f.rotulo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="periodo">
                  {t('campos.periodo')}
                </label>
                <select className="field-input field-select select-caret" id="periodo" name="periodo" required defaultValue="">
                  <option value="" disabled>
                    {t('placeholders.periodo')}
                  </option>
                  {PERIODOS.map((p) => (
                    <option key={p.chave} value={p.valor}>
                      {t(`opcoes.${p.chave}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="objetivo">
                  {t('campos.objetivo')} <span className="font-semibold text-line-2">{t('opcional')}</span>
                </label>
                <textarea
                  className="field-input min-h-24 resize-y"
                  id="objetivo"
                  name="objetivo"
                  rows={4}
                  placeholder={t('placeholders.objetivo')}
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
                {enviando ? t('enviando') : t('enviar')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
