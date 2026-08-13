'use client'
import { useState } from 'react'
import {
  PERIODOS,
  estimarCampanha,
  formatarImpactos,
  formatarMoeda,
} from '@/lib/simulador'
import { waLink, waSimulador } from '@/lib/whatsapp'

const FACES = [1, 2, 4, 8]

export default function SimuladorForm({ locations, platforms }) {
  const [escolha, setEscolha] = useState({
    pracaId: '',
    plataformaSlug: '',
    periodoSlug: '',
    faces: 1,
  })

  const estimativa = estimarCampanha(escolha)
  const praca = locations.find((l) => l.id === escolha.pracaId)
  const plataforma = platforms.find((p) => p.slug === escolha.plataformaSlug)
  const periodo = PERIODOS.find((p) => p.slug === escolha.periodoSlug)

  function alterar(campo, valor) {
    setEscolha((atual) => ({ ...atual, [campo]: valor }))
  }

  return (
    <div className="ticks reveal mx-auto max-w-[900px] rounded-[16px] border border-line bg-white p-[38px] max-mob:p-7">
      <div className="grid grid-cols-2 gap-4 max-mob:grid-cols-1">
        <label className="flex flex-col gap-2">
          <span className="field-label">Praça</span>
          <select
            className="field-input field-select select-caret"
            value={escolha.pracaId}
            onChange={(e) => alterar('pracaId', e.target.value)}
          >
            <option value="">Escolha a praça</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="field-label">Plataforma</span>
          <select
            className="field-input field-select select-caret"
            value={escolha.plataformaSlug}
            onChange={(e) => alterar('plataformaSlug', e.target.value)}
          >
            <option value="">Escolha a plataforma</option>
            {platforms.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="field-label">Período</span>
          <select
            className="field-input field-select select-caret"
            value={escolha.periodoSlug}
            onChange={(e) => alterar('periodoSlug', e.target.value)}
          >
            <option value="">Escolha o período</option>
            {PERIODOS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="field-label">Faces</span>
          <select
            className="field-input field-select select-caret"
            value={escolha.faces}
            onChange={(e) => alterar('faces', Number(e.target.value))}
          >
            {FACES.map((f) => (
              <option key={f} value={f}>
                {f} {f === 1 ? 'face' : 'faces'}
              </option>
            ))}
          </select>
        </label>
      </div>

      {estimativa ? (
        <div className="mt-9 border-t border-line pt-8">
          <div className="grid grid-cols-2 gap-8 max-mob:grid-cols-1 max-mob:gap-6">
            <div>
              <span className="field-label">Impactos estimados</span>
              <div className="display mt-2.5 text-[clamp(34px,5vw,56px)] leading-none text-ink">
                {formatarImpactos(estimativa.impactos)}
              </div>
              <p className="mt-3 text-[14px] text-ink-soft">
                Em {estimativa.semanas} semanas de veiculação.
              </p>
            </div>
            <div>
              <span className="field-label">Investimento estimado</span>
              <div className="mt-2.5 text-[clamp(24px,3.4vw,34px)] font-extrabold leading-tight text-ink">
                {formatarMoeda(estimativa.investimentoMin)} a{' '}
                {formatarMoeda(estimativa.investimentoMax)}
              </div>
              <p className="mt-3 text-[14px] text-ink-soft">
                Faixa de referência por CPM. O valor fechado depende do ponto e da
                disponibilidade.
              </p>
            </div>
          </div>

          <a
            href={waLink(
              waSimulador({
                praca: praca?.name,
                plataforma: `${plataforma?.name} · ${escolha.faces} ${
                  escolha.faces === 1 ? 'face' : 'faces'
                }`,
                periodo: periodo?.label,
                impactos: formatarImpactos(estimativa.impactos),
              })
            )}
            className="btn btn-fill mt-9"
          >
            Enviar simulação pelo WhatsApp
          </a>
          <p className="mt-3 text-[13.5px] text-ink-soft">
            Estimativa de referência, não é proposta. A simulação vai junto na mensagem.
          </p>
        </div>
      ) : (
        <p className="mt-9 border-t border-line pt-8 text-[15px] text-ink-soft">
          Escolha praça, plataforma e período para ver a estimativa.
        </p>
      )}
    </div>
  )
}
