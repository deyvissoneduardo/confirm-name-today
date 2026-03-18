# Seguranca

## Objetivo

Reduzir exposicao de dados sensiveis e manter fluxo de autenticacao coerente.

## Regras

- Nao colocar segredos em variaveis `NEXT_PUBLIC_*`.
- Manter segredos apenas em `.env.local` (nao versionado).
- Tratar erros de API sem vazar stack/implementacao para o usuario.
- Revisar uso de `localStorage` para token e remover token em falha 401 (padrao atual).
- Validar e sanitizar dados de entrada antes de enviar para API.

## Anti-padroes

- Commit de `.env.local` com credenciais.
- Exibir detalhes internos de erro no frontend.
- Armazenar token em logs ou mensagens de debug persistentes.

## Checklist

- Existe algum segredo em `NEXT_PUBLIC_*`?
- Dados sensiveis ficaram fora do repositorio?
- Fluxo de erro/autenticacao remove token invalido?
- Mensagens de erro para usuario sao seguras?
