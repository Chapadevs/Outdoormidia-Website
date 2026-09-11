'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import CarrosselContinuo from '@/components/ui/CarrosselContinuo'
import PlatformShowcaseCard from '@/components/ui/PlatformShowcaseCard'

// Uma coluna por caractere soletra a palavra do idioma como um letreiro de
// postes luminosos: cada uma sobe até a própria altura de descanso (`alto`)
// quando a seção entra na tela, em ordem embaralhada — não da esquerda para a
// direita — e desce de volta se o visitante rolar para cima, porque a leitura é
// sempre a mesma posição de rolagem. Um dos postes nasce aceso: LED e haste já
// em laranja, sem esperar o hover.
//
// A palavra vem de `PlatformsCarousel.letreiro` e muda de comprimento em cada
// idioma (Plataformas tem 11 letras, Platforms tem 9, 媒体平台 tem 4), então
// nada aqui pode ser tabela escrita à mão: as alturas saem de um padrão cíclico
// e o poste aceso, de uma fração do comprimento. Em português o padrão devolve
// exatamente a tabela que existia antes, com o "f" aceso.
const PADRAO_ALTO = [0, 6, 2, 10, 4, 0, 8, 3, 12, 5, 1]

// Ideograma ocupa a caixa inteira; letra latina, pouco mais da metade dela. Sem
// separar os dois, a mesma medida que enquadra "Plataformas" faria de 媒体平台
// um letreiro que sangra pela borda.
const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/

function letrasDe(palavra) {
  // Spread e não split(''): par substituto vira um caractere só, não dois.
  const caracteres = [...palavra]
  const aceso = Math.round(caracteres.length * 0.45)
  return caracteres.map((letra, i) => ({
    letra,
    alto: PADRAO_ALTO[i % PADRAO_ALTO.length],
    aceso: i === aceso,
  }))
}

// O letreiro ocupa a mesma faixa da tela em qualquer idioma: ~48vw de largura
// somada, repartidos entre as colunas que a palavra tiver. É o que mantém
// "Plataformas" nos mesmos 7vw por letra de antes e impede que uma palavra
// curta vire um selo perdido no meio da seção.
function corpoDe(palavra) {
  const largura = [...palavra].length * (CJK.test(palavra) ? 0.9 : 0.62)
  return `clamp(38px, ${(48 / largura).toFixed(2)}vw, 160px)`
}

function TituloPlataformas({ palavra }) {
  const LETRAS = letrasDe(palavra)
  const corpo = corpoDe(palavra)
  const linhaRef = useRef(null)
  const frameRef = useRef(0)
  const t0Ref = useRef(undefined)
  const topoRef = useRef(0)
  const limiaresRef = useRef(null)

  useEffect(() => {
    // Progresso do título na tela, de 0 (ainda embaixo) a 1. O título pode já
    // estar dentro da tela no primeiro paint: guardar esse valor de partida
    // (t0) e renormalizar em cima dele é o que garante que as onze colunas
    // comecem embaixo e participem da subida, seja qual for a altura da janela.
    //
    // A posição do título no documento é medida uma vez, na montagem e no
    // resize, e o laço de rolagem só lê `scrollY`. Medir com
    // `getBoundingClientRect` a cada frame obriga o navegador a recalcular o
    // layout da página inteira no meio do frame, e o carrossel logo abaixo
    // pagava a conta em frames perdidos.
    //
    // Quem sobe é `transform`, não mais `padding-top`. A escrita em si já
    // acontecia uma vez por coluna, mas `padding-top` é propriedade de layout:
    // a transição de 800ms que ela dispara refaz o layout e a pintura das onze
    // colunas a cada frame enquanto corre, e as onze são escalonadas ao longo
    // da mesma rolagem que traz o carrossel para a tela. Eram dois segundos de
    // layout na thread principal em cima do primeiro giro da fita, justamente
    // onde o travamento aparecia. `translateY` faz o mesmo percurso no
    // compositor, sem tocar no layout.
    // Quem dá o número de colunas é o DOM, e não a palavra: assim o laço não
    // depende de nada do render e o efeito segue com a lista de dependências
    // vazia, mesmo com a palavra mudando de comprimento a cada idioma.
    const colunas = Array.from(linhaRef.current?.querySelectorAll('[data-letra]') ?? [])
    const posicoes = colunas.map(() => null)

    if (!limiaresRef.current) {
      const passos = colunas.map((_, i) => 0.06 + i * 0.062)
      for (let i = passos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[passos[i], passos[j]] = [passos[j], passos[i]]
      }
      limiaresRef.current = passos
    }

    const medir = () => {
      const linha = linhaRef.current
      if (!linha) return
      topoRef.current = linha.getBoundingClientRect().top + window.scrollY
    }

    const elevar = () => {
      const topo = topoRef.current - window.scrollY
      const bruto = Math.min(Math.max((window.innerHeight - topo) / (window.innerHeight * 0.95), 0), 1)
      if (t0Ref.current === undefined) t0Ref.current = Math.min(bruto, 0.9)
      const t = Math.min(Math.max((bruto - t0Ref.current) / (1 - t0Ref.current), 0), 1)
      colunas.forEach((el, i) => {
        const destino = t > limiaresRef.current[i] ? 0 : 54
        if (posicoes[i] === destino) return
        posicoes[i] = destino
        el.style.transform = `translateY(${destino}px)`
      })
    }

    const aoRolar = () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(elevar)
    }

    const aoRedimensionar = () => {
      medir()
      aoRolar()
    }

    medir()
    elevar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRedimensionar)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRedimensionar)
    }
  }, [])

  return (
    // `box-content` + `pt-5 -mt-5` abrem 20px de folga acima das letras sem
    // mexer em altura nem em posição: a altura declarada segue sendo a da
    // caixa de conteúdo e a margem negativa devolve o padding. A folga existe
    // porque o `overflow-hidden` é quem corta a haste que desce 54px na
    // entrada, e sem ela cortaria também os 10px que a letra sobe no hover.
    // A altura da caixa tem piso próprio (o de sempre) e acompanha o corpo da
    // letra quando ele passa dele: com ideograma o corpo chega a 160px, e sem o
    // `max` a haste que faz do caractere um poste ficaria sem os pixels para
    // descer.
    <h2
      aria-label={palavra}
      className="mx-0 -mt-5 mb-0 box-content flex h-[max(clamp(178px,17vw,224px),calc(var(--letreiro)*1.9))] items-stretch justify-center gap-0.5 overflow-hidden px-6 pt-5 font-normal"
      ref={linhaRef}
      style={{ '--letreiro': corpo }}
    >
      {LETRAS.map(({ letra, alto, aceso }, i) => (
        <span
          aria-hidden="true"
          className="group flex flex-col items-stretch transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)]"
          data-letra={i}
          key={i}
          style={{ paddingTop: alto, transform: 'translateY(54px)' }}
        >
          <span className="text-center text-[length:var(--letreiro)] font-extrabold leading-[0.92] tracking-[-0.02em] text-ink transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-2.5 group-hover:text-orange">
            {letra}
          </span>
          <span
            className={`rounded-sm transition-colors duration-200 group-hover:bg-orange ${
              aceso ? 'h-[3px] bg-orange' : 'h-0.5 bg-ink/[.26]'
            }`}
          />
          <span
            className={`mx-auto w-[1.5px] flex-1 origin-bottom ${
              aceso
                ? 'bg-[linear-gradient(to_bottom,rgba(255,105,0,.55),rgba(255,105,0,.05))]'
                : 'bg-[linear-gradient(to_bottom,rgba(22,17,13,.24),rgba(22,17,13,0))]'
            }`}
          />
        </span>
      ))}
    </h2>
  )
}

export default function PlatformsCarousel({ plataformas }) {
  const t = useTranslations('PlatformsCarousel')
  return (
    // `overflow-clip` e não `overflow-hidden`: o segundo faz da seção um
    // contêiner rolável, e o navegador rolaria essa caixa na horizontal para
    // trazer à vista um card que o Tab focou do outro lado do círculo — a seção
    // inteira sairia do lugar. `clip` corta igual e não rola.
    <section className="overflow-clip bg-bone py-[104px] text-ink max-mob:py-[72px]" id="plataformas">
      {/* A abertura enquadra a amplitude do portfólio, e é ela que justifica
          nove plataformas em vez de uma: Front Light é aparecer, Projetos
          Icônicos é ser impossível de ignorar. */}
      <p className="reveal mx-auto mb-[22px] max-w-[52ch] px-8 text-center text-lg font-bold text-ink max-mob:px-5">
        {t('tituloA')}
        <span className="text-orange">{t('tituloDestaque1')}</span>
        {t('tituloB')}
        <span className="text-orange">{t('tituloDestaque2')}</span>
        {t('tituloC')}
      </p>

      <TituloPlataformas palavra={t('letreiro')} />

      <div className="reveal mx-auto h-[1.5px] max-w-[1280px] bg-[linear-gradient(to_right,rgba(22,17,13,0),rgba(22,17,13,.34)_14%,rgba(22,17,13,.34)_86%,rgba(22,17,13,0))]" />

      <div className="reveal mt-10">
        {/* A fita é um circuito, não uma fila: gira sozinha, devagar, e o
            visitante roda para os dois lados sem chegar a ponta nenhuma. Sem
            fileira de bolinhas embaixo, porque com giro contínuo a posição na
            lista não quer dizer nada — e a bolinha marcada era o único ponto do
            site que anunciava uma ordem que a seção não tem.

            A altura vem em classe porque quem conhece a proporção do card é
            este arquivo: 16/9 no desktop, 4/5 no tile de mobile. */}
        <CarrosselContinuo
          alturaClasse="h-[calc(var(--cw)*0.5625)] max-mob:h-[calc(var(--cw)*1.25)]"
          gap={26}
          label={t('carrosselLabel')}
          velocidade={0.055}
          width="min(820px,74vw)"
        >
          {plataformas.map((p) => (
            <PlatformShowcaseCard key={p.slug} p={p} />
          ))}
        </CarrosselContinuo>
      </div>
    </section>
  )
}
