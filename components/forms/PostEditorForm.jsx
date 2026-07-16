'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MarkdownContent from '@/components/blog/MarkdownContent'
import { slugify } from '@/lib/slugify'

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  coverAlt: '',
  content: '',
  status: 'draft',
  author: '',
  tags: [],
}

const TOOLBAR = [
  { label: 'Negrito', title: 'Negrito', icon: 'B', wrap: '**' },
  { label: 'Itálico', title: 'Itálico', icon: 'I', wrap: '_' },
  { label: 'Tachado', title: 'Tachado', icon: 'S', wrap: '~~' },
  { label: 'divisor-1', divider: true },
  { label: 'Título 2', title: 'Título 2', icon: 'H2', line: '## ' },
  { label: 'Título 3', title: 'Título 3', icon: 'H3', line: '### ' },
  { label: 'Citação', title: 'Citação', icon: '"', line: '> ' },
  { label: 'divisor-2', divider: true },
  { label: 'Lista', title: 'Lista com marcadores', icon: '•', line: '- ' },
  { label: 'Lista numerada', title: 'Lista numerada', icon: '1.', line: '1. ' },
  { label: 'Checklist', title: 'Lista de tarefas', icon: '☑', line: '- [ ] ' },
  { label: 'divisor-3', divider: true },
  { label: 'Link', title: 'Link', icon: '🔗', wrap: ['[', '](https://)'] },
  { label: 'Código', title: 'Código inline', icon: '</>', wrap: '`' },
  {
    label: 'Tabela',
    title: 'Tabela',
    icon: '▦',
    block:
      '\n| Coluna 1 | Coluna 2 |\n| --- | --- |\n| Célula | Célula |\n',
  },
  { label: 'Linha', title: 'Linha divisória', icon: '—', block: '\n---\n' },
]

export default function PostEditorForm({ initialPost = null, allTags = [], groups = [] }) {
  const router = useRouter()
  const [post, setPost] = useState(initialPost ? { ...EMPTY, ...initialPost } : EMPTY)
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost))
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const contentRef = useRef(null)
  const coverInputRef = useRef(null)
  const inlineInputRef = useRef(null)

  function set(field, value) {
    setPost((p) => ({ ...p, [field]: value }))
  }

  function toggleTag(slug) {
    setPost((p) => ({
      ...p,
      tags: p.tags.includes(slug) ? p.tags.filter((t) => t !== slug) : [...p.tags, slug],
    }))
  }

  function handleTitle(value) {
    setPost((p) => ({
      ...p,
      title: value,
      slug: slugTouched ? p.slug : slugify(value),
    }))
  }

  async function upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Erro ao enviar a imagem.')
    return data.url
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      set('coverImage', await upload(file))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleInlineUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const url = await upload(file)
      const textarea = contentRef.current
      const snippet = `![${file.name.replace(/\.[^.]+$/, '')}](${url})`
      if (textarea) {
        const start = textarea.selectionStart ?? post.content.length
        const end = textarea.selectionEnd ?? start
        set('content', `${post.content.slice(0, start)}${snippet}${post.content.slice(end)}`)
      } else {
        set('content', `${post.content}\n\n${snippet}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function applyToolbar(action) {
    const textarea = contentRef.current
    const value = post.content
    if (!textarea) return

    const start = textarea.selectionStart ?? value.length
    const end = textarea.selectionEnd ?? start
    const selected = value.slice(start, end)

    let next = value
    let cursorStart = start
    let cursorEnd = end

    if (action.wrap) {
      const [before, after] = Array.isArray(action.wrap) ? action.wrap : [action.wrap, action.wrap]
      next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`
      cursorStart = start + before.length
      cursorEnd = cursorStart + selected.length
    } else if (action.line) {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      next = `${value.slice(0, lineStart)}${action.line}${value.slice(lineStart)}`
      cursorStart = start + action.line.length
      cursorEnd = end + action.line.length
    } else if (action.block) {
      next = `${value.slice(0, start)}${action.block}${value.slice(end)}`
      cursorStart = start + action.block.length
      cursorEnd = cursorStart
    }

    set('content', next)
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(cursorStart, cursorEnd)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const isEdit = Boolean(initialPost?.id)
      const res = await fetch(isEdit ? `/api/admin/posts/${initialPost.id}` : '/api/admin/posts', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          coverAlt: post.coverAlt,
          content: post.content,
          status: post.status,
          author: post.author,
          tags: post.tags,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar o post.')
      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <form
      className="ticks flex flex-col gap-5 border border-line bg-white p-[38px] max-mob:p-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="title">
          Título
        </label>
        <input
          className={INPUT}
          id="title"
          type="text"
          required
          value={post.title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Título do post"
        />
      </div>

      <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="slug">
            Slug (URL)
          </label>
          <input
            className={INPUT}
            id="slug"
            type="text"
            required
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true)
              set('slug', e.target.value)
            }}
            onBlur={(e) => set('slug', slugify(e.target.value))}
            placeholder="titulo-do-post"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="status">
            Status
          </label>
          <select
            className={`${INPUT} select-caret appearance-none`}
            id="status"
            value={post.status}
            onChange={(e) => set('status', e.target.value)}
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="author">
          Autor
        </label>
        <input
          className={INPUT}
          id="author"
          type="text"
          maxLength={120}
          value={post.author}
          onChange={(e) => set('author', e.target.value)}
          placeholder="Nome de quem assina o post (opcional)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={LABEL}>Tags</span>
        {allTags.length === 0 ? (
          <p className="text-sm text-ink-soft">
            Nenhuma tag cadastrada.{' '}
            <Link href="/admin/tags/blog" className="font-semibold underline hover:text-orange">
              Gerenciar tags →
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-3 rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-3">
            {groups.map((group) => {
              const groupTags = allTags.filter((tag) => tag.group === group.slug)
              if (groupTags.length === 0) return null
              return (
                <div key={group.slug} className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                    {group.label}
                  </span>
                  {groupTags.map((tag) => {
                    const selected = post.tags.includes(tag.slug)
                    return (
                      <button
                        key={tag.slug}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleTag(tag.slug)}
                        className={`rounded-[2px] border px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] transition duration-150 ${
                          selected
                            ? 'border-orange bg-orange text-white'
                            : 'border-line-2 text-ink-soft hover:border-orange hover:text-orange'
                        }`}
                      >
                        {tag.name}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="excerpt">
          Resumo
        </label>
        <textarea
          className={`${INPUT} min-h-[72px] resize-y`}
          id="excerpt"
          required
          maxLength={220}
          value={post.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          placeholder="Resumo curto exibido na listagem e nos resultados de busca (máx. 220 caracteres)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={LABEL}>Imagem de capa</span>
        <div className="flex items-center gap-4 max-mob:flex-col max-mob:items-start">
          {post.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post.coverImage}
              alt={post.coverAlt || 'Capa do post'}
              className="h-24 w-40 rounded-[2px] border border-line object-cover"
            />
          )}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="btn border-ink text-ink hover:border-orange hover:text-orange"
              disabled={uploading}
              onClick={() => coverInputRef.current?.click()}
            >
              {uploading ? 'Enviando…' : post.coverImage ? 'Trocar capa' : 'Enviar capa'}
            </button>
            {post.coverImage && (
              <button
                type="button"
                className="text-left text-sm font-semibold text-ink-soft underline hover:text-orange"
                onClick={() => set('coverImage', '')}
              >
                Remover capa
              </button>
            )}
          </div>
        </div>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleCoverUpload}
        />
      </div>

      {post.coverImage && (
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="coverAlt">
            Texto alternativo da capa
          </label>
          <input
            className={INPUT}
            id="coverAlt"
            type="text"
            value={post.coverAlt}
            onChange={(e) => set('coverAlt', e.target.value)}
            placeholder="Descrição da imagem para acessibilidade e SEO"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label className={LABEL} htmlFor="content">
            Conteúdo (Markdown)
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-sm font-semibold text-ink-soft underline hover:text-orange disabled:opacity-60"
              disabled={uploading}
              onClick={() => inlineInputRef.current?.click()}
            >
              {uploading ? 'Enviando…' : 'Inserir imagem'}
            </button>
            <span className="text-line-2">·</span>
            <button
              type="button"
              className={`text-sm font-semibold underline hover:text-orange ${
                preview ? 'text-orange' : 'text-ink-soft'
              }`}
              onClick={() => setPreview((v) => !v)}
            >
              {preview ? 'Escrever' : 'Visualizar'}
            </button>
          </div>
        </div>
        {preview ? (
          <div className="post-body min-h-[320px] rounded-[2px] border-[1.5px] border-line bg-paper px-5 py-4">
            {post.content ? (
              <MarkdownContent>{post.content}</MarkdownContent>
            ) : (
              <p className="text-ink-soft">Nada para visualizar ainda.</p>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-1 rounded-[2px] border-[1.5px] border-b-0 border-line bg-bone px-2 py-1.5">
              {TOOLBAR.map((action) =>
                action.divider ? (
                  <span key={action.label} className="mx-1 h-5 w-px bg-line-2" />
                ) : (
                  <button
                    key={action.label}
                    type="button"
                    title={action.title}
                    aria-label={action.title}
                    className="min-w-[30px] rounded-[2px] px-2 py-1.5 text-[13px] font-bold text-ink-soft transition hover:bg-white hover:text-orange"
                    onClick={() => applyToolbar(action)}
                  >
                    {action.icon}
                  </button>
                )
              )}
            </div>
            <textarea
              ref={contentRef}
              className={`${INPUT} min-h-[320px] resize-y rounded-t-none border-t-0 font-mono text-[15px]`}
              id="content"
              required
              value={post.content}
              onChange={(e) => set('content', e.target.value)}
              placeholder={'## Subtítulo\n\nEscreva o conteúdo em Markdown…'}
            />
          </>
        )}
        <input
          ref={inlineInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleInlineUpload}
        />
      </div>

      {error && (
        <p className="rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-3 text-sm text-ink">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || uploading}
        className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? 'Salvando…' : initialPost?.id ? 'Salvar alterações' : 'Criar post'}
      </button>
    </form>
  )
}
