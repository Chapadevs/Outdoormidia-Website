'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

function GroupRow({ group, scope }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(group.label)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSave() {
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/tag-groups/${scope}/${group.slug}`, 'PUT', { label })
      setEditing(false)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Excluir o grupo "${group.label}"?`)) return
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/tag-groups/${scope}/${group.slug}`, 'DELETE')
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
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            aria-label="Nome do grupo"
          />
          <button
            type="button"
            className="text-sm font-semibold text-orange underline hover:text-ink disabled:opacity-60"
            disabled={busy || !label.trim()}
            onClick={handleSave}
          >
            {busy ? 'Salvando…' : 'Salvar'}
          </button>
          <button
            type="button"
            className="text-sm font-semibold text-ink-soft underline hover:text-orange"
            onClick={() => {
              setEditing(false)
              setLabel(group.label)
              setError('')
            }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-base font-bold text-ink">{group.label}</span>
          <span className="text-sm text-ink-soft">{group.slug}</span>
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

export default function TagGroupManager({ scope, groups }) {
  const router = useRouter()
  const [label, setLabel] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await request(`/api/admin/tag-groups/${scope}`, 'POST', { label })
      setLabel('')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        className="ticks flex flex-col gap-5 border border-line bg-white p-[38px] max-mob:p-7"
        onSubmit={handleCreate}
      >
        <div className="grid grid-cols-[1fr_auto] items-end gap-5 max-mob:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className={LABEL} htmlFor="group-label">
              Novo grupo
            </label>
            <input
              className={INPUT}
              id="group-label"
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex.: Segmento, Objetivo, Tipo de praça"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-fill py-[15px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Criando…' : 'Criar grupo'}
          </button>
        </div>
        {error && (
          <p className="rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-3 text-sm text-ink">
            {error}
          </p>
        )}
      </form>

      {groups.length > 0 && (
        <ul className="m-0 list-none p-0">
          {groups.map((group) => (
            <GroupRow key={group.slug} group={group} scope={scope} />
          ))}
        </ul>
      )}
    </div>
  )
}
