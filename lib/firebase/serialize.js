import { Timestamp } from 'firebase-admin/firestore'

// Timestamp do Firestore → string ISO, para o documento atravessar a fronteira
// server/client como JSON. Campo ausente ou de outro tipo vira null.
export function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}
