// Cria (ou atualiza) o usuário admin no Firebase Auth Emulator e seta a claim
// { admin: true }. Idempotente. Uso: npm run seed:admin
//
// Requer o emulador rodando (npm run emulators). Não toca em nenhum projeto real:
// FIREBASE_AUTH_EMULATOR_HOST garante que tudo acontece no emulador local.

import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

process.env.FIREBASE_AUTH_EMULATOR_HOST =
  process.env.FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099'

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'demo-outdoormidia'
const EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@outdoormidia.com.br'
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin123'

const auth = getAuth(initializeApp({ projectId: PROJECT_ID }))

async function run() {
  let user
  try {
    user = await auth.getUserByEmail(EMAIL)
    console.log(`• Usuário já existe: ${EMAIL} (${user.uid})`)
  } catch {
    user = await auth.createUser({ email: EMAIL, password: PASSWORD, emailVerified: true })
    console.log(`• Usuário criado: ${EMAIL} (${user.uid})`)
  }

  await auth.setCustomUserClaims(user.uid, { admin: true })
  console.log('• Claim { admin: true } aplicada.')
  console.log('\nPronto. Faça login em /admin/login com:')
  console.log(`  E-mail: ${EMAIL}`)
  console.log(`  Senha:  ${PASSWORD}`)
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Falha no seed:', err.message)
    console.error('O emulador está rodando? (npm run emulators)')
    process.exit(1)
  })
