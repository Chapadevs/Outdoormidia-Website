'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { slugify } from '@/lib/slugify'
import { PLATFORMS } from '@/lib/platforms'

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'
const CHIP_ON = 'border-orange bg-orange text-white'
const CHIP_OFF = 'border-line-2 text-ink-soft hover:border-orange hover:text-orange'

const MAX_RESULTS = 4

const EMPTY = {
  title: '',
  slug: '',
  desc: '',
  meta: '',
  coverImage: '',
  coverAlt: '',
  status: 'draft',
  tags: [],
  platforms: [],
  results: [],
}

export default function CaseEditorForm({ initialCase = null, allTags = [], groups = [] }) {
  const router = useRouter()
  const [caseItem, setCaseItem] = useState(initialCase ? { ...EMPTY, ...initialCase } : EMPTY)
  const [slugTouched, setSlugTouched] = useState(Boolean(initialCase))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const coverInputRef = useRef(null)

  function set(field, value) {
    setCaseItem((c) => ({ ...c, [field]: value }))
  }

  function toggleIn(field, slug) {
    setCaseItem((c) => ({
      ...c,
      [field]: c[field].includes(slug)
        ? c[field].filter((s) => s !== slug)
        : [...c[field], slug],
    }))
  }

  function handleTitle(value) {
    setCaseItem((c) => ({
      ...c,
      title: value,
      slug: slugTouched ? c.slug : slugify(value),
    }))
  }

  function setResult(index, field, value) {
    setCaseItem((c) => ({
      ...c,
      results: c.results.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
    }))
  }

  function addResult() {
    setCaseItem((c) =>
      c.results.length >= MAX_RESULTS
        ? c
        : { ...c, results: [...c.results, { value: '', label: '' }] }
    )
  }

  function removeResult(index) {
    setCaseItem((c) => ({ ...c, results: c.results.filter((_, i) => i !== index) }))
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'cases')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar a imagem.')
      set('coverImage', data.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const isEdit = Boolean(initialCase?.id)
      const res = await fetch(isEdit ? `/api/admin/cases/${initialCase.id}` : '/api/admin/cases', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: caseItem.title,
          slug: caseItem.slug,
          desc: caseItem.desc,
          meta: caseItem.meta,
          coverImage: caseItem.coverImage,
          coverAlt: caseItem.coverAlt,
          status: caseItem.status,
          tags: caseItem.tags,
          platforms: caseItem.platforms,
          results: caseItem.results.filter((r) => r.value.trim() && r.label.trim()),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar o case.')
      router.push('/admin/cases')
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
          value={caseItem.title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Título do case"
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
            value={caseItem.slug}
            onChange={(e) => {
              setSlugTouched(true)
              set('slug', e.target.value)
            }}
            onBlur={(e) => set('slug', slugify(e.target.value))}
            placeholder="titulo-do-case"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="status">
            Status
          </label>
          <select
            className={`${INPUT} select-caret appearance-none`}
            id="status"
            value={caseItem.status}
            onChange={(e) => set('status', e.target.value)}
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="desc">
          Descrição
        </label>
        <textarea
          className={`${INPUT} min-h-[96px] resize-y`}
          id="desc"
          required
          maxLength={320}
          value={caseItem.desc}
          onChange={(e) => set('desc', e.target.value)}
          placeholder="O que a marca fez, onde e qual foi o resultado (máx. 320 caracteres)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="meta">
          Linha de contexto
        </label>
        <input
          className={INPUT}
          id="meta"
          type="text"
          maxLength={160}
          value={caseItem.meta}
          onChange={(e) => set('meta', e.target.value)}
          placeholder="Ex.: Front Light + Digital · Curitiba · 4 semanas (opcional)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={LABEL}>Tags</span>
        {allTags.length === 0 ? (
          <p className="text-sm text-ink-soft">
            Nenhuma tag de cases cadastrada.{' '}
            <Link href="/admin/tags/cases" className="font-semibold underline hover:text-orange">
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
                    const selected = caseItem.tags.includes(tag.slug)
                    return (
                      <button
                        key={tag.slug}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleIn('tags', tag.slug)}
                        className={`rounded-[2px] border px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] transition duration-150 ${
                          selected ? CHIP_ON : CHIP_OFF
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
        <span className={LABEL}>Plataformas usadas</span>
        <div className="flex flex-wrap gap-1.5 rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-3">
          {PLATFORMS.map((platform) => {
            const selected = caseItem.platforms.includes(platform.slug)
            return (
              <button
                key={platform.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleIn('platforms', platform.slug)}
                className={`rounded-[2px] border px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] transition duration-150 ${
                  selected ? CHIP_ON : CHIP_OFF
                }`}
              >
                {platform.name}
              </button>
            )
          })}
        </div>
        <p className="m-0 text-xs text-ink-soft">
          O case aparece na página de cada plataforma selecionada.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className={LABEL}>Resultados</span>
        {caseItem.results.map((result, index) => (
          <div key={index} className="flex items-center gap-3 max-mob:flex-col max-mob:items-stretch">
            <input
              className={`${INPUT} max-w-[160px] max-mob:max-w-none`}
              type="text"
              maxLength={20}
              value={result.value}
              onChange={(e) => setResult(index, 'value', e.target.value)}
              placeholder="38M"
              aria-label={`Valor do resultado ${index + 1}`}
            />
            <input
              className={INPUT}
              type="text"
              maxLength={60}
              value={result.label}
              onChange={(e) => setResult(index, 'label', e.target.value)}
              placeholder="Impactos no período"
              aria-label={`Rótulo do resultado ${index + 1}`}
            />
            <button
              type="button"
              className="shrink-0 text-sm font-semibold text-ink-soft underline hover:text-orange"
              onClick={() => removeResult(index)}
            >
              Remover
            </button>
          </div>
        ))}
        {caseItem.results.length < MAX_RESULTS && (
          <button
            type="button"
            className="self-start text-sm font-semibold text-ink underline hover:text-orange"
            onClick={addResult}
          >
            + Adicionar resultado
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className={LABEL}>Imagem do case</span>
        <div className="flex items-center gap-4 max-mob:flex-col max-mob:items-start">
          {caseItem.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={caseItem.coverImage}
              alt={caseItem.coverAlt || 'Imagem do case'}
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
              {uploading ? 'Enviando…' : caseItem.coverImage ? 'Trocar imagem' : 'Enviar imagem'}
            </button>
            {caseItem.coverImage && (
              <button
                type="button"
                className="text-left text-sm font-semibold text-ink-soft underline hover:text-orange"
                onClick={() => set('coverImage', '')}
              >
                Remover imagem
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

      {caseItem.coverImage && (
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="coverAlt">
            Texto alternativo da imagem
          </label>
          <input
            className={INPUT}
            id="coverAlt"
            type="text"
            maxLength={220}
            value={caseItem.coverAlt}
            onChange={(e) => set('coverAlt', e.target.value)}
            placeholder="Descrição da imagem para acessibilidade e SEO"
          />
        </div>
      )}

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
        {saving ? 'Salvando…' : initialCase?.id ? 'Salvar alterações' : 'Criar case'}
      </button>
    </form>
  )
}
