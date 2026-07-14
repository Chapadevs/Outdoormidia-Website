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

Site em **Next.js (App Router) + React 19**, JavaScript puro, **Tailwind CSS v4**.
Tokens da marca no `@theme` de `app/globals.css`; estilo via classes utilitárias
no JSX. Componentes são Server Components por padrão — só adicione `'use client'`
quando usar hooks/estado.

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
import SectionHeading from '@/components/ui/SectionHeading'

const ITENS = [
  { title: 'Exemplo', text: 'Descrição curta.' },
]

export default function MinhaSecao() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="minha-secao">
      <div className="wrap">
        <SectionHeading num="05" title="Título da seção" className="reveal mb-[34px]" />
        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
          {ITENS.map((it) => (
            <div className="reveal border border-line bg-white p-6" key={it.title}>
              <h3 className="m-0 text-[19px] font-extrabold">{it.title}</h3>
              <p className="m-0 text-[13.5px] text-ink-soft">{it.text}</p>
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

## 3. Design system

Tokens de cor (usar como utilitários Tailwind): `bg-paper`, `bg-bone`, `text-ink`,
`text-ink-soft`, `text-orange`, `border-line`, `border-line-2`, `bg-orange`.

Fontes: `font-sans` (Archivo, padrão) e `font-display` (Anton, para números e
headlines grandes).

Primitivos em `@layer components` (`app/globals.css`):

- **`.wrap`** — container centralizado, `max-width: 1280px`, `padding: 0 32px`
- **`.display`** — Anton, uppercase, branco, `line-height: .86`
- **`.eyebrow`** — rótulo pequeno, uppercase, `letter-spacing: .22em`
- **`.btn`** (outline) · **`.btn-fill`** (laranja sólido) · **`.btn-on-orange`**
  (branco sobre laranja)
- **`.ticks`** — cantoneiras laranja (motivo de identidade) em cards/CTAs;
  sobrescrever cor com `[--tick-color:#fff]` em fundo laranja
- **`.reveal`** — anima entrada via IntersectionObserver (o `RevealObserver`
  global adiciona `.in`). Coloque em cada elemento que deve surgir ao rolar.
- **`.select-caret`** — seta de `<select>` estilizado

Componentes de UI: `SectionHeading` (número laranja + h2 + linha de regra).

Padding de seção: `py-[110px] max-mob:py-[72px]` direto no JSX.

## 4. Regras visuais (obrigatórias)

- **Nunca** usar `#000` ou `black` → sempre `ink` (#16110D). Preto não é da
  identidade. Para escuros translúcidos use `ink/[.42]` etc.
- Fundo padrão é `paper` (bege), não branco puro.
- `rounded-[2px]` em cards/formulários (quase quadrado é intencional).
  Arredondado (`rounded-full`) só em logo e botão WhatsApp.

## 5. Responsividade

**Desktop-first**: base para desktop, overrides com as variants
`max-tab:` (≤980px), `max-mob:` (≤560px) e `max-xs:` (≤380px) — breakpoints
customizados definidos no `@theme` de `app/globals.css`.

Não adicionar CSS novo em `globals.css`, exceto quando for um primitivo
reutilizável do design system (pseudo-elementos, keyframes) — nesse caso,
adicionar em `@layer components` com nome `kebab-case`.

## 6. Convenções de código

- Sem TypeScript — JavaScript puro.
- Sem bibliotecas de UI externas — Tailwind é a única camada de estilo.
- Sem comentários desnecessários — código autoexplicativo.
- Texto de usuário sempre em **PT-BR**.
- WhatsApp: importar `WHATSAPP_URL` de `@/lib/constants`, não hardcode.
- Links internos: `<Link>` de `next/link` (nunca `<a>` para rotas internas).

## 7. Antes de concluir

Rode o dev server (`npm run dev`, porta 3000) e verifique a seção renderizando
no browser — não confie só no build. Rode `npm run lint`.
