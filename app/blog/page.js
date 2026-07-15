import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PostCard from '@/components/blog/PostCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listTags } from '@/lib/blog/tags'

export const metadata = {
  title: 'Blog — Outdoormídia',
  description:
    'Artigos sobre mídia Out of Home no Sul do Brasil: outdoor, painéis de LED, MUB, aeroporto e estratégias para sua marca ocupar as ruas.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Outdoormídia',
    description:
      'Artigos sobre mídia Out of Home no Sul do Brasil: outdoor, painéis de LED, MUB, aeroporto e estratégias para sua marca ocupar as ruas.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([listPublishedPosts(), listTags()])
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Blog' }]} />
        <section className="pb-[110px] pt-[54px] max-mob:pb-[72px] max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Conteúdo <b>Out of Home</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Blog.
            </h1>
            <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">
              Ideias, dados e estratégias de mídia exterior para colocar a sua marca nas ruas
              do Paraná e de Santa Catarina.
            </p>

            <div className="mt-[70px] max-mob:mt-12">
              <SectionHeading num="01" title="Últimos artigos" className="reveal mb-[34px]" />
              {posts.length === 0 ? (
                <p className="reveal text-lg text-ink-soft">
                  Ainda não há artigos publicados. Volte em breve.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      tags={post.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
