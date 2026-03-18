# Prompt: Listar jogos em aberto para confirmação de nome

## Objetivo

Implementar a feature de listar jogos em aberto (`released: true`) para que o usuário possa confirmar seu nome no game. A página de jogos deve consumir a API real, exibir os jogos liberados com formatação específica de data e hora, e garantir autenticação via token.

---

## Endpoints

| Ambiente    | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| Homologação | `http://localhost:8080/api/games`                          |
| Produção    | `https://api-futebol-06387567b79a.herokuapp.com/api/games` |

### Contrato da resposta

```json
[
  {
    "id": "80d888e6-5543-4d64-acdc-5f43c69a31f6",
    "gameDate": "2026-03-18T21:30:00Z",
    "released": true,
    "createdAt": "2026-03-12T12:23:07Z",
    "updatedAt": "2026-03-12T12:25:33Z"
  }
]
```

---

## Regras de negócio

1. **Filtro**: Listar somente jogos com `released === true`.
2. **Data**: Exibir no formato `Data: 18/03/2026` (DD/MM/YYYY).
3. **Hora**: Exibir no formato `Início do jogo: 21:30` (HH:mm, 24h).
4. **Autenticação**: Requisição deve enviar header `Authorization: Bearer <token>` com o token retornado em `/api/auth/login`.
5. **Token local**: O token deve ser persistido em `localStorage` (chave `auth_token`) para uso em requisições futuras — o fluxo de login já faz isso via `AuthProvider` e `authService.login()`.

---

## Deve

- Usar header `Authorization: Bearer <token>` em todas as requisições à API de jogos.
- Seguir regras e padrão de arquitetura do projeto (`.codex/rules/`).
- Criar ou atualizar testes em homologação e garantir que funcionem.
- Usar credenciais para login em `http://localhost:8080/api/auth/login`:

  ```json
  {
    "email": "jogador@futebol.com",
    "password": "jogador1234"
  }
  ```

- Garantir que o token seja salvo localmente para futuras requisições (já implementado no fluxo de login).

---

## Não deve

- Instalar pacotes sem prévia autorização.
- Criar comentários desnecessários.
- Alterar layout, cores ou espaçamentos existentes.

---

## Arquivos a alterar/criar

### 1. `src/lib/api/features/games/service.ts`

**Alterar**: O método `getAll` já chama `api.get<Game[]>('/games')` quando `USE_MOCK_DATA` é `false`. O cliente `api` em `src/lib/api/client.ts` já adiciona o header `Authorization` com o token de `localStorage` quando disponível. Confirmar que:

- O path usado é `/games` (o cliente concatena com `NEXT_PUBLIC_API_URL`).
- `USE_MOCK_DATA` deve estar `false` para homologação/produção.

**Exemplo do fluxo atual (manter coerência)**:

```typescript
// gamesService.getAll já usa api.get quando !USE_MOCK_DATA
getAll: async (): Promise<Game[]> => {
  if (USE_MOCK_DATA) {
    return mockGetActiveGame();
  }
  return api.get<Game[]>('/games');
},
```

- **Novo método** (opcional, se quiser separar responsabilidades): criar `getReleasedGames` que filtra `released === true` no service ou na camada de consumo.

Alternativa: filtrar no consumer (página) para não alterar o contrato do service. O service retorna todos; a página filtra `released === true`.

### 2. `src/lib/api/features/games/types.ts`

**Manter**: O tipo `Game` já está alinhado com o contrato da API:

```typescript
export interface Game {
  id: string;
  gameDate: string;
  released: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 3. `src/app/games/page.tsx`

**Alterar**:

- Trocar `mockGetActiveGame` por `gamesService.getAll()` quando `USE_MOCK_DATA` for `false`.
- Filtrar jogos com `released === true` antes de exibir.
- Formatar data como `DD/MM/YYYY` e hora como `HH:mm` conforme especificação.
- Manter `ProtectedLayout`, estados de loading e lista vazia.
- Listar **todos** os jogos em aberto (não apenas o primeiro).

**Exemplo de formatação**:

```typescript
function formatGameDate(isoDate: string): string {
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatGameTime(isoDate: string): string {
  const d = new Date(isoDate);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
```

**Exemplo de filtro e consumo**:

```typescript
const allGames = await gamesService.getAll();
const releasedGames = allGames.filter((g) => g.released);
setGames(releasedGames);
```

### 4. `src/lib/api/config.ts` e variáveis de ambiente

- Homologação: `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
- Produção: `NEXT_PUBLIC_API_URL=https://api-futebol-06387567b79a.herokuapp.com/api`
- `NEXT_PUBLIC_USE_MOCK_DATA` deve ser `false` para consumir a API real.

### 5. `src/lib/mock-data/games.ts`

**Manter ou ajustar**: Em modo mock, `mockGetActiveGame` retorna jogos. Se quiser alinhar ao comportamento de produção, garantir que o mock também retorne jogos com `released: true` para testes com `USE_MOCK_DATA=true`.

### 6. Componentes de UI

- **`src/components/games/GameCard.tsx`**: Já recebe `Game` e formata data/hora. Ajustar para usar o formato exigido:
  - Label `Data:` com valor `DD/MM/YYYY`
  - Label `Início do jogo:` com valor `HH:mm`

**Exemplo de props para GameCard**:

```tsx
<div className="text-sm text-[#a3a3a3]">Data</div>
<div className="text-base font-medium text-[#ededed]">
  {formatGameDate(game.gameDate)}
</div>
<div className="text-sm text-[#a3a3a3]">Início do jogo</div>
<div className="text-base font-medium text-[#ededed]">
  {formatGameTime(game.gameDate)}
</div>
```

- A página atual usa um único `Card` com um jogo. Para listar vários jogos, iterar sobre `releasedGames` e usar `GameCard` ou estrutura similar.

---

## Testes

### Testes unitários/integração (`src/__tests__/`)

- **`api-integration.test.ts`**: Atualizar credenciais para `jogador@futebol.com` / `jogador1234` se o ambiente de homologação usar esse usuário.
- Garantir que o teste `Games Service > should get list of games` valide que a resposta contém `id`, `gameDate`, `released`.
- Adicionar teste que verifica o filtro `released === true` (pode ser feito na camada de service ou em um teste da página).

### Testes E2E (`e2e/`)

- Criar `e2e/games-list.spec.ts` (ou similar) que:
  1. Navega para `/login`
  2. Preenche `jogador@futebol.com` e `jogador1234`
  3. Faz login
  4. Navega para `/games`
  5. Verifica que a página carrega e exibe jogos em aberto (ou mensagem de "nenhum jogo") com os formatos de data e hora esperados.

### Script de homologação

- O script `scripts/test-api-integration.sh` usa `jogador01@futebol.com`. Se o ambiente de homologação exigir `jogador@futebol.com`, ajustar as variáveis `EMAIL` e `PASSWORD` no script ou documentar qual usuário usar.

---

## Arquitetura e regras do projeto

Consultar antes da implementação:

| Regra                | Arquivo                                        |
| -------------------- | ---------------------------------------------- |
| Estrutura do projeto | `.codex/rules/project-structure.md`            |
| Next.js              | `.codex/rules/nextjs-architecture.md`          |
| Data fetching        | `.codex/rules/data-fetching.md`                |
| Server Components    | `.codex/rules/server-components.md`            |
| Componentes React    | `.codex/rules/react-component-architecture.md` |
| Styling e UI         | `.codex/rules/styling-and-ui.md`               |
| Testes               | `.codex/rules/testing-standards.md`            |

---

## Checklist de implementação

- [ ] `gamesService.getAll()` utilizado na página de jogos (quando não em mock).
- [ ] Filtro `released === true` aplicado antes de exibir.
- [ ] Data no formato `DD/MM/YYYY` (ex.: 18/03/2026).
- [ ] Hora no formato `HH:mm` com label "Início do jogo" (ex.: 21:30).
- [ ] Header `Authorization: Bearer <token>` enviado (via `api` client).
- [ ] Token persistido em `localStorage` após login (fluxo existente).
- [ ] `NEXT_PUBLIC_API_URL` configurado para homologação/produção.
- [ ] Testes de integração passando com API em homologação.
- [ ] Sem alteração de layout, cores ou espaçamentos.
- [ ] Sem instalação de novos pacotes.
- [ ] Sem comentários desnecessários.
