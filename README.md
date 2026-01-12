# Confirm Game Today

Projeto Next.js configurado com arquitetura modular por feature, TypeScript, Tailwind CSS, e ferramentas de qualidade de código.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Jest** + **Testing Library** (testes unitários)
- **Playwright** (testes E2E)
- **ESLint** + **Prettier**
- **Husky** + **lint-staged** (lint de commits)

## 📁 Estrutura do Projeto

```
confirm-game-today/
├── src/
│   ├── app/              # App Router (Next.js)
│   ├── lib/
│   │   └── api/          # API Layer (modular por feature)
│   │       ├── client.ts # Cliente HTTP base
│   │       └── features/ # Módulos por feature
│   └── __tests__/        # Testes unitários
├── e2e/                  # Testes end-to-end (Playwright)
├── public/               # Arquivos estáticos
└── ...
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
```

### Testes

```bash
npm test             # Executa testes unitários
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura
npm run test:e2e     # Executa testes E2E
npm run test:e2e:ui  # Executa testes E2E com UI
npm run test:e2e:headed # Executa testes E2E em modo headed
```

### Qualidade de Código

```bash
npm run lint         # Executa ESLint
```

## 🔧 Configuração

### Variáveis de Ambiente

1. Copie o arquivo `.env.local.example` para `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Preencha as variáveis necessárias no `.env.local`

### Alias de Imports

O projeto está configurado para usar alias `@/` que aponta para `src/`:

```typescript
import { api } from '@/lib/api/client';
import Component from '@/components/Button';
```

## 📦 Arquitetura Modular por Feature

A API layer está organizada por features. Cada feature deve seguir esta estrutura:

```
src/lib/api/features/
  my-feature/
    types.ts       # TypeScript types/interfaces
    service.ts     # API service functions
    hooks.ts       # React hooks (opcional)
    index.ts       # Re-exports
```

Veja `src/lib/api/features/README.md` para mais detalhes e exemplos.

## 🧪 Testes

### Testes Unitários (Jest + Testing Library)

Testes devem ser colocados em `src/__tests__/` ou junto aos arquivos com sufixo `.test.ts` ou `.spec.ts`.

### Testes E2E (Playwright)

Testes E2E devem ser colocados em `e2e/` com sufixo `.spec.ts`.

## 🔒 Git Hooks

O projeto está configurado com Husky para executar lint-staged antes de cada commit:

- ESLint será executado automaticamente
- Prettier formatará os arquivos automaticamente

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Documentation](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jest](https://jestjs.io/docs/getting-started)
- [Playwright](https://playwright.dev/docs/intro)

## 🚢 Deploy

O projeto pode ser deployado na [Vercel](https://vercel.com) ou qualquer plataforma que suporte Next.js.
