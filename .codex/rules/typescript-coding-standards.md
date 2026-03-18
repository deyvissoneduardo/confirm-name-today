# Padroes TypeScript

## Objetivo

Manter tipagem forte e previsivel no projeto Next.js com `strict: true`.

## Regras

- Nao usar `any`; quando necessario, usar `unknown` e fazer narrowing.
- Tipar retorno de funcoes publicas (servicos, hooks e utils).
- Tipar `props` de componentes e payloads de API com interfaces/types explicitos.
- Reutilizar tipos da feature em `src/lib/api/features/*/types.ts`.
- Usar alias `@/` para imports internos.
- Respeitar padrao atual de formatacao (Prettier): `singleQuote`, `semi`, `printWidth: 80`.

## Anti-padroes

- Casting em cadeia (`as X as Y`) para forcar tipos.
- Duplicar tipos de dominio em varios arquivos.
- Deixar funcoes async retornarem tipo implicito quando fazem I/O.

## Checklist

- Existe algum `any` novo?
- As `props` e respostas de API estao tipadas?
- O tipo veio de `types.ts` da feature quando aplicavel?
- Imports internos usam `@/`?
