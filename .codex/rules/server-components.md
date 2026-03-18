---
paths: src/app/**/*.tsx
---

# Server Components

## Objetivo

Incentivar renderizacao no servidor quando nao houver dependencia de API/estado do cliente.

## Regras

- Default para novos componentes de pagina deve ser Server Component.
- Mover para Client Component apenas blocos que exigem hooks de client.
- Em componentes server, buscar dados no servidor quando a fonte nao depender de `localStorage`/token client.
- Isolar interatividade em ilhas client pequenas.

## Anti-padroes

- Aplicar `use client` em arvore inteira por conveniencia.
- Ler dados de browser em componente server.
- Colocar logica de render estatico dentro de componentes client sem necessidade.

## Checklist

- O componente pode ser server por padrao?
- Somente partes interativas foram marcadas como client?
- Dados que nao dependem do browser foram carregados no servidor?
- Houve reducao de JS enviado ao cliente?
