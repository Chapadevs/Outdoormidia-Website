import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DeletePostButton from '@/components/widgets/DeletePostButton'
import { listAllPosts } from '@/lib/blog/posts'

export const metadata = {
  title: 'Blog — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

export default async function AdminBlogPage() {
  const posts = await listAllPosts()

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb items={[{ label: 'Painel Admin', href: '/admin' }, { label: 'Blog' }]} />
      <div className="wrap mt-9">
        <div className="flex items-end justify-between gap-4 max-mob:flex-col max-mob:items-start">
          <div>
            <div className="eyebrow">
              Painel <b>Blog</b>
            </div>
            <h1 className="display mt-3 text-[clamp(36px,5vw,64px)] text-ink">Posts</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/tags/blog"
              className="btn border-ink text-ink hover:border-orange hover:text-orange"
            >
              Gerenciar tags
            </Link>
            <Link href="/admin/blog/novo" className="btn btn-fill">
              Novo post
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 text-lg text-ink-soft">
            Nenhum post ainda. Crie o primeiro em “Novo post”.
          </p>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-2">
                  <th className="eyebrow py-3 pr-4">Título</th>
                  <th className="eyebrow py-3 pr-4">Status</th>
                  <th className="eyebrow py-3 pr-4">Atualizado</th>
                  <th className="eyebrow py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-line">
                    <td className="py-4 pr-4">
                      <span className="font-extrabold">{post.title}</span>
                      <span className="block text-sm text-ink-soft">/blog/{post.slug}</span>
                    </td>
                    <td className="py-4 pr-4">
                      {post.status === 'published' ? (
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
                      {post.updatedAt ? DATE_FMT.format(new Date(post.updatedAt)) : '—'}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-sm font-semibold text-ink underline hover:text-orange"
                        >
                          Editar
                        </Link>
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-semibold text-ink-soft underline hover:text-orange"
                          >
                            Ver
                          </Link>
                        )}
                        <DeletePostButton id={post.id} title={post.title} />
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
