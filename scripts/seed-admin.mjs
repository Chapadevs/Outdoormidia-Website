// Cria (ou atualiza) o usuário admin no Firebase Auth e seta a claim
// { admin: true }. Idempotente.
//
// Dois modos:
//   • Emulador (default) — uso: npm run seed:admin
//       Requer o emulador rodando (npm run emulators). Não toca em nenhum projeto
//       real: FIREBASE_AUTH_EMULATOR_HOST garante que tudo acontece localmente.
//
//   • Produção — uso: SEED_TARGET=prod npm run seed:admin
//       Fala com o projeto real (outdoormidia-ecf88) via Application Default
//       Credentials. Autentique antes com `gcloud auth application-default login`
//       (ou aponte GOOGLE_APPLICATION_CREDENTIALS para uma SA key temporária).
//       SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD são OBRIGATÓRIOS neste modo.

import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const IS_PROD = process.env.SEED_TARGET === 'prod'

if (!IS_PROD) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST =
    process.env.FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099'
}

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  (IS_PROD ? 'outdoormidia-ecf88' : 'demo-outdoormidia')

const EMAIL = process.env.SEED_ADMIN_EMAIL || (IS_PROD ? '' : 'admin@outdoormidia.com.br')
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || (IS_PROD ? '' : 'admin123')

if (IS_PROD && (!EMAIL || !PASSWORD)) {
  console.error(
    'Modo produção exige SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD definidos.\n' +
      'Ex: SEED_TARGET=prod SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... npm run seed:admin'
  )
  process.exit(1)
}

const auth = getAuth(initializeApp({ projectId: PROJECT_ID }))

async function run() {
  console.log(`• Alvo: ${IS_PROD ? 'PRODUÇÃO' : 'emulador'} (${PROJECT_ID})`)

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
  if (!IS_PROD) console.log(`  Senha:  ${PASSWORD}`)
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Falha no seed:', err.message)
    if (IS_PROD) {
      console.error('Autenticado no GCP? (gcloud auth application-default login)')
    } else {
      console.error('O emulador está rodando? (npm run emulators)')
    }
    process.exit(1)
  })
