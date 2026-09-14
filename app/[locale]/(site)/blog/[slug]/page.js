import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Schema from '@/components/widgets/Schema'
import { article } from '@/lib/schema'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MarkdownContent from '@/components/blog/MarkdownContent'
import TagBadge from '@/components/blog/TagBadge'
import ShareButtons from '@/components/blog/ShareButtons'
import { getPublishedPostBySlug } from '@/lib/blog/posts'
import { getTagsBySlugs } from '@/lib/tags/tags'
import { readingTimeMinutes } from '@/lib/blog/readingTime'
import { dataLonga } from '@/lib/format'
import { SITE_URL } from '@/lib/constants'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const revalidate = 300

export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) {
    const t = await getTranslations({ locale, namespace: 'PostPage' })
    return { title: t('naoEncontrado') }
  }

  // O post existe só em português: o canonical de /en, /es e /zh aponta para
  // a URL sem prefixo e não sai hreflang. Ver `somentePt` em lib/seo.js.
  return metaDe({
    path: `/blog/${post.slug}`,
    locale,
    titulo: `${post.title} | Outdoormídia`,
    descricao: post.excerpt,
    imagem: post.coverImage ? { url: post.coverImage, alt: post.coverAlt || post.title } : undefined,
    somentePt: true,
    openGraph: {
      title: post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
    },
  })
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'PostPage' })
  const tb = await getTranslations({ locale, namespace: 'Blog' })
  const tags = await getTagsBySlugs('blog', post.tags)

  const shareUrl = `${SITE_URL}/blog/${post.slug}`

  return (
    <>
      <main>
        <Schema data={article(post, tags)} />
        <Breadcrumb
          items={[
            { label: t('breadcrumbBlog'), href: '/blog' },
            { label: t('breadcrumbArtigos'), href: '/blog/artigos' },
            { label: post.title },
          ]}
        />
        <article className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
          <div className="wrap max-w-[860px]">
            <Link href="/blog/artigos" className="eyebrow hover:text-orange">
              {t('todosArtigos')}
            </Link>
            {post.publishedAt && (
              <p className="eyebrow mt-9">
                <b>{dataLonga(locale).format(new Date(post.publishedAt))}</b>
                {post.author && <> · {tb('por', { autor: post.author })}</>} ·{' '}
                {tb('minLeitura', { n: readingTimeMinutes(post.content) })}
              </p>
            )}
            <h1 className="display mt-4 text-[clamp(36px,5.6vw,72px)] text-ink">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-xl leading-[1.5] text-ink-soft max-mob:text-lg">
              {post.excerpt}
            </p>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <TagBadge key={tag.slug} tag={tag} />
                ))}
              </div>
            )}

            {post.coverImage && (
              <div className="ticks mt-11">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-line">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 860px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="post-body mt-11">
              <MarkdownContent>{post.content}</MarkdownContent>
            </div>

            <div className="mt-14 flex flex-wrap items-end gap-6 border-t border-line pt-8">
              {post.author && (
                <div>
                  <p className="eyebrow">{t('escritoPor')}</p>
                  <p className="mt-1.5 text-lg font-extrabold text-ink">{post.author}</p>
                </div>
              )}
              <div className="ml-auto max-mob:ml-0 max-mob:w-full">
                <p className="eyebrow mb-2.5">{t('compartilhar')}</p>
                <ShareButtons url={shareUrl} title={post.title} />
              </div>
            </div>

            <div className="mt-14 border-t border-line pt-9">
              <p className="eyebrow">
                {t.rich('ctaTitulo', { b: (c) => <b>{c}</b> })}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/proposta" className="btn btn-fill">
                  {t('pedirProposta')}
                </Link>
                <Link
                  href="/blog/artigos"
                  className="btn border-ink text-ink [--rr-fill:transparent] hover:border-orange hover:text-orange"
                >
                  {t('verMaisArtigos')}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
