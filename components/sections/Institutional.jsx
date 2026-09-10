import StatGrid from '@/components/ui/StatGrid'
import { getLocale, getTranslations } from 'next-intl/server'
import { getNumerosMarca } from '@/lib/numeros'

const VIDEO_SRC = '/media/home/video-institucional.mp4'

export default async function Institutional() {
  const locale = await getLocale()
  const t = await getTranslations('Institutional')
  return (
    <section className="bg-bone py-[110px] max-mob:py-[72px]" id="institucional">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.15fr] items-center gap-[64px] max-tab:grid-cols-1 max-tab:gap-9">
          <div>
            <p className="eyebrow reveal mb-5 text-sm">{t('eyebrow')}</p>
            <h2 className="reveal m-0 text-[clamp(30px,4.4vw,54px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink">
              {t('tituloA')} <span className="text-orange">{t('tituloB')}</span>
            </h2>
            <p className="reveal mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft max-mob:text-base">
              {t('p1Antes')}
              <strong className="font-bold text-orange">{t('p1Anos')}</strong>
              {t('p1Meio')}
              <strong className="font-bold">{t('p1Ooh')}</strong>
              {t('p1Depois')}
            </p>
            <p className="reveal mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft max-mob:text-base">
              {t('p2')}
            </p>
          </div>

          <video
            className="reveal ticks aspect-[16/9] w-full rounded-[16px] border border-line object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>

        <StatGrid className="reveal mt-[72px] max-mob:mt-12" size="md" stats={getNumerosMarca(locale)} />
      </div>
    </section>
  )
}
