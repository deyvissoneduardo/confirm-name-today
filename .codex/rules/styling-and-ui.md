---
paths: src/**/*.tsx
---

# Styling e UI

## Objetivo

Manter consistencia visual com Tailwind CSS 4 e biblioteca de componentes interna.

## Regras

- Usar classes utilitarias Tailwind para layout e estado visual.
- Reutilizar componentes base em `src/components/ui` antes de criar novos.
- Centralizar variacoes de estilo em props (`variant`, `size`) quando fizer sentido.
- Manter padrao visual atual (tema escuro e paleta existente) enquanto nao houver redesign.

## Anti-padroes

- Estilo inline recorrente quando pode ser classe utilitaria.
- Duplicar componente UI com pequenas variacoes.
- Introduzir nova UI library (MUI, Chakra, etc.) sem decisao arquitetural.

## Checklist

- Reaproveitou componente de `ui/*` quando possivel?
- Classes Tailwind estao legiveis e sem redundancia?
- Variacoes foram modeladas por props em vez de copia de componente?
- Nao foi introduzida nova biblioteca de UI?
