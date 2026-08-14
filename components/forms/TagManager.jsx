'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

function TagRow({ tag, scope, groups }) {
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
      await request(`/api/admin/tags/${scope}/${tag.slug}`, 'PUT', { name, group })
      setEditing(false)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    const warning =
      scope === 'blog'
        ? `Excluir a tag "${tag.name}"? Ela será removida de todos os posts.`
        : `Excluir a tag "${tag.name}"?`
    if (!window.confirm(warning)) {
      return
    }
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/tags/${scope}/${tag.slug}`, 'DELETE')
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
            className="field-input max-w-[260px] py-2.5"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nome da tag"
          />
          <select
            className="field-input select-caret max-w-[200px] appearance-none py-2.5"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            aria-label="Grupo da tag"
          >
            {groups.map((g) => (
              <option key={g.slug} value={g.slug}>
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
          <span className="rounded-full border border-orange/50 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-orange">
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
        <p className="field-error">
          {error}
        </p>
      )}
    </li>
  )
}

export default function TagManager({ scope, groups, tags }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [group, setGroup] = useState(groups[0]?.slug ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await request(`/api/admin/tags/${scope}`, 'POST', { name, group })
      setName('')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (groups.length === 0) {
    return (
      <p className="rounded-[10px] border-[1.5px] border-line bg-white px-3.5 py-3 text-sm text-ink-soft">
        Crie um grupo antes de cadastrar tags.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        className="ticks flex flex-col gap-5 rounded-[16px] border border-line bg-white p-[38px] max-mob:p-7"
        onSubmit={handleCreate}
      >
        <div className="grid grid-cols-[1fr_auto_auto] items-end gap-5 max-mob:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className="field-label" htmlFor="tag-name">
              Nova tag
            </label>
            <input
              className="field-input"
              id="tag-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Curitiba, Frontlight, Lançamento"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="field-label" htmlFor="tag-group">
              Grupo
            </label>
            <select
              className="field-input select-caret min-w-[180px] appearance-none"
              id="tag-group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {groups.map((g) => (
                <option key={g.slug} value={g.slug}>
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
          <p className="field-error">
            {error}
          </p>
        )}
      </form>

      {groups.map((g) => {
        const groupTags = tags.filter((tag) => tag.group === g.slug)
        return (
          <section key={g.slug}>
            <div className="eyebrow border-b border-line-2 pb-3">
              <b>{g.label}</b>
            </div>
            {groupTags.length === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">Nenhuma tag neste grupo ainda.</p>
            ) : (
              <ul className="m-0 list-none p-0">
                {groupTags.map((tag) => (
                  <TagRow key={tag.slug} tag={tag} scope={scope} groups={groups} />
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
