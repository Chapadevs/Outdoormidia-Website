'use client'

import { useState } from 'react'
import CoverageMap from '@/components/ui/CoverageMap'
import { WA_COBERTURA, WA_COBERTURA_CURITIBA, waLink } from '@/lib/whatsapp'

function plataformas(total) {
  return `${total} ${total === 1 ? 'plataforma' : 'plataformas'}`
}

export default function CoverageExplorer({ locations, num = '04' }) {
  const [hoverId, setHoverId] = useState(null)

  return (
    <div className="reveal overflow-hidden rounded-[16px] border border-line bg-paper">
      <div className="grid grid-cols-[1.25fr_1fr] items-stretch max-tab:grid-cols-1">
        <div className="flex flex-col justify-between px-14 pb-14 pt-[72px] max-tab:p-10 max-mob:px-6 max-mob:py-9">
          <div>
            <div className="flex items-center gap-3.5">
              <span className="font-display text-[15px] text-orange">{num}</span>
              <span className="eyebrow">Cobertura</span>
              <span className="h-px flex-1 bg-line"></span>
            </div>
            <h2 className="display mt-[26px] max-w-[12ch] text-[clamp(40px,6.2vw,82px)] text-ink">
              Seu público
              <br />
              não fica
              <br />
              <span className="text-orange">parado.</span>
              <br />
              A gente
              <br />
              também não.
            </h2>
            <p className="mt-7 max-w-[40ch] text-lg text-ink-soft">
              Do Batel ao litoral, das rodovias às praias de Santa Catarina: uma malha contínua de
              mídia exterior nos dois estados onde o Sul se movimenta. Escolha a praça e a gente
              mostra o que existe nela.
            </p>
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

      <div className="flex items-center justify-between gap-8 bg-orange px-16 py-[34px] max-tab:flex-col max-tab:items-start max-tab:gap-5 max-tab:px-10 max-mob:px-6 max-mob:py-7">
        <span className="display flex-1 text-[clamp(16px,1.8vw,22px)] leading-[1.2]">
          Temos a maior network de DOOH regional do Sul do Brasil, com 159 telas digitais e +22
          milhões de impactos semanais em praças estratégicas.
        </span>
        <a href={waLink(WA_COBERTURA_CURITIBA)} className="btn btn-on-orange">
          Consultar disponibilidade
        </a>
      </div>
    </div>
  )
}
