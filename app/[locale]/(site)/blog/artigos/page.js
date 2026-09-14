import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import PostsExplorer from '@/components/blog/PostsExplorer'
import SectionHeading from '@/components/ui/SectionHeading'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/blog/artigos',
    locale,
    titulo: t('artigos.titulo'),
    descricao: t('artigos.descricao'),
  })
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

export default async function ArtigosPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [posts, tags, groups] = await fetchContent()
  const t = await getTranslations({ locale, namespace: 'ArtigosPage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumbPai'), href: '/blog' }, { label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow')} · <b>{t('eyebrowForte')}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('ultimos')} className="reveal mb-[34px]" />
            {posts.length === 0 ? (
              <p className="reveal text-lg text-ink-soft">
                {t('vazio')}
              </p>
            ) : (
              <PostsExplorer posts={posts} tags={tags} groups={groups} />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
