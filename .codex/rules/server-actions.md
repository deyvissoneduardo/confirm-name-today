---
paths: src/app/**/*.ts
---

# Server Actions

## Objetivo

Definir padrao para adocao segura de Server Actions quando o projeto passar a usa-las.

## Regras

- Estado atual: nao ha Server Actions implementadas.
- Ao introduzir, declarar explicitamente `use server` no escopo correto.
- Validar entrada antes de chamar camada de servico.
- Tratar erros e retornar mensagens seguras para a UI.
- Nao acessar APIs de browser dentro da action.

## Anti-padroes

- Criar Server Action sem validacao de input.
- Expor detalhes internos de erro no retorno.
- Misturar regra de apresentacao na action.

## Checklist

- Foi realmente necessario criar Server Action?
- `use server` foi aplicado corretamente?
- Input foi validado?
- Erros foram tratados sem vazar detalhes sensiveis?
