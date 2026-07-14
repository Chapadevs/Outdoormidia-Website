'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TAG_GROUPS } from '@/lib/blog/tagGroups'

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'

async function request(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Erro ao salvar. Tente novamente.')
  return data
}

function TagRow({ tag }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(tag.name)
  const [group, setGroup] = useState(tag.group)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSave() {
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/tags/${tag.slug}`, 'PUT', { name, group })
      setEditing(false)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Excluir a tag "${tag.name}"? Ela será removida de todos os posts.`)) {
      return
    }
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/tags/${tag.slug}`, 'DELETE')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <li className="flex flex-col gap-3 border-b border-line py-4 last:border-b-0">
      {editing ? (
        <div className="flex flex-wrap items-center gap-3">
          <input
            className={`${INPUT} max-w-[260px] py-2.5`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nome da tag"
          />
          <select
            className={`${INPUT} select-caret max-w-[200px] appearance-none py-2.5`}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            aria-label="Grupo da tag"
          >
            {TAG_GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-sm font-semibold text-orange underline hover:text-ink disabled:opacity-60"
            disabled={busy || !name.trim()}
            onClick={handleSave}
          >
            {busy ? 'Salvando…' : 'Salvar'}
          </button>
          <button
            type="button"
            className="text-sm font-semibold text-ink-soft underline hover:text-orange"
            onClick={() => {
              setEditing(false)
              setName(tag.name)
              setGroup(tag.group)
              setError('')
            }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-[2px] border border-orange/50 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-orange">
            {tag.name}
          </span>
          <span className="text-sm text-ink-soft">{tag.slug}</span>
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              className="text-sm font-semibold text-ink underline hover:text-orange"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
            <button
              type="button"
              className="text-sm font-semibold text-ink-soft underline hover:text-orange disabled:opacity-60"
              disabled={busy}
              onClick={handleDelete}
            >
              {busy ? 'Excluindo…' : 'Excluir'}
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-2 text-sm text-ink">
          {error}
        </p>
      )}
    </li>
  )
}

export default function TagManager({ tags }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [group, setGroup] = useState(TAG_GROUPS[0].id)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await request('/api/admin/tags', 'POST', { name, group })
      setName('')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        className="ticks flex flex-col gap-5 border border-line bg-white p-[38px] max-mob:p-7"
        onSubmit={handleCreate}
      >
        <div className="grid grid-cols-[1fr_auto_auto] items-end gap-5 max-mob:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="tag-name">
              Nova tag
            </label>
            <input
              className={INPUT}
              id="tag-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Curitiba, Frontlight, Lançamento"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="tag-group">
              Grupo
            </label>
            <select
              className={`${INPUT} select-caret min-w-[180px] appearance-none`}
              id="tag-group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {TAG_GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-fill py-[15px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Criando…' : 'Criar tag'}
          </button>
        </div>
        {error && (
          <p className="rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-3 text-sm text-ink">
            {error}
          </p>
        )}
      </form>

      {TAG_GROUPS.map((g) => {
        const groupTags = tags.filter((tag) => tag.group === g.id)
        return (
          <section key={g.id}>
            <div className="eyebrow border-b border-line-2 pb-3">
              <b>{g.label}</b>
            </div>
            {groupTags.length === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">Nenhuma tag neste grupo ainda.</p>
            ) : (
              <ul className="m-0 list-none p-0">
                {groupTags.map((tag) => (
                  <TagRow key={tag.slug} tag={tag} />
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
