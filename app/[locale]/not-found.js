import { Link } from '@/i18n/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPlatformsNav } from '@/lib/platforms'
import { getDiferenciaisNav } from '@/lib/diferenciais'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import { WA_404, waLink } from '@/lib/whatsapp'
import { getLocale, getTranslations } from 'next-intl/server'

// 404 do site inteiro. Vale para URL digitada errada e para todo notFound() das
// rotas dinâmicas (plataformas, icônicos, posts do blog).
//
// Header e Footer entram aqui porque o app/layout.js não os renderiza — só
// WhatsAppButton, RevealObserver e CookieNotice são globais.
//
// Sem `export const metadata`: not-found.js do App Router não a suporta, o
// título cai no do layout raiz e o status 404 é do próprio Next.

// O texto de cada card vive em `NotFound.rotas` nos quatro messages/*.json e
// entra por posição sobre esta lista, que só guarda o destino.
const ROTAS = ['/plataformas', '/solucoes/regioes-cobertura', '/cases', '/proposta']

export default async function NotFound() {
  const locale = await getLocale()
  const t = await getTranslations('NotFound')
  const rotas = ROTAS.map((href, i) => ({ href, ...t.raw('rotas')[i] }))

  return (
    <>
      <Header plataformas={getPlatformsNav(locale)} diferenciais={getDiferenciaisNav(locale)} />
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow')} <b>404</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('tituloA')}
              <br />
              {t('tituloB')}
            </h1>
            <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('paraOndeIr')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {rotas.map((r) => (
                <Link
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={r.href}
                  key={r.href}
                >
                  <span className="eyebrow">{r.meta}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {r.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{r.text}</p>
                  <span className="mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-orange">
                    {t('ver')} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('ajudaTitulo')}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  {t('ajudaTexto')}
                </p>
              </div>
              <a className="btn btn-fill whitespace-nowrap" href={waLink(WA_404)}>
                {t('ajudaCta')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
