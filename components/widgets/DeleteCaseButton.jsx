'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteCaseButton({ id, title }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Excluir o case "${title}"? Essa ação não pode ser desfeita.`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/cases/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      setDeleting(false)
      window.alert('Erro ao excluir o case. Tente novamente.')
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm font-semibold text-ink-soft underline hover:text-orange disabled:opacity-60"
    >
      {deleting ? 'Excluindo…' : 'Excluir'}
    </button>
  )
}
