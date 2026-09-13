'use client'

import { Link } from '@/i18n/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AtivoCard from '@/components/ui/AtivoCard'
import AuroraField from '@/components/ui/AuroraField'
import { useLocale } from 'next-intl'
import { getIconicos } from '@/lib/iconicos'

// `linkTitulo` desliga o link do h2: dentro de /plataformas/projetos-iconicos
// ele apontaria para a própria página.
//
// A coluna da direita é o carrossel dos ativos da linha aberta: um `AtivoCard`
// por vez, e as setas passam de um ativo ao outro dentro da linha (dando a
// volta nas pontas). Trocar de linha é pelas abas, que sempre reabrem a linha
// no primeiro ativo. Substituiu a foto única com as animações do `IconicosFx`
// e o grid claro de ativos que ficava abaixo da faixa: os dois mostravam a
// mesma lista, e o visitante rolava a página inteira para chegar nela.
export default function Iconicos({ linkTitulo = true }) {
  const locale = useLocale()
  const ICONICOS = getIconicos(locale)

  const [active, setActive] = useState(0)
  const [card, setCard] = useState(0)
  const totalCards = ICONICOS[active].ativos?.length ?? 0
  // Âncora de ativo (`#jardim-digital`) chega com a linha errada aberta: o
  // grid dela nasce com `hidden` até o efeito abaixo trocar a aba, e só então
  // o card existe visível para o navegador rolar até ele. Ref, não estado: só
  // o `active` precisa re-renderizar, ler e limpar o alvo não.
  const scrollAlvo = useRef(null)

  const abrirLinha = (i) => {
    setActive(i)
    setCard(0)
  }
  const go = (i) => {
    if (!totalCards) return
    setCard(((i % totalCards) + totalCards) % totalCards)
  }

  // A âncora define a linha aberta. É o que faz `/plataformas/projetos-iconicos#green`
  // funcionar, e é por onde chegam os links de espelhamento das outras rotas
  // (o MUB Garden na plataforma MUB, o Urbanity no Outdoor Digital). Uma âncora
  // de ativo (`#jardim-digital`, `#praca-pet-guilherme-pugsley`) também abre a
  // linha certa: procura o slug dentro de `ativos` de cada linha, não só o
  // slug da própria linha.
  useEffect(() => {
    const daHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return
      const porLinha = ICONICOS.findIndex((l) => l.slug === hash)
      if (porLinha >= 0) {
        setActive(porLinha)
        setCard(0)
        return
      }
      const porAtivo = ICONICOS.findIndex((l) => l.ativos?.some((a) => a.slug === hash))
      if (porAtivo >= 0) {
        setActive(porAtivo)
        setCard(ICONICOS[porAtivo].ativos.findIndex((a) => a.slug === hash))
        scrollAlvo.current = hash
      }
    }
    daHash()
    window.addEventListener('hashchange', daHash)
    return () => window.removeEventListener('hashchange', daHash)
    // ICONICOS é memoizado por locale: a referência só muda com o idioma.
  }, [ICONICOS])

  // Só dispara quando a âncora mirou um ativo específico (`scrollAlvo.current`),
  // nunca num clique manual de aba: o card acabou de sair do `hidden` neste
  // render, então é aqui, não no efeito acima, que ele já existe para rolar até.
  useEffect(() => {
    if (!scrollAlvo.current) return
    document.getElementById(scrollAlvo.current)?.scrollIntoView({ block: 'start' })
    scrollAlvo.current = null
  }, [active, card])

  return (
    <>
      <section
        className="relative overflow-hidden bg-orange py-[110px] text-white max-mob:py-[72px]"
        id="iconicos"
      >
        <AuroraField />

        <div className="wrap relative z-[2]">
          <div className="reveal flex items-center gap-3.5">
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
                aria-label="Ativo anterior"
                className="radial-reveal grid size-[46px] cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_rgba(22,17,13,.25)] transition-colors duration-200 hover:text-white [--rr-fill:var(--color-ink)]"
                onClick={() => go(active - 1)}
                type="button"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                aria-label="Próximo ativo"
                className="radial-reveal grid size-[46px] cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_rgba(22,17,13,.25)] transition-colors duration-200 hover:text-white [--rr-fill:var(--color-ink)]"
                onClick={() => go(active + 1)}
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-3 border-b border-white/40 max-mob:mt-7 max-mob:grid-cols-1">
            {ICONICOS.map((i, index) => (
              <button
                className={`-mb-px flex scroll-mt-24 cursor-pointer items-baseline border-0 border-b-[3px] bg-transparent pb-[22px] pt-[6px] text-left font-sans transition-[color,border-color] duration-200 max-mob:py-4 ${
                  index === active ? 'border-b-white text-white' : 'border-b-transparent text-white/65'
                }`}
                id={i.slug}
                key={i.slug}
                onClick={() => abrirLinha(index)}
                type="button"
              >
                <span className="text-[clamp(20px,2vw,30px)] font-extrabold leading-none tracking-[-0.02em]">
                  {i.name}
                </span>
              </button>
            ))}
          </div>

          {/* Os três painéis saem no HTML; a aba só troca qual fica visível. Render
              condicional deixaria o texto de dois dos projetos fora do documento —
              invisível para o Google e para os rastreadores de IA. */}
          <div className="reveal grid grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] items-center gap-20 pb-4 pt-16 max-tab:grid-cols-1 max-tab:gap-10 max-mob:pb-0 max-mob:pt-10">
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

            {/* Todos os ativos das três linhas saem no HTML, pela mesma razão
                dos painéis de texto: `hidden` só escolhe qual card aparece. O
                `id={slug}` que o AtivoCard carrega é o que faz a âncora de
                ativo (`#jardim-digital`) chegar no card certo. */}
            <div>
              <div className="motion-safe:animate-sobe-suave" key={`${active}-${card}`}>
                {ICONICOS.map((linha, li) =>
                  linha.ativos.map((ativo, ci) => (
                    <div hidden={li !== active || ci !== card} key={ativo.slug}>
                      <AtivoCard ativo={ativo} />
                    </div>
                  )),
                )}
              </div>

              {totalCards > 1 && (
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="eyebrow text-white/85">
                    {String(card + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
                  </span>
                  <div className="flex gap-2.5">
                    <button
                      aria-label="Ativo anterior"
                      className="radial-reveal grid size-11 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_rgba(22,17,13,.3)] transition-colors duration-200 hover:text-white [--rr-fill:var(--color-ink)] max-mob:size-9"
                      onClick={() => go(card - 1)}
                      type="button"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      aria-label="Próximo ativo"
                      className="radial-reveal grid size-11 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_rgba(22,17,13,.3)] transition-colors duration-200 hover:text-white [--rr-fill:var(--color-ink)] max-mob:size-9"
                      onClick={() => go(card + 1)}
                      type="button"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
