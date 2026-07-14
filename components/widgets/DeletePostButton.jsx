'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeletePostButton({ id, title }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Excluir o post "${title}"? Essa ação não pode ser desfeita.`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      setDeleting(false)
      window.alert('Erro ao excluir o post. Tente novamente.')
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
