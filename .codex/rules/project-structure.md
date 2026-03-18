---
paths: src/**/*
---

# Estrutura do Projeto

## Objetivo

Preservar organizacao por dominio e separacao entre app, componentes e camada de API.

## Regras

- Rotas e layouts em `src/app`.
- Componentes visuais em `src/components` (subpastas por dominio e `ui`).
- Integracao HTTP em `src/lib/api` (cliente, features, tipos e servicos).
- Dados de desenvolvimento/mock em `src/lib/mock-data`.
- Testes unitarios em `src/__tests__`; E2E em `e2e`.
- Seguir padrao de nomes atual: componentes em `PascalCase.tsx`.

## Anti-padroes

- Criar pastas novas sem responsabilidade clara.
- Colocar servicos de API dentro de `components`.
- Duplicar logica de dominio em `app` e `components`.

## Checklist

- O arquivo novo foi para a camada correta?
- A feature de API segue `types.ts` + `service.ts` + `index.ts`?
- Testes foram adicionados no local esperado?
- Nomenclatura seguiu padrao existente?
