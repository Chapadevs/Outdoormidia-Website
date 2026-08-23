'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STATUS_LEAD } from '@/lib/leads/origens'

// Acompanhamento comercial do lead. É o único campo mutável — o resto do
// documento é o registro do que o visitante enviou.
export default function LeadStatusSelect({ id, status }) {
  const router = useRouter()
  const [valor, setValor] = useState(status)
  const [salvando, setSalvando] = useState(false)

  async function alterar(proximo) {
    const anterior = valor
    setValor(proximo)
    setSalvando(true)
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: proximo }),
    })
    setSalvando(false)
    if (res.ok) {
      router.refresh()
    } else {
      setValor(anterior)
      window.alert('Erro ao mudar o status do lead. Tente novamente.')
    }
  }

  return (
    <select
      aria-label="Status do lead"
      className="field-input field-select select-caret py-2.5 text-sm disabled:opacity-60"
      disabled={salvando}
      onChange={(e) => alterar(e.target.value)}
      value={valor}
    >
      {STATUS_LEAD.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  )
}
