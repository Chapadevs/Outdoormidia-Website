import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PRATICAS, getPraticas, getSaidas } from '@/lib/melhoresPraticas'


// O título comercial e o título de busca não são o mesmo texto. "Melhores
// práticas" é o nome da ferramenta dentro do site, e ninguém busca por ele:
// quem está neste momento de decisão busca "como escolher outdoor" e "como
// fazer campanha de outdoor".
// Fora do índice até o escopo do Face Única ser confirmado com a Alexandra
// (ponto de validação 01 do checklist). A prática 06 diz que a face é
// dedicada a uma marca só em toda a nossa operação, e essa é a
// afirmação de maior exposição da página: ela já está escrita como garantia
// no FAQ, e a base de plataformas registra o Face Única documentado apenas
// no Mosaico Square. Ao liberar, apagar este `robots` e o `noindex` de
// lib/seo.js na mesma alteração.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('melhoresPraticas.titulo')
  const descricao = t('melhoresPraticas.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/area-do-anunciante/melhores-praticas', locale),
    robots: { index: false },
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

const num = (i) => String(i + 1).padStart(2, '0')

// A linha de aplicação da prática 04 carrega um link no meio da frase. O texto
// continua sendo um só campo em lib/, e é aqui que ele é partido: guardar JSX
// no arquivo de conteúdo obrigaria quem edita a copy a mexer em markup.
function LinhaDeAplicacao({ pratica, praticaLink }) {
  if (!praticaLink) return pratica

  const [antes, depois] = pratica.split(praticaLink.trecho)
  return (
    <>
      {antes}
      <Link href={praticaLink.href} className="font-bold text-orange hover:underline">
        {praticaLink.trecho}
      </Link>
      {depois}
    </>
  )
}

export default async function MelhoresPraticasPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Melhores práticas' },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Área do anunciante · {PRATICAS.length} práticas</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Melhores
              <br />
              práticas.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Oito decisões que separam a campanha que funciona da campanha que só aparece.
              Nenhuma delas depende de orçamento grande, todas dependem de escolher antes de
              comprar.
            </p>
          </div>
        </section>

        {/* A segunda frase do primeiro parágrafo é a mais importante da página:
            ela desarma o leitor sem corrigi-lo, que é a única forma de o
            Marcelo continuar lendo. */}
        <section className="bg-bone py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <h2 className="reveal m-0 max-w-[22ch] text-balance text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
              A maior parte das campanhas de rua começa pelo lugar errado.
            </h2>
            <div className="reveal mt-8 flex max-w-[62ch] flex-col gap-5 text-lg text-ink-soft">
              <p className="m-0">
                A pergunta mais comum que o nosso time comercial recebe é sobre um painel
                específico, quase sempre o que a pessoa vê todo dia no caminho de casa. É um
                ótimo começo de conversa e um péssimo começo de campanha.
              </p>
              <p className="m-0">
                O que está reunido aqui é o que 67 anos de operação ensinaram sobre a
                diferença entre estar na cidade e estar na rotina de quem você quer alcançar.
              </p>
            </div>
          </div>
        </section>

        <section className="py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <SectionHeading title="As oito práticas" className="reveal mb-[34px]" />
            <ol className="m-0 grid list-none grid-cols-2 gap-[18px] p-0 max-tab:grid-cols-1">
              {getPraticas(locale).map((p, i) => (
                <li
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.titulo}
                >
                  <span className="text-[34px] font-extrabold leading-none text-orange">
                    {num(i)}
                  </span>
                  <h3 className="m-0 text-[25px] font-extrabold leading-tight text-ink">
                    {p.titulo}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.corpo}</p>

                  {p.recomendacoes && (
                    <div className="mt-2 rounded-[10px] border border-line bg-paper p-5">
                      <span className="eyebrow">{p.recomendacoes.titulo}</span>
                      <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                        {p.recomendacoes.texto}
                      </p>
                    </div>
                  )}

                  {p.pratica && (
                    <p className="m-0 mt-auto border-l-2 border-orange pl-5 pt-0 text-[15.5px] leading-relaxed text-ink">
                      <strong className="font-extrabold">Na prática:</strong>{' '}
                      <LinhaDeAplicacao pratica={p.pratica} praticaLink={p.praticaLink} />
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-bone py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <SectionHeading title="Para onde ir depois" className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {getSaidas(locale).map((s) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={s.href}
                  key={s.href}
                >
                  <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {s.titulo}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{s.texto}</p>
                  <span
                    aria-hidden
                    className="mt-auto pt-5 text-base text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-orange"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
