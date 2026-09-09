import MapaCobertura from '@/components/ui/MapaCobertura'
import PracaChips from '@/components/ui/PracaChips'
import { WA_COBERTURA, waLink } from '@/lib/whatsapp'

// As praças do checklist da home (claude/checklist-home.md, item 07). A lista
// de /sobre é a mesma sem Rodovias PR-SC, que não é cidade.
const PRACAS = [
  'Curitiba',
  'Região Metropolitana',
  'Litoral do Paraná',
  'Joinville',
  'Itajaí',
  'Balneário Camboriú',
  'Rodovias PR-SC',
]

// `moldura` desliga a borda e o arredondamento do card. Na home a seção corre
// solta sobre o fundo; em /solucoes/regioes-cobertura ela continua emoldurada,
// porque lá o card precisa ter começo e fim visíveis.
export default function CoverageExplorer({ eyebrow = 'Cobertura', moldura = true }) {
  return (
    <div
      className={`reveal overflow-hidden bg-paper ${
        moldura ? 'rounded-[16px] border border-line' : ''
      }`}
    >
      <div className="grid grid-cols-[1.05fr_1fr] items-stretch max-tab:grid-cols-1">
        <div className="flex flex-col justify-between px-14 pb-14 pt-[72px] max-tab:p-10 max-mob:px-6 max-mob:py-9">
          <div>
            {eyebrow && (
              <div className="flex items-center gap-3.5">
                <span className="eyebrow">{eyebrow}</span>
                <span className="h-px flex-1 bg-line"></span>
              </div>
            )}
            <h2
              className={`display max-w-[14ch] text-[clamp(34px,5.2vw,68px)] text-ink ${
                eyebrow ? 'mt-[26px]' : ''
              }`}
            >
              Não basta estar
              <br />
              na cidade.
              <br />
              É preciso estar
              <br />
              no <span className="text-orange">trajeto</span>
              <br />
              do seu público.
            </h2>
            <p className="mt-7 max-w-[42ch] text-lg text-ink-soft">
              A Outdoormídia está em Curitiba, Região Metropolitana, Litoral do Paraná, Joinville,
              Itajaí e Balneário Camboriú, sempre nos pontos de maior fluxo, visibilidade e impacto
              real. Do Batel ao litoral, das rodovias às praias de Santa Catarina, sua marca
              acompanha o trajeto do público nos dois estados.
            </p>
            <PracaChips className="mt-6" pracas={PRACAS} />
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <a href={waLink(WA_COBERTURA)} className="btn btn-fill">
              Consultar disponibilidade
            </a>
            <span className="text-[13px] font-semibold text-ink-soft">
              Resposta no mesmo dia útil
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 max-tab:px-10 max-tab:py-12 max-mob:px-6 max-mob:py-9">
          <div className="w-full max-tab:max-w-[520px]">
            <MapaCobertura />
          </div>
        </div>
      </div>
    </div>
  )
}
