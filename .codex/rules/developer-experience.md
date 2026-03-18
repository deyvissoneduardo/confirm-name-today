# Developer Experience

## Objetivo

Manter fluxo de desenvolvimento consistente com lint, formatacao e hooks de commit.

## Regras

- Antes de abrir PR, rodar `npm run lint` e testes aplicaveis.
- Preservar pre-commit com Husky (`.husky/pre-commit`) executando `lint-staged`.
- Respeitar formatacao do Prettier e correcoes automaticas do ESLint.
- Usar scripts do `package.json` como interface oficial de execucao.

## Anti-padroes

- Contornar hook de pre-commit para enviar codigo sem lint.
- Alterar regras de lint/format sem alinhamento do time.
- Executar comandos ad-hoc diferentes do fluxo padrao sem documentar.

## Checklist

- Lint passou localmente?
- Testes relevantes passaram?
- Arquivos foram formatados automaticamente?
- Hook de pre-commit continua funcional?
