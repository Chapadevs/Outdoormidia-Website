import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MarkdownContent from '@/components/blog/MarkdownContent'
import TagBadge from '@/components/blog/TagBadge'
import ShareButtons from '@/components/blog/ShareButtons'
import { getPublishedPostBySlug } from '@/lib/blog/posts'
import { getTagsBySlugs } from '@/lib/blog/tags'
import { readingTimeLabel } from '@/lib/blog/readingTime'

export const dynamic = 'force-dynamic'

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return { title: 'Post não encontrado — Outdoormídia' }

  return {
    title: `${post.title} — Outdoormídia`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt || post.title }] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const tags = await getTagsBySlugs(post.tags)

  const headerList = await headers()
  const host = headerList.get('host')
  const proto = headerList.get('x-forwarded-proto') || 'http'
  const shareUrl = `${proto}://${host}/blog/${post.slug}`

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
        <article className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
          <div className="wrap max-w-[860px]">
            <Link href="/blog" className="eyebrow hover:text-orange">
              ← Todos os artigos
            </Link>
            {post.publishedAt && (
              <p className="eyebrow mt-9">
                <b>{DATE_FMT.format(new Date(post.publishedAt))}</b>
                {post.author && <> · Por {post.author}</>} · {readingTimeLabel(post.content)}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.coverAlt || post.title}
                  className="w-full rounded-[2px] border border-line object-cover"
                />
              </div>
            )}

            <div className="post-body mt-11">
              <MarkdownContent>{post.content}</MarkdownContent>
            </div>

            <div className="mt-14 flex flex-wrap items-end gap-6 border-t border-line pt-8">
              {post.author && (
                <div>
                  <p className="eyebrow">Escrito por</p>
                  <p className="mt-1.5 text-lg font-extrabold text-ink">{post.author}</p>
                </div>
              )}
              <div className="ml-auto max-mob:ml-0 max-mob:w-full">
                <p className="eyebrow mb-2.5">Compartilhar</p>
                <ShareButtons url={shareUrl} title={post.title} />
              </div>
            </div>

            <div className="mt-14 border-t border-line pt-9">
              <p className="eyebrow">
                Quer sua marca <b>nas ruas</b>?
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/proposta" className="btn btn-fill">
                  Pedir uma proposta
                </Link>
                <Link
                  href="/blog"
                  className="btn border-ink text-ink hover:border-orange hover:bg-transparent hover:text-orange"
                >
                  Ver mais artigos
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
