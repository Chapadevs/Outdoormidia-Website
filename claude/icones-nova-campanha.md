# Ícones · Seção Nova Campanha

**Projeto:** Redesign outdoormidia.com.br
**De:** João Bernardo · Imagine Concept
**Para:** Erik · desenvolvimento

---

## Biblioteca e padrão

**Lib:** `lucide-react` (já deve estar disponível no stack — se não, `npm i lucide-react`)

Import direto do componente. Sem gerar SVG, sem IA envolvida na criação visual — só troca de componente.

```jsx
import {
  Target, Zap, Bot, Flag, Megaphone, Briefcase,
  Store, Package, MapPin, Calendar, CircleHelp,
  Building2, Umbrella, Milestone, Landmark, Route,
  CalendarRange, CalendarCheck, CalendarClock,
  Wrench, UtensilsCrossed, Home, Cross, GraduationCap,
  Factory, ShoppingCart, Car, CalendarDays, Plus
} from 'lucide-react'
```

---

## Cards principais

| Item | Ícone |
|---|---|
| Diagnóstico de Presença | `Target` |
| Mídia Programática | `Zap` |
| Atendimento automatizado | `Bot` |

## Etapa · Momento

| Opção | Ícone |
|---|---|
| É minha primeira campanha | `Flag` |
| Já anunciei em OOH antes | `Megaphone` |
| Sou agência ou planejamento | `Briefcase` |

## Etapa · Objetivo

| Opção | Ícone |
|---|---|
| Levar gente até a loja | `Store` |
| Lançar produto ou unidade | `Package` |
| Construir marca na região | `MapPin` |
| Divulgar uma data ou evento | `Calendar` |
| Ainda não sei | `CircleHelp` |

## Etapa · Praça

| Opção | Ícone |
|---|---|
| Curitiba e Região Metropolitana | `Building2` |
| Litoral do Paraná | `Umbrella` |
| Joinville | `Milestone` |
| Itajaí e Balneário Camboriú | `Landmark` |
| Rodovias | `Route` |
| Todas as praças | `MapPin` |
| Ainda não sei | `CircleHelp` |

## Etapa · Período

| Opção | Ícone |
|---|---|
| Bi-semana | `CalendarRange` |
| 1 mês | `CalendarCheck` |
| 3 meses | `Calendar` |
| 6 meses ou mais | `CalendarClock` |
| Ainda não sei | `CircleHelp` |

## Etapa · Segmento

| Opção | Ícone |
|---|---|
| Varejo | `Store` |
| Serviços | `Wrench` |
| Restaurantes e alimentação | `UtensilsCrossed` |
| Imobiliário e construção civil | `Home` |
| Saúde | `Cross` |
| Educação | `GraduationCap` |
| Indústria | `Factory` |
| Supermercados | `ShoppingCart` |
| Automotivo | `Car` |
| Eventos | `CalendarDays` |
| Agências de marketing e publicidade | `Megaphone` |
| Outro | `Plus` |

---

## Regras de aplicação

- **Cor:** monocromia laranja da marca em todos os ícones, exceto o verde do WhatsApp (Orientações 2026, item 5.5).
- **Tamanho:** stroke uniforme, `size={20}` ou `size={24}` conforme o card.
- **Etapa de Contato (5ª etapa):** não leva ícone. Só campos de input puro.
