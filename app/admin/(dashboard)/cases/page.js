import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteCaseButton from '@/components/widgets/DeleteCaseButton'
import { listAllCases } from '@/lib/cases/cases'
import { PLATFORMS } from '@/lib/platforms'

export const metadata = {
  title: 'Cases — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
const PLATFORM_NAMES = new Map(PLATFORMS.map((p) => [p.slug, p.name]))

export default async function AdminCasesPage() {
  const cases = await listAllCases()

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb items={[{ label: 'Painel Admin', href: '/admin' }, { label: 'Cases' }]} />
      <div className="wrap mt-9">
        <div className="flex items-end justify-between gap-4 max-mob:flex-col max-mob:items-start">
          <div>
            <div className="eyebrow">
              Painel <b>Cases</b>
            </div>
            <h1 className="display mt-3 text-[clamp(36px,5vw,64px)] text-ink">Cases</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/tags/cases"
              className="btn border-ink text-ink hover:border-orange hover:text-orange"
            >
              Gerenciar tags
            </Link>
            <Link href="/admin/cases/novo" className="btn btn-fill">
              Novo case
            </Link>
          </div>
        </div>

        {cases.length === 0 ? (
          <p className="mt-10 text-lg text-ink-soft">
            Nenhum case ainda. Crie o primeiro em “Novo case”.
          </p>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-2">
                  <th className="eyebrow py-3 pr-4">Título</th>
                  <th className="eyebrow py-3 pr-4">Plataformas</th>
                  <th className="eyebrow py-3 pr-4">Status</th>
                  <th className="eyebrow py-3 pr-4">Atualizado</th>
                  <th className="eyebrow py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b border-line">
                    <td className="py-4 pr-4">
                      <span className="font-extrabold">{caseItem.title}</span>
                      <span className="block text-sm text-ink-soft">/cases · {caseItem.slug}</span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-ink-soft">
                      {caseItem.platforms.length > 0
                        ? caseItem.platforms
                            .map((slug) => PLATFORM_NAMES.get(slug) || slug)
                            .join(', ')
                        : '—'}
                    </td>
                    <td className="py-4 pr-4">
                      {caseItem.status === 'published' ? (
                        <span className="rounded-[2px] bg-orange px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white">
                          Publicado
                        </span>
                      ) : (
                        <span className="rounded-[2px] border border-line-2 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
                          Rascunho
                        </span>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-sm text-ink-soft">
                      {caseItem.updatedAt ? DATE_FMT.format(new Date(caseItem.updatedAt)) : '—'}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/cases/${caseItem.id}`}
                          className="text-sm font-semibold text-ink underline hover:text-orange"
                        >
                          Editar
                        </Link>
                        {caseItem.status === 'published' && (
                          <Link
                            href="/cases"
                            className="text-sm font-semibold text-ink-soft underline hover:text-orange"
                          >
                            Ver
                          </Link>
                        )}
                        <DeleteCaseButton id={caseItem.id} title={caseItem.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
