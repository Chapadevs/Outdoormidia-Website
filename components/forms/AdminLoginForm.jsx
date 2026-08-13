'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await getIdToken(cred.user, true)

      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Não foi possível iniciar a sessão.')
      }

      await auth.signOut()
      router.replace('/admin')
      router.refresh()
    } catch (err) {
      setError(mapError(err))
      setLoading(false)
    }
  }

  return (
    <form
      className="ticks flex flex-col gap-5 rounded-[16px] border border-line bg-white p-[38px] max-mob:p-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label className="field-label" htmlFor="email">
          E-mail
        </label>
        <input
          className="field-input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@outdoormidia.com.br"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="field-label" htmlFor="password">
          Senha
        </label>
        <input
          className="field-input"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="field-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}

function mapError(err) {
  const code = err?.code || ''
  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found' ||
    code === 'auth/invalid-email'
  ) {
    return 'E-mail ou senha incorretos.'
  }
  if (code === 'auth/too-many-requests') {
    return 'Muitas tentativas. Tente novamente em instantes.'
  }
  return err?.message || 'Erro ao entrar. Tente novamente.'
}
