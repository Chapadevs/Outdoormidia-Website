---
name: git-deploy-flow
description: >
  Fluxo de git e deploy do projeto Outdoormídia — feature branches → dev →
  main. Usar sempre que for criar branch, commitar, abrir PR, fazer merge ou
  preparar deploy. Cobre a estratégia de branches, o checklist de verificação
  (lint, build, browser) e os comandos de cada etapa.
---

# Git & Deploy — Outdoormídia

## Estratégia de branches

```
feature/nome-da-feature  →  dev  →  main (produção)
```

- **`main`** — só recebe merge de `dev` quando a versão está pronta para
  produção. Nunca commitar direto.
- **`dev`** — branch de integração. Recebe merges das feature branches.
- **`feature/*`** — todo trabalho novo. Criada a partir de `dev`.

Remote: `origin` → `https://github.com/Chapadevs/Outdoormidia-Website.git`

## Iniciar uma feature

```bash
git checkout dev
git pull origin dev
git checkout -b feature/mapa-pracas
```

Nomes de branch em kebab-case, prefixo `feature/`. Um assunto por branch.

## Checklist antes de commitar / abrir PR

1. **Lint:** `npm run lint` — sem erros.
2. **Build:** `npm run build` — compila limpo (esta é uma versão recente do
   Next.js; ver deprecações em `node_modules/next/dist/docs/`).
3. **Browser:** rodar `npm run dev` (porta 3000) e verificar a mudança
   renderizando de fato — home (`/`) e, se afetado, `/proposta`. Não confiar só
   no build.
4. Revisar o diff: `git status` após `git add`, conferindo que não entram
   segredos, `.env*`, nem `.claude/settings.local.json`.

## Commit

Mensagens curtas e imperativas, em PT-BR. Um commit por unidade lógica.

```bash
git add <arquivos>
git commit -m "Adiciona mapa interativo de praças"
```

## Merge para dev

Preferir Pull Request no GitHub (via `gh pr create --base dev`) para deixar
rastro de revisão. Merge direto em `dev` só para a base inicial do projeto.

```bash
gh pr create --base dev --head feature/mapa-pracas \
  --title "Mapa interativo de praças" \
  --body "Integra MapLibre GL JS com tiles do Google Cloud."
```

## Promover para produção (main)

Só quando `dev` está estável e verificada:

```bash
gh pr create --base main --head dev --title "Release: <resumo>"
```

## Regras

- Nunca `push --force` em `dev` ou `main`.
- Nunca commitar/mergear direto em `main`.
- Não pular hooks (`--no-verify`) nem assinatura sem pedido explícito.
- Atenção: o repo está em pasta OneDrive — evite operações git enquanto o
  OneDrive estiver sincronizando `node_modules`/`.next` para não gerar locks.
