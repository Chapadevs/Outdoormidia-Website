// NÃO-FUNCIONAL: o formulário não envia nada — os dados ficam no browser e são
// descartados. A tela de sucesso oferece o e-mail do RH como caminho real.
// Para tornar real: POST /api/carreiras gravando em `candidaturas` via adminDb,
// no padrão de app/api/admin/posts/route.js.
'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'

const CIDADES = [
  'Curitiba — PR',
  'Região Metropolitana de Curitiba — PR',
  'Litoral do Paraná — PR',
  'Joinville — SC',
  'Itajaí — SC',
  'Balneário Camboriú — SC',
  'Outra praça',
]

const AREAS = [
  'Comercial / Vendas',
  'Marketing',
  'Criação / Design',
  'Operações / Instalação',
  'Administrativo / Financeiro',
  'Tecnologia',
  'Estágio',
  'Outra área',
]

const MAILTO = `mailto:contato@outdoormidia.com.br?subject=${encodeURIComponent(
  'Candidatura — Banco de Talentos'
)}`

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'
const SELECT = `${INPUT} select-caret cursor-pointer appearance-none pr-[38px]`

export default function TalentForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-[110px] pt-0 max-mob:py-[72px] max-mob:pt-0" id="candidatura">
      <div className="wrap">
        <SectionHeading num="02" title="Banco de talentos" className="reveal mb-[34px]" />

        {sent ? (
          <div className="ticks max-w-[620px] border border-line bg-white p-[38px] max-tab:p-7">
            <div className="eyebrow">
              <b>Recebido</b>
            </div>
            <h3 className="display mb-0 mt-4 text-[clamp(32px,5vw,56px)] text-ink">
              Candidatura
              <br />
              registrada.
            </h3>
            <p className="mb-[30px] mt-6 max-w-[46ch] text-lg text-ink-soft">
              Obrigado pelo interesse. Guardamos seu perfil e entramos em contato quando abrir uma
              vaga na sua área. Para adiantar, envie seu currículo por e-mail.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={MAILTO} className="btn btn-fill">
                Enviar currículo por e-mail
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
                Não temos uma vaga aberta para todo perfil o tempo todo. Deixe seus dados: quando
                abrir uma na sua área, você é o primeiro a saber.
              </p>
              <p className="mt-5 text-[15.5px] text-ink-soft">
                Prefere mandar o currículo direto?{' '}
                <a href={MAILTO} className="font-semibold text-orange hover:underline">
                  contato@outdoormidia.com.br
                </a>
              </p>
            </div>

            <form
              className="ticks reveal flex flex-col gap-5 border border-line bg-white p-[38px] max-tab:p-7"
              onSubmit={handleSubmit}
            >
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
                  <label className={LABEL} htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className={INPUT}
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="voce@email.com"
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

              <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="cidade">
                    Onde você mora?
                  </label>
                  <select className={SELECT} id="cidade" name="cidade" required defaultValue="">
                    <option value="" disabled>
                      Selecione a cidade
                    </option>
                    {CIDADES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={LABEL} htmlFor="area">
                    Área de interesse
                  </label>
                  <select className={SELECT} id="area" name="area" required defaultValue="">
                    <option value="" disabled>
                      Selecione a área
                    </option>
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={LABEL} htmlFor="linkedin">
                  LinkedIn ou portfólio
                </label>
                <input
                  className={INPUT}
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  required
                  placeholder="https://linkedin.com/in/seu-perfil"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={LABEL} htmlFor="mensagem">
                  Por que a Outdoormídia? <span className="font-semibold text-line-2">(opcional)</span>
                </label>
                <textarea
                  className={`${INPUT} min-h-24 resize-y`}
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Conte em duas linhas o que você faz e o que procura."
                />
              </div>

              <button type="submit" className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px]">
                Enviar candidatura
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
