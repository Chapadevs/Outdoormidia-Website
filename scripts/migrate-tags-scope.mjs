// Migra a coleção `tags` para o modelo com escopo e semeia os grupos do blog.
// Idempotente: rodar 2x não muda nada na segunda vez.
//
//   Fase A — cria tagGroups/blog__{localizacao,plataforma,tema} (pula os que já existem).
//   Fase B — re-chaveia tags/{slug} → tags/blog__{slug}, gravando os campos
//            `scope` e `slug`. Mudar o doc id exige criar+deletar; tudo num
//            único batch, então não existe estado meio-migrado.
//
// Dois modos:
//   • Emulador (default) — uso: npm run migrate:tags
//       Requer o emulador rodando (npm run emulators).
//
//   • Produção — fala com o projeto real (outdoormidia-ecf88) via Application
//       Default Credentials. Autentique antes com:
//         gcloud auth application-default login
//         gcloud auth application-default set-quota-project outdoormidia-ecf88
//       A conta precisa do papel Cloud Datastore User no outdoormidia-ecf88.
//
// DRY_RUN=1 imprime o plano e não escreve nada. Sempre rode o dry-run primeiro.
//
// PowerShell (o shell deste projeto) — atenção: $env: persiste na sessão, então
// limpe as variáveis depois para não mandar a próxima rodada para produção:
//
//   $env:MIGRATE_TARGET='prod'; $env:DRY_RUN='1'; npm run migrate:tags
//   $env:MIGRATE_TARGET='prod'; Remove-Item Env:DRY_RUN; npm run migrate:tags
//   Remove-Item Env:MIGRATE_TARGET
//
// bash:
//   MIGRATE_TARGET=prod DRY_RUN=1 npm run migrate:tags
//   MIGRATE_TARGET=prod npm run migrate:tags

import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const IS_PROD = process.env.MIGRATE_TARGET === 'prod'
const DRY_RUN = process.env.DRY_RUN === '1'

if (!IS_PROD) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080'
}

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || (IS_PROD ? 'outdoormidia-ecf88' : 'demo-outdoormidia')

const SCOPE = 'blog'

const SEED_GROUPS = [
  { slug: 'localizacao', label: 'Localização', order: 0 },
  { slug: 'plataforma', label: 'Plataforma', order: 1 },
  { slug: 'tema', label: 'Tema', order: 2 },
]

const db = getFirestore(initializeApp({ projectId: PROJECT_ID }))

async function seedGroups() {
  console.log('\n— Fase A: grupos do blog')
  let created = 0
  let skipped = 0

  for (const { slug, label, order } of SEED_GROUPS) {
    const ref = db.doc(`tagGroups/${SCOPE}__${slug}`)
    if ((await ref.get()).exists) {
      console.log(`  · ${slug} — já existe, pulando`)
      skipped++
      continue
    }
    console.log(`  + ${slug} ("${label}", order ${order})`)
    if (!DRY_RUN) {
      const now = FieldValue.serverTimestamp()
      await ref.set({ scope: SCOPE, slug, label, order, createdAt: now, updatedAt: now })
    }
    created++
  }

  console.log(`  = ${created} criado(s), ${skipped} pulado(s)`)
}

async function migrateTags() {
  console.log('\n— Fase B: tags legadas → escopo blog')
  const snap = await db.collection('tags').get()

  const batch = db.batch()
  let migrated = 0
  let skipped = 0

  for (const doc of snap.docs) {
    const data = doc.data()

    if (doc.id.includes('__') || data.scope) {
      skipped++
      continue
    }

    const newRef = db.doc(`tags/${SCOPE}__${doc.id}`)
    if ((await newRef.get()).exists) {
      console.warn(`  ! ${doc.id} — ${SCOPE}__${doc.id} já existe, pulando para não sobrescrever`)
      skipped++
      continue
    }

    console.log(`  → tags/${doc.id} → tags/${SCOPE}__${doc.id} (name: "${data.name}")`)
    if (!DRY_RUN) {
      // `slug` vem do doc id, NUNCA de slugify(name): updateTag muda o name
      // mas nunca o id, então uma tag renomeada tem os dois divergentes.
      batch.set(newRef, {
        ...data,
        scope: SCOPE,
        slug: doc.id,
        updatedAt: FieldValue.serverTimestamp(),
      })
      batch.delete(doc.ref)
    }
    migrated++
  }

  if (!DRY_RUN && migrated > 0) await batch.commit()
  console.log(`  = ${migrated} migrada(s), ${skipped} pulada(s)`)
}

async function run() {
  console.log(`• Alvo: ${IS_PROD ? 'PRODUÇÃO' : 'emulador'} (${PROJECT_ID})`)
  if (DRY_RUN) console.log('• DRY_RUN — nada será escrito.')

  await seedGroups()
  await migrateTags()

  console.log(DRY_RUN ? '\nSimulação concluída.' : '\nMigração concluída.')
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Falha na migração:', err.message)
    if (IS_PROD) {
      console.error('Autenticado no GCP? (gcloud auth application-default login)')
    } else {
      console.error('O emulador está rodando? (npm run emulators)')
    }
    process.exit(1)
  })
