'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[2px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'

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
      className="ticks flex flex-col gap-5 border border-line bg-white p-[38px] max-mob:p-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="email">
          E-mail
        </label>
        <input
          className={INPUT}
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
        <label className={LABEL} htmlFor="password">
          Senha
        </label>
        <input
          className={INPUT}
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
        <p className="rounded-[2px] border-[1.5px] border-orange bg-orange/5 px-3.5 py-3 text-sm text-ink">
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
