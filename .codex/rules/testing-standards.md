---
paths: {src,e2e}/**/*
---

# Padroes de Teste

## Objetivo

Garantir confiabilidade com cobertura de unidade/integracao e fluxo E2E.

## Regras

- Testes unitarios/integracao com Jest + Testing Library em `src/__tests__` ou `*.test.ts(x)`.
- Testes E2E com Playwright em `e2e/*.spec.ts`.
- Para novas features de API, adicionar testes de sucesso e erro.
- Evitar mock excessivo quando for possivel testar comportamento real da unidade.

## Anti-padroes

- Testes que validam implementacao interna em vez de comportamento.
- Nao cobrir estados de erro/loading em componentes criticos.
- E2E sem isolamento minimo de dados/cenario.

## Checklist

- Mudanca relevante veio com teste?
- Existem casos de erro e borda cobertos?
- Suite escolhida (Jest vs Playwright) corresponde ao tipo de teste?
- Os testes rodam com os scripts padrao do projeto?
