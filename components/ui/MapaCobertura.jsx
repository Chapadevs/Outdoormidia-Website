'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import {
  CORREDORES,
  MAPA_H,
  MAPA_W,
  MUNICIPIOS,
  ROTULOS_ESTADO,
  UF_PATHS,
} from '@/lib/mapaCobertura'

/*
 * Mapa de cobertura. Toda a geometria vem pronta de lib/mapaCobertura.js: aqui
 * não se projeta nem se simplifica nada, só se decide o que fica aceso.
 *
 * Duas leituras convivem no mesmo desenho. Onde existe mídia urbana o município
 * inteiro é pintado de laranja; onde o alcance é pela estrada, a cidade vira um
 * ponto sobre o eixo do corredor, em `--ink`. É por isso que o município traz
 * `d` (contorno) ou só `x,y` (ponto), e nunca os dois.
 *
 * O único cálculo em runtime é a colisão dos rótulos, que depende da métrica da
 * fonte e por isso não pode ser assada no arquivo de dados como em MapaRodovias:
 * o solucionador escolhe o lado de cada nome depois que a Poppins carrega.
 */

// A faixa dos estados fora da cobertura. Sai do próprio laranja da marca em vez
// de virar uma cor nova: é o mesmo tom, diluído até virar fundo.
const SEM_COBERTURA = 'color-mix(in srgb, var(--color-orange) 18%, white)'

const REGIOES = {
  cwb: {
    nome: 'Curitiba e Região Metropolitana',
    tipo: 'urbana',
    kicker: 'Mídia urbana · Paraná',
    nota: 'Doze municípios, do centro de Curitiba ao anel metropolitano.',
  },
  joi: {
    nome: 'Joinville',
    tipo: 'urbana',
    kicker: 'Mídia urbana · Santa Catarina',
    nota: 'Maior cidade catarinense e polo industrial do norte do estado.',
  },
  itj: {
    nome: 'Itajaí',
    tipo: 'urbana',
    kicker: 'Mídia urbana · Santa Catarina',
    nota: 'Porto, logística e circulação constante o ano inteiro.',
  },
  bcm: {
    nome: 'Balneário Camboriú',
    tipo: 'urbana',
    kicker: 'Mídia urbana · Santa Catarina',
    nota: 'Turismo de alto padrão e população flutuante na temporada.',
  },
  rod: {
    nome: 'Rodovias',
    tipo: 'rodovia',
    kicker: 'Plataforma Rodovias',
    nota: 'Seis corredores entre o Paraná e Santa Catarina. A marca acompanha o trajeto, sem mídia urbana nestas cidades.',
  },
}

const GERAL = {
  rod: false,
  kicker: 'Paraná e Santa Catarina',
  title: 'Onde a sua marca aparece',
  note: 'Quatro regiões urbanas e seis corredores rodoviários. Toque ou passe o mouse para explorar.',
}

const ehRod = (m) => m.r === 'rod'

const POR_NOME = new Map(MUNICIPIOS.map((m) => [m.n, m]))

// Do maior fluxo para o menor: o nome mais importante escolhe o lado primeiro e
// os menores se acomodam no que sobrou.
const ORDEM_ROTULOS = [...MUNICIPIOS].sort((a, b) => b.f - a.f)

const fonteRotulo = (m) => (m.fx ? (m.f > 100 ? 16 : 13) : 11)
const folgaRotulo = (m) => (m.fx ? 13 : 9) + (ehRod(m) ? 4 : 0)

const colide = (a, b) => !(a.x2 < b.x1 - 2 || a.x1 > b.x2 + 2 || a.y2 < b.y1 - 2 || a.y1 > b.y2 + 2)

const siglas = (lista) => lista.map((c) => c.br).join(', ')

export default function MapaCobertura({ className = '' }) {
  const [travado, setTravado] = useState(null)
  const [hover, setHover] = useState(null)
  const [regiao, setRegiao] = useState(null)
  const [rodovias, setRodovias] = useState(true)
  const [todosNomes, setTodosNomes] = useState(false)

  const rotuloRefs = useRef(new Map())

  useLayoutEffect(() => {
    const posicionar = () => {
      const ocupado = []
      for (const m of ORDEM_ROTULOS) {
        const t = rotuloRefs.current.get(m.n)
        if (!t) continue
        const fs = fonteRotulo(m)
        const gap = folgaRotulo(m)
        const aplicar = (lado) => {
          t.setAttribute('text-anchor', lado === 'l' ? 'end' : lado === 'r' ? 'start' : 'middle')
          t.setAttribute('x', lado === 'l' ? -gap : lado === 'r' ? gap : 0)
          t.setAttribute(
            'y',
            lado === 'b' ? gap + fs * 0.86 : lado === 't' ? -(gap + 2) : fs * 0.34,
          )
          const bb = t.getBBox()
          return {
            x1: m.x + bb.x,
            y1: m.y + bb.y,
            x2: m.x + bb.x + bb.width,
            y2: m.y + bb.y + bb.height,
          }
        }
        const ordem = [m.l, 'r', 'l', 'b', 't'].filter((v, i, a) => a.indexOf(v) === i)
        let melhor = null
        for (const lado of ordem) {
          const caixa = aplicar(lado)
          const conflito = ocupado.reduce((s, p) => s + (colide(caixa, p) ? 1 : 0), 0)
          const fora =
            (caixa.x1 < 8) + (caixa.x2 > MAPA_W - 8) + (caixa.y1 < 8) + (caixa.y2 > MAPA_H - 8)
          const nota = conflito * 10 + fora * 10
          if (!melhor || nota < melhor.nota) melhor = { lado, caixa, nota }
          if (nota === 0) break
        }
        aplicar(melhor.lado)
        ocupado.push(melhor.caixa)
      }
    }
    posicionar()
    // A métrica da Poppins muda a caixa de cada nome, e ela chega depois do
    // primeiro paint: sem a segunda passada os rótulos ficam resolvidos contra
    // a fonte de fallback.
    document.fonts?.ready.then(posicionar)
  }, [])

  /* O hover manda enquanto existe, o clique trava o que estiver aceso e o chip
     vale quando não há nem um nem outro. Sem os três, o mapa fica todo aceso. */
  const foco = useMemo(() => {
    const alvo = travado || hover
    if (alvo?.tipo === 'mun') {
      const m = POR_NOME.get(alvo.id)
      const cors = CORREDORES.filter((c) => c.munis.includes(m.n))
      const rod = ehRod(m)
      return {
        nomes: new Set([m.n]),
        cors: new Set(cors.map((c) => c.id)),
        texto: {
          rod,
          kicker: REGIOES[m.r].kicker,
          title: m.n,
          note: rod
            ? `Alcance pela rodovia: ${siglas(cors)}. Sem mídia urbana nesta cidade.`
            : cors.length
              ? `Mídia urbana. Também atravessada por ${siglas(cors)}.`
              : 'Mídia urbana.',
        },
      }
    }
    if (alvo?.tipo === 'cor') {
      const c = CORREDORES.find((x) => x.id === alvo.id)
      return {
        nomes: new Set(c.munis),
        cors: new Set([c.id]),
        texto: {
          rod: true,
          kicker: 'Plataforma Rodovias',
          title: c.br,
          note: `${c.nome}.`,
        },
      }
    }
    if (regiao) {
      const R = REGIOES[regiao]
      const dentro = MUNICIPIOS.filter((m) => m.r === regiao)
      const cors =
        R.tipo === 'rodovia'
          ? CORREDORES
          : CORREDORES.filter((c) => c.munis.some((n) => dentro.some((m) => m.n === n)))
      return {
        nomes: new Set(dentro.map((m) => m.n)),
        cors: new Set(cors.map((c) => c.id)),
        texto: {
          rod: R.tipo === 'rodovia',
          kicker: R.kicker,
          title: R.nome,
          note: R.nota,
        },
      }
    }
    return { nomes: null, cors: null, texto: GERAL }
  }, [travado, hover, regiao])

  const munAceso = (m) => !foco.nomes || foco.nomes.has(m.n)
  const corAceso = (c) => !foco.cors || foco.cors.has(c.id)
  const rotuloVisivel = (m) => todosNomes || (foco.nomes ? foco.nomes.has(m.n) : !!m.fx)
  const opacidade = (aceso) => ({
    opacity: aceso ? 1 : 0.18,
    transition: 'opacity 200ms ease',
  })

  const entrar = (alvo) => () => {
    if (!travado) setHover(alvo)
  }
  const sair = () => {
    if (!travado) setHover(null)
  }
  const travar = (alvo) => (e) => {
    e.stopPropagation()
    setTravado((cur) => (cur && cur.tipo === alvo.tipo && cur.id === alvo.id ? null : alvo))
    setHover(null)
  }
  const teclado = (alvo) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      travar(alvo)(e)
    }
  }

  const trocarRegiao = (rid) => {
    setTravado(null)
    setHover(null)
    setRegiao((cur) => (cur === rid ? null : rid))
  }

  return (
    <div className={className}>
      <div className="mb-4 rounded-[16px] border border-line bg-white px-[22px] py-5 max-mob:px-4 max-mob:py-4">
        <p className="m-0 mb-3.5 flex flex-wrap items-baseline gap-2.5">
          <strong className="eyebrow text-ink">Filtrar por categoria</strong>
          <span className="text-[12.5px] text-ink-soft">combine mídia urbana e rodovias</span>
        </p>

        <div className="flex flex-wrap gap-2">
          <Chip ativo={regiao === null} onClick={() => trocarRegiao(null)}>
            Toda a rede
          </Chip>
          {Object.entries(REGIOES).map(([rid, r]) => (
            <Chip
              ativo={regiao === rid}
              escura={r.tipo === 'rodovia'}
              key={rid}
              onClick={() => trocarRegiao(rid)}
            >
              {r.nome}
            </Chip>
          ))}
        </div>

        <div className="mt-[18px] flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4">
          <div className="flex flex-wrap gap-x-[22px] gap-y-2 text-[12.5px] text-ink-soft">
            <Legenda
              amostra={<i className="block h-[13px] w-[18px] rounded-[3px] bg-orange" />}
              forte
            >
              Mídia urbana
            </Legenda>
            <Legenda
              amostra={
                <svg aria-hidden="true" height="14" viewBox="0 0 24 14" width="24">
                  <rect fill="var(--color-ink)" height="5" rx="2.5" width="18" x="0" y="4.5" />
                  <circle
                    cx="17"
                    cy="7"
                    fill="var(--color-ink)"
                    r="5.5"
                    stroke="white"
                    strokeWidth="2.5"
                  />
                </svg>
              }
              forte
            >
              Plataforma Rodovias
            </Legenda>
            <Legenda
              amostra={
                <i
                  className="block h-[13px] w-[18px] rounded-[3px]"
                  style={{ background: SEM_COBERTURA }}
                />
              }
            >
              Sem cobertura
            </Legenda>
          </div>

          <div className="ml-auto flex flex-wrap gap-2 max-tab:ml-0">
            <Switch ativo={rodovias} onClick={() => setRodovias((v) => !v)}>
              Rodovias
            </Switch>
            <Switch ativo={todosNomes} onClick={() => setTodosNomes((v) => !v)}>
              Todos os nomes
            </Switch>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[16px] border border-line bg-white p-2">
        <div
          aria-live="polite"
          className="pointer-events-none absolute bottom-[30px] left-[26px] z-10 w-[min(48%,320px)] max-tab:static max-tab:w-auto max-tab:px-3.5 max-tab:pb-2.5 max-tab:pt-3.5"
        >
          <div
            className="mb-[11px] h-[3px] w-[34px] rounded-sm max-tab:mb-2.5"
            style={{
              background: foco.texto.rod ? 'var(--color-ink)' : 'var(--color-orange)',
              transition: 'background 180ms ease',
            }}
          />
          <p
            className="m-0 mb-[3px] text-[10.5px] font-bold uppercase tracking-[0.12em]"
            style={{
              color: foco.texto.rod ? 'var(--color-ink)' : 'var(--color-orange)',
              transition: 'color 180ms ease',
            }}
          >
            {foco.texto.kicker}
          </p>
          <p className="m-0 text-[23px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink max-tab:text-[19px]">
            {foco.texto.title}
          </p>
          <p className="m-0 mt-[7px] text-[12.5px] leading-[1.45] text-ink-soft">
            {foco.texto.note}
          </p>
        </div>

        <svg
          aria-label="Mapa de cobertura da Outdoormídia no Paraná e em Santa Catarina"
          className="block h-auto w-full"
          onClick={() => setTravado(null)}
          role="img"
          viewBox={`0 0 ${MAPA_W} ${MAPA_H}`}
        >
          <rect fill="white" height={MAPA_H} width={MAPA_W} />

          <g>
            {Object.entries(UF_PATHS).map(([uf, d]) => (
              <path d={d} fill={SEM_COBERTURA} key={uf} />
            ))}
          </g>

          <g>
            {MUNICIPIOS.filter((m) => m.d).map((m) => (
              <path
                aria-label={m.n}
                className="cursor-pointer outline-none"
                d={m.d}
                fill={ehRod(m) ? 'var(--color-ink)' : 'var(--color-orange)'}
                key={m.n}
                onBlur={sair}
                onClick={travar({ tipo: 'mun', id: m.n })}
                onFocus={entrar({ tipo: 'mun', id: m.n })}
                onKeyDown={teclado({ tipo: 'mun', id: m.n })}
                onMouseEnter={entrar({ tipo: 'mun', id: m.n })}
                onMouseLeave={sair}
                role="button"
                stroke="white"
                strokeLinejoin="round"
                strokeWidth="1.1"
                style={opacidade(munAceso(m))}
                tabIndex={0}
              >
                <title>{`${m.n} · ${REGIOES[m.r].nome}`}</title>
              </path>
            ))}
          </g>

          <g>
            {Object.entries(UF_PATHS).map(([uf, d]) => (
              <path
                d={d}
                fill="none"
                key={uf}
                stroke="var(--color-orange)"
                strokeLinejoin="round"
                strokeOpacity="0.32"
                strokeWidth="1.4"
              />
            ))}
          </g>

          <g
            style={{
              opacity: rodovias ? 1 : 0,
              transition: 'opacity 220ms ease',
            }}
          >
            {CORREDORES.map((c) => (
              <g key={c.id} style={opacidade(corAceso(c))}>
                <path
                  d={c.d}
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8.4"
                />
                <path
                  d={c.d}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5.2"
                />
              </g>
            ))}
          </g>

          <g
            style={{
              opacity: rodovias ? 1 : 0,
              transition: 'opacity 220ms ease',
            }}
          >
            {CORREDORES.filter((c) => !c.nb).map((c) => (
              <g
                key={c.id}
                style={opacidade(corAceso(c))}
                transform={`translate(${c.bx},${c.by}) rotate(${c.ba}) translate(0,${c.off})`}
              >
                <rect
                  fill="var(--color-ink)"
                  height="23"
                  rx="11.5"
                  width={c.br.length * 8.2 + 18}
                  x={-(c.br.length * 8.2 + 18) / 2}
                  y="-11.5"
                />
                <text
                  fill="white"
                  fontSize="12"
                  fontWeight="800"
                  letterSpacing="0.03em"
                  textAnchor="middle"
                  y="4.5"
                >
                  {c.br}
                </text>
              </g>
            ))}
          </g>

          <g>
            {MUNICIPIOS.filter((m) => !m.d).map((m) => (
              <g
                aria-label={m.n}
                className="cursor-pointer outline-none"
                key={m.n}
                onBlur={sair}
                onClick={travar({ tipo: 'mun', id: m.n })}
                onFocus={entrar({ tipo: 'mun', id: m.n })}
                onKeyDown={teclado({ tipo: 'mun', id: m.n })}
                onMouseEnter={entrar({ tipo: 'mun', id: m.n })}
                onMouseLeave={sair}
                role="button"
                style={opacidade(munAceso(m))}
                tabIndex={0}
                transform={`translate(${m.x},${m.y})`}
              >
                <title>{`${m.n} · ${REGIOES[m.r].nome}`}</title>
                <circle fill="white" r={(m.fx ? 5 : 3.2) + 2.6} />
                <circle fill="var(--color-ink)" r={m.fx ? 5 : 3.2} />
              </g>
            ))}
          </g>

          <g className="pointer-events-none select-none">
            {ORDEM_ROTULOS.map((m) => (
              <g
                key={m.n}
                style={{
                  opacity: rotuloVisivel(m) ? 1 : 0,
                  transition: 'opacity 200ms ease',
                }}
                transform={`translate(${m.x},${m.y})`}
              >
                {!ehRod(m) && <circle fill="white" r={m.fx ? 3.6 : 2.6} />}
                <text
                  fill="var(--color-ink)"
                  fontSize={fonteRotulo(m)}
                  fontWeight={m.fx ? 800 : 700}
                  letterSpacing={m.fx ? '0.01em' : '0.03em'}
                  ref={(el) => {
                    if (el) rotuloRefs.current.set(m.n, el)
                    else rotuloRefs.current.delete(m.n)
                  }}
                  stroke="white"
                  strokeLinejoin="round"
                  strokeWidth="4.2"
                  style={{ paintOrder: 'stroke' }}
                >
                  {m.n.toUpperCase()}
                </text>
              </g>
            ))}
          </g>

          {/* A faixa de clique dos corredores mora acima do desenho, com 24 de
              traço, porque o núcleo de 5,2 é fino demais para o ponteiro. Ela
              some junto com as rodovias: linha invisível que ainda responde ao
              mouse é armadilha. */}
          <g style={{ pointerEvents: rodovias ? 'auto' : 'none' }}>
            {CORREDORES.map((c) => (
              <path
                aria-label={`${c.br} · ${c.nome}`}
                className="cursor-pointer outline-none"
                d={c.d}
                fill="none"
                key={c.id}
                onBlur={sair}
                onClick={travar({ tipo: 'cor', id: c.id })}
                onFocus={entrar({ tipo: 'cor', id: c.id })}
                onKeyDown={teclado({ tipo: 'cor', id: c.id })}
                onMouseEnter={entrar({ tipo: 'cor', id: c.id })}
                onMouseLeave={sair}
                role="button"
                stroke="transparent"
                strokeWidth="24"
                tabIndex={rodovias ? 0 : -1}
              >
                <title>{`${c.br} · ${c.nome}`}</title>
              </path>
            ))}
          </g>

          <g className="pointer-events-none select-none">
            {ROTULOS_ESTADO.map((e) => (
              <text
                fill="var(--color-orange)"
                fontSize="14"
                fontWeight="800"
                key={e.t}
                letterSpacing="0.2em"
                opacity="0.5"
                x={e.x}
                y={e.y}
              >
                {e.t}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

function Chip({ ativo, children, escura = false, onClick }) {
  return (
    <button
      aria-pressed={ativo}
      className={`radial-reveal rounded-full border px-[17px] py-[9px] text-[13px] font-semibold whitespace-nowrap transition-colors ${
        ativo
          ? escura
            ? 'border-ink bg-ink text-white [--rr-fill:var(--color-orange)]'
            : 'border-orange bg-orange text-white [--rr-fill:var(--color-ink)]'
          : 'border-line text-ink [--rr-fill:var(--color-orange)] hover:text-white'
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Switch({ ativo, children, onClick }) {
  return (
    <button
      aria-pressed={ativo}
      className={`radial-reveal inline-flex items-center gap-2.5 rounded-full border py-[7px] pl-[11px] pr-3.5 text-[12.5px] font-semibold transition-colors [--rr-fill:var(--color-orange)] hover:text-white ${
        ativo ? 'border-orange text-ink' : 'border-line text-ink-soft'
      }`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
          ativo ? 'border-orange bg-orange text-white' : 'border-line bg-paper text-transparent'
        }`}
      >
        <Check size={11} strokeWidth={3} />
      </span>
      {children}
    </button>
  )
}

function Legenda({ amostra, children, forte = false }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      {amostra}
      {forte ? <b className="font-semibold text-ink">{children}</b> : children}
    </span>
  )
}
