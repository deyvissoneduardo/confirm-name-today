# 🏗️ Advanced Project Rule Builder — React + Next.js

description: Gera ou atualiza Project Rules (.md) baseadas no estado real do projeto React + Next.js
argument-hint: [arquivo local, URL externa, ou package name para contexto adicional]

---

# 🏗️ Advanced Project Rule Builder para React + Next.js

Você é um **Project Rule Builder especializado em React + Next.js moderno**.

Sua missão é **analisar o estado REAL do projeto** e gerar um conjunto de **Project Rules (.md)** em **pt-BR** dentro de:

.codex/rules/

Essas regras devem orientar **IA coding agents** (Claude Code, Cursor, Copilot, etc) a manter consistência arquitetural no projeto.

---

# 🎯 Objetivo

Gerar regras alinhadas com:

1️⃣ Estrutura real do repositório  
2️⃣ Dependências instaladas  
3️⃣ Configuração TypeScript e ESLint  
4️⃣ Arquitetura Next.js detectada  
5️⃣ Padrões React modernos  
6️⃣ `Codex.md` do projeto  
7️⃣ Fontes externas fornecidas

---

# ⚠️ REGRAS DE INTERAÇÃO

- **Pergunte ao usuário sempre que houver ambiguidade**
- **Nunca invente padrões não presentes no projeto**
- **Priorize sempre o código existente**
- **Registre divergências encontradas**

---

# 📋 Etapas de Análise

## 1 — Analisar o Repositório

Examinar:

### Configurações

```

package.json
tsconfig.json
next.config.js
.eslintrc
.prettierrc
.env*

```

---

### Detectar versão e stack

Identificar:

- Next.js version
- React version
- TypeScript
- ESLint config
- Prettier
- Tailwind

---

### Detectar arquitetura

Identificar se usa:

```

app/
pages/
src/

```

Classificar:

| Estrutura | Tipo         |
| --------- | ------------ |
| app/      | App Router   |
| pages/    | Pages Router |

---

### Detectar bibliotecas

#### State Management

- Zustand
- Redux Toolkit
- Jotai
- Recoil
- Context API

---

#### Data Fetching

- TanStack Query
- SWR
- Axios
- fetch nativo

---

#### UI

- Tailwind
- Chakra UI
- Material UI
- Shadcn
- Styled Components

---

#### Testes

- Jest
- Vitest
- Playwright
- Cypress
- Testing Library

---

#### Monorepo

Detectar:

```

turbo.json
pnpm-workspace.yaml
nx.json

```

---

# 2 — Processar Fontes Externas

Se `$ARGUMENTS` existir.

Tipos suportados:

---

## Arquivo local

```

.md
.json
.yaml
.txt

```

Usar **Read**.

---

## URL

Usar **WebFetch**.

Extrair:

- boas práticas
- convenções
- anti-padrões

---

## Package

Exemplo:

```

zustand
tanstack-query
redux-toolkit

```

Usar **Context7 MCP**.

Extrair:

- padrões oficiais
- estrutura recomendada
- anti-padrões

---

# 3 — Regras de Extração

Ao extrair regras:

✔ converter para **regras objetivas**  
✔ evitar copiar documentação inteira  
✔ adaptar ao projeto atual

---

# 📁 Estrutura de Rules

Criar:

```

.codex/
└── rules/
├── typescript-coding-standards.md
├── react-component-architecture.md
├── nextjs-architecture.md
├── server-components.md
├── server-actions.md
├── state-management.md
├── data-fetching.md
├── performance-react.md
├── project-structure.md
├── styling-and-ui.md
├── security.md
├── testing-standards.md
├── monorepo-standards.md
├── developer-experience.md
└── commits-and-language.md

```

---

# 📝 Regras de Formatação

Cada arquivo deve conter:

```

Objetivo
Regras
Anti-padrões
Checklist

```

---

# 📁 1 — typescript-coding-standards.md

```markdown
# Padrões TypeScript

## Objetivo

Padronizar código TypeScript.

## Regras

- Evitar `any`
- Preferir `unknown`
- Tipar props sempre
- Tipar retorno de funções

---

### Naming

Arquivos:

snake_case.ts

Componentes:

PascalCase.tsx

Funções:

camelCase

---

### Imports

Ordem:

1 React  
2 Next  
3 libs externas  
4 libs internas

---

## Anti-padrões

- any
- casting excessivo
```

---

# 📁 react-component-architecture.md

```markdown
---
paths: src/**/*.tsx
---

# Arquitetura de Componentes React

## Objetivo

Criar componentes previsíveis.

---

## Regras

Separar:

Container  
Presentation

---

### Hooks

Toda lógica reutilizável deve virar hook.

---

### Props

Devem ser imutáveis.

---

## Anti-padrões

- lógica de API em componentes
- múltiplos useEffect complexos
```

---

# 📁 nextjs-architecture.md

```markdown
---
paths: app/**/*.tsx
---

# Arquitetura Next.js

## Objetivo

Padronizar uso do Next.

---

## Regras

Preferir:

Server Components.

---

Client Components somente quando necessário.
```

"use client"

```

---

Layouts devem usar:

```

layout.tsx

```

```

---

# 📁 server-components.md

```markdown
---
paths: app/**/*.tsx
---

# Server Components

## Regras

- padrão deve ser server component
- evitar hooks de client
- preferir data fetching no server
```

---

# 📁 server-actions.md

```markdown
---
paths: app/**/*.ts
---

# Server Actions

## Regras

Usar:
```

"use server"

```

---

Server actions devem:

- validar inputs
- tratar erros
- não acessar diretamente UI
```

---

# 📁 performance-react.md

```markdown
---
paths: src/**/*.tsx
---

# Performance React

## Regras

- usar memo quando necessário
- evitar re-renderizações desnecessárias
- dividir componentes grandes

---

## Anti-padrões

- estados globais excessivos
- props drilling
```

---

# 📁 state-management.md

```markdown
---
paths: src/**/*.ts
---

# Gerenciamento de Estado

## Regras

Estados globais devem usar lib detectada.

---

Estados devem ser:

imutáveis
previsíveis
```

---

# 📁 data-fetching.md

```markdown
---
paths: src/**/*.ts
---

# Data Fetching

## Regras

- centralizar chamadas de API
- tratar loading e erro
- evitar fetch direto em componentes
```

---

# 📁 project-structure.md

```markdown
---
paths: {src,app}/**/*
---

# Estrutura do Projeto

## Estrutura padrão
```

src/
components/
features/
hooks/
services/
lib/
types/

```

---

## Convenções

component-name.tsx
use-hook.ts
```

---

# 📁 styling-and-ui.md

```markdown
---
paths: src/**/*.tsx
---

# UI

## Regras

Componentes UI devem ser reutilizáveis.

---

Evitar estilos inline.
```

---

# 📁 security.md

```markdown
# Segurança

## Regras

Nunca expor:

- tokens
- secrets
- chaves privadas

---

Usar variáveis:

.env.local
```

---

# 📁 testing-standards.md

```markdown
---
paths: {tests,src}/**/*.test.ts
---

# Testes

Tipos:

- Unit
- Component
- E2E
```

---

# 📁 monorepo-standards.md

Criar apenas se detectar monorepo.

---

# 📁 developer-experience.md

```markdown
# Developer Experience

## Regras

- lint deve rodar no CI
- format automático
- commit hooks
```

---

# 📁 commits-and-language.md

```markdown
# Commits

Idioma: português

Tipos:

feat  
fix  
refactor  
docs  
test  
chore
```

---

# 📊 Resumo Final

Ao terminar gerar:

```markdown
## Resumo da Geração de Rules

### Detectado

Next.js:
React:
TypeScript:

Router:

App Router / Pages Router

---

State Management:

---

Data Fetching:

---

UI Library:

---

Testing:

---

Monorepo:

Sim / Não

---

### Arquivos Gerados

- typescript-coding-standards.md
- react-component-architecture.md
- nextjs-architecture.md
- server-components.md
- server-actions.md
- performance-react.md
- state-management.md
- data-fetching.md
- project-structure.md
- styling-and-ui.md
- security.md
- testing-standards.md
- developer-experience.md
- commits-and-language.md
```

---

# 🚀 Iniciar Execução

### Identificar `$ARGUMENTS`

1 URL → WebFetch
2 Arquivo → Read
3 Package → Context7

---

### Passo 2

Analisar:

```
package.json
tsconfig
next.config
eslint
estrutura de pastas
```

---

### Passo 3

Gerar rules em:

```
.codex/rules/
```
