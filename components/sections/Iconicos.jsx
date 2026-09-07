'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AtivoCard from '@/components/ui/AtivoCard'
import AuroraField from '@/components/ui/AuroraField'
import SlideStage from '@/components/ui/SlideStage'
import { ICONICOS } from '@/lib/iconicos'

// O palco só entra se os três projetos tiverem foto: ele é indexado pelo mesmo
// `active` das abas, e um projeto sem imagem desalinharia aba e imagem.
const TODOS_COM_FOTO = ICONICOS.every((i) => i.image)
const SLIDES = ICONICOS.map((i) => ({
  src: i.image,
  alt: i.imageAlt || `${i.name}: ${i.tagline}`,
}))

// `linkTitulo` desliga o link do h2: dentro de /plataformas/projetos-iconicos
// ele apontaria para a própria página. `comAtivos` liga o grid de ativos de
// cada linha logo abaixo da faixa, trocado pela mesma navegação de abas e
// setas que já troca tagline/foto aqui — era a seção "As três linhas"
// (LinhaTabs), com uma navegação Green/Regenerativo/Elegancy própria que
// repetia a desta faixa.
export default function Iconicos({ num = '01', linkTitulo = true, comAtivos = false }) {
  const [active, setActive] = useState(0)
  const item = ICONICOS[active]

  const go = (i) => setActive(((i % ICONICOS.length) + ICONICOS.length) % ICONICOS.length)

  // A âncora define a linha aberta. É o que faz `/plataformas/projetos-iconicos#green`
  // funcionar, e é por onde chegam os links de espelhamento das outras rotas
  // (o MUB Garden na plataforma MUB, o Urbanity no Outdoor Digital).
  useEffect(() => {
    const daHash = () => {
      const hash = window.location.hash.slice(1)
      const i = ICONICOS.findIndex((l) => l.slug === hash)
      if (i >= 0) setActive(i)
    }
    daHash()
    window.addEventListener('hashchange', daHash)
    return () => window.removeEventListener('hashchange', daHash)
  }, [])

  return (
    <>
      <section
        className="relative overflow-hidden bg-orange py-[110px] text-white max-mob:py-[72px]"
        id="iconicos"
      >
        <AuroraField />

        {/* número gigante da vez — assinatura visual da faixa, atrás do conteúdo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[.2em] -right-[.05em] z-[1] select-none text-[clamp(200px,30vw,460px)] font-extrabold leading-[.8] tracking-[-0.05em] text-white/15"
        >
          {item.num}
        </span>

        <div className="wrap relative z-[2]">
          <div className="reveal flex items-center gap-3.5">
            <span className="font-display text-[15px] text-white/75">{num}</span>
            <h2 className="m-0 text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em]">
              {linkTitulo ? (
                <Link
                  className="text-white transition-opacity duration-150 hover:opacity-70"
                  href="/plataformas/projetos-iconicos"
                >
                  Icônicos
                </Link>
              ) : (
                'Icônicos'
              )}
            </h2>
            <span className="h-px flex-1 bg-white/40"></span>
            <span className="eyebrow shrink-0 text-white/85 max-tab:hidden">Fora do catálogo</span>
            <div className="flex shrink-0 gap-2.5 max-tab:hidden">
              <button
                aria-label="Projeto anterior"
                className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-white/55 text-[17px] text-white transition duration-200 hover:bg-white hover:text-orange"
                onClick={() => go(active - 1)}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Próximo projeto"
                className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-white/55 text-[17px] text-white transition duration-200 hover:bg-white hover:text-orange"
                onClick={() => go(active + 1)}
                type="button"
              >
                →
              </button>
            </div>
          </div>

          {/* Os três painéis saem no HTML; a aba só troca qual fica visível. Render
              condicional deixaria o texto de dois dos projetos fora do documento —
              invisível para o Google e para os rastreadores de IA. */}
          <div
            className={`reveal grid items-center py-20 max-mob:py-12 ${
              TODOS_COM_FOTO
                ? 'grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-20 max-tab:grid-cols-1 max-tab:gap-10'
                : 'grid-cols-1'
            }`}
          >
            {/* A coluna é remontada a cada troca (key={active}) só para a animação
                de entrada rodar de novo — os três painéis continuam no HTML, que é
                o que o Google e os rastreadores de IA leem. */}
            <div className="motion-safe:animate-sobe-suave" key={active}>
              {ICONICOS.map((i, index) => (
                <div hidden={index !== active} key={i.slug}>
                  <div className="eyebrow text-white">{i.tagline}</div>
                  {/* A escala é a que faz o nome mais longo ("Regenerativo") caber
                      na coluna ao lado da foto; em uma coluna só, sem a foto ao
                      lado, ele volta a crescer. `break-words` é a rede: nome novo
                      e maior quebra a linha em vez de passar por baixo da foto. */}
                  <h3 className="display m-0 mt-[26px] break-words text-[clamp(44px,5vw,68px)] max-tab:text-[clamp(36px,9vw,88px)]">
                    {i.name}
                  </h3>
                  <p className="m-0 mt-9 max-w-[34ch] text-[clamp(18px,1.5vw,23px)] leading-[1.45] text-white/90">
                    {i.short}
                  </p>
                  <Link
                    className="btn btn-on-orange mt-10 inline-block px-[34px] py-[19px] text-[15px]"
                    href={i.href}
                  >
                    {i.ctaLabel} →
                  </Link>
                </div>
              ))}
            </div>

            {TODOS_COM_FOTO && (
              <SlideStage
                className="shadow-[0_34px_90px_rgba(22,17,13,.30)]"
                index={active}
                ratio="aspect-[4/3]"
                sizes="(max-width: 980px) 100vw, 52vw"
                slides={SLIDES}
              />
            )}
          </div>

          <div className="grid grid-cols-3 border-t border-white/40 max-mob:grid-cols-1">
            {ICONICOS.map((i, index) => (
              <button
                className={`-mt-px flex cursor-pointer items-baseline gap-3.5 border-0 border-t-[3px] bg-transparent pb-[34px] pt-[30px] text-left font-sans transition-[color,border-color] duration-200 max-mob:py-6 ${
                  index === active ? 'border-t-white text-white' : 'border-t-transparent text-white/65'
                }`}
                key={i.slug}
                onClick={() => setActive(index)}
                type="button"
              >
                <span className="text-[13px] font-semibold">{i.num}</span>
                <span className="text-[clamp(20px,2vw,30px)] font-extrabold leading-none tracking-[-0.02em]">
                  {i.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {comAtivos && (
        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            {/* Mesma lógica de painéis no HTML: os três grids de ativos saem
                renderizados, só o `hidden` troca qual aparece. O `id` é o que
                as âncoras de espelhamento (`#green`, `#regenerativo`,
                `#elegancy`) precisam para abrir na linha certa. */}
            {ICONICOS.map((linha, index) => (
              <div className="scroll-mt-24" hidden={index !== active} id={linha.slug} key={linha.slug}>
                <div className="flex items-end justify-between gap-8 max-tab:flex-col max-tab:items-start max-tab:gap-6">
                  <p className="m-0 max-w-[58ch] text-lg text-ink-soft">{linha.frase}</p>
                  <Link className="btn btn-ghost shrink-0" href="#nova-campanha">
                    {linha.ctaLinha} →
                  </Link>
                </div>

                <div className="mt-[42px] grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
                  {linha.ativos.map((ativo) => (
                    <AtivoCard ativo={ativo} key={ativo.slug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
