import { getTranslations } from 'next-intl/server'
import MapaCobertura from '@/components/ui/MapaCobertura'
import { WA_COBERTURA, waLink } from '@/lib/whatsapp'

// `moldura` desliga a borda e o arredondamento do card. Na home a seção corre
// solta sobre o fundo; em /solucoes/regioes-cobertura ela continua emoldurada,
// porque lá o card precisa ter começo e fim visíveis.
export default async function CoverageExplorer({ eyebrow, moldura = true }) {
  const t = await getTranslations('CoverageExplorer')
  const rotulo = eyebrow === undefined ? t('eyebrowPadrao') : eyebrow

  return (
    <div
      className={`reveal overflow-hidden bg-paper ${
        moldura ? 'rounded-[16px] border border-line' : ''
      }`}
    >
      <div className="grid grid-cols-[1.05fr_1fr] items-stretch max-tab:grid-cols-1">
        <div className="flex flex-col justify-between px-14 pb-14 pt-[72px] max-tab:p-10 max-mob:px-6 max-mob:py-9">
          <div>
            {rotulo && (
              <div className="flex items-center gap-3.5">
                <span className="eyebrow">{rotulo}</span>
                <span className="h-px flex-1 bg-line"></span>
              </div>
            )}
            <h2
              className={`display max-w-[14ch] text-[clamp(34px,5.2vw,68px)] text-ink ${
                rotulo ? 'mt-[26px]' : ''
              }`}
            >
              {t('tituloA')}
              <br />
              {t('tituloB')}
              <br />
              {t('tituloC')}
              <br />
              {t('tituloAntesDestaque')}
              <span className="text-orange">{t('tituloDestaque')}</span>
              <br />
              {t('tituloD')}
            </h2>
            <p className="mt-7 max-w-[42ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <a href={waLink(WA_COBERTURA)} className="btn btn-fill">
              {t('cta')}
            </a>
            <span className="text-[13px] font-semibold text-ink-soft">
              {t('resposta')}
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
