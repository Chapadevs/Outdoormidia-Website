'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Coverflow from '@/components/ui/Coverflow'
import SectionHeading from '@/components/ui/SectionHeading'

// Depoimentos reais, na redação oficial do cliente (COPY_SITE).
//
// TODO(cliente): confirmar a autorização de uso de nome, cargo e marca dos três
// depoentes antes de publicar — são pessoas e empresas identificáveis.
//
// Os três vídeos entraram em `public/media/cases-videos/`, nomeados pelo
// depoente. A duração medida de cada arquivo bate exata com a que o card já
// declarava (Claro 00:45 · Diretor Verbal 01:00 · Cia do Pastel 01:27),
// confirmando o pareamento.
//
// `capa` é um frame extraído do próprio vídeo (`ffmpeg -ss … scale=600:-1`,
// arquivo `<nome>-capa.webp` ao lado do `.mp4`), não uma foto separada do
// cliente: os três vídeos trazem legenda queimada do início ao fim, sem
// nenhum trecho limpo, então o frame escolhido é o de melhor enquadramento
// (olhos abertos, sem cartela de abertura) com a legenda mais curta possível
// naquele instante — ela fica escondida sob o gradiente e a citação do
// próprio card. Trocar por capa oficial do cliente é upgrade, não bloqueio.
//
// TODO(cliente): o card do Auto Shopping Curitiba cita um case que ainda não
// tem página (/cases/[slug] não existe, só a listagem). Enquanto não existir, o
// contexto entra como texto, sem link.
//
// O card 03 não é citação: é título editorial, e por isso vem sem aspas e sem o
// glifo de abertura. Entre aspas e com o nome embaixo viraria fala fabricada.
const REVIEWS = [
  {
    quote: 'A principal vantagem que a gente vê neste tipo de campanha é a mensuração.',
    name: 'Guilherme Heimbecher',
    role: 'Especialista de Marketing · Claro',
    duracao: '00:45',
    video: '/media/cases-videos/claro.mp4',
    capa: '/media/cases-videos/claro-capa.webp',
  },
  {
    quote:
      'Nos trouxe não só o sucesso completo da campanha, mas o recorde de vendas em um único final de semana.',
    name: 'Claudio Ceará',
    role: 'Diretor · Agência Verbal',
    contexto: 'Case: Auto Shopping Curitiba',
    duracao: '01:00',
    video: '/media/cases-videos/diretor-verbal.mp4',
    capa: '/media/cases-videos/diretor-verbal-capa.webp',
  },
  {
    titulo: 'Quando o bairro inteiro passa a conhecer sua marca',
    name: 'Mônica Kachel',
    role: 'Proprietária · Cia do Pastel',
    duracao: '01:27',
    video: '/media/cases-videos/cia-do-pastel.mp4',
    capa: '/media/cases-videos/cia-do-pastel-capa.webp',
  },
]

function Play() {
  return (
    <span
      aria-hidden="true"
      className="grid size-16 place-items-center rounded-full bg-orange text-white shadow-[0_8px_24px_-8px_rgba(22,17,13,.6)] transition-transform duration-200 group-hover:scale-110"
    >
      <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5.14v13.72L19 12 8 5.14Z" />
      </svg>
    </span>
  )
}

export default function Reviews() {
  const [aberto, setAberto] = useState(null)

  useEffect(() => {
    if (!aberto) return
    const onKeyDown = (e) => e.key === 'Escape' && setAberto(null)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <section className="pb-[110px] pt-[48px] max-mob:pb-[72px] max-mob:pt-[32px]" id="depoimentos">
      {/* Composição centralizada: sem a linha do `SectionHeading`, que só faz
          sentido puxando o olho para a direita. O "Arraste →" saiu junto — era
          um elemento à direita brigando com o eixo central, e o cursor de
          arrasto mais os dots já dizem que a faixa anda. */}
      <div className="wrap text-center">
        <SectionHeading className="reveal justify-center" rule={false} title="O que dizem" />
        <p className="eyebrow reveal mt-4 text-orange">Histórias de sucesso na prática</p>
        <p className="reveal mx-auto mb-9 mt-3 max-w-[46ch] text-base text-ink-soft">
          De quem anuncia pela primeira vez a quem gerencia grandes marcas, a experiência de quem já
          colocou sua mensagem nas ruas do Sul do Brasil.
        </p>
      </div>
      <div className="wrap">
        <Coverflow
          // Abre no card 02: é o único com case associado, e é o depoimento
          // mais forte dos três.
          gap={22}
          inicial={1}
          label="Depoimentos de clientes"
          labels={REVIEWS.map((r) => r.name)}
          rotulo="depoimento"
          width="clamp(228px,70vw,290px)"
        >
          {REVIEWS.map((r) => {
            const texto = r.quote ? `“${r.quote}”` : r.titulo

            return (
              <figure className="m-0 flex w-full flex-col gap-4" key={r.name}>
                <div className="ticks group relative aspect-[9/16] w-full overflow-hidden rounded-[16px] border border-line bg-bone">
                  {r.capa ? (
                    <Image
                      alt={`${r.name}, ${r.role}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 560px) 70vw, 290px"
                      src={r.capa}
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                      {r.name}
                    </span>
                  )}

                  {/* Sem `backdrop-blur`: dentro de um card que gira e muda de
                      opacidade a cada frame, o desfoque de fundo obriga o
                      compositor a refazer a camada inteira junto, e é o que
                      derruba os frames do coverflow. O ink/70 já sustenta a
                      leitura sobre a foto. */}
                  <span className="absolute right-3 top-3 z-[3] rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] font-bold tabular-nums text-white">
                    {r.duracao}
                  </span>

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(22,17,13,.88)_0%,rgba(22,17,13,.55)_45%,rgba(22,17,13,0)_100%)]" />

                  <blockquote className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] m-0 p-6 text-[16px] font-semibold leading-snug text-white max-mob:p-5">
                    {texto}
                  </blockquote>

                  {r.video && (
                    <button
                      aria-label={`Assistir ao depoimento de ${r.name}, ${r.duracao}`}
                      className="absolute inset-0 z-[4] grid cursor-pointer place-items-center"
                      onClick={() => setAberto(r)}
                      type="button"
                    >
                      <Play />
                    </button>
                  )}
                </div>

                <figcaption className="text-center">
                  <div className="font-extrabold text-ink">{r.name}</div>
                  <div className="text-[13.5px] text-ink-soft">{r.role}</div>
                  {r.contexto && (
                    <div className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-orange">
                      {r.contexto}
                    </div>
                  )}
                </figcaption>
              </figure>
            )
          })}
        </Coverflow>
      </div>
      <div className="wrap">
        <div className="reveal mt-9 flex justify-center">
          <Link className="btn btn-ghost" href="/cases">
            Acessar cases
          </Link>
        </div>
      </div>

      {aberto && (
        <div
          aria-label={`Depoimento de ${aberto.name}`}
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-6 backdrop-blur-[3px]"
          onClick={() => setAberto(null)}
          role="dialog"
        >
          <button
            aria-label="Fechar"
            className="absolute right-6 top-6 grid size-11 cursor-pointer place-items-center rounded-full border border-white/40 text-[22px] text-white transition-colors duration-150 hover:bg-white hover:text-ink"
            onClick={() => setAberto(null)}
            type="button"
          >
            ×
          </button>
          {/* A legenda é embutida no arquivo, exigência da especificação do card. */}
          <video
            autoPlay
            className="max-h-[86vh] w-auto rounded-[16px]"
            controls
            onClick={(e) => e.stopPropagation()}
            playsInline
            src={aberto.video}
          />
        </div>
      )}
    </section>
  )
}
