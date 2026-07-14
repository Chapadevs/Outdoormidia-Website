'use client'
import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import { WHATSAPP_URL } from '@/lib/constants'

const CIDADES = [
  'Curitiba — PR',
  'Londrina — PR',
  'Maringá — PR',
  'Cascavel — PR',
  'Florianópolis — SC',
  'Joinville — SC',
  'Blumenau — SC',
  'Outra praça',
]

const FORMATOS = [
  'Outdoor impresso (12 × 4 m)',
  'Painel Digital / LED',
  'Passarela (10 × 3 m)',
  'Aeroporto',
  'Shopping',
  'Ainda não sei',
]

const PERIODOS = ['2 semanas (bi-semana)', '1 mês', '3 meses', '6 meses ou mais']

export default function ProposalForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="proposal">
      <header>
        <div className="wrap nav">
          <Logo />
          <div className="nav-right">
            <a href="/" className="btn">← Voltar ao site</a>
          </div>
        </div>
      </header>

      <section className="block">
        <div className="wrap proposal-wrap">
          {sent ? (
            <div className="proposal-done ticks">
              <div className="eyebrow"><b>Recebido</b></div>
              <h1 className="display">Proposta<br />a caminho.</h1>
              <p>
                Obrigado! Nosso time comercial analisa as praças e formatos disponíveis e volta com
                uma sugestão sob medida em até <b>1 dia útil</b>.
              </p>
              <div className="hero-cta">
                <a href={WHATSAPP_URL} className="btn btn-fill">Adiantar pelo WhatsApp</a>
                <a href="/" className="btn">Voltar ao início</a>
              </div>
            </div>
          ) : (
            <>
              <div className="proposal-intro">
                <div className="eyebrow"><span>Briefing</span> · <span><b>PR + SC</b></span></div>
                <h1 className="display">Quero uma<br />proposta.</h1>
                <p>
                  Conte rápido sobre sua campanha. Em até 1 dia útil retornamos com praças, formatos
                  e valores sob medida para o seu objetivo.
                </p>
              </div>

              <form className="proposal-form ticks" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" name="nome" type="text" required placeholder="Seu nome" />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="empresa">Empresa</label>
                    <input id="empresa" name="empresa" type="text" placeholder="Nome da empresa" />
                  </div>
                  <div className="field">
                    <label htmlFor="whatsapp">WhatsApp</label>
                    <input id="whatsapp" name="whatsapp" type="tel" required placeholder="(41) 99999-0000" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" required placeholder="voce@empresa.com" />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="cidade">Onde quer aparecer?</label>
                    <select id="cidade" name="cidade" required defaultValue="">
                      <option value="" disabled>Selecione a praça</option>
                      {CIDADES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="formato">Formato de interesse</label>
                    <select id="formato" name="formato" required defaultValue="">
                      <option value="" disabled>Selecione o formato</option>
                      {FORMATOS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="periodo">Período da campanha</label>
                  <select id="periodo" name="periodo" required defaultValue="">
                    <option value="" disabled>Selecione a duração</option>
                    {PERIODOS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="objetivo">Objetivo da campanha <span className="opt">(opcional)</span></label>
                  <textarea
                    id="objetivo"
                    name="objetivo"
                    rows={4}
                    placeholder="Ex.: divulgar lançamento, gerar fluxo na loja, reforçar marca na região…"
                  />
                </div>

                <button type="submit" className="btn btn-fill proposal-submit">
                  Enviar briefing
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
