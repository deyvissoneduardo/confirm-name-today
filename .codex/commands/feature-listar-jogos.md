# Objetivo

Elaborar prompt detalhada, com arquivos que precisa ser alterados, se possivel com exempli de codigo, regras, e arquituetura para implementar a feature de: Listar jogo em aberto para que usuario possa confirmar nome no game

**NÃO IMPLEMENTE NADA APENAS ELABORE O PROMPT PARA QUE EU ANALISE ANTES DA IMPLEMENTAÇÃO. salve em `.codex/prompts`**

**Endpoints:**

- homoloção: http://localhost:8080/api/games

- produção: https://api-futebol-06387567b79a.herokuapp.com/api/games

**Retorno do endpoint:**

[
{
"id": "80d888e6-5543-4d64-acdc-5f43c69a31f6",
"gameDate": "2026-03-18T21:30:00Z",
"released": true,
"createdAt": "2026-03-12T12:23:07Z",
"updatedAt": "2026-03-12T12:25:33Z"
}
]

## **REGRA PARA LISTA JOGOS**

- Deve listar somente os que estiver como `"released": true`
- Deve mostra data jogo com seguinte formato: **Data: 18/03/2026**
- Deve mostra hora jogo com seguinte formato: **Inicio do jogo: 21:30**

## Deve

- Deve contar `--header 'Authorization: ••••••'` usando o token retornado em `/api/auth/login`
- Deve serguir rules e padrao de arquitetura do projeto
- Deve criar testes em homoloção e garantir que funcione, use o usuario para realizar login no endereço`http://localhost:8080/api/auth/login` para gerar o **token** : {
  "email": "jogador@futebol.com",
  "password": "jogador1234"
  }
- Deve garantir que o **token** seja salvo localmente para futuras requisiçoes

## Não deve

- Não deve instala pacotes sem previa autorização
- Não deve criar comentarios desnessarios
- Não deve alterar layout, cores, espaçamentos...
