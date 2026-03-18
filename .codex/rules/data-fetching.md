---
paths: src/**/*.{ts,tsx}
---

# Data Fetching

## Objetivo

Centralizar chamadas HTTP na camada `src/lib/api` com tratamento consistente de erro.

## Regras

- Usar `api`/`apiClient` de `src/lib/api/client.ts` para chamadas HTTP reais.
- Encapsular endpoints em `src/lib/api/features/<feature>/service.ts`.
- Manter contratos em `types.ts` e re-export em `index.ts` da feature.
- Em telas, consumir services (ou hooks da feature) em vez de chamar `fetch` direto.
- Respeitar `USE_MOCK_DATA` para cenarios de mock onde ja aplicado.

## Anti-padroes

- `fetch` solto em componentes de UI sem camada de servico.
- Tratar erro de forma diferente em cada tela sem padrao.
- Misturar tipos de API diretamente em componentes sem `types.ts` da feature.

## Checklist

- Endpoint novo foi adicionado em `service.ts` da feature?
- Tipos da request/response foram definidos?
- Tela nao chama HTTP diretamente?
- Loading e erro foram tratados?
