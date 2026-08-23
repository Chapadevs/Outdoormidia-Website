import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PostsExplorer from '@/components/blog/PostsExplorer'
import SectionHeading from '@/components/ui/SectionHeading'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

const DESCRIPTION =
  'Artigos sobre mídia Out of Home no Sul do Brasil: outdoor, painéis de LED, MUB, aeroporto e estratégias para sua marca ocupar as ruas.'

export const metadata = {
  title: 'Artigos | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/blog/artigos' },
  openGraph: {
    title: 'Artigos | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 300

// Sem credenciais do Firestore (ex.: build no CI), a página é gerada vazia — a
// regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchContent() {
  try {
    return await Promise.all([listPublishedPosts(), listTags('blog'), listTagGroups('blog')])
  } catch {
    return [[], [], []]
  }
}

export default async function ArtigosPage() {
  const [posts, tags, groups] = await fetchContent()

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Artigos' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Blog · <b>Conteúdo Out of Home</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Artigos.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Ideias, dados e estratégias de mídia exterior para colocar a sua marca nas ruas
              do Paraná e de Santa Catarina.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Últimos artigos" className="reveal mb-[34px]" />
            {posts.length === 0 ? (
              <p className="reveal text-lg text-ink-soft">
                Ainda não há artigos publicados. Volte em breve.
              </p>
            ) : (
              <PostsExplorer posts={posts} tags={tags} groups={groups} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
