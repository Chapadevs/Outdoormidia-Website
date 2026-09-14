import { SITE_URL } from '@/lib/constants'
import { EMPRESA } from '@/lib/empresa'
import { TAG_HTML } from '@/i18n/routing'
import { caminhoLocalizado } from '@/lib/seo'

// Os nós de structured data que se repetem pelo site. O LocalBusiness e o
// WebSite vivem em components/widgets/JsonLd.jsx, instalados uma vez no
// layout; os daqui entram por página e apontam para o negócio pelo `@id`, para
// o motor ligar artigo, serviço e trilha à mesma entidade em vez de criar uma
// solta a cada rota.

export const ID_NEGOCIO = `${SITE_URL}/#negocio`

const absoluta = (path, locale) => `${SITE_URL}${caminhoLocalizado(path, locale)}`

// Trilha de navegação. O último item não leva `item`: é a própria página, e o
// schema.org o dispensa. Os anteriores vão com a URL absoluta no idioma ativo.
export function breadcrumbList(items, locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ label, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
      ...(href && i < items.length - 1 && { item: absoluta(href, locale) }),
    })),
  }
}

// Post do blog. O texto só existe em português, então `inLanguage` é fixo e a
// URL canônica é a sem prefixo, a mesma do canonical da página.
export function article(post, tags = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    ...(post.coverImage && { image: [post.coverImage] }),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author ? { '@type': 'Person', name: post.author } : { '@id': ID_NEGOCIO },
    publisher: { '@id': ID_NEGOCIO },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: TAG_HTML.pt,
    ...(tags.length && { keywords: tags.map((t) => t.name).join(', ') }),
  }
}

// Plataforma do catálogo como serviço prestado pelo negócio. `name` e
// `description` chegam já no idioma da página; a área atendida é a da empresa.
export function service(platform, locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/plataformas/${platform.slug}#servico`,
    name: platform.name,
    description: platform.intro,
    serviceType: 'Mídia Out of Home',
    url: absoluta(`/plataformas/${platform.slug}`, locale),
    ...(platform.image && { image: `${SITE_URL}${platform.image}` }),
    provider: { '@id': ID_NEGOCIO },
    areaServed: EMPRESA.areaServida.map((nome) => ({ '@type': 'Place', name: nome })),
    inLanguage: TAG_HTML[locale] ?? TAG_HTML.pt,
  }
}
