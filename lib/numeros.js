import { PLATFORMS_LISTAGEM } from '@/lib/platforms'

// Os quatro números da marca, no quadro fechado no checklist da home
// (claude/checklist-home.md, item 04).
//
// Fonte única de propósito: o mesmo quadro monta a faixa da home, a de /sobre e
// a de /trabalhe-conosco. Foi cópia própria por página que produziu os 380
// milhões de impactos e os 82 equipamentos digitais que saíram de circulação.
// Não recriar a lista dentro de um componente.
//
// A contagem de plataformas sai da própria listagem para não desencontrar do
// carrossel da home quando o catálogo mudar; hoje ela dá os 9 do checklist.
//
// Os 312 m² são a área do Aeroporto Square. O Distrito de Mídia Duo Square, que
// o abriga, tem 577,5 m² e aparece no card da plataforma — são dois ativos, não
// duas medidas do mesmo.
export const NUMEROS_MARCA = [
  { n: String(PLATFORMS_LISTAGEM.length), label: 'Plataformas integradas' },
  { n: '312 m²', label: 'Maior painel híbrido do Sul do Brasil em área visual' },
  { n: '+530M', label: 'Impactos por mês' },
  {
    n: 'DOOH',
    label: 'Maior network regional no Sul do Brasil: 175 telas com 20 milhões de impactos semanais',
  },
]
