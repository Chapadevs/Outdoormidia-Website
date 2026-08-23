import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteButton from '@/components/widgets/DeleteButton'
import { listAllLeads } from '@/lib/leads/leads'
import { ORIGENS, STATUS_LEAD, rotuloOrigem, rotuloStatus } from '@/lib/leads/origens'
import { DATA_CURTA } from '@/lib/format'

export const metadata = {
  title: 'Leads | Painel Admin | Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const CHIP = 'rounded-full px-2 py-1 text-xs font-bold uppercase tracking-[0.1em]'
const CHIP_CHEIO = `${CHIP} bg-orange text-white`
const CHIP_VAZIO = `${CHIP} border border-line-2 text-ink-soft`

const FILTRO = 'rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150'
const FILTRO_ON = 'border-orange bg-orange text-white'
const FILTRO_OFF = 'border-line text-ink-soft hover:border-orange hover:text-orange'

const OPCOES_ORIGEM = [
  { id: '', label: 'Todas' },
  ...Object.entries(ORIGENS).map(([id, o]) => ({ id, label: o.label })),
]
const OPCOES_STATUS = [{ id: '', label: 'Todos' }, ...STATUS_LEAD]

function Filtros({ chave, rotulo, opcoes, atual, base }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="w-[80px] shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft max-mob:w-full">
        {rotulo}
      </span>
      {opcoes.map((opcao) => {
        const params = new URLSearchParams(base)
        if (opcao.id) params.set(chave, opcao.id)
        else params.delete(chave)
        const query = params.toString()
        return (
          <Link
            aria-current={opcao.id === atual ? 'true' : undefined}
            className={`${FILTRO} ${opcao.id === atual ? FILTRO_ON : FILTRO_OFF}`}
            href={query ? `/admin/leads?${query}` : '/admin/leads'}
            key={opcao.id || 'todas'}
          >
            {opcao.label}
          </Link>
        )
      })}
    </div>
  )
}

export default async function AdminLeadsPage({ searchParams }) {
  const { origem = '', status = '' } = await searchParams
  const leads = await listAllLeads()

  // Filtro em JS, não na query: combinar where + orderBy exigiria índice
  // composto, pelo mesmo motivo documentado em lib/cases/cases.js.
  const visiveis = leads.filter(
    (lead) => (!origem || lead.origem === origem) && (!status || lead.status === status)
  )
  const base = { ...(origem && { origem }), ...(status && { status }) }
  const novos = leads.filter((lead) => lead.status === 'novo').length

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb items={[{ label: 'Painel Admin', href: '/admin' }, { label: 'Leads' }]} />
      <div className="wrap mt-9">
        <div className="flex items-end justify-between gap-4 max-mob:flex-col max-mob:items-start">
          <div>
            <div className="eyebrow">
              Painel <b>Leads</b>
            </div>
            <h1 className="display mt-3 text-[clamp(36px,5vw,64px)] text-ink">Leads</h1>
          </div>
          <p className="m-0 text-sm text-ink-soft">
            {leads.length === 0
              ? 'Nenhum lead recebido'
              : `${leads.length} ${leads.length === 1 ? 'lead recebido' : 'leads recebidos'} · ${novos} ${novos === 1 ? 'novo' : 'novos'}`}
          </p>
        </div>

        {leads.length === 0 ? (
          <p className="mt-10 text-lg text-ink-soft">
            Nenhum lead ainda. Eles aparecem aqui assim que alguém enviar o briefing em
            /proposta ou concluir a pré-qualificação “Sua campanha em poucos passos”.
          </p>
        ) : (
          <>
            <div className="mt-10 flex flex-col gap-3">
              <Filtros
                atual={origem}
                base={base}
                chave="origem"
                opcoes={OPCOES_ORIGEM}
                rotulo="Origem"
              />
              <Filtros
                atual={status}
                base={base}
                chave="status"
                opcoes={OPCOES_STATUS}
                rotulo="Status"
              />
            </div>

            {visiveis.length === 0 ? (
              <p className="mt-10 text-lg text-ink-soft">Nenhum lead com esses filtros.</p>
            ) : (
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[840px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line-2">
                      <th className="eyebrow py-3 pr-4">Recebido</th>
                      <th className="eyebrow py-3 pr-4">Nome</th>
                      <th className="eyebrow py-3 pr-4">Origem</th>
                      <th className="eyebrow py-3 pr-4">Contato</th>
                      <th className="eyebrow py-3 pr-4">Status</th>
                      <th className="eyebrow py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((lead) => (
                      <tr key={lead.id} className="border-b border-line">
                        <td className="py-4 pr-4 text-sm text-ink-soft">
                          {lead.createdAt ? DATA_CURTA.format(new Date(lead.createdAt)) : 'sem data'}
                        </td>
                        <td className="py-4 pr-4">
                          <span className="font-extrabold">{lead.nome || 'não informado'}</span>
                          <span className="block text-sm text-ink-soft">{lead.empresa || 'não informado'}</span>
                        </td>
                        <td className="py-4 pr-4">
                          <span className={CHIP_VAZIO}>{rotuloOrigem(lead.origem)}</span>
                        </td>
                        <td className="py-4 pr-4 text-sm text-ink-soft">
                          <span className="block">{lead.email || 'não informado'}</span>
                          <span className="block">{lead.whatsapp || 'não informado'}</span>
                        </td>
                        <td className="py-4 pr-4">
                          <span className={lead.status === 'novo' ? CHIP_CHEIO : CHIP_VAZIO}>
                            {rotuloStatus(lead.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="text-sm font-semibold text-ink underline hover:text-orange"
                            >
                              Ver
                            </Link>
                            <DeleteButton
                              id={lead.id}
                              title={lead.nome || 'sem nome'}
                              resource="leads"
                              label="lead"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
