'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Download, Upload, X } from 'lucide-react'
import Chip from '@/components/ui/Chip'
import {
  COR_PADRAO,
  ESCALA_MAXIMA,
  ESCALA_MINIMA,
  ESCALA_PADRAO,
  PALETA,
  getMockups,
  getMockupsPorPlataforma,
} from '@/lib/suaMarca'
import {
  caixaEnvolvente,
  compor,
  mapearFaces,
  mascaraDoPainel,
  tamanhoTextura,
} from '@/lib/suaMarcaMotor'
import { comIdioma, waLink, waSuaMarca } from '@/lib/whatsapp'

// A ferramenta Sua marca no OOH. O visitante escolhe a plataforma e o painel,
// sobe a logo em PNG, escolhe a cor de fundo e vê a marca aplicada na foto real
// do painel, em perspectiva. Nada sobe para servidor: a logo vira um object URL
// e tudo roda no canvas.
//
// A conta pesada (máscara da área útil e o mapa pixel → face → ponto da textura)
// roda uma vez por painel e fica em ref; trocar cor, logo ou tamanho só refaz a
// textura de cada face e recompõe a caixa envolvente do painel, num único
// requestAnimationFrame. A matemática está em lib/suaMarcaMotor.js.
//
// A ordem na tela é a do checklist: 01 plataforma, 02 arte, 03 resultado. O
// resultado só acende depois de uma plataforma escolhida, mas a logo pode subir
// antes: o painel aparece na cor escolhida assim que existe, e recebe a logo
// assim que ela existe.

const TAMANHO_MAXIMO = 8 * 1024 * 1024

// Os 8 bytes que abrem todo PNG. É a validação que vale: `type` e extensão vêm
// do sistema de arquivos e um JPG renomeado passaria pelos dois.
const ASSINATURA_PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

// Marca d'água do PNG exportado: o wordmark branco do site, a 14 % da largura
// no canto inferior direito. Entra só na cópia que vai para o download.
const WORDMARK = '/media/logo.png'
const WORDMARK_LARGURA = 0.14
const WORDMARK_MARGEM = 0.0145

const MOCKUPS = getMockups()

function carregarImagem(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`não carregou ${src}`))
    img.src = src
  })
}

// Textura de uma face: a cor de fundo mais a logo centralizada, em `contain`,
// ocupando `escala` da área útil.
function texturaDaFace(face, cor, logo, escala) {
  const c = document.createElement('canvas')
  c.width = face.tw
  c.height = face.th
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, face.tw, face.th)
  if (logo) {
    const r = Math.min((face.tw * escala) / logo.naturalWidth, (face.th * escala) / logo.naturalHeight)
    const w = logo.naturalWidth * r
    const h = logo.naturalHeight * r
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(logo, (face.tw - w) / 2, (face.th - h) / 2, w, h)
  }
  return { dados: ctx.getImageData(0, 0, face.tw, face.th).data, tw: face.tw, luz: face.luz }
}

export default function SuaMarcaNoOoh({ plataformas }) {
  const t = useTranslations('SuaMarcaNoOoh')
  const locale = useLocale()

  const [plataforma, setPlataforma] = useState(null)
  const [mockupId, setMockupId] = useState(null)
  const [logo, setLogo] = useState(null)
  const [cor, setCor] = useState(COR_PADRAO)
  const [escala, setEscala] = useState(ESCALA_PADRAO)
  const [erro, setErro] = useState(null)
  // Id do painel cuja cena já está no canvas. Derivar `pronto` daqui, em vez
  // de zerar um booleano no efeito, é o que evita um setState síncrono a cada
  // troca de painel.
  const [prontoId, setProntoId] = useState(null)
  const [arrastando, setArrastando] = useState(false)

  const canvasRef = useRef(null)
  const arquivoRef = useRef(null)
  const cenaRef = useRef(null)
  const estadoRef = useRef({ cor: COR_PADRAO, logo: null, escala: ESCALA_PADRAO })
  const frameRef = useRef(0)
  const wordmarkRef = useRef(null)

  const mockup = MOCKUPS.find((m) => m.id === mockupId) ?? null
  const pronto = Boolean(mockup) && prontoId === mockup.id
  const paineis = plataforma ? getMockupsPorPlataforma(plataforma) : []
  const nomePlataforma = plataformas.find((p) => p.slug === plataforma)?.name

  const pintar = useCallback(() => {
    const cena = cenaRef.current
    const canvas = canvasRef.current
    if (!cena || !canvas) return
    const { cor: corAtual, logo: logoAtual, escala: escalaAtual } = estadoRef.current
    const texturas = cena.faces.map((f) => texturaDaFace(f, corAtual, logoAtual?.imagem, escalaAtual))
    const bloco = new ImageData(new Uint8ClampedArray(cena.original), cena.caixa.largura, cena.caixa.altura)
    compor(bloco.data, cena.mascara, cena.mapa, texturas)
    canvas.getContext('2d').putImageData(bloco, cena.caixa.x0, cena.caixa.y0)
  }, [])

  // Troca de painel: carrega a foto, desenha no canvas e prepara a cena (máscara
  // e mapa) uma vez. Cancelado se o visitante trocar de novo antes de terminar.
  useEffect(() => {
    if (!mockup) {
      cenaRef.current = null
      return
    }
    let cancelado = false
    // Enquanto a foto nova carrega, nenhuma troca de cor pinta a cena antiga.
    cenaRef.current = null

    carregarImagem(mockup.imagem)
      .then((imagem) => {
        if (cancelado) return
        const canvas = canvasRef.current
        canvas.width = mockup.largura
        canvas.height = mockup.altura
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(imagem, 0, 0, mockup.largura, mockup.altura)

        const caixa = caixaEnvolvente(mockup.faces, mockup.largura, mockup.altura)
        const original = new Uint8ClampedArray(
          ctx.getImageData(caixa.x0, caixa.y0, caixa.largura, caixa.altura).data
        )
        const mascara = mascaraDoPainel(original)
        const faces = mockup.faces.map((f) => ({ ...f, ...tamanhoTextura(f) }))
        const mapa = mapearFaces(caixa, mascara, faces)

        cenaRef.current = { id: mockup.id, caixa, original, mascara, faces, mapa }
        pintar()
        setProntoId(mockup.id)
      })
      .catch(() => {
        if (!cancelado) cenaRef.current = null
      })

    return () => {
      cancelado = true
    }
  }, [mockup, pintar])

  // Cor, logo e tamanho: só recompõem, num frame por vez.
  useEffect(() => {
    estadoRef.current = { cor, logo, escala }
    if (!cenaRef.current) return
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(pintar)
    return () => cancelAnimationFrame(frameRef.current)
  }, [cor, logo, escala, pintar])

  useEffect(() => () => logo && URL.revokeObjectURL(logo.url), [logo])

  function escolherPlataforma(slug) {
    setPlataforma(slug)
    const lista = getMockupsPorPlataforma(slug)
    if (!lista.some((m) => m.id === mockupId)) setMockupId(lista[0]?.id ?? null)
  }

  function avancarPainel(passo) {
    if (paineis.length < 2) return
    const i = paineis.findIndex((m) => m.id === mockupId)
    setMockupId(paineis[(i + passo + paineis.length) % paineis.length].id)
  }

  function aoTeclar(e) {
    if (e.target.tagName === 'INPUT') return
    if (e.key === 'ArrowLeft') avancarPainel(-1)
    if (e.key === 'ArrowRight') avancarPainel(1)
  }

  async function receber(arquivo) {
    if (!arquivo) return
    setErro(null)
    if (arquivo.size > TAMANHO_MAXIMO) {
      setErro('erroTamanho')
      return
    }
    const cabecalho = new Uint8Array(await arquivo.slice(0, 8).arrayBuffer())
    if (!ASSINATURA_PNG.every((byte, i) => cabecalho[i] === byte)) {
      setErro('erroFormato')
      return
    }
    const url = URL.createObjectURL(arquivo)
    try {
      const imagem = await carregarImagem(url)
      setLogo({ imagem, nome: arquivo.name, url })
    } catch {
      URL.revokeObjectURL(url)
      setErro('erroLeitura')
    }
  }

  function abrirArquivo() {
    arquivoRef.current?.click()
  }

  function soltar(e) {
    e.preventDefault()
    setArrastando(false)
    receber(e.dataTransfer.files?.[0])
  }

  async function baixar() {
    const canvas = canvasRef.current
    const cena = cenaRef.current
    if (!canvas || !cena || !logo) return

    const copia = document.createElement('canvas')
    copia.width = canvas.width
    copia.height = canvas.height
    const ctx = copia.getContext('2d')
    ctx.drawImage(canvas, 0, 0)

    try {
      wordmarkRef.current ??= await carregarImagem(WORDMARK)
      const marca = wordmarkRef.current
      const w = Math.round(copia.width * WORDMARK_LARGURA)
      const h = Math.round((w * marca.naturalHeight) / marca.naturalWidth)
      const margem = Math.round(copia.width * WORDMARK_MARGEM)
      ctx.save()
      ctx.globalAlpha = 0.85
      ctx.shadowColor = 'rgba(22, 17, 13, 0.55)'
      ctx.shadowBlur = 8
      ctx.shadowOffsetY = 1
      ctx.drawImage(marca, copia.width - w - margem, copia.height - h - margem, w, h)
      ctx.restore()
    } catch {
      // sem o wordmark a imagem sai do mesmo jeito
    }

    copia.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `outdoormidia-${cena.id}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }, 'image/png')
  }

  const podeBaixar = pronto && Boolean(logo)
  const corDaPaleta = PALETA.some((p) => p.cor === cor)
  const porcentagem = Math.round(escala * 100)
  const preenchido = ((escala - ESCALA_MINIMA) / (ESCALA_MAXIMA - ESCALA_MINIMA)) * 100

  return (
    <div className="reveal" onKeyDown={aoTeclar}>
      {/* 01 · Plataforma */}
      <span className="eyebrow text-ink-soft">{t('passos.plataforma')}</span>
      <div className="mt-4 flex flex-wrap gap-2">
        {plataformas.map((p) => (
          <Chip key={p.slug} ativo={p.slug === plataforma} onClick={() => escolherPlataforma(p.slug)}>
            {p.name}
          </Chip>
        ))}
      </div>

      {plataforma && (
        <ul className="rail mt-5 pb-2" aria-label={t('paineis')}>
          {paineis.map((m) => {
            const ativo = m.id === mockupId
            return (
              <li key={m.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setMockupId(m.id)}
                  className={`group block w-[148px] rounded-[10px] p-1 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                    ativo ? 'bg-orange/10' : ''
                  }`}
                >
                  <span
                    className={`relative block aspect-video overflow-hidden rounded-[8px] border-2 transition-colors ${
                      ativo ? 'border-orange' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={m.imagem}
                      alt=""
                      fill
                      sizes="148px"
                      className={`object-cover transition-[filter,opacity] duration-200 ${
                        ativo ? '' : 'opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-1.5 block truncate px-1 text-[12.5px] font-semibold leading-snug ${
                      ativo ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {m.nome}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <div className="mt-8 grid grid-cols-[340px_minmax(0,1fr)] gap-6 max-tab:grid-cols-1">
        {/* 02 · Sua arte */}
        <div className="ticks self-start rounded-[16px] border border-line bg-white p-6 max-mob:p-5">
          <span className="eyebrow text-ink-soft">{t('passos.arte')}</span>

          <input
            ref={arquivoRef}
            type="file"
            accept="image/png"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              receber(e.target.files?.[0])
              e.target.value = ''
            }}
          />

          {logo ? (
            <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-line bg-paper p-2.5">
              <button
                type="button"
                onClick={abrirArquivo}
                className="size-12 shrink-0 rounded-[8px] border border-line bg-white bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url("${logo.url}")` }}
                aria-label={t('arraste')}
              />
              <button
                type="button"
                onClick={abrirArquivo}
                className="min-w-0 flex-1 truncate text-left text-[13.5px] font-semibold text-ink"
                title={logo.nome}
              >
                {logo.nome}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLogo(null)
                  setErro(null)
                }}
                aria-label={t('remover')}
                className="radial-reveal grid size-8 shrink-0 place-items-center rounded-full text-ink-soft [--rr-fill:var(--color-orange)] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={abrirArquivo}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  abrirArquivo()
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                setArrastando(true)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setArrastando(true)
              }}
              onDragLeave={() => setArrastando(false)}
              onDrop={soltar}
              className={`mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-[10px] border-[1.5px] border-dashed px-4 py-6 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                arrastando ? 'border-orange bg-orange/5' : 'border-line-2 bg-paper hover:border-orange'
              }`}
            >
              <Upload size={24} className="text-orange" />
              <span className="text-[14px] font-bold text-ink">{t('arraste')}</span>
              <span className="text-[12.5px] leading-snug text-ink-soft">{t('formato')}</span>
            </div>
          )}

          {erro && (
            <p className="field-error mt-3" role="alert">
              {t(erro)}
            </p>
          )}

          <div className="mt-6">
            <span className="field-label">{t('corDoPainel')}</span>
            <div className="mt-3 grid grid-cols-5 gap-2.5 max-mob:gap-2">
              {PALETA.map((p) => {
                const ativo = p.cor === cor
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={ativo}
                    aria-label={t(`cores.${p.key}`)}
                    title={t(`cores.${p.key}`)}
                    onClick={() => setCor(p.cor)}
                    style={{ background: p.cor }}
                    className={`aspect-square rounded-full border border-line transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                      ativo ? 'ring-2 ring-orange ring-offset-2 ring-offset-white' : ''
                    }`}
                  />
                )
              })}
              <label
                title={t('corPersonalizada')}
                className={`relative grid aspect-square cursor-pointer place-items-center rounded-full border-[1.5px] border-dashed border-line-2 text-[18px] leading-none text-ink-soft transition-transform hover:scale-110 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange ${
                  corDaPaleta ? '' : 'ring-2 ring-orange ring-offset-2 ring-offset-white'
                }`}
                style={corDaPaleta ? undefined : { background: cor, color: '#fff' }}
              >
                +
                <input
                  type="color"
                  value={cor}
                  aria-label={t('corPersonalizada')}
                  onChange={(e) => setCor(e.target.value)}
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
              </label>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="sua-marca-tamanho" className="field-label">
                {t('tamanho')}
              </label>
              <span className="font-display text-sm text-orange tabular-nums">{porcentagem}%</span>
            </div>
            <input
              id="sua-marca-tamanho"
              type="range"
              min={ESCALA_MINIMA * 100}
              max={ESCALA_MAXIMA * 100}
              step={1}
              value={porcentagem}
              data-respondida="true"
              style={{ '--fill': `${preenchido}%` }}
              onChange={(e) => setEscala(Number(e.target.value) / 100)}
              className="range-nota mt-2"
            />
          </div>

          <div className="mt-7 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={baixar}
              disabled={!podeBaixar}
              className="btn btn-fill justify-center disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={20} />
              {t('baixar')}
            </button>
            <a
              className="btn btn-ghost justify-center"
              href={waLink(
                comIdioma(waSuaMarca({ plataforma: nomePlataforma, painel: mockup?.nome }), locale)
              )}
            >
              {t('enviar')}
            </a>
          </div>

          <p className="mt-4 text-[12.5px] leading-snug text-ink-soft">{t('nota')}</p>
        </div>

        {/* 03 · Resultado */}
        <div className="min-w-0">
          <span className="eyebrow text-ink-soft">{t('passos.resultado')}</span>
          <div
            className="relative mt-4 overflow-hidden rounded-[16px] bg-ink"
            style={{ aspectRatio: mockup ? `${mockup.largura} / ${mockup.altura}` : '16 / 9' }}
          >
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={mockup ? t('resultadoAlt', { painel: mockup.nome }) : t('vazio')}
              tabIndex={mockup ? 0 : -1}
              className={`block size-full transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange ${
                mockup && pronto ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!mockup && (
              <p className="absolute inset-0 m-0 grid place-items-center px-8 text-center text-[17px] font-bold text-white/85">
                {t('vazio')}
              </p>
            )}
            {mockup && !pronto && (
              <p className="absolute inset-0 m-0 grid place-items-center px-8 text-center text-[15px] font-semibold text-white/70">
                {t('carregando')}
              </p>
            )}
            {mockup && pronto && !logo && (
              <p className="pointer-events-none absolute inset-x-4 bottom-4 m-0 mx-auto w-fit max-w-full rounded-full bg-ink/75 px-4 py-2 text-center text-[13px] font-semibold text-white backdrop-blur-sm">
                {t('subaLogo')}
              </p>
            )}
          </div>
          <p className="mt-3 min-h-[1.5em] text-[13.5px] text-ink-soft" aria-live="polite">
            {mockup ? [mockup.nome, mockup.endereco, t('painelReal')].filter(Boolean).join(' · ') : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
