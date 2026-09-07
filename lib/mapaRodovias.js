// Arquivo gerado por scripts/generate-rodovias-map.mjs — não editar manualmente.
// Geometria do mapa da rede de Rodovias, projetada em Mercator de coordenadas reais.
export const VIEW_W = 820
export const VIEW_H = 1120

export const CORREDORES = [
  {
    id: 'br277w',
    br: 'BR-277',
    nome: 'Curitiba a Ponta Grossa',
    w: 15,
    nos: ['cwb', 'cla', 'pgr'],
    d: 'M422.39,243.63C422.39,243.63 365.47,255.81 338.21,251.5C309.99,247.03 281.57,231.17 256.12,215.79C230.25,200.17 207.07,175.35 184.45,158.15C166.14,144.23 140.74,126.66 132,120.36',
  },
  {
    id: 'br277e',
    br: 'BR-277',
    nome: 'Curitiba ao Porto de Paranaguá',
    w: 15,
    nos: ['cwb', 'sjp', 'pnl'],
    d: 'M422.39,243.63C422.39,243.63 432.97,272.84 444.08,278.2C459.07,285.44 488.98,270.28 510.21,266.29C529.33,262.7 547.07,254.53 565.59,255.47C585.07,256.45 605.42,270.73 624.23,273.51C640.01,275.84 662.37,273.66 670,273.69',
  },
  {
    id: 'br116n',
    br: 'BR-116',
    nome: 'Contorno Norte, sentido São Paulo',
    w: 14,
    nos: ['cwb', 'cgs'],
    d: 'M422.39,243.63C422.39,243.63 403.52,221.95 405.97,215.79C408.62,209.12 430.03,207.23 441.8,206.78C452.81,206.35 465.41,214.87 474.38,212.19C481.9,209.94 486.33,202.47 492.95,195.97C503.12,185.96 520.91,164.45 526.5,158.15',
  },
  {
    id: 'contorno',
    br: 'BR-116',
    nome: 'Contorno Leste, por Piraquara',
    w: 11,
    nos: ['pir', 'sjp'],
    d: 'M474.38,212.19C474.38,212.19 484.78,230.97 487.41,237.43C488.67,240.52 490.01,242.2 490.02,245.36C490.02,252.28 484.88,267.97 477.64,273.51C469.96,279.39 449.67,277.42 444.08,278.2',
  },
  {
    id: 'br116s',
    br: 'BR-116',
    nome: 'Curitiba a Mandirituba',
    w: 13,
    nos: ['cwb', 'frg', 'man'],
    d: 'M422.39,243.63C422.39,243.63 413.53,299.87 410.2,322.99C407.89,339.07 409.63,352.58 404.34,366.38C398.33,382.08 378.55,403.48 373.39,410.9',
  },
  {
    id: 'br376',
    br: 'BR-376',
    nome: 'Curitiba a Garuva',
    w: 15,
    nos: ['sjp', 'gar'],
    d: 'M444.08,278.2C444.08,278.2 453.07,319.48 461.35,338.54C469.66,357.69 480.25,374.97 493.92,392.8C511.09,415.18 547.95,447.74 558.75,458.73',
  },
  {
    id: 'br101',
    br: 'BR-101',
    nome: 'Garuva a Florianópolis',
    w: 16,
    nos: ['gar', 'joi', 'bvl', 'nav', 'bcm', 'flo'],
    d: 'M558.75,458.73C558.75,458.73 553.3,524.2 560.38,557.46C568.74,596.76 602.67,637.74 612.83,676.82C621.37,709.67 618.72,754.39 622.93,773.87C624.35,780.46 626.41,783.83 627.49,789.22C628.69,795.21 628.58,800.32 629.44,808.22C631.7,828.93 636.4,869.39 640.52,902.65C645.44,942.43 654.36,1008.47 657.13,1029.64',
  },
  {
    id: 'br470',
    br: 'BR-470',
    nome: 'Navegantes a Blumenau',
    w: 11,
    nos: ['nav', 'blu'],
    d: 'M622.93,773.87C622.93,773.87 580.74,773.42 559.08,774.6C536.05,775.86 500.44,780.39 488.71,781.54',
  },
  {
    id: 'br407',
    br: 'BR-407',
    nome: 'Paranaguá a Guaratuba',
    w: 11,
    nos: ['pnl', 'ptl', 'gua', 'gar'],
    d: 'M670,273.69C670,273.69 670.46,311.14 669.19,328.78C668.04,344.67 667.46,361.11 663.32,374.7C659.92,385.88 656.14,395.91 648.66,404.75C639.22,415.92 622.32,423.92 607.94,432.64C592.48,442.01 566.95,454.38 558.75,458.73',
  },
]

export const SETAS = [
  { id: 'br277w', transform: 'translate(258.71,241.15) rotate(-149.48)' },
  { id: 'br277w', transform: 'translate(279.53,205.83) rotate(30.52)' },
  { id: 'br277e', transform: 'translate(525.54,241.35) rotate(-14.74)' },
  { id: 'br277e', transform: 'translate(535.97,281) rotate(165.26)' },
  { id: 'br116n', transform: 'translate(459.92,189.73) rotate(15.72)' },
  { id: 'br116n', transform: 'translate(449.08,228.24) rotate(195.72)' },
  { id: 'contorno', transform: 'translate(505.88,260.41) rotate(111.29)' },
  { id: 'contorno', transform: 'translate(471.41,246.98) rotate(291.29)' },
  { id: 'br116s', transform: 'translate(429.25,327.55) rotate(94.59)' },
  { id: 'br116s', transform: 'translate(390.38,324.43) rotate(274.59)' },
  { id: 'br376', transform: 'translate(497.57,362.58) rotate(55.57)' },
  { id: 'br376', transform: 'translate(463.76,385.77) rotate(235.57)' },
  { id: 'br101', transform: 'translate(616.54,630.17) rotate(64.07)' },
  { id: 'br101', transform: 'translate(578.77,648.54) rotate(244.07)' },
  { id: 'br101', transform: 'translate(652.74,827.58) rotate(83.43)' },
  { id: 'br101', transform: 'translate(611.02,832.38) rotate(263.43)' },
  { id: 'br470', transform: 'translate(562.82,792.94) rotate(176.37)' },
  { id: 'br470', transform: 'translate(560.48,756.01) rotate(356.37)' },
  { id: 'br407', transform: 'translate(675.77,394.92) rotate(116.25)' },
  { id: 'br407', transform: 'translate(642.59,378.55) rotate(296.25)' },
]

export const ETIQUETAS = [
  { id: 'br277w', br: 'BR-277', largura: 66.4, transform: 'translate(241.69,206.04) rotate(36.36) translate(0,-37.5)' },
  { id: 'br277e', br: 'BR-277', largura: 66.4, transform: 'translate(600.13,265.86) rotate(21.28) translate(0,-37.5)' },
  { id: 'br116n', br: 'BR-116', largura: 66.4, transform: 'translate(433.78,207.25) rotate(-3.67) translate(0,-37)' },
  { id: 'br376', br: 'BR-376', largura: 66.4, transform: 'translate(484,379.16) rotate(55.63) translate(0,-37.5)' },
  { id: 'br101', br: 'BR-101', largura: 66.4, transform: 'translate(591.39,627.37) rotate(62.08) translate(0,-38)' },
  { id: 'br470', br: 'BR-470', largura: 66.4, transform: 'translate(555.66,774.81) rotate(-3.52) translate(0,-35.5)' },
  { id: 'br407', br: 'BR-407', largura: 66.4, transform: 'translate(663.47,374.22) rotate(-74.42) translate(0,-35.5)' },
]

export const NOS = [
  { id: 'cwb', nome: 'Curitiba', tier: 1, x: 422.39, y: 243.63, r: 21, fs: 17, anchor: 'middle', tx: 0, ty: -36, entrelinha: 18.7, linhas: ['CURITIBA'] },
  { id: 'pnl', nome: 'Paranaguá', tier: 2, x: 670, y: 273.69, r: 16, fs: 14, anchor: 'start', tx: 25, ty: 4.76, entrelinha: 15.4, linhas: ['PARANAGUÁ'] },
  { id: 'flo', nome: 'Florianópolis', tier: 2, x: 657.13, y: 1029.64, r: 16, fs: 14, anchor: 'start', tx: 25, ty: 4.76, entrelinha: 15.4, linhas: ['FLORIANÓPOLIS'] },
  { id: 'joi', nome: 'Joinville', tier: 2, x: 560.38, y: 557.46, r: 16, fs: 14, anchor: 'end', tx: -25, ty: 4.76, entrelinha: 15.4, linhas: ['JOINVILLE'] },
  { id: 'pgr', nome: 'Ponta Grossa', tier: 2, x: 132, y: 120.36, r: 16, fs: 14, anchor: 'middle', tx: 0, ty: 37.04, entrelinha: 15.4, linhas: ['PONTA GROSSA'] },
  { id: 'sjp', nome: 'São José dos Pinhais', tier: 3, x: 444.08, y: 278.2, r: 11, fs: 11.5, anchor: 'middle', tx: 0, ty: 29.89, entrelinha: 12.65, linhas: ['SÃO JOSÉ', 'DOS PINHAIS'] },
  { id: 'cla', nome: 'Campo Largo', tier: 3, x: 338.21, y: 251.5, r: 11, fs: 11.5, anchor: 'middle', tx: 0, ty: 29.89, entrelinha: 12.65, linhas: ['CAMPO LARGO'] },
  { id: 'frg', nome: 'Fazenda Rio Grande', tier: 3, x: 410.2, y: 322.99, r: 11, fs: 11.5, anchor: 'end', tx: -20, ty: -2.42, entrelinha: 12.65, linhas: ['FAZENDA', 'RIO GRANDE'] },
  { id: 'blu', nome: 'Blumenau', tier: 3, x: 488.71, y: 781.54, r: 11, fs: 11.5, anchor: 'end', tx: -20, ty: 3.91, entrelinha: 12.65, linhas: ['BLUMENAU'] },
  { id: 'bcm', nome: 'Bal. Camboriú', tier: 3, x: 629.44, y: 808.22, r: 11, fs: 11.5, anchor: 'start', tx: 20, ty: -2.42, entrelinha: 12.65, linhas: ['BAL.', 'CAMBORIÚ'] },
  { id: 'nav', nome: 'Navegantes', tier: 3, x: 622.93, y: 767.87, r: 11, fs: 11.5, anchor: 'end', tx: -20, ty: 3.91, entrelinha: 12.65, linhas: ['NAVEGANTES'] },
  { id: 'cgs', nome: 'Campina Grande do Sul', tier: 4, x: 492.95, y: 195.97, r: 6.5, fs: 10.5, anchor: 'start', tx: 15.5, ty: 3.57, entrelinha: 11.55, linhas: ['CAMPINA GRANDE DO SUL'] },
  { id: 'pir', nome: 'Piraquara', tier: 4, x: 490.02, y: 245.36, r: 6.5, fs: 10.5, anchor: 'start', tx: 15.5, ty: 3.57, entrelinha: 11.55, linhas: ['PIRAQUARA'] },
  { id: 'man', nome: 'Mandirituba', tier: 4, x: 404.34, y: 366.38, r: 6.5, fs: 10.5, anchor: 'end', tx: -15.5, ty: 3.57, entrelinha: 11.55, linhas: ['MANDIRITUBA'] },
  { id: 'gar', nome: 'Garuva', tier: 4, x: 558.75, y: 458.73, r: 6.5, fs: 10.5, anchor: 'end', tx: -15.5, ty: 3.57, entrelinha: 11.55, linhas: ['GARUVA'] },
  { id: 'gua', nome: 'Guaratuba', tier: 4, x: 648.66, y: 404.75, r: 6.5, fs: 10.5, anchor: 'start', tx: 15.5, ty: 3.57, entrelinha: 11.55, linhas: ['GUARATUBA'] },
  { id: 'ptl', nome: 'Pontal do Paraná', tier: 4, x: 669.19, y: 328.78, r: 6.5, fs: 10.5, anchor: 'start', tx: 15.5, ty: 3.57, entrelinha: 11.55, linhas: ['PONTAL DO PARANÁ'] },
  { id: 'bvl', nome: 'Barra Velha', tier: 4, x: 612.83, y: 676.82, r: 6.5, fs: 10.5, anchor: 'start', tx: 15.5, ty: 3.57, entrelinha: 11.55, linhas: ['BARRA VELHA'] },
]

// Referência de distância, não região atendida.
export const SAO_PAULO = { x: 526.5, y: 156.15, label: 'SÃO PAULO', sub: '369 km' }

export const ESCALA = { x: 60, y: 1066, px: 164.51, label: '50 KM' }
export const NORTE = { x: 74, y: 988 }

// Ordem oficial das BRs (regra 3 do handoff), usada nos filtros.
export const BRS = ['BR-101', 'BR-116', 'BR-277', 'BR-376', 'BR-407', 'BR-470']
