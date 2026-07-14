---
name: nova-secao
description: >
  Padrões para criar ou editar seções da home e componentes de UI do site
  Outdoormídia. Usar sempre que a tarefa envolver adicionar/alterar um
  componente em components/sections, layout, ui, widgets ou forms — ou uma
  nova página em app/. Cobre estrutura de arquivos, design system (paleta,
  tipografia, .ticks, .reveal), padrão data-driven e convenções de código.
---

# Criar seção / componente — Outdoormídia

Site em **Next.js (App Router) + React 19**, JavaScript puro, **CSS puro** em
`app/globals.css` (sem Tailwind, sem CSS-in-JS). Componentes são Server
Components por padrão — só adicione `'use client'` quando usar hooks/estado.

## 1. Onde colocar o arquivo

| Tipo | Pasta | Alias de import |
|---|---|---|
| Seção da home | `components/sections/` | `@/components/sections/Nome` |
| Header / Footer | `components/layout/` | `@/components/layout/Nome` |
| Primitivo reutilizável | `components/ui/` | `@/components/ui/Nome` |
| Widget global (no layout) | `components/widgets/` | `@/components/widgets/Nome` |
| Formulário | `components/forms/` | `@/components/forms/Nome` |

Nome do arquivo em `PascalCase.jsx`. Para uma nova seção na home, adicione o
componente na ordem desejada em `app/page.js`.

## 2. Esqueleto de uma seção

Copie o padrão real do projeto (ver `components/sections/Formats.jsx`):

```jsx
const ITENS = [
  { title: 'Exemplo', text: 'Descrição curta.' },
]

export default function MinhaSecao() {
  return (
    <section className="block" id="minha-secao">
      <div className="wrap">
        <div className="lab reveal">
          <span className="num">05</span>
          <h2>Título da seção</h2>
          <span className="rule"></span>
        </div>
        <div className="minha-grid">
          {ITENS.map((it) => (
            <div className="card reveal" key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Padrão data-driven:** dados em constante `SCREAMING_SNAKE` no topo do arquivo,
renderizados com `.map()`. Nunca repetir markup manualmente.

## 3. Design system (classes que já existem em globals.css)

- **`.block`** — seção com `padding: 110px 0` (72px no mobile)
- **`.wrap`** — container centralizado, `max-width: 1280px`, `padding: 0 32px`
- **`.lab`** — cabeçalho de seção: `.num` (laranja) + `<h2>` + `.rule` (linha)
- **`.reveal`** — anima entrada via IntersectionObserver (o `RevealObserver`
  global adiciona `.in`). Coloque em cada elemento que deve surgir ao rolar.
- **`.ticks`** — cantoneiras laranja (motivo de identidade) em cards/CTAs
- **`.display`** — Anton, uppercase, para números/headlines grandes
- **`.eyebrow`** — rótulo pequeno, uppercase, `letter-spacing:.22em`
- **`.btn`** (outline) · **`.btn-fill`** (laranja sólido) · **`.btn-on-orange`**
  (branco sobre laranja)

## 4. Regras visuais (obrigatórias)

- **Nunca** usar `#000` ou `black` → sempre `var(--ink)` (#16110D). Preto não é
  da identidade.
- Paleta via CSS vars: `--paper` (fundo bege), `--bone`, `--ink`, `--ink-soft`,
  `--orange` (#FF4D00), `--orange-2`.
- Fundo padrão é `--paper`, não branco puro.
- `border-radius: 2px` em cards/formulários (quase quadrado é intencional).
  Arredondado só em logo e botão WhatsApp.

## 5. CSS novo

Adicione as classes da seção em `app/globals.css` (kebab-case: `.minha-grid`,
`.card`). CSS é **desktop-first**: base para desktop, overrides com
`@media (max-width: Xpx)`. Breakpoints do projeto: 980px, 560px, 380px.

## 6. Convenções de código

- Sem TypeScript — JavaScript puro.
- Sem bibliotecas de UI externas.
- Sem comentários desnecessários — código autoexplicativo.
- Texto de usuário sempre em **PT-BR**.
- WhatsApp: importar `WHATSAPP_URL` de `@/lib/constants`, não hardcode.

## 7. Antes de concluir

Rode o dev server (`npm run dev`, porta 3000) e verifique a seção renderizando
no browser — não confie só no build.
