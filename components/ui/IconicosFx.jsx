'use client'

import { useTranslations } from 'next-intl'

// A vida de cada linha dos Icônicos em cima da foto da faixa laranja. Green
// cresce cipó e folha em volta da moldura, Regenerativo revela o depois por
// trás de ladrilhos em preto e branco, Elegancy varre luz pela foto.
//
// O `SlideStage` entra como `children` e continua sendo quem mostra a foto;
// em volta dele vão três camadas: `fundo` (atrás da moldura: halo, raios,
// cone), `frente` (por cima: cipó, folha, estrela, e um recorte com a mesma
// moldura arredondada para o que precisa ficar dentro da foto) e a legenda
// abaixo, quando a linha tem uma. Foto e camadas moram num `isolate` próprio,
// para a legenda não entrar na conta de `inset-0` das camadas.
//
// Decorativo: `aria-hidden` e `pointer-events-none`, e some inteiro em
// `prefers-reduced-motion`, porque sem a animação o cipó por desenhar e a
// folha por brotar ficariam invisíveis ou parados no meio do caminho.
//
// Quem monta o componente é `Iconicos`, com `key={active}`: cada troca de aba
// remonta a camada e roda de novo as entradas (cipó, folha, moldura).
//
// Os verdes e os brancos quentes são do desenho aprovado, não da paleta: são
// a cor da vegetação e da luz que cada linha vende, como o verde da placa no
// mapa de Rodovias.

// A foto de cada linha recebe um movimento próprio, aplicado pelo `SlideStage`
// na própria imagem, para o Ken Burns e o brilho do Elegancy andarem junto
// com o deslize entre slides.
export const CLASSE_IMAGEM = {
  green: 'motion-safe:animate-ken-burns',
  elegancy: 'motion-safe:animate-luz-elegancy',
}

const VERDES = [
  ['#a3d861', '#2c7330'],
  ['#8ecb4a', '#357f36'],
  ['#7dbf3f', '#2f7d32'],
  ['#b7e276', '#3c8a30'],
  ['#6fb23c', '#245c27'],
]

// As folhas brotam ao longo do cipó desenhado: borda de cima, direita, de
// baixo, esquerda e as gavinhas de dentro, nessa ordem. Tudo determinístico,
// calculado uma vez: nenhuma folha muda de lugar entre um render e outro.
const TRILHA_CIPO = (() => {
  const p = []
  for (let k = 0; k <= 10; k++) p.push([-6 + k * 10.4, -8])
  for (let k = 1; k <= 6; k++) p.push([104, -6 + k * 17])
  for (let k = 0; k <= 9; k++) p.push([100 - k * 10.6, 100])
  for (let k = 1; k <= 6; k++) p.push([-6, 100 - k * 17])
  p.push([12, 74], [18, 56], [30, 44], [84, 30], [76, 48], [64, 62], [40, 84], [52, 22])
  return p
})()

const DENSIDADE_FOLHAS = 34

const QUANTIDADE_FOLHAS = Math.min(
  DENSIDADE_FOLHAS,
  TRILHA_CIPO.length,
)

const FOLHAS = Array.from(
  { length: QUANTIDADE_FOLHAS },
  (_, n) => {
    const p =
      TRILHA_CIPO[
        Math.floor((n * TRILHA_CIPO.length) / QUANTIDADE_FOLHAS)
      ]

    const [claro, escuro] = VERDES[n % VERDES.length]

    return {
      claro,
      escuro,
      left: p[0],
      top: p[1],
      tamanho: 22 + ((n * 37) % 34),
      giro: ((n * 71) % 360) - 180,
      atraso: (0.25 + n * 0.055).toFixed(2),
      balanco: (3.8 + (n % 7) * 0.35).toFixed(2),
      atrasoBalanco: (n * 0.17).toFixed(2),
    }
  },
)

const FOLHAS_CAINDO = ['#a3d861', '#8ecb4a', '#c9ee9c', '#7dbf3f', '#b7e276', '#95d152'].map((cor, n) => ({
  cor,
  left: 6 + n * 16,
  tamanho: 14 + (n % 3) * 7,
  duracao: (7 + n * 0.9).toFixed(1),
  atraso: (n * 1.6).toFixed(1),
}))

const ESPOROS = [
  { left: 24, tamanho: 7, cor: '#dff3c4', brilho: 'rgba(200,240,160,.7)', atraso: 1.8 },
  { left: 52, tamanho: 5, cor: '#ffffff', brilho: 'rgba(255,255,255,.6)', atraso: 3.2 },
  { left: 74, tamanho: 6, cor: '#c9ee9c', brilho: 'rgba(190,235,150,.6)', atraso: 4.6 },
]

const CIPOS = [
  { d: 'M6 296 C6 200 10 120 8 20 C60 10 140 6 200 5 C270 4 340 8 394 6', cor: '#2f7d32', largura: 5, duracao: 2.6, atraso: 0.1 },
  { d: 'M394 6 C392 90 396 200 394 294 C320 298 220 296 140 297 C90 298 40 297 8 296', cor: '#4a9632', largura: 4, duracao: 2.6, atraso: 0.5 },
  { d: 'M8 240 C50 232 70 200 64 170 C58 142 78 126 104 128', cor: '#6fb23c', largura: 3, duracao: 2, atraso: 1.2 },
  { d: 'M394 80 C352 88 336 116 344 146 C352 176 330 192 302 188', cor: '#6fb23c', largura: 3, duracao: 2, atraso: 1.5 },
  { d: 'M150 298 C152 262 176 246 206 250 C236 254 254 240 256 214', cor: '#6fb23c', largura: 3, duracao: 2, atraso: 1.8 },
]

// A foto em preto e branco, em 6 × 4 ladrilhos que viram e somem para
// revelar a colorida por trás: é o antes → depois da requalificação.
const COLUNAS = 6
const LINHAS = 4
const LADRILHOS = Array.from({ length: COLUNAS * LINHAS }, (_, n) => {
  const c = n % COLUNAS
  const r = Math.floor(n / COLUNAS)
  return {
    left: (c * 100) / COLUNAS,
    top: (r * 100) / LINHAS,
    posicao: `${(c * 100) / (COLUNAS - 1)}% ${(r * 100) / (LINHAS - 1)}%`,
    atraso: ((c + r) * 0.075).toFixed(3),
  }
})

const ARVORES = [
  { tronco: 'M70 300 C70 262 66 240 58 222', largura: 6, origem: '58px 214px', atraso: 0.2, copas: [[58, 214, 30, '#2f7d32'], [38, 226, 20, '#4a9632'], [78, 224, 22, '#3c8a30']] },
  { tronco: 'M200 300 C200 250 196 220 190 196', largura: 7, origem: '190px 188px', atraso: 0.45, copas: [[190, 188, 38, '#2f7d32'], [163, 202, 24, '#4a9632'], [217, 200, 26, '#3c8a30']] },
  { tronco: 'M330 300 C330 268 334 246 340 230', largura: 5, origem: '340px 224px', atraso: 0.7, copas: [[340, 224, 26, '#3c8a30'], [322, 234, 17, '#4a9632'], [358, 234, 19, '#2f7d32']] },
]

const ONDAS = [
  { cor: 'rgba(255,255,255,.55)', largura: 2, atraso: 0.8 },
  { cor: 'rgba(163,216,97,.7)', largura: 2, atraso: 2 },
  { cor: 'rgba(255,255,255,.4)', largura: 1, atraso: 3.1 },
]

const PARTICULAS = [
  { left: 16, tamanho: 8, cor: '#b8e08a', atraso: 1 },
  { left: 36, tamanho: 6, cor: '#ffffff', atraso: 2.1 },
  { left: 60, tamanho: 9, cor: '#9ed46f', atraso: 3 },
  { left: 84, tamanho: 6, cor: '#e8f7d6', atraso: 3.9 },
]

const ORBES = [
  { tamanho: 90, cor: 'rgba(255,246,228,.85)', atraso: 0.4 },
  { tamanho: 38, cor: 'rgba(210,232,255,.8)', atraso: 0.62 },
  { tamanho: 20, cor: 'rgba(255,226,180,.9)', atraso: 0.82 },
]

const ESTRELAS = [[-4, 18], [22, -7], [58, -5], [96, 34], [102, 70], [72, 103], [34, 104], [-5, 66], [12, 88], [88, 12]].map(
  ([left, top], n) => ({
    left,
    top,
    tamanho: 12 + ((n * 5) % 14),
    duracao: (3 + (n % 5) * 0.6).toFixed(1),
    atraso: (n * 0.43).toFixed(2),
  }),
)

const RAIOS =
  'conic-gradient(from 0deg, rgba(255,255,255,.34) 0deg 7deg, rgba(255,255,255,0) 7deg 44deg, rgba(255,244,225,.26) 44deg 50deg, rgba(255,255,255,0) 50deg 118deg, rgba(255,255,255,.3) 118deg 124deg, rgba(255,255,255,0) 124deg 214deg, rgba(255,244,225,.22) 214deg 220deg, rgba(255,255,255,0) 220deg 296deg, rgba(255,255,255,.18) 296deg 301deg, rgba(255,255,255,0) 301deg 360deg)'

const FOLHA = 'M50 98 C4 72 2 22 50 2 C98 22 96 72 50 98 Z'
const ESTRELA = 'M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0 Z'

const FUNDO = 'pointer-events-none absolute inset-0 z-0 motion-safe:animate-surge motion-reduce:hidden'
const FRENTE = 'pointer-events-none absolute inset-0 z-[2] motion-safe:animate-surge motion-reduce:hidden'
// O recorte repete a moldura do `SlideStage`: o que anima por dentro da foto
// precisa ser cortado pelos mesmos cantos arredondados.
const RECORTE = 'absolute inset-0 overflow-hidden rounded-[16px]'

function Green() {
  return (
    <>
      <div aria-hidden="true" className={FUNDO}>
        <div
          className="absolute -inset-10 rounded-[34px] motion-safe:animate-halo-verde"
          style={{ background: 'radial-gradient(58% 58% at 50% 60%, rgba(74,150,50,.62), rgba(74,150,50,0) 72%)' }}
        />
      </div>

      <div aria-hidden="true" className={FRENTE}>
        <div className={RECORTE}>
          <div
            className="absolute inset-0 motion-safe:animate-tinge-verde"
            style={{ background: 'linear-gradient(120deg, rgba(30,95,32,.88), rgba(120,190,70,.32) 55%, rgba(30,95,32,0) 80%)' }}
          />
          <div
            className="absolute inset-y-0 left-0 w-[38%] mix-blend-soft-light motion-safe:animate-varre-verde"
            style={{ background: 'linear-gradient(90deg, rgba(160,220,110,0), rgba(190,240,140,.55), rgba(160,220,110,0))' }}
          />
        </div>

        <svg
          className="absolute -inset-[26px] size-[calc(100%+52px)] overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 400 300"
        >
          {CIPOS.map((c) => (
            <path
              className="motion-safe:animate-traca-cipo"
              d={c.d}
              fill="none"
              key={c.d}
              pathLength="1000"
              stroke={c.cor}
              strokeDasharray="1000"
              strokeLinecap="round"
              strokeWidth={c.largura}
              style={{ animationDuration: `${c.duracao}s`, animationDelay: `${c.atraso}s` }}
            />
          ))}
        </svg>

        {FOLHAS.map((f, n) => (
          <div
            className="absolute z-[2] origin-bottom motion-safe:animate-brota-folha"
            key={n}
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.tamanho,
              height: f.tamanho,
              marginLeft: -f.tamanho / 2,
              marginTop: -f.tamanho / 2,
              animationDelay: `${f.atraso}s`,
            }}
          >
            <div
              className="size-full origin-bottom motion-safe:animate-balanca"
              style={{ animationDuration: `${f.balanco}s`, animationDelay: `${f.atrasoBalanco}s` }}
            >
              <svg
                className="block size-full overflow-visible origin-bottom drop-shadow-[0_6px_12px_rgba(18,52,18,.32)]"
                style={{ transform: `rotate(${f.giro}deg)` }}
                viewBox="0 0 100 100"
              >
                <path d={FOLHA} fill={f.claro} />
                <path d="M50 98 C50 62 50 30 50 2" fill="none" opacity="0.5" stroke={f.escuro} strokeLinecap="round" strokeWidth="3.5" />
                <path
                  d="M50 74 C34 64 26 54 20 43 M50 74 C66 64 74 54 80 43 M50 50 C38 43 32 36 28 28 M50 50 C62 43 68 36 72 28"
                  fill="none"
                  opacity="0.38"
                  stroke={f.escuro}
                  strokeLinecap="round"
                  strokeWidth="2.4"
                />
              </svg>
            </div>
          </div>
        ))}

        {FOLHAS_CAINDO.map((f) => (
          <div
            className="absolute -top-[6%] z-[3] opacity-0 motion-safe:animate-cai-folha"
            key={f.cor}
            style={{
              left: `${f.left}%`,
              width: f.tamanho,
              height: f.tamanho,
              animationDuration: `${f.duracao}s`,
              animationDelay: `${f.atraso}s`,
            }}
          >
            <svg className="block size-full" viewBox="0 0 100 100">
              <path d={FOLHA} fill={f.cor} opacity="0.9" />
            </svg>
          </div>
        ))}

        {ESPOROS.map((e) => (
          <div
            className="absolute bottom-0 rounded-full motion-safe:animate-esporo"
            key={e.left}
            style={{
              left: `${e.left}%`,
              width: e.tamanho,
              height: e.tamanho,
              background: e.cor,
              boxShadow: `0 0 12px 3px ${e.brilho}`,
              animationDelay: `${e.atraso}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

function Regenerativo({ src }) {
  return (
    <div aria-hidden="true" className={FRENTE}>
      <div className={`${RECORTE} [perspective:900px]`}>
        {LADRILHOS.map((l) => (
          <div
            className="absolute origin-top [backface-visibility:hidden] motion-safe:animate-vira-ladrilho"
            key={`${l.left}-${l.top}`}
            style={{
              left: `${l.left}%`,
              top: `${l.top}%`,
              width: `${100 / COLUNAS}%`,
              height: `${100 / LINHAS}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${COLUNAS * 100}% ${LINHAS * 100}%`,
              backgroundPosition: l.posicao,
              filter: 'grayscale(1) brightness(.44) contrast(.92)',
              animationDelay: `${l.atraso}s`,
            }}
          />
        ))}

        <div
          className="absolute inset-0 motion-safe:animate-brilha-grade"
          style={{
            backgroundImage:
              'linear-gradient(rgba(180,230,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(180,230,255,.5) 1px, transparent 1px)',
            backgroundSize: `${100 / COLUNAS}% ${100 / LINHAS}%`,
          }}
        />

        <div className="absolute inset-0 motion-safe:animate-barra-scan">
          <div
            className="absolute -inset-y-[6%] -left-[10%] -ml-[75px] w-[150px] mix-blend-screen"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.95), rgba(190,235,150,.5), rgba(255,255,255,0))' }}
          />
        </div>

        <svg className="absolute inset-0 size-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 300">
          {ARVORES.map((a) => (
            <g key={a.tronco}>
              <path
                className="motion-safe:animate-traca-tronco"
                d={a.tronco}
                fill="none"
                pathLength="300"
                stroke="#5b3a20"
                strokeDasharray="300"
                strokeLinecap="round"
                strokeWidth={a.largura}
                style={{ animationDelay: `${a.atraso}s` }}
              />
              <g
                className="motion-safe:animate-brota-copa"
                style={{ transformOrigin: a.origem, animationDelay: `${a.atraso}s` }}
              >
                {a.copas.map(([cx, cy, r, cor]) => (
                  <circle cx={cx} cy={cy} fill={cor} key={`${cx}-${cy}`} opacity="0.95" r={r} />
                ))}
              </g>
            </g>
          ))}
        </svg>

        {ONDAS.map((o) => (
          <div
            className="absolute left-1/2 top-[58%] -ml-[120px] -mt-[120px] size-[240px] rounded-full motion-safe:animate-ondula"
            key={o.atraso}
            style={{ border: `${o.largura}px solid ${o.cor}`, animationDelay: `${o.atraso}s` }}
          />
        ))}

        {PARTICULAS.map((p) => (
          <div
            className="absolute bottom-0 rounded-full motion-safe:animate-sobe-particula"
            key={p.left}
            style={{ left: `${p.left}%`, width: p.tamanho, height: p.tamanho, background: p.cor, animationDelay: `${p.atraso}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function Elegancy() {
  return (
    <>
      <div aria-hidden="true" className={FUNDO}>
        <div className="absolute -inset-20 overflow-hidden opacity-55">
          <div
            className="absolute left-1/2 top-1/2 -ml-[500px] -mt-[500px] size-[1000px] motion-safe:animate-gira-raios"
            style={{ background: RAIOS }}
          />
        </div>
        <div className="absolute inset-x-[8%] -bottom-10 -top-[120px] origin-top motion-safe:animate-varre-cone">
          <div
            className="absolute inset-0 blur-[6px] [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)]"
            style={{ background: 'linear-gradient(180deg, rgba(255,248,232,.55), rgba(255,248,232,0) 78%)' }}
          />
        </div>
        <div
          className="absolute -inset-[30px] rounded-[30px] motion-safe:animate-floresce"
          style={{ background: 'radial-gradient(55% 55% at 50% 45%, rgba(255,238,205,.8), rgba(255,238,205,0) 72%)' }}
        />
      </div>

      <div aria-hidden="true" className={FRENTE}>
        <div className={`${RECORTE} shadow-[0_0_0_1px_rgba(255,255,255,.3)]`}>
          <div
            className="absolute -inset-y-1/4 w-[22%] mix-blend-screen motion-safe:animate-reflexo"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.95), rgba(255,255,255,0))' }}
          />
          <div
            className="absolute inset-x-0 top-[44%] h-[3px] origin-center blur-[1px] motion-safe:animate-clarao"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(215,235,255,.95) 45%, rgba(255,240,210,.9) 55%, rgba(255,255,255,0))' }}
          />
          {ORBES.map((o) => (
            <div
              className="absolute left-1/2 top-1/2 rounded-full mix-blend-screen motion-safe:animate-orbe"
              key={o.tamanho}
              style={{
                width: o.tamanho,
                height: o.tamanho,
                marginLeft: -o.tamanho / 2,
                marginTop: -o.tamanho / 2,
                background: `radial-gradient(circle, ${o.cor}, transparent 70%)`,
                animationDelay: `${o.atraso}s`,
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(72% 52% at 30% 18%, rgba(255,246,228,.4), rgba(255,246,228,0) 66%)' }}
          />
          <div className="absolute inset-1.5 rounded-[10px] border border-white/55 motion-safe:animate-traca-moldura" />
        </div>

        {ESTRELAS.map((e) => (
          <div
            className="absolute z-[3] drop-shadow-[0_0_8px_rgba(255,246,228,.95)] motion-safe:animate-cintila"
            key={`${e.left}-${e.top}`}
            style={{
              left: `${e.left}%`,
              top: `${e.top}%`,
              width: e.tamanho,
              height: e.tamanho,
              marginLeft: -e.tamanho / 2,
              marginTop: -e.tamanho / 2,
              animationDuration: `${e.duracao}s`,
              animationDelay: `${e.atraso}s`,
            }}
          >
            <svg className="block size-full" viewBox="0 0 100 100">
              <path d={ESTRELA} fill="#ffffff" />
            </svg>
          </div>
        ))}
      </div>
    </>
  )
}

// A legenda abaixo da foto, nas duas linhas que têm uma. Vive fora do
// `isolate` das camadas, para não entrar na conta do `inset-0` delas.
function Legenda({ slug, texto }) {
  if (slug === 'regenerativo') {
    return (
      <div className="mt-[22px] flex items-center gap-3.5">
        <span className="eyebrow inline-flex items-center gap-2 text-white">
          <span className="size-2 rounded-full bg-white motion-safe:animate-pulsa-anel" />
          {texto}
        </span>
        <span className="h-0.5 flex-1 origin-left bg-white/70 motion-safe:animate-traca-linha" />
      </div>
    )
  }
  if (slug === 'elegancy') {
    return (
      <div className="mt-[22px] flex items-center gap-3.5">
        <span className="eyebrow text-white motion-safe:animate-respira">{texto}</span>
        <span className="h-px flex-1 origin-left bg-white/60 motion-safe:animate-traca-linha" />
      </div>
    )
  }
  return null
}

// `slug` é a linha aberta; `src` é a foto dela, que o Regenerativo repete em
// preto e branco nos ladrilhos. Com `slug` nulo sobe só a foto, sem camada.
//
// A foto (`children`) fica sempre no mesmo lugar da árvore, e é a camada que
// troca de tipo com o slug: é o que remonta cipó, folha e moldura a cada aba
// sem remontar o `SlideStage`, que precisa seguir vivo para deslizar.
export default function IconicosFx({ slug, src, children }) {
  const t = useTranslations('Iconicos')

  const camadas =
    slug === 'green' ? (
      <Green />
    ) : slug === 'regenerativo' ? (
      <Regenerativo src={src} />
    ) : slug === 'elegancy' ? (
      <Elegancy />
    ) : null

  const texto =
    slug === 'regenerativo'
      ? t('legendaRegenerativo')
      : slug === 'elegancy'
        ? t('legendaElegancy')
        : null

  return (
    <>
      <div className="relative isolate">
        {children}
        {camadas}
      </div>
      <Legenda key={slug} slug={slug} texto={texto} />
    </>
  )
}
