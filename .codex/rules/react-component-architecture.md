---
paths: src/**/*.tsx
---

# Arquitetura de Componentes React

## Objetivo

Manter componentes pequenos, reutilizaveis e orientados a responsabilidade unica.

## Regras

- Priorizar composicao com componentes em `src/components/*`.
- Manter UI reutilizavel em `src/components/ui` sem regra de negocio.
- Extrair logica de estado/efeitos para hooks quando houver reutilizacao real.
- Paginas em `src/app/**/page.tsx` devem orquestrar fluxo e delegar render para componentes.
- Evitar acoplamento direto com detalhes de API dentro de componentes visuais.

## Anti-padroes

- Componentes grandes com fetch, transformacao e renderizacao no mesmo bloco.
- Duplicacao de blocos de UI entre paginas.
- Regras de negocio implementadas dentro de componentes `ui/*`.

## Checklist

- O componente tem responsabilidade unica?
- Logica reutilizavel foi extraida?
- Componentes `ui/*` continuam genericos?
- A pagina delega render para componentes especializados?
