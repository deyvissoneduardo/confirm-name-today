---
paths: src/**/*.tsx
---

# Performance React

## Objetivo

Evitar renderizacoes desnecessarias e manter paginas responsivas.

## Regras

- Extrair componentes quando o JSX da pagina crescer demais.
- Usar memoizacao (`useMemo`, `useCallback`, `memo`) apenas em gargalos reais.
- Evitar recalculo pesado dentro do render.
- Manter efeitos (`useEffect`) focados e com dependencias corretas.

## Anti-padroes

- Otimizacao prematura com memoizacao em tudo.
- `useEffect` que dispara em loop por dependencia instavel.
- Componentes monoliticos que rerenderizam blocos grandes sem necessidade.

## Checklist

- Existe gargalo real antes de memoizar?
- Dependencias de hooks estao corretas?
- Componente grande foi quebrado em partes?
- Render evita trabalho custoso repetido?
