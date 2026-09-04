'use client'

import { useState } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'

// Componentes C7 e C4 do handoff no mesmo card: a anatomia fixa do produto
// (kicker em caixa alta, nome, copy, linha de specs) e o seletor de tecnologia.
//
// Produto de dupla tecnologia é UM card com seletor, nunca dois cards. O seletor
// abre na tecnologia da plataforma que está exibindo o card: em Outdoor Digital
// abre em Digital, em Front Light abre em Estático. Sem isso o visitante de
// Front Light cairia numa ficha de resolução em pixels.
//
// A copy é a mesma nas duas tecnologias de propósito: o texto do handoff
// descreve o produto inteiro, e é a ficha técnica que muda de lado. Onde a ficha
// de uma tecnologia ainda não veio do cliente, a linha some naquele lado, que é
// a mesma regra do quadro de números.
const ROTULOS = { estatico: 'Estático', digital: 'Digital' }

const TOGGLE =
  'radial-reveal cursor-pointer rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-150 [--rr-fill:var(--color-ink)]'

export default function ProdutoCard({ produto, tecnologiaPadrao = 'digital' }) {
  const { name, kicker, text, specs, specsPor, pontos, selo, tecnologias, image, imageAlt, imageRatio } =
    produto

  const dupla = tecnologias?.length > 1
  const inicial = tecnologias?.includes(tecnologiaPadrao) ? tecnologiaPadrao : tecnologias?.[0]
  const [tec, setTec] = useState(inicial)

  const ficha = dupla ? specsPor?.[tec] : specs
  const rotulo = dupla ? `${ROTULOS[tec]} · ${kicker}` : kicker
  const comEndereco = pontos?.filter((p) => p.endereco) ?? []

  return (
    <article className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
      {image && (
        <CoverMedia
          alt={imageAlt}
          className="mb-5"
          label={name}
          ratio={imageRatio || '16/9'}
          sizes="(max-width: 980px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={image}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow m-0 text-orange">{rotulo}</p>
        {selo && (
          <span className="shrink-0 rounded-full border border-orange px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-orange">
            {selo}
          </span>
        )}
      </div>

      <h3 className="m-0 mt-3.5 text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-ink max-mob:text-[21px]">
        {name}
      </h3>

      {dupla && (
        <div className="mt-5 inline-flex w-fit gap-1 rounded-full border border-line p-1">
          {tecnologias.map((opcao) => (
            <button
              aria-pressed={opcao === tec}
              className={`${TOGGLE} ${
                opcao === tec ? 'bg-ink text-white' : 'text-ink-soft hover:text-white'
              }`}
              key={opcao}
              onClick={() => setTec(opcao)}
              type="button"
            >
              {ROTULOS[opcao]}
            </button>
          ))}
        </div>
      )}

      <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">{text}</p>

      {ficha && <p className="m-0 mt-5 text-[13px] leading-relaxed text-ink-soft/85">{ficha}</p>}

      {comEndereco.length > 0 && (
        <ul className="m-0 mt-5 list-none border-t border-line p-0 pt-4">
          {comEndereco.map((ponto) => (
            <li className="mt-2 text-[13px] leading-snug text-ink-soft first:mt-0" key={ponto.name}>
              <span className="font-bold uppercase tracking-[0.06em] text-ink">{ponto.name}</span>{' '}
              {ponto.endereco}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
