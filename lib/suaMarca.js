// Os painéis da ferramenta Sua marca no OOH (/area-do-anunciante/sua-marca-no-ooh).
//
// Cada entrada é uma foto real de painel da rede, tratada no padrão do protótipo
// da Imagine Concept: área útil em laranja sólido, resto em preto e branco. A
// ferramenta pinta a área útil com a cor que o visitante escolher e encaixa a
// logo dele ali dentro, em perspectiva.
//
// O que é dado do produto mora aqui: nome oficial, em que plataformas o painel
// aparece, a proporção real de cada face e o brilho relativo dela. O que é
// medido na foto (tamanho do arquivo e os 4 cantos de cada face) vem de
// lib/suaMarcaGeometria.js, gerado por scripts/generate-sua-marca.mjs, e os dois
// se encontram em `getMockups()` pelo `id`, que é também o nome do arquivo.
//
// `plataformas` segue a regra C8 do catálogo (lib/produtos.js): o painel existe
// uma vez e é listado em quantas plataformas precisar. Top Sight, Poster Sight e
// Billboard são produtos de dupla tecnologia, por isso aparecem em Outdoor
// Digital e em Front Light; o Super Top Digital Urbanity é da linha Elegancy e
// também da listagem de Outdoor Digital, como em lib/platforms.js.
//
// TODO(cliente): o mapa painel → plataforma abaixo foi derivado do catálogo e do
// nome de cada foto; falta o Marketing confirmar, e falta o endereço de cada
// ponto (`endereco`), que o checklist pede na legenda. Painel nomeado na vitrine
// é promessa de disponibilidade: o comercial precisa confirmar que os 12 são
// vendáveis. Aeroporto, Mídia Móvel, Rodovias e Digital Signage ainda não têm
// foto e por isso não aparecem no seletor, que é derivado desta lista.
//
// `arte` é a proporção real da face, [largura, altura], e é ela que define a
// homografia: a logo é composta num retângulo dessa proporção e levada aos 4
// cantos da foto. Em foto frontal a proporção medida no quadrilátero confere
// com ela; em perspectiva forte (Top Sight, as faces laterais de Batel e
// Champagnat) só a declarada vale. Onde o catálogo e a foto discordavam, valeu
// a foto: Relógio Digital mede 9:16 em foto frontal, não os 3:4 do catálogo.
//
// `luz` multiplica o brilho da face. É o que faz a face lateral de um painel
// dobrado ler como volume; sem ele o painel parece adesivo colado.
//
// Só import relativo neste arquivo: scripts/generate-sua-marca.mjs o importa
// direto no Node, onde o alias `@/` não existe.
import { GEOMETRIA } from './suaMarcaGeometria.js'

export const MOCKUPS = [
  {
    id: 'batel-square',
    nome: 'Batel Square',
    plataformas: ['projetos-iconicos'],
    endereco: null,
    faces: [
      { arte: [1024, 512], luz: 1 },
      { arte: [1024, 512], luz: 0.88 },
    ],
  },
  {
    id: 'champagnat-square',
    nome: 'Champagnat Square',
    plataformas: ['projetos-iconicos'],
    endereco: null,
    faces: [
      { arte: [512, 512], luz: 0.9 },
      { arte: [1024, 512], luz: 1 },
    ],
  },
  {
    id: 'jardim-vertical',
    nome: 'Jardim Vertical',
    plataformas: ['projetos-iconicos'],
    endereco: null,
    faces: [{ arte: [1024, 1024], luz: 1 }],
  },
  {
    id: 'super-top-digital-urbanity',
    nome: 'Super Top Digital Urbanity',
    plataformas: ['projetos-iconicos', 'outdoors-digitais'],
    endereco: null,
    faces: [{ arte: [768, 1024], luz: 1 }],
  },
  {
    id: 'top-sight',
    nome: 'Top Sight',
    plataformas: ['outdoors-digitais', 'front-lights'],
    endereco: null,
    faces: [{ arte: [768, 1024], luz: 1 }],
  },
  {
    id: 'poster-sight',
    nome: 'Poster Sight',
    plataformas: ['outdoors-digitais', 'front-lights'],
    endereco: null,
    faces: [{ arte: [1024, 512], luz: 1 }],
  },
  {
    id: 'billboard',
    nome: 'Billboard',
    plataformas: ['outdoors-digitais', 'front-lights'],
    endereco: null,
    faces: [{ arte: [1536, 512], luz: 1 }],
  },
  {
    id: 'mega-banner',
    nome: 'Mega Banner',
    plataformas: ['shoppings'],
    endereco: null,
    faces: [{ arte: [640, 1024], luz: 1 }],
  },
  {
    id: 'totem',
    nome: 'Totem',
    plataformas: ['shoppings'],
    endereco: null,
    faces: [{ arte: [1080, 1920], luz: 1 }],
  },
  {
    id: 'banca-horizontal',
    nome: 'Banca Horizontal',
    plataformas: ['mub'],
    endereco: null,
    faces: [{ arte: [1024, 512], luz: 1 }],
  },
  {
    id: 'banca-vertical',
    nome: 'Banca Vertical',
    plataformas: ['mub'],
    endereco: null,
    faces: [{ arte: [768, 1024], luz: 1 }],
  },
  {
    id: 'relogio',
    nome: 'Relógio Digital',
    plataformas: ['mub'],
    endereco: null,
    faces: [{ arte: [576, 1024], luz: 1 }],
  },
]

// As cores de painel oferecidas ao visitante. São opções dele, não tokens da
// marca, e por isso não viram utilitárias do Tailwind; só o laranja é o oficial
// e o preto é o `--color-ink` do site, que é a única versão de preto que o
// design system admite. O nome de cada uma está em messages/*.json
// (`SuaMarcaNoOoh.cores.<key>`).
export const PALETA = [
  { key: 'branco', cor: '#FFFFFF' },
  { key: 'preto', cor: '#16110D' },
  { key: 'cinza', cor: '#B9B5AF' },
  { key: 'laranja', cor: '#FF6900' },
  { key: 'vermelho', cor: '#D32B1E' },
  { key: 'azul', cor: '#1B4FD8' },
  { key: 'marinho', cor: '#0E2148' },
  { key: 'verde', cor: '#12874A' },
  { key: 'amarelo', cor: '#F5C518' },
]

export const COR_PADRAO = PALETA[0].cor

// Tamanho da logo dentro da face, como fração da área útil. O padrão deixa
// margem de respiro de 6 % de cada lado.
export const ESCALA_MINIMA = 0.4
export const ESCALA_MAXIMA = 1
export const ESCALA_PADRAO = 0.88

// Slugs de plataforma (lib/platforms.js) que têm ao menos um painel. A ordem em
// que aparecem no seletor é a de `PLATFORMS_LISTAGEM`, não esta.
export const PLATAFORMAS_COM_MOCKUP = [...new Set(MOCKUPS.flatMap((m) => m.plataformas))]

let mockups = null

export function getMockups() {
  if (mockups) return mockups

  mockups = MOCKUPS.map((m) => {
    const g = GEOMETRIA[m.id]
    if (!g) {
      throw new Error(`Sua marca no OOH: "${m.id}" sem geometria. Rodar node scripts/generate-sua-marca.mjs`)
    }
    if (g.faces.length !== m.faces.length) {
      throw new Error(
        `Sua marca no OOH: "${m.id}" declara ${m.faces.length} face(s) e a geometria tem ${g.faces.length}`
      )
    }
    return {
      ...m,
      imagem: `/media/sua-marca/${m.id}.webp`,
      largura: g.largura,
      altura: g.altura,
      faces: m.faces.map((face, i) => ({ ...face, cantos: g.faces[i].cantos })),
    }
  })

  return mockups
}

export function getMockupsPorPlataforma(slug) {
  return getMockups().filter((m) => m.plataformas.includes(slug))
}
