'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// `resource` é o segmento da rota (/api/admin/<resource>/<id>); `label` é como
// o item é chamado na confirmação e no erro ("post", "case").
export default function DeleteButton({ id, title, resource, label }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Excluir o ${label} "${title}"? Essa ação não pode ser desfeita.`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      setDeleting(false)
      window.alert(`Erro ao excluir o ${label}. Tente novamente.`)
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
