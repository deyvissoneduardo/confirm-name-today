---
paths: src/app/**/*.tsx
---

# Arquitetura Next.js

## Objetivo

Padronizar o uso de App Router (`src/app`) com separacao clara entre server e client.

## Regras

- Manter convencoes do App Router: `layout.tsx`, `page.tsx` e segmentos por rota.
- Usar `use client` somente quando houver estado local, efeitos, contexto de browser ou navegacao client.
- Preservar `RootLayout` como ponto global para providers e estilos base.
- Novas rotas devem seguir estrutura existente de dominios (`games`, `rankings`, `statistics`, etc).

## Anti-padroes

- Marcar pagina inteira como client sem necessidade tecnica.
- Misturar convencoes de Pages Router (`pages/`) no projeto atual.
- Adicionar provider global sem necessidade transversal.

## Checklist

- A rota foi criada em `src/app` com convencoes do App Router?
- `use client` foi realmente necessario?
- A composicao com layout global foi preservada?
- A rota segue nomenclatura e estrutura existentes?
