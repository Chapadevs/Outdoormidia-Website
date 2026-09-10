import { getTranslations } from 'next-intl/server'
import Logo from '@/components/ui/Logo'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { Link } from '@/i18n/navigation'
import { EMPRESA } from '@/lib/empresa'
import { NAV } from '@/lib/nav'

// Uma coluna por hub, com as filhas do menu; item de nível 1 sem filhas fecha a
// primeira coluna em vez de virar coluna própria.
const HUBS = NAV.filter((item) => item.children)
const SOLTOS = NAV.filter((item) => !item.children)

// Os rótulos vêm do namespace Nav no idioma ativo, então as colunas são
// montadas dentro do componente e não mais no escopo do módulo.
function montarColunas(t, tNav) {
  const rotular = (item) => ({ label: tNav(item.key), href: item.href })

  return HUBS.map((hub, i) => ({
    key: hub.key,
    title: tNav(hub.key),
    links: [
      { label: t('visaoGeral'), href: hub.href },
      ...hub.children.map(rotular),
      ...(i === 0 ? SOLTOS.map(rotular) : []),
    ],
  }))
}

// A privacidade sai da lista e vira botão na mesma linha: é o único item legal
// que o visitante procura por conta própria, e link de 12px na barra do rodapé
// não se acha. O rótulo diz LGPD porque é o termo com que ele chega.
const LEGAIS = [{ key: 'termosDeUso', href: '/termos' }]

// TODO(cliente): confirmar os perfis de Youtube e Facebook — os dois foram
// montados a partir do handle do Instagram e ainda não foram verificados.
//
// A ordem é a do briefing da reta final: Instagram, LinkedIn, YouTube,
// Facebook. Não é alfabética nem por relevância de código, é a do cliente.
const SOCIAIS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/outdoormidia/',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.18a6.66 6.66 0 1 0 0 13.32 6.66 6.66 0 0 0 0-13.32Zm0 10.98a4.32 4.32 0 1 1 0-8.64 4.32 4.32 0 0 1 0 8.64Zm8.48-11.24a1.56 1.56 0 1 1-3.11 0 1.56 1.56 0 0 1 3.11 0Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://br.linkedin.com/company/outdoormidia',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@outdoormidia',
    path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/outdoormidia',
    path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z',
  },
]

export default async function Footer() {
  const t = await getTranslations('Footer')
  const tNav = await getTranslations('Nav')
  const colunas = montarColunas(t, tNav)

  return (
    <footer className="bg-paper pb-[38px] pt-[70px] text-ink-soft max-mob:pb-8 max-mob:pt-14">
      <div className="wrap">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr] gap-8 max-lap:gap-5 max-tab:grid-cols-3 max-tab:gap-x-10 max-tab:gap-y-8 max-mob:grid-cols-2 max-mob:gap-x-6 max-mob:gap-y-[30px] max-xs:grid-cols-1">
          <div className="max-tab:col-span-full max-xs:col-span-1">
            <Logo className="bg-ink" />
            <p className="mt-[18px] max-w-[32ch] text-[14.5px]">
              {t('tagline')}
            </p>
            <Link className="btn btn-ghost mt-6" href="/#nova-campanha">
              {t('novaCampanha')}
            </Link>
          </div>
          {colunas.map((col) => (
            <div key={col.key}>
              <h4 className="m-0 mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-ink">
                {col.title}
              </h4>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <h4 className="m-0 mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-ink">
              {t('contato')}
            </h4>
            <a
              href={`tel:${EMPRESA.telefone}`}
              className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {EMPRESA.telefoneExibicao} · {t('curitiba')}
            </a>
            {EMPRESA.telefoneSc && (
              <a
                href={`tel:${EMPRESA.telefoneSc}`}
                className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
              >
                {EMPRESA.telefoneScExibicao} · {t('santaCatarina')}
              </a>
            )}
            <a
              href={`mailto:${EMPRESA.email}`}
              className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {EMPRESA.email}
            </a>
            <address className="mt-4 text-[14.5px] not-italic leading-[1.5]">
              {EMPRESA.endereco.logradouro}
              <br />
              {EMPRESA.endereco.cidade}/{EMPRESA.endereco.estado}
              <br />
              CEP {EMPRESA.endereco.cep}
            </address>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {SOCIAIS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-150 hover:border-orange hover:bg-orange hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="h-[17px] w-[17px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[54px] flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.06em]">
          <span className="flex flex-col gap-1.5 normal-case tracking-normal">
            <span className="uppercase tracking-[0.06em]">© 2026 Outdoormídia</span>
            <span>{EMPRESA.razaoSocial}</span>
            <span>CNPJ {EMPRESA.cnpj}</span>
          </span>
          {/* Fora da NAV de propósito: lib/nav.js alimenta o menu do Header, e
              página legal não é item de navegação principal. */}
          <span className="flex flex-wrap items-center gap-5">
            <Link
              className="btn btn-ghost px-[18px] py-[9px] text-[11px] tracking-[0.06em]"
              href="/privacidade"
            >
              {t('conferirLgpd')}
            </Link>
            {LEGAIS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors duration-150 hover:text-ink"
              >
                {t(l.key)}
              </Link>
            ))}
          </span>
          <LanguageSwitcher
            className="items-center uppercase tracking-[0.06em]"
            ativo="text-ink"
            inativo="hover:text-ink"
          />
        </div>
      </div>
    </footer>
  )
}
