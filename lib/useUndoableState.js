'use client'
import { useCallback, useState } from 'react'

// Histórico de edição para formulários controlados. O textarea perde o desfazer
// nativo do navegador assim que o valor passa a vir do React — a barra de
// formatação reescreve o conteúdo inteiro —, então o histórico é mantido aqui.
//
// Digitação entra em rajada: alterações a menos de COALESCE_MS uma da outra
// viram um passo só, para o Ctrl+Z não voltar letra por letra. Ações discretas
// (barra, tags, upload) chamam set() sem `coalesce` e sempre abrem um passo.

const COALESCE_MS = 600
const LIMITE = 100

export function useUndoableState(initialState) {
  const [history, setHistory] = useState({
    past: [],
    present: initialState,
    future: [],
    at: 0,
  })

  const set = useCallback((update, { coalesce = false } = {}) => {
    setHistory((h) => {
      const next = typeof update === 'function' ? update(h.present) : update
      if (next === h.present) return h

      const now = Date.now()
      const juntar = coalesce && h.past.length > 0 && now - h.at < COALESCE_MS
      return {
        past: juntar ? h.past : [...h.past, h.present].slice(-LIMITE),
        present: next,
        future: [],
        at: now,
      }
    })
  }, [])

  // Recomeça o histórico — usado quando o formulário troca de base (restaurar
  // rascunho local), em que voltar para o estado anterior não faria sentido.
  const reset = useCallback((state) => {
    setHistory({ past: [], present: state, future: [], at: 0 })
  }, [])

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h
      return {
        past: h.past.slice(0, -1),
        present: h.past[h.past.length - 1],
        future: [h.present, ...h.future],
        at: 0,
      }
    })
  }, [])

  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h
      return {
        past: [...h.past, h.present],
        present: h.future[0],
        future: h.future.slice(1),
        at: 0,
      }
    })
  }, [])

  return [
    history.present,
    set,
    { undo, redo, reset, canUndo: history.past.length > 0, canRedo: history.future.length > 0 },
  ]
}

// Ctrl+Z / Cmd+Z desfaz; Ctrl+Shift+Z, Cmd+Shift+Z e Ctrl+Y refazem.
export function handleUndoShortcut(e, { undo, redo }) {
  if (!e.ctrlKey && !e.metaKey) return
  const key = e.key.toLowerCase()
  if (key === 'z') {
    e.preventDefault()
    if (e.shiftKey) redo()
    else undo()
  } else if (key === 'y') {
    e.preventDefault()
    redo()
  }
}
