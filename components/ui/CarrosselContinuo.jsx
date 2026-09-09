'use client'

import { Children, useEffect, useRef } from 'react'

// Coverflow contínuo: a fita não tem começo nem fim, e gira sozinha enquanto a
// seção está na tela.
//
// É outro componente que o `Coverflow` (que segue em Reviews, onde a ordem dos
// depoimentos importa e a leitura é de um por vez). Aqui não existe scroll
// nativo, nem scroll-snap, nem cópias do conjunto no DOM: cada item aparece uma
// única vez e a posição do carrossel é um número contínuo (`pos`, medido em
// larguras de card) que o laço de animação incrementa. Quem decide onde cada
// card está é `envolver(i - pos)`, que devolve a distância até o centro pelo
// caminho mais curto do círculo. É daí que vem o giro infinito nos dois
// sentidos: não há emenda para atravessar nem salto de `scrollLeft` para
// esconder, e por isso também não há trava ao passar pelo primeiro item.
//
// O laço escreve `transform`, `opacity` e `z-index`, e nada mais. Nenhuma
// propriedade de layout muda durante a animação e nenhuma medida é lida do DOM
// dentro do frame: largura do card e passo são medidos na montagem e no resize,
// e ficam num ref. Nenhum estado do React participa do movimento, então o
// componente não re-renderiza uma única vez enquanto o carrossel gira.
//
// Vídeo dentro do card é o item mais caro da seção: cada `<video>` que toca é
// um decodificador rodando. O laço mantém no máximo um tocando (o do card no
// centro) e só anexa o `src` quando o card se aproxima, lendo o `data-src` que
// quem chama deixa no elemento. Sem isso os seis vídeos da home baixam e
// decodificam ao mesmo tempo, e nenhuma otimização de transform salva os frames.
//
// Pausar, porém, não devolve nada: o elemento pausado continua segurando o
// decodificador e os buffers, e o navegador tem um teto pequeno deles — passar
// do teto derruba tudo para decodificação em software. Por isso o card que se
// afasta do centro (e a seção inteira, quando sai da tela) solta a fonte de
// verdade, e volta a carregá-la pelo `data-src` ao se aproximar de novo.

const suavizar = (t) => t * t * (3 - 2 * t)

// Queda suavizada (smoothstep) em vez de linear: perto do centro o card quase
// não reage, e a diferença acontece no meio do caminho. A derivada é zero na
// origem, então a troca de sinal do giro atravessa o centro sem quebra.
const queda = (valor, alcance) => suavizar(Math.min(Math.abs(valor) / alcance, 1))

const sinal = (valor) => (valor < 0 ? -1 : 1)

// Distância de `valor` até zero pelo caminho mais curto de um círculo de `n`
// posições: o resultado fica em (-n/2, n/2]. É a única peça de matemática que o
// modo contínuo precisa.
const envolver = (valor, n) => {
  const resto = ((valor % n) + n) % n
  return resto > n / 2 ? resto - n : resto
}

const GIRO = 27 // graus do card lateral
const RECUO = 110 // px em Z
const ESCALA = 0.13
const APAGA = 0.55
const ALCANCE_GIRO = 1.3
const ALCANCE_RECUO = 1.6

// 1/s. Com que rapidez a velocidade volta à deriva depois de um arremesso, e
// com que rapidez ela cai a zero quando o ponteiro entra na fita.
const ATRITO = 2.8

// rad/s da mola que leva o card clicado ao centro. A mola é criticamente
// amortecida e resolvida na forma fechada, então ela parte da velocidade que a
// fita já tinha em vez de zerá-la: clicar num card enquanto a fita gira não
// produz o solavanco de trocar de regime, e ela encosta no destino sem repique.
// Tempo de assentamento ~4/COLA, aqui perto de meio segundo.
const COLA = 9

// Teto do arremesso, em cards por segundo.
const ARREMESSO = 5

// Distância (em cards) em que o vídeo do card começa a baixar, em que ele toca,
// e em que ele devolve o decodificador. Pausar não basta: um <video> pausado
// segue segurando um decodificador e os buffers de frame, e o navegador tem um
// teto pequeno deles. Passando do teto ele cai para decodificação em software,
// que é de onde vinha a travada com os seis vídeos da home todos vivos ao mesmo
// tempo. A folga entre CARREGA e DESCARREGA é histerese: sem ela o card na
// fronteira soltaria e recarregaria a fonte a cada frame.
const CARREGA_VIDEO = 2
const TOCA_VIDEO = 0.85
const DESCARREGA_VIDEO = 3

// Tempo fora da tela antes de soltar as fontes. A seção volta a carregar sozinha
// ao reaparecer; o atraso existe para que passar raspando pela borda (ou uma
// rolagem que vai e volta) não fique criando e destruindo decodificador.
const SOLTAR_APOS = 1200

// Piso da deriva, em cards/s. Abaixo disto a velocidade vira zero em vez de
// continuar decaindo para sempre: a exponencial nunca chega a zero, e sem o
// piso a fita seguia repintando os nove cards a cada frame por segundos depois
// de o ponteiro pousar nela, movendo frações de nanômetro. Com o piso, `pos`
// para de mudar e o laço passa a sair antes de tocar no DOM.
const PARADA = 1e-4

export default function CarrosselContinuo({
  alturaClasse = '',
  children,
  gap = 26,
  inicial = 0,
  label,
  velocidade = 0.06,
  width = 'clamp(250px,24vw,330px)',
}) {
  const items = Children.toArray(children)
  const n = items.length
  const pistaRef = useRef(null)
  const cardsRef = useRef([])
  // Todo o movimento vive aqui: posição atual em larguras de card, velocidade,
  // alvo de uma aproximação em curso e a geometria medida. Nada disso é estado
  // do React, de propósito — o carrossel gira sem uma única re-renderização.
  const estadoRef = useRef({
    pos: inicial,
    v: 0,
    alvo: null,
    passo: 1,
    largura: 0,
    limite: 3,
    pausado: false,
    arraste: null,
    suprimirClique: false,
    tudoVisivel: false,
    naTela: false,
    pintar: () => {},
  })

  // `inicial` só é lido de verdade quando muda depois da montagem (o caso da
  // âncora `#slug`: o hash só existe no cliente, então a página monta com
  // `inicial=0` e o valor real chega um instante depois, via prop). Sem
  // rolagem suave, igual à posição de partida: é onde o visitante pediu para
  // cair, não uma navegação.
  useEffect(() => {
    const s = estadoRef.current
    const alvo = ((inicial % n) + n) % n
    if (s.pos === alvo) return
    s.pos = alvo
    s.alvo = null
    s.pintar()
  }, [inicial, n])

  useEffect(() => {
    const pista = pistaRef.current
    if (!pista || n === 0) return
    const s = estadoRef.current
    const cards = cardsRef.current
    const videos = cards.map((el) => el?.querySelector('video') ?? null)
    const ocultos = cards.map(() => false)
    const tocando = cards.map(() => false)
    const carregados = cards.map(() => false)
    const camadas = cards.map(() => null)
    const opacidades = cards.map(() => null)

    const preferenciaReduzida = window.matchMedia('(prefers-reduced-motion: reduce)')
    let semMovimento = preferenciaReduzida.matches

    // Uma medida por montagem e por resize: nem a largura do card nem o passo
    // mudam com o giro. `limite` é a partir de onde o card já saiu da tela, e
    // por isso depende da largura da pista: em monitor ultralargo cabe mais
    // card de cada lado, e cortar num número fixo abriria buraco na borda.
    const medir = () => {
      const largura = cards[0]?.offsetWidth ?? 0
      if (largura > 0) {
        s.largura = largura
        s.passo = largura + gap
      }
      const meio = pista.clientWidth / 2
      s.limite = Math.max(1.8, Math.min(n / 2 - 0.5, meio / s.passo + 1.5))
    }

    // Devolve o decodificador ao navegador. `removeAttribute` sozinho não basta:
    // é o `load()` seguinte que faz o elemento voltar a NETWORK_EMPTY e liberar
    // os buffers. O `data-src` fica onde está, e é por ele que o card recarrega
    // quando voltar a se aproximar do centro.
    const soltarVideo = (i) => {
      const video = videos[i]
      if (!video || !carregados[i]) return
      carregados[i] = false
      tocando[i] = false
      video.pause()
      video.removeAttribute('src')
      video.load()
    }

    const soltarVideos = () => {
      for (let i = 0; i < videos.length; i++) soltarVideo(i)
    }

    const pintar = () => {
      const { pos, passo, largura, limite } = s
      const inicioFade = Math.max(0.9, limite - 1.2)
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i]
        if (!el) continue
        const d = envolver(i - pos, n)
        const ad = Math.abs(d)

        const video = videos[i]
        if (video) {
          if (!carregados[i] && s.naTela && ad < CARREGA_VIDEO && video.dataset.src) {
            carregados[i] = true
            // `preload` sobe junto: com "none" o arquivo só começaria a baixar
            // no play, e o card chegaria ao centro em branco. Assim ele tem a
            // travessia de um card inteiro para bufferizar e mostrar o primeiro
            // frame antes de rodar.
            video.preload = 'auto'
            video.src = video.dataset.src
          } else if (carregados[i] && ad > DESCARREGA_VIDEO) {
            soltarVideo(i)
          }
          const tocar = carregados[i] && ad < TOCA_VIDEO && s.naTela
          if (tocar !== tocando[i]) {
            tocando[i] = tocar
            if (tocar) video.play()?.catch(() => {})
            else video.pause()
          }
        }

        // Card fora da tela sai do pipeline de pintura. A exceção é o teclado:
        // com o foco dentro da fita todos voltam a existir, senão o Tab pularia
        // as plataformas que estão do outro lado do círculo neste instante.
        const oculto = !s.tudoVisivel && ad >= limite
        if (oculto !== ocultos[i]) {
          ocultos[i] = oculto
          el.style.visibility = oculto ? 'hidden' : ''
        }
        if (oculto) continue

        const q1 = queda(d, ALCANCE_GIRO)
        const q2 = queda(d, ALCANCE_RECUO)
        const sg = sinal(d)
        const x = (d * passo).toFixed(2)
        // As bordas dissolvem em vez de sumir de uma vez: o corte por
        // `visibility` acontece depois que o card já chegou a zero.
        const beira =
          ad <= inicioFade
            ? 1
            : 1 - suavizar(Math.min((ad - inicioFade) / (limite - inicioFade), 1))

        // O eixo do giro acompanha a borda interna do card: o lateral abre como
        // página, em vez de girar em torno do próprio meio. O deslocamento do
        // eixo vai dobrado na própria matriz (`T(ox) · lista · T(-ox)`, que é
        // exatamente o que `transform-origin` faz) em vez de sair numa
        // propriedade à parte: `transform` e `opacity` o compositor resolve
        // sozinho, mas `transform-origin` reescrito a cada frame obriga a
        // thread principal a refazer a árvore de propriedades de pintura de
        // cada card, todo frame, para um efeito que a matriz já sabe expressar.
        const ox = -sg * 0.42 * q1 * largura
        el.style.transform = semMovimento
          ? `translate3d(${x}px,0,0)`
          : `translate3d(${(d * passo + ox).toFixed(2)}px,0,${(-RECUO * q2).toFixed(2)}px) rotateY(${(
              sg *
              GIRO *
              q1
            ).toFixed(3)}deg) scale(${(1 - ESCALA * q2).toFixed(4)}) translateX(${(-ox).toFixed(
              2
            )}px)`

        const opacidade = ((1 - APAGA * q1) * beira).toFixed(3)
        if (opacidade !== opacidades[i]) {
          opacidades[i] = opacidade
          el.style.opacity = opacidade
        }

        const camada = 10 - Math.round(10 * q2)
        if (camada !== camadas[i]) {
          camadas[i] = camada
          el.style.zIndex = String(camada)
        }
      }
    }
    s.pintar = pintar

    let raf = 0
    let ultimo = 0
    // Última posição efetivamente escrita no DOM. Com o ponteiro parado em cima
    // da fita a deriva chega a zero, e daí em diante o laço não toca no DOM: um
    // carrossel pausado custa o mesmo que um carrossel que não existe.
    let posPintada = NaN

    const frame = (agora) => {
      raf = requestAnimationFrame(frame)
      const dt = ultimo ? Math.min((agora - ultimo) / 1000, 0.05) : 0
      ultimo = agora

      if (s.arraste) {
        // `pos` já vem do ponteiro; o laço só pinta.
      } else if (s.alvo !== null) {
        // Solução fechada da mola criticamente amortecida:
        // x(t) = (c1 + c2·t)·e^(−ω·t), com c1 = x₀ e c2 = v₀ + ω·x₀.
        // Fechada e não integrada passo a passo porque assim ela é estável para
        // qualquer `dt`: um frame perdido não vira estouro nem repique.
        const x0 = s.pos - s.alvo
        const c2 = s.v + COLA * x0
        const decaimento = Math.exp(-COLA * dt)
        const x = (x0 + c2 * dt) * decaimento
        s.v = (c2 - COLA * (x0 + c2 * dt)) * decaimento
        s.pos = s.alvo + x
        if (Math.abs(x) < 0.0008 && Math.abs(s.v) < 0.01) {
          s.pos = s.alvo
          s.v = 0
          s.alvo = null
        }
      } else {
        const desejada = s.pausado || semMovimento ? 0 : velocidade
        s.v += (desejada - s.v) * (1 - Math.exp(-ATRITO * dt))
        // Sem o piso a fita parada nunca chega a velocidade zero, e `pos` seguia
        // mudando na décima quinta casa: `pintar()` rodava a cada frame para
        // reescrever nove transformações idênticas. Zerar aqui é o que faz a
        // promessa valer, e a fita pousada custar mesmo nada.
        if (desejada === 0 && Math.abs(s.v) < PARADA) s.v = 0
        if (s.v !== 0) {
          s.pos += s.v * dt
          // Só aqui: com um alvo em curso, normalizar `pos` o deixaria do outro
          // lado do círculo e a chegada daria a volta.
          s.pos = ((s.pos % n) + n) % n
        }
      }

      if (s.pos === posPintada) return
      posPintada = s.pos
      pintar()
    }

    let soltarEm = 0

    const ligar = () => {
      clearTimeout(soltarEm)
      // Força a pintura do frame seguinte: ao voltar para a tela os vídeos
      // precisam ser reanexados e recomeçar mesmo com a fita parada onde
      // estava. Fica acima da guarda do `raf` porque o laço já pode estar
      // rodando quando a seção reaparece (é o caso da primeira entrada, em que
      // o `IntersectionObserver` responde depois da montagem, e o de quem
      // navega com `prefers-reduced-motion`, onde a fita não anda sozinha e
      // `pos` nunca mudaria para disparar a pintura).
      posPintada = NaN
      if (raf) return
      ultimo = 0
      raf = requestAnimationFrame(frame)
    }

    const desligar = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      for (let i = 0; i < videos.length; i++) {
        if (videos[i] && tocando[i]) {
          videos[i].pause()
          tocando[i] = false
        }
      }
      // Fora da tela (ou com a aba escondida) nenhum vídeo desta seção precisa
      // de decodificador. Sem isto os seis da home seguiam vivos pelo resto da
      // página, disputando o teto de decodificadores com o que viesse depois.
      clearTimeout(soltarEm)
      soltarEm = setTimeout(soltarVideos, SOLTAR_APOS)
    }

    medir()
    pintar()
    ligar()

    const observadorTela = new IntersectionObserver(
      ([entrada]) => {
        s.naTela = entrada.isIntersecting
        if (s.naTela && !document.hidden) ligar()
        else desligar()
      },
      { rootMargin: '250px 0px' }
    )
    observadorTela.observe(pista)

    const observadorTamanho = new ResizeObserver(() => {
      medir()
      pintar()
    })
    observadorTamanho.observe(pista)

    const aoTrocarAba = () => {
      if (document.hidden) desligar()
      else if (s.naTela) ligar()
    }
    document.addEventListener('visibilitychange', aoTrocarAba)

    const aoTrocarPreferencia = (e) => {
      semMovimento = e.matches
      pintar()
    }
    preferenciaReduzida.addEventListener('change', aoTrocarPreferencia)

    // Só a rolagem horizontal do trackpad entra: sequestrar a vertical tiraria
    // do visitante o controle da página. Não é passivo porque precisa cancelar
    // o gesto de "voltar" que o navegador dispara com o deslize horizontal.
    const naRoda = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      s.alvo = null
      s.pos += e.deltaX / s.passo
    }
    pista.addEventListener('wheel', naRoda, { passive: false })

    return () => {
      desligar()
      clearTimeout(soltarEm)
      soltarVideos()
      observadorTela.disconnect()
      observadorTamanho.disconnect()
      document.removeEventListener('visibilitychange', aoTrocarAba)
      preferenciaReduzida.removeEventListener('change', aoTrocarPreferencia)
      pista.removeEventListener('wheel', naRoda)
    }
  }, [gap, n, velocidade])

  const aoDescer = (e) => {
    const s = estadoRef.current
    if (e.pointerType === 'mouse' && e.button !== 0) return
    s.alvo = null
    s.arraste = {
      x: e.clientX,
      origem: s.pos,
      ultimoX: e.clientX,
      instante: performance.now(),
      vel: 0,
      moveu: false,
      id: e.pointerId,
    }
    s.suprimirClique = false
  }

  // O ponteiro só é capturado quando o gesto vira arrasto de verdade: capturar
  // no `pointerdown` redireciona o clique sintético para a pista, e o botão
  // dentro do card para de responder.
  const aoMover = (e) => {
    const s = estadoRef.current
    const arraste = s.arraste
    const pista = pistaRef.current
    if (!arraste || !pista) return
    const dx = e.clientX - arraste.x
    if (!arraste.moveu) {
      if (Math.abs(dx) < 4) return
      arraste.moveu = true
      s.pausado = true
      pista.setPointerCapture(arraste.id)
      pista.style.cursor = 'grabbing'
    }
    const agora = performance.now()
    const intervalo = Math.max((agora - arraste.instante) / 1000, 0.001)
    arraste.vel = (e.clientX - arraste.ultimoX) / s.passo / intervalo
    arraste.ultimoX = e.clientX
    arraste.instante = agora
    s.pos = arraste.origem - dx / s.passo
  }

  // Sem encaixe no card mais próximo ao soltar: a fita é contínua e a ordem não
  // significa nada, então o arremesso desacelera até virar a deriva de novo.
  const aoSoltar = (e) => {
    const s = estadoRef.current
    const arraste = s.arraste
    const pista = pistaRef.current
    if (!arraste || !pista) return
    s.arraste = null
    if (!arraste.moveu) return
    s.suprimirClique = true
    s.pausado = e.pointerType === 'mouse'
    pista.style.cursor = ''
    if (pista.hasPointerCapture?.(e.pointerId)) pista.releasePointerCapture(e.pointerId)
    s.v = Math.max(-ARREMESSO, Math.min(ARREMESSO, -arraste.vel))
  }

  const aoEntrar = (e) => {
    if (e.pointerType !== 'mouse') return
    estadoRef.current.pausado = true
  }

  const aoSair = (e) => {
    const s = estadoRef.current
    if (e.pointerType !== 'mouse' || s.arraste) return
    s.pausado = pistaRef.current?.contains(document.activeElement) ?? false
  }

  // Arrastar não é clicar: sem isto, soltar o mouse sobre o card abriria o link
  // no fim de cada arrasto.
  const aoClicarNaPista = (e) => {
    const s = estadoRef.current
    if (!s.suprimirClique) return
    s.suprimirClique = false
    e.preventDefault()
    e.stopPropagation()
  }

  // Card fora do centro não dispara o conteúdo: o primeiro clique traz ele para
  // o meio. Fase de captura, para chegar antes do link.
  const aoClicarNoCard = (i) => (e) => {
    const s = estadoRef.current
    const d = envolver(i - s.pos, n)
    if (Math.abs(d) < 0.35) return
    e.preventDefault()
    e.stopPropagation()
    s.alvo = s.pos + d
  }

  // O foco manda o card ao centro em vez de deixá-lo girado e apagado atrás do
  // vizinho, e segura a deriva enquanto o teclado estiver dentro da fita.
  const aoFocar = (e) => {
    const s = estadoRef.current
    s.pausado = true
    s.tudoVisivel = true
    const card = e.target.closest?.('[data-card]')
    if (!card) return
    const d = envolver(Number(card.dataset.card) - s.pos, n)
    if (Math.abs(d) > 0.01) s.alvo = s.pos + d
    s.pintar()
  }

  const aoDesfocar = (e) => {
    const s = estadoRef.current
    if (e.currentTarget.contains(e.relatedTarget)) return
    s.tudoVisivel = false
    s.pausado = false
  }

  const aoTeclar = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const s = estadoRef.current
    e.preventDefault()
    const partida = s.alvo ?? s.pos
    s.alvo = Math.round(partida) + (e.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <div
      aria-label={label}
      className={`relative mx-auto cursor-grab select-none [perspective:1400px] [touch-action:pan-y] ${alturaClasse}`}
      onBlurCapture={aoDesfocar}
      onClickCapture={aoClicarNaPista}
      // Sem isto o navegador inicia o arrasto nativo da imagem no meio do gesto.
      onDragStart={(e) => e.preventDefault()}
      onFocusCapture={aoFocar}
      onKeyDown={aoTeclar}
      onPointerCancel={aoSoltar}
      onPointerDown={aoDescer}
      onPointerEnter={aoEntrar}
      onPointerLeave={aoSair}
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      ref={pistaRef}
      role="group"
      style={{ '--cw': width }}
    >
      {items.map((item, i) => {
        // Posição de partida em CSS puro, para o HTML servido já sair montado:
        // o primeiro frame do laço substitui isto por pixels medidos. Quem está
        // do outro lado do círculo nasce transparente, porque a largura da tela
        // (e portanto o corte) só é conhecida depois da montagem.
        const d = envolver(i - inicial, n)
        const longe = Math.abs(d) >= 2
        return (
          <div
            className="absolute left-0 right-0 top-0 mx-auto w-[var(--cw)] [backface-visibility:hidden] [will-change:transform,opacity]"
            data-card={i}
            key={item.key ?? i}
            onClickCapture={aoClicarNoCard(i)}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            style={{
              opacity: longe ? 0 : (1 - APAGA * queda(d, ALCANCE_GIRO)).toFixed(3),
              transform: `translate3d(calc((var(--cw) + ${gap}px) * ${d}),0,0)`,
              zIndex: 10 - Math.round(10 * queda(d, ALCANCE_RECUO)),
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}
