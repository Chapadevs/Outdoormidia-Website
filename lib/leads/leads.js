import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { toIso } from '@/lib/firebase/serialize'
import { ORIGENS } from '@/lib/leads/origens'

const COLLECTION = 'leads'

function serialize(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    origem: data.origem,
    nome: data.nome || '',
    empresa: data.empresa || '',
    email: data.email || '',
    whatsapp: data.whatsapp || '',
    dados: data.dados || {},
    status: data.status || 'novo',
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : ''
}

// Só as chaves declaradas na origem entram no documento — o body já passou pela
// validação, mas o filtro impede que um campo novo do formulário vaze para o
// Firestore sem passar por lib/leads/origens.js.
function toDoc({ origem, nome, empresa, email, whatsapp, dados }) {
  const permitidos = ORIGENS[origem].campos.map((c) => c.key)
  return {
    origem,
    nome: texto(nome),
    empresa: texto(empresa),
    email: texto(email),
    whatsapp: texto(whatsapp),
    dados: Object.fromEntries(
      permitidos.map((key) => [key, texto(dados?.[key])]).filter(([, valor]) => valor)
    ),
  }
}

// Ordenação simples num campo só: não exige índice composto. Os filtros por
// origem e status da listagem do admin são aplicados em JS, pelo mesmo motivo
// documentado em lib/cases/cases.js.
export async function listAllLeads() {
  const snap = await adminDb.collection(COLLECTION).orderBy('createdAt', 'desc').get()
  return snap.docs.map(serialize)
}

export async function getLeadById(id) {
  const doc = await adminDb.collection(COLLECTION).doc(id).get()
  return doc.exists ? serialize(doc) : null
}

export async function createLead(body) {
  const now = FieldValue.serverTimestamp()
  const ref = await adminDb.collection(COLLECTION).add({
    ...toDoc(body),
    status: 'novo',
    createdAt: now,
    updatedAt: now,
  })
  return ref.id
}

// O admin não edita o conteúdo do lead — ele é o registro do que o visitante
// enviou. A única mutação é o acompanhamento comercial.
export async function updateLeadStatus(id, status) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.update({ status, updatedAt: FieldValue.serverTimestamp() })
  return { id }
}

export async function deleteLead(id) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.delete()
  return { id }
}
