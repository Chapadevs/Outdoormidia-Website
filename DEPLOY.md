# Deploy — Outdoormídia

Produção roda no **Firebase App Hosting** (Cloud Run) no projeto
`outdoormidia-ecf88`. Sem Vercel.

## Visão geral do fluxo

```
feature/* ──PR──> dev ──PR──> main ──push──> PRODUÇÃO
                   │            │
                   │            ├─ App Hosting: build + deploy do app Next.js (automático)
                   │            └─ GitHub Action: deploy das rules + indexes
                   │
                   └─ CI (lint + build) roda em todo PR para dev e main
```

- **App Next.js (SSR + API routes):** o backend do App Hosting está conectado ao
  repositório GitHub. Todo push na `main` dispara build + rollout automáticos.
  Nós **não** fazemos `firebase deploy` do app — o App Hosting cuida disso.
- **Regras e índices:** App Hosting **não** publica `firestore.rules`,
  `storage.rules` nem `firestore.indexes.json`. Um GitHub Action
  (`.github/workflows/deploy-rules.yml`) faz isso a cada push na `main` que altere
  esses arquivos.
- **CI:** `.github/workflows/ci.yml` roda `npm run lint` + `npm run build` em todo
  PR para `main`/`dev`, bloqueando merge de código quebrado.

## Configuração (rodar UMA vez)

### 1. Plano Blaze + orçamento
- Ativar o plano **Blaze** no projeto `outdoormidia-ecf88` (necessário para App
  Hosting e Cloud Storage). Pode usar a mesma billing account do GCP.
- Google Cloud Console → **Billing → Budgets & alerts** → criar orçamento **escopado
  ao projeto `outdoormidia-ecf88`** (ex: R$20/mês) com alerta por e-mail.

### 2. Backend do App Hosting
- Firebase Console → **Build → App Hosting**.
- Confirmar backend conectado ao repo `Chapadevs/Outdoormidia-Website`, branch de
  rollout = **`main`**, rollout automático ligado.
- As env vars de produção vêm de [`apphosting.yaml`](apphosting.yaml) (nada de
  service-account key — o runtime usa Application Default Credentials).

### 3. Service account de deploy das regras (para o GitHub Action)
- Google Cloud Console → **IAM & Admin → Service Accounts** → criar uma SA
  (ex: `github-rules-deployer`).
- Conceder os papéis:
  - **Firebase Rules Admin** (`roles/firebaserules.admin`)
  - **Cloud Datastore Index Admin** (`roles/datastore.indexAdmin`)
- Gerar uma **chave JSON**.
- GitHub → repo → **Settings → Secrets and variables → Actions → New secret**:
  - Nome: `FIREBASE_SERVICE_ACCOUNT`
  - Valor: conteúdo do JSON.

### 4. Fix do login admin — Service Account Token Creator
O login admin assina um session cookie (`createSessionCookie`). No Cloud Run sem
chave privada, isso exige a permissão `iam.serviceAccounts.signBlob`. Sem ela, o
login retorna **erro 500 em produção**.

- Descobrir a SA de runtime do App Hosting (algo como
  `firebase-app-hosting-compute@outdoormidia-ecf88.iam.gserviceaccount.com`).
- Conceder a ela o papel **Service Account Token Creator**
  (`roles/iam.serviceAccountTokenCreator`) **sobre si mesma**:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  firebase-app-hosting-compute@outdoormidia-ecf88.iam.gserviceaccount.com \
  --member="serviceAccount:firebase-app-hosting-compute@outdoormidia-ecf88.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountTokenCreator" \
  --project=outdoormidia-ecf88
```

### 5. Branch protection
- GitHub → **Settings → Branches** → adicionar regra para `main` (e `dev`):
  exigir o status check **CI / Lint & Build** aprovado antes do merge.

### 6. Primeiro admin em produção
Cria o usuário admin real com a claim `{ admin: true }`. Rodar localmente uma vez:

```bash
gcloud auth application-default login   # autentica no projeto
SEED_TARGET=prod \
  SEED_ADMIN_EMAIL="voce@outdoormidia.com.br" \
  SEED_ADMIN_PASSWORD="uma-senha-forte" \
  npm run seed:admin
```

## Operação do dia a dia

1. Criar feature branch a partir de `dev` (ex: `feature/mapa-pracas`).
2. Abrir PR para `dev` → CI roda lint + build.
3. Merge em `dev` quando aprovado.
4. Quando `dev` estiver pronto para produção, abrir PR de `dev` para `main`.
5. Merge em `main` → App Hosting faz rollout do app; se as rules/indexes mudaram,
   o Action `deploy-rules` publica.

## Verificação pós-deploy

- **Actions:** conferir CI verde nos PRs e `deploy-rules` verde no push da `main`.
- **App:** abrir a URL de produção; validar home (SSR) e blog.
- **Login admin:** `/admin/login` com o admin seedado — sessão criada sem erro 500
  (prova que o passo 4 está correto). Testar upload de imagem no editor de post.
- **Rules:** Firebase Console → Firestore/Storage → Rules batem com o repo; índice
  composto de `posts` (`status` + `publishedAt`) = "Enabled".
