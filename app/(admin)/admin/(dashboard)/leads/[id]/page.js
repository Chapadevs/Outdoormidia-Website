import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteButton from '@/components/widgets/DeleteButton'
import LeadStatusSelect from '@/components/widgets/LeadStatusSelect'
import { getLeadById } from '@/lib/leads/leads'
import { ORIGENS, camposPreenchidos, rotuloOrigem } from '@/lib/leads/origens'
import { DATA_CURTA } from '@/lib/format'

export const metadata = {
  title: 'Lead | Painel Admin | Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

// O visitante digita o WhatsApp como quiser. Só dígitos, com o 55 na frente
// quando ele não veio — sem isso o wa.me não abre a conversa.
function waHref(whatsapp) {
  const digitos = whatsapp.replace(/\D/g, '')
  if (digitos.length < 10) return null
  return `https://wa.me/${digitos.startsWith('55') ? digitos : `55${digitos}`}`
}

function Linha({ rotulo, children }) {
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <dt className="eyebrow">{rotulo}</dt>
      <dd className="m-0 mt-2 text-[15px] leading-relaxed text-ink">{children}</dd>
    </div>
  )
}

export default async function AdminLeadPage({ params }) {
  const { id } = await params
  const lead = await getLeadById(id)
  if (!lead) notFound()

  const respostas = camposPreenchidos(lead)
  const wa = lead.whatsapp ? waHref(lead.whatsapp) : null

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Leads', href: '/admin/leads' },
          { label: lead.nome || 'Lead' },
        ]}
      />
      <div className="wrap mt-9">
        <div className="flex items-end justify-between gap-4 max-mob:flex-col max-mob:items-start">
          <div>
            <div className="eyebrow">
              {rotuloOrigem(lead.origem)} ·{' '}
              <b>{lead.createdAt ? DATA_CURTA.format(new Date(lead.createdAt)) : 'sem data'}</b>
            </div>
            <h1 className="display mt-3 text-[clamp(32px,4.4vw,56px)] text-ink">
              {lead.nome || 'Sem nome'}
            </h1>
            {lead.empresa && <p className="mt-2 text-lg text-ink-soft">{lead.empresa}</p>}
          </div>
          <div className="flex items-center gap-4">
            <LeadStatusSelect id={lead.id} status={lead.status} />
            <DeleteButton
              id={lead.id}
              title={lead.nome || 'sem nome'}
              resource="leads"
              label="lead"
              redirectTo="/admin/leads"
            />
          </div>
        </div>

        <p className="mt-4 max-w-[70ch] text-sm text-ink-soft">
          {ORIGENS[lead.origem]?.desc}
        </p>

        <div className="mt-10 grid grid-cols-[0.9fr_1.1fr] items-start gap-8 max-tab:grid-cols-1">
          <div className="ticks rounded-[16px] border border-line bg-white p-7">
            <div className="eyebrow border-b border-line-2 pb-3">Contato</div>
            <dl className="m-0 mt-1">
              <Linha rotulo="Nome">{lead.nome || 'não informado'}</Linha>
              <Linha rotulo="Empresa">{lead.empresa || 'não informado'}</Linha>
              <Linha rotulo="E-mail">
                {lead.email ? (
                  <a className="underline hover:text-orange" href={`mailto:${lead.email}`}>
                    {lead.email}
                  </a>
                ) : (
                  'não informado'
                )}
              </Linha>
              <Linha rotulo="WhatsApp">
                {wa ? (
                  <a
                    className="underline hover:text-orange"
                    href={wa}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {lead.whatsapp}
                  </a>
                ) : (
                  lead.whatsapp || 'não informado'
                )}
              </Linha>
            </dl>
          </div>

          <div className="rounded-[16px] border border-line bg-white p-7">
            <div className="eyebrow border-b border-line-2 pb-3">O que o cliente enviou</div>
            {respostas.length === 0 ? (
              <p className="mt-5 text-ink-soft">
                O visitante enviou apenas os dados de contato.
              </p>
            ) : (
              <dl className="m-0 mt-1">
                {respostas.map((campo) => (
                  <Linha key={campo.key} rotulo={campo.label}>
                    <span className={campo.longo ? 'block whitespace-pre-wrap' : undefined}>
                      {campo.valor}
                    </span>
                  </Linha>
                ))}
              </dl>
            )}
          </div>
        </div>

        <Link
          href="/admin/leads"
          className="mt-10 inline-block text-sm font-semibold text-ink-soft underline hover:text-orange"
        >
          ← Voltar para os leads
        </Link>
      </div>
    </section>
  )
}
