'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CoverageMap from '@/components/ui/CoverageMap'

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'
const ERROR = 'rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-2 text-sm text-ink'

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

function LocationRow({ location, moving, onMove, onCancelMove }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(location.name)
  const [desc, setDesc] = useState(location.desc)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSave() {
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/locations/${location.id}`, 'PUT', {
        name,
        desc,
        lat: location.lat,
        lng: location.lng,
      })
      setEditing(false)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Excluir a localidade "${location.name}"?`)) return
    setError('')
    setBusy(true)
    try {
      await request(`/api/admin/locations/${location.id}`, 'DELETE')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <li className="flex flex-col gap-3 border-b border-line py-4 last:border-b-0">
      {editing ? (
        <div className="flex flex-col gap-3">
          <input
            className={`${INPUT} py-2.5`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nome da localidade"
          />
          <input
            className={`${INPUT} py-2.5`}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descrição (opcional)"
            aria-label="Descrição da localidade"
          />
          <div className="flex items-center gap-4">
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
                setName(location.name)
                setDesc(location.desc)
                setError('')
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-extrabold">{location.name}</span>
          {location.desc && <span className="text-sm text-ink-soft">{location.desc}</span>}
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              className="text-sm font-semibold text-ink underline hover:text-orange"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
            {moving ? (
              <button
                type="button"
                className="text-sm font-semibold text-orange underline hover:text-ink"
                onClick={onCancelMove}
              >
                Cancelar mover
              </button>
            ) : (
              <button
                type="button"
                className="text-sm font-semibold text-ink underline hover:text-orange"
                onClick={onMove}
              >
                Mover
              </button>
            )}
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
      {error && <p className={ERROR}>{error}</p>}
    </li>
  )
}

export default function LocationsManager({ locations }) {
  const router = useRouter()
  const [draft, setDraft] = useState(null)
  const [movingId, setMovingId] = useState(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const movingLocation = locations.find((l) => l.id === movingId)

  async function handleMapClick({ lat, lng }) {
    setError('')
    if (movingLocation) {
      try {
        await request(`/api/admin/locations/${movingLocation.id}`, 'PUT', {
          name: movingLocation.name,
          desc: movingLocation.desc,
          lat,
          lng,
        })
        setMovingId(null)
        router.refresh()
      } catch (err) {
        setError(err.message)
      }
      return
    }
    setDraft({ lat, lng })
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await request('/api/admin/locations', 'POST', { name, desc, lat: draft.lat, lng: draft.lng })
      setDraft(null)
      setName('')
      setDesc('')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-[1.2fr_1fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
      <div className="ticks bg-bone p-[38px] max-mob:p-6">
        <p className="mb-5 text-sm text-ink-soft">
          {movingLocation
            ? `Clique no mapa para reposicionar “${movingLocation.name}”.`
            : 'Clique no mapa para marcar uma nova localidade.'}
        </p>
        <CoverageMap locations={locations} editable onMapClick={handleMapClick} draft={draft} />
      </div>

      <div className="flex flex-col gap-8">
        {draft && (
          <form
            className="ticks flex flex-col gap-5 border border-line bg-white p-[38px] max-mob:p-7"
            onSubmit={handleCreate}
          >
            <div className="eyebrow">
              Nova <b>localidade</b>
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL} htmlFor="location-name">
                Nome
              </label>
              <input
                className={INPUT}
                id="location-name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Joinville"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL} htmlFor="location-desc">
                Descrição
              </label>
              <input
                className={INPUT}
                id="location-desc"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Ex.: Outdoors e painéis digitais"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-fill py-[15px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Salvando…' : 'Salvar localidade'}
              </button>
              <button
                type="button"
                className="text-sm font-semibold text-ink-soft underline hover:text-orange"
                onClick={() => {
                  setDraft(null)
                  setName('')
                  setDesc('')
                  setError('')
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {error && <p className={ERROR}>{error}</p>}

        <section>
          <div className="eyebrow border-b border-line-2 pb-3">
            <b>Localidades</b>
          </div>
          {locations.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">
              Nenhuma localidade ainda. Clique no mapa para marcar a primeira — enquanto isso, o
              site mostra as praças padrão.
            </p>
          ) : (
            <ul className="m-0 list-none p-0">
              {locations.map((loc) => (
                <LocationRow
                  key={loc.id}
                  location={loc}
                  moving={movingId === loc.id}
                  onMove={() => {
                    setDraft(null)
                    setMovingId(loc.id)
                  }}
                  onCancelMove={() => setMovingId(null)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
