import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { listAllPosts } from '@/lib/blog/posts'
import { listAllCases } from '@/lib/cases/cases'
import { listLocations } from '@/lib/locations'
import { listTags } from '@/lib/tags/tags'
import { TAG_SCOPES } from '@/lib/tags/scopes'

export const metadata = {
  title: 'Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const UPCOMING = [
  {
    title: 'Leads',
    desc: 'Briefings do formulário de proposta e pré-qualificação do WhatsApp em um só lugar.',
  },
  {
    title: 'Avaliações',
    desc: 'Depoimentos de clientes exibidos nas páginas do site.',
  },
  {
    title: 'FAQ',
    desc: 'Perguntas frequentes editáveis, organizadas por tema.',
  },
  {
    title: 'Banco de talentos',
    desc: 'Candidaturas recebidas pela página Trabalhe Conosco.',
  },
  {
    title: 'Downloads',
    desc: 'Mídia kit, especificações técnicas e materiais comerciais.',
  },
]

function plural(count, singular, pluralForm) {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

export default async function AdminDashboardPage() {
  const [posts, cases, locations, tagLists] = await Promise.all([
    listAllPosts(),
    listAllCases(),
    listLocations(),
    Promise.all(TAG_SCOPES.map((s) => listTags(s.id))),
  ])

  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.length - published
  const casesPublished = cases.filter((c) => c.status === 'published').length
  const casesDrafts = cases.length - casesPublished
  const totalTags = tagLists.reduce((sum, tags) => sum + tags.length, 0)

  const AREAS = [
    {
      title: 'Blog',
      href: '/admin/blog',
      stat: posts.length,
      statLabel: `${plural(published, 'publicado', 'publicados')} · ${plural(drafts, 'rascunho', 'rascunhos')}`,
      desc: 'Crie e edite artigos com imagens, tags e status de publicação.',
    },
    {
      title: 'Cases',
      href: '/admin/cases',
      stat: cases.length,
      statLabel: `${plural(casesPublished, 'publicado', 'publicados')} · ${plural(casesDrafts, 'rascunho', 'rascunhos')}`,
      desc: 'Cadastre cases de clientes com tags, plataformas usadas e resultados.',
    },
    {
      title: 'Cobertura',
      href: '/admin/locations',
      stat: locations.length,
      statLabel: plural(locations.length, 'localidade no mapa', 'localidades no mapa'),
      desc: 'Marque as praças onde a Outdoormídia atua. Alimenta o mapa da home.',
    },
    {
      title: 'Tags',
      href: '/admin/tags',
      stat: totalTags,
      statLabel: `em ${TAG_SCOPES.length} escopos: ${TAG_SCOPES.map((s) => s.label.toLowerCase()).join(', ')}`,
      desc: 'Taxonomias que classificam blog, cases e localidades.',
    },
  ]

  return (
    <section className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
      <Breadcrumb items={[{ label: 'Painel Admin' }]} />
      <div className="wrap mt-[56px] max-mob:mt-9">
        <div className="flex items-end justify-between gap-4 max-mob:flex-col max-mob:items-start">
          <div>
            <div className="eyebrow">
              <b>Área restrita</b>
            </div>
            <h1 className="display mt-[18px] text-[clamp(36px,5vw,64px)] text-ink">
              Painel
              <br />
              administrativo.
            </h1>
          </div>
          <Link href="/admin/blog/novo" className="btn btn-fill">
            Novo post
          </Link>
        </div>

        <div className="mt-14 max-mob:mt-10">
          <div className="eyebrow mb-[18px] border-b border-line-2 pb-3">
            Gerenciar <b>agora</b>
          </div>
          <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
            {AREAS.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="ticks group flex flex-col rounded-[2px] border border-line bg-white p-6 transition-colors duration-150 hover:border-orange"
              >
                <div className="flex items-center justify-between">
                  <h2 className="m-0 text-[17px] font-extrabold">{area.title}</h2>
                  <span
                    aria-hidden
                    className="text-orange opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
                <div className="mt-5 font-display text-[44px] leading-none text-ink">
                  {area.stat}
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
                  {area.statLabel}
                </div>
                <p className="m-0 mt-4 text-[13.5px] text-ink-soft">{area.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 max-mob:mt-10">
          <div className="eyebrow mb-[18px] border-b border-line-2 pb-3">
            Próximas <b>áreas</b>
          </div>
          <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
            {UPCOMING.map((item) => (
              <div
                key={item.title}
                className="rounded-[2px] border border-dashed border-line-2 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="m-0 text-[15px] font-extrabold text-ink-soft">{item.title}</h3>
                  <span className="shrink-0 rounded-[2px] border border-line-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                    Em breve
                  </span>
                </div>
                <p className="m-0 mt-3 text-[13px] text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
