'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'

// Depoimentos reais, na redação oficial do cliente (COPY_SITE).
//
// TODO(cliente): confirmar a autorização de uso de nome, cargo e marca dos três
// depoentes antes de publicar — são pessoas e empresas identificáveis.
//
// TODO(cliente): faltam os três vídeos (9:16, legenda embutida obrigatória) e as
// capas estáticas. Enquanto `video` e `capa` estiverem vazios, o card mostra a
// citação sobre o painel bege, sem botão de play e sem modal — o badge de
// duração continua, porque a duração já é dado confirmado.
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
    duracao: '00:44',
    video: null,
    capa: null,
  },
  {
    quote:
      'Nos trouxe não só o sucesso completo da campanha, mas o recorde de vendas em um único final de semana.',
    name: 'Claudio Ceará',
    role: 'Diretor · Agência Verbal',
    contexto: 'Case: Auto Shopping Curitiba',
    duracao: '01:00',
    video: null,
    capa: null,
  },
  {
    titulo: 'Quando o bairro inteiro passa a conhecer sua marca',
    name: 'Mônica Kachel',
    role: 'Proprietária · Cia do Pastel',
    duracao: '01:27',
    video: null,
    capa: null,
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
    <section className="py-[110px] max-mob:py-[72px]" id="depoimentos">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num="05" title="O que dizem" className="flex-1" />
          <span className="eyebrow self-end whitespace-nowrap max-mob:hidden">Arraste →</span>
        </div>
        <p className="eyebrow reveal mb-3 text-orange">Histórias de sucesso na prática</p>
        <p className="reveal mb-3 max-w-[54ch] text-lg font-bold text-ink">
          Quem valida nosso portfólio é o mercado
        </p>
        <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
          De quem anuncia pela primeira vez a quem gerencia grandes marcas, a experiência de quem já
          colocou sua mensagem nas ruas do Sul do Brasil.
        </p>
      </div>
      <div className="wrap">
        <div className="rail items-start">
          {REVIEWS.map((r) => {
            const texto = r.quote ? `“${r.quote}”` : r.titulo

            return (
              <figure
                className="m-0 flex flex-[0_0_300px] snap-start flex-col gap-4 max-mob:flex-[0_0_74vw]"
                key={r.name}
              >
                <div className="ticks group relative aspect-[9/16] w-full overflow-hidden rounded-[16px] border border-line bg-bone">
                  {r.capa ? (
                    <Image
                      alt={`${r.name}, ${r.role}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 560px) 74vw, 300px"
                      src={r.capa}
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                      {r.name}
                    </span>
                  )}

                  <span className="absolute right-3 top-3 z-[3] rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] font-bold tabular-nums text-white backdrop-blur-[2px]">
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

                <figcaption>
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
        </div>
      </div>
      <div className="wrap">
        <div className="reveal mt-10">
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
