'use client'

import { useState } from 'react'
import CoverageMap from '@/components/ui/CoverageMap'
import PracaChips from '@/components/ui/PracaChips'
import { WA_COBERTURA, waLink } from '@/lib/whatsapp'

// As praças do checklist da home (claude/checklist-home.md, item 07). A lista
// de /sobre é a mesma sem Rodovias PR-SC, que não é cidade.
const PRACAS = [
  'Curitiba',
  'Região Metropolitana',
  'Litoral do Paraná',
  'Joinville',
  'Itajaí',
  'Balneário Camboriú',
  'Rodovias PR-SC',
]

function plataformas(total) {
  return `${total} ${total === 1 ? 'plataforma' : 'plataformas'}`
}

// `mostrarLista` desliga a faixa de praças do rodapé do card. Na home ela sai:
// a lista completa por praça vive em /solucoes/regioes, e repetir as duas
// deixava a mesma informação em dois lugares. O mapa e os chips ficam.
// `moldura` desliga a borda e o arredondamento do card. Na home a seção corre
// solta sobre o fundo; em /solucoes/regioes ela continua emoldurada, porque lá
// o card carrega também a faixa de praças e precisa ter começo e fim visíveis.
export default function CoverageExplorer({
  locations,
  num,
  eyebrow = 'Cobertura',
  mostrarLista = true,
  moldura = true,
}) {
  const [hoverId, setHoverId] = useState(null)

  return (
    <div
      className={`reveal overflow-hidden bg-paper ${
        moldura ? 'rounded-[16px] border border-line' : ''
      }`}
    >
      <div className="grid grid-cols-[1.25fr_1fr] items-stretch max-tab:grid-cols-1">
        <div className="flex flex-col justify-between px-14 pb-14 pt-[72px] max-tab:p-10 max-mob:px-6 max-mob:py-9">
          <div>
            {(num || eyebrow) && (
              <div className="flex items-center gap-3.5">
                {num && <span className="font-display text-[15px] text-orange">{num}</span>}
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                <span className="h-px flex-1 bg-line"></span>
              </div>
            )}
            <h2
              className={`display max-w-[14ch] text-[clamp(34px,5.2vw,68px)] text-ink ${
                num || eyebrow ? 'mt-[26px]' : ''
              }`}
            >
              Não basta estar
              <br />
              na cidade.
              <br />
              É preciso estar
              <br />
              no <span className="text-orange">trajeto</span>
              <br />
              do seu público.
            </h2>
            <p className="mt-7 max-w-[42ch] text-lg text-ink-soft">
              A Outdoormídia está em Curitiba, Região Metropolitana, Litoral do Paraná, Joinville,
              Itajaí e Balneário Camboriú, sempre nos pontos de maior fluxo e visibilidade de cada
              praça. Do Batel ao litoral, das rodovias às praias de Santa Catarina, sua marca
              acompanha o trajeto do público nos dois estados.
            </p>
            <PracaChips className="mt-6" pracas={PRACAS} />
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <a href={waLink(WA_COBERTURA)} className="btn btn-fill">
              Consultar disponibilidade
            </a>
            <span className="text-[13px] font-semibold text-ink-soft">
              Resposta no mesmo dia útil
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center px-12 py-14 max-tab:px-10 max-tab:py-12 max-mob:px-6 max-mob:py-9">
          <div className="w-full max-tab:max-w-[420px]">
            <CoverageMap locations={locations} highlightId={hoverId} onHighlight={setHoverId} />
          </div>
        </div>
      </div>

      {mostrarLista && (
        <div className="overflow-hidden border-t border-ink">
          <div className="-mb-px -mr-px grid grid-cols-5 max-tab:grid-cols-2 max-mob:grid-cols-1">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`border-b border-r border-line px-6 pb-[34px] pt-[30px] transition-colors duration-150 max-mob:py-7 ${
                  hoverId === loc.id ? 'bg-bone' : 'bg-paper'
                }`}
                onMouseEnter={() => setHoverId(loc.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                {loc.formats?.length > 0 && (
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                    {plataformas(loc.formats.length)}
                  </div>
                )}
                <div className="mt-2.5 text-[19px] font-extrabold leading-[1.15] tracking-[-0.01em]">
                  {loc.name}
                </div>
                {loc.desc && (
                  <p className="mt-2 text-[13.5px] leading-[1.45] text-ink-soft">{loc.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
