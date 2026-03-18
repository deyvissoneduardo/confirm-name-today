---
paths: src/**/*.{ts,tsx}
---

# Gerenciamento de Estado

## Objetivo

Padronizar estado global com Context API e manter estado local simples com hooks nativos.

## Regras

- Estado global de autenticacao deve permanecer em `src/lib/auth/context.tsx`.
- Novos estados globais so devem ser criados quando houver compartilhamento real entre rotas.
- Preferir `useState`/`useMemo` local para estado de tela.
- Evitar criar nova biblioteca de estado sem necessidade comprovada.

## Anti-padroes

- Estado global para dados estritamente locais.
- Duplicar fonte de verdade entre context e estado local.
- Introduzir Redux/Zustand/Jotai sem motivo arquitetural claro.

## Checklist

- O estado precisa ser global?
- Contexto novo tem escopo claro e minimo?
- Estado local foi priorizado quando possivel?
- Nao houve nova dependencia de state management sem justificativa?
