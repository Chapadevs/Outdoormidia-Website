'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  BRS,
  ESCALA,
  ETIQUETAS,
  NORTE,
  NOS,
  SAO_PAULO,
  SETAS,
  VIEW_H,
  VIEW_W,
  getCorredores,
} from '@/lib/mapaRodovias'

/*
 * Mapa da rede de Rodovias. Toda a geometria vem pronta de lib/mapaRodovias.js,
 * gerado uma vez por scripts/generate-rodovias-map.mjs — aqui não se calcula
 * posição nenhuma, só se decide o que fica aceso.
 *
 * O verde do selo de São Paulo é a única cor fora dos tokens da marca. Ele é
 * sinalização de rodovia dentro do desenho, como a placa verde da estrada, e não
 * cromo da Outdoormídia: fica como constante local, de propósito, para não virar
 * token e passar a ideia de que a paleta ganhou uma cor.
 */
const VERDE_PLACA = '#1B8A3A'

const SETA = 'M-6.5,-5.5 L6.5,0 L-6.5,5.5 Z'

export default function MapaRodovias({ className = '' }) {
  const locale = useLocale()
  const t = useTranslations('MapaRodovias')
  const CORREDORES = getCorredores(locale)
  const [hover, setHover] = useState(null)
  const [br, setBr] = useState(null)

  const corredoresPorNo = useMemo(() => {
    const mapa = new Map()
    for (const c of CORREDORES) {
      for (const id of c.nos) {
        if (!mapa.has(id)) mapa.set(id, [])
        mapa.get(id).push(c)
      }
    }
    return mapa
    // CORREDORES é memoizado por locale: a referência só muda com o idioma.
  }, [CORREDORES])

  const deCorredores = (lista, noExtra) => ({
    corredores: new Set(lista.map((c) => c.id)),
    nos: new Set([...(noExtra ? [noExtra] : []), ...lista.flatMap((c) => c.nos)]),
  })

  /* O hover manda enquanto existe; sem ele vale o chip, que fica preso até o
     visitante trocar. Sem os dois, o mapa inteiro fica aceso. */
  const foco = useMemo(() => {
    if (hover) return hover
    if (br) return deCorredores(CORREDORES.filter((c) => c.br === br))
    return null
  }, [hover, br, CORREDORES])

  const viaAcesa = (id) => !foco || foco.corredores.has(id)
  const noAceso = (id) => !foco || foco.nos.has(id)
  const opacidade = (aceso) => ({ opacity: aceso ? 1 : 0.16, transition: 'opacity 200ms ease' })

  const entrarVia = (c) => setHover(deCorredores([c]))
  const entrarNo = (no) => setHover(deCorredores(corredoresPorNo.get(no.id) ?? [], no.id))
  const sair = () => setHover(null)

  return (
    <div className={`flex items-start gap-9 max-tab:flex-col max-tab:gap-7 ${className}`}>
      {/* No desktop os controles moram numa coluna à esquerda do desenho. No
          empilhado o `contents` desmancha essa coluna, porque a legenda só faz
          sentido depois do mapa: filtros, mapa, legenda. */}
      <div className="flex w-[238px] shrink-0 flex-col gap-8 max-tab:contents">
        <div className="reveal max-tab:order-1 max-tab:w-full">
          <div className="eyebrow mb-3">Rodovias</div>
          <div className="flex flex-col gap-2 max-tab:flex-row max-tab:flex-wrap">
            <Chip ativo={br === null} onClick={() => setBr(null)}>
              Toda a rede
            </Chip>
            <div className="grid grid-cols-2 gap-2 max-tab:contents">
              {BRS.map((sigla) => (
                <Chip key={sigla} ativo={br === sigla} onClick={() => setBr(sigla)}>
                  {sigla}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal grid gap-6 border-t border-line pt-7 max-tab:order-3 max-tab:w-full max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-5">
          <Grupo titulo="Pontos">
            <Item amostra={<Polo />}>Cidade polo</Item>
            <Item amostra={<Secundaria />}>{t('legendaCidade')}</Item>
            <Item amostra={<Apoio />}>{t('legendaApoio')}</Item>
          </Grupo>
          <Grupo titulo="Vias">
            <Item amostra={<Via />}>{t('legendaCorredor')}</Item>
            <Item amostra={<Sentido />}>Sentido do fluxo</Item>
          </Grupo>
        </div>
      </div>

      <div className="min-w-0 flex-1 max-tab:order-2 max-tab:w-full">
        <div className="reveal mx-auto max-w-[820px] rounded-[16px] border border-line bg-paper p-2">
          <svg
            aria-label={t('mapaAlt')}
            className="block h-auto w-full font-display"
            role="img"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          >
            {/* asfalto: o casing na cor do fundo é o que abre respiro onde duas
                vias se cruzam, em vez de deixá-las coladas */}
            <g>
              {CORREDORES.map((c) => (
                <g key={c.id} style={opacidade(viaAcesa(c.id))}>
                  <path
                    d={c.d}
                    fill="none"
                    stroke="var(--color-paper)"
                    strokeLinecap="round"
                    strokeWidth={c.w + 9}
                  />
                  <path
                    d={c.d}
                    fill="none"
                    stroke="var(--color-orange)"
                    strokeLinecap="round"
                    strokeWidth={c.w}
                  />
                  <path
                    className="fluxo-via animate-fluxo-via"
                    d={c.d}
                    fill="none"
                    opacity={0.9}
                    stroke="var(--color-paper)"
                    strokeDasharray="2 22"
                    strokeLinecap="round"
                    strokeWidth={Math.max(2.5, c.w * 0.26)}
                  />
                </g>
              ))}
            </g>

            <g fill="var(--color-ink)">
              {SETAS.map((seta, i) => (
                <path
                  d={SETA}
                  key={`${seta.id}-${i}`}
                  style={opacidade(viaAcesa(seta.id))}
                  transform={seta.transform}
                />
              ))}
            </g>

            {ETIQUETAS.map((e) => (
              <g key={e.id} style={opacidade(viaAcesa(e.id))} transform={e.transform}>
                <rect
                  fill="var(--color-paper)"
                  height={23}
                  rx={11.5}
                  stroke="var(--color-orange)"
                  strokeWidth={1.8}
                  width={e.largura}
                  x={-e.largura / 2}
                  y={-11.5}
                />
                <text
                  fill="var(--color-orange)"
                  fontSize={12}
                  fontWeight={800}
                  letterSpacing=".03em"
                  textAnchor="middle"
                  y={4.5}
                >
                  {e.br}
                </text>
              </g>
            ))}

            {/* Referência de distância, não região atendida. */}
            <g transform={`translate(${SAO_PAULO.x},${SAO_PAULO.y})`}>
              <path d="M-9,0 v16 M9,0 v16" stroke="var(--color-ink)" strokeWidth={3} />
              <rect fill={VERDE_PLACA} height={40} rx={20} width={108} x={-54} y={-36} />
              <text
                fill="#fff"
                fontSize={12.5}
                fontWeight={800}
                letterSpacing=".04em"
                textAnchor="middle"
                y={-19}
              >
                {SAO_PAULO.label}
              </text>
              <text
                fill="#fff"
                fontSize={11.5}
                fontWeight={500}
                opacity={0.9}
                textAnchor="middle"
                y={-5}
              >
                {SAO_PAULO.sub}
              </text>
            </g>

            {NOS.map((no) => (
              <g
                key={no.id}
                onMouseEnter={() => entrarNo(no)}
                onMouseLeave={sair}
                style={{ ...opacidade(noAceso(no.id)), cursor: 'pointer' }}
                transform={`translate(${no.x},${no.y})`}
              >
                <circle fill="var(--color-paper)" r={no.r + 3} />
                <circle
                  fill={no.tier === 4 ? 'var(--color-paper)' : 'var(--color-ink)'}
                  r={no.r}
                  stroke={no.tier === 4 ? 'var(--color-ink)' : 'none'}
                  strokeWidth={no.tier === 4 ? 3 : 0}
                />
                {no.tier <= 2 && <circle fill="var(--color-paper)" r={no.r * 0.34} />}
                {/* o halo de fundo (paint-order: stroke) é o que mantém o nome
                    legível quando ele cai por cima de uma via */}
                <text
                  fill="var(--color-ink)"
                  fontSize={no.fs}
                  fontWeight={no.tier <= 2 ? 800 : 700}
                  letterSpacing={no.tier <= 2 ? '.005em' : '.03em'}
                  stroke="var(--color-paper)"
                  strokeLinejoin="round"
                  strokeWidth={4.5}
                  style={{ paintOrder: 'stroke' }}
                  textAnchor={no.anchor}
                >
                  {no.linhas.map((linha, i) => (
                    <tspan key={linha} x={no.tx} y={no.ty + i * no.entrelinha}>
                      {linha}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}

            <g stroke="var(--color-ink)" strokeWidth={2.5} transform={`translate(${ESCALA.x},${ESCALA.y})`}>
              <path d={`M0,0 h${ESCALA.px}`} />
              <path d={`M0,-5 v10 M${ESCALA.px},-5 v10`} />
              <text
                fill="var(--color-ink)"
                fontSize={11}
                fontWeight={700}
                letterSpacing=".06em"
                stroke="none"
                textAnchor="middle"
                x={ESCALA.px / 2}
                y={-11}
              >
                {ESCALA.label}
              </text>
            </g>

            <g fill="var(--color-ink)" transform={`translate(${NORTE.x},${NORTE.y})`}>
              <path d="M0,-22 L8,8 L0,1 L-8,8 Z" />
              <text
                fontSize={11}
                fontWeight={800}
                letterSpacing=".08em"
                textAnchor="middle"
                y={25}
              >
                N
              </text>
            </g>

            {/* faixa invisível e larga por cima de tudo: é ela que recebe o
                ponteiro, porque mirar um traço de 11 unidades é mira demais */}
            <g>
              {CORREDORES.map((c) => (
                <path
                  className="cursor-pointer"
                  d={c.d}
                  fill="none"
                  key={c.id}
                  onMouseEnter={() => entrarVia(c)}
                  onMouseLeave={sair}
                  stroke="transparent"
                  strokeWidth={26}
                >
                  <title>{`${c.br}: ${c.nome}`}</title>
                </path>
              ))}
            </g>
          </svg>
        </div>

        <p className="reveal mt-4 text-[13px] leading-relaxed text-ink-soft">
          {t('notaSaoPaulo')}
        </p>
      </div>
    </div>
  )
}

function Chip({ ativo, children, onClick }) {
  return (
    <button
      aria-pressed={ativo}
      className={`radial-reveal rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
        ativo
          ? 'border-orange bg-orange text-white [--rr-fill:var(--color-ink)]'
          : 'border-line text-ink [--rr-fill:var(--color-orange)] hover:text-white'
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Grupo({ children, titulo }) {
  return (
    <div>
      <div className="eyebrow mb-3">{titulo}</div>
      <ul className="m-0 grid list-none gap-2 p-0">{children}</ul>
    </div>
  )
}

/* A amostra tem largura fixa para os rótulos alinharem numa coluna só, e o
   rótulo não quebra: era a quebra longe da amostra que desmanchava a legenda. */
function Item({ amostra, children }) {
  return (
    <li className="flex items-center gap-3 text-[13px] leading-none text-ink-soft">
      <span className="flex w-6 shrink-0 justify-center">{amostra}</span>
      <span className="font-semibold text-ink">{children}</span>
    </li>
  )
}

function Polo() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 18 18" width="18">
      <circle cx="9" cy="9" fill="var(--color-ink)" r="9" />
      <circle cx="9" cy="9" fill="var(--color-paper)" r="3" />
    </svg>
  )
}

function Secundaria() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 18 18" width="18">
      <circle cx="9" cy="9" fill="var(--color-ink)" r="6.5" />
    </svg>
  )
}

function Apoio() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 18 18" width="18">
      <circle
        cx="9"
        cy="9"
        fill="var(--color-paper)"
        r="4.6"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
      />
    </svg>
  )
}

function Via() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 24 18" width="24">
      <rect fill="var(--color-orange)" height="9" rx="4.5" width="24" y="4.5" />
    </svg>
  )
}

function Sentido() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 24 18" width="24">
      <path d="M2 9h14" stroke="var(--color-ink)" strokeWidth="1.6" />
      <path d="M15 5.5 21 9l-6 3.5z" fill="var(--color-ink)" />
    </svg>
  )
}
