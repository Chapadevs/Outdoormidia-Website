'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="btn border-line text-ink hover:bg-ink hover:text-white disabled:opacity-60"
    >
      {loading ? 'Saindo…' : 'Sair'}
    </button>
  )
}
