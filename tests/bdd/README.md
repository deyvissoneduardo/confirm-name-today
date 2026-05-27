# BDD

Espaco reservado para especificacoes BDD futuras.

Sugestao de convencao futura:

```txt
Feature: Confirmacao de nome
  Scenario: Usuario informa um nome valido
    Given que o usuario esta na tela inicial
    When ele informa um nome valido
    Then o sistema permite seguir para a proxima etapa
```

Nao adicione ferramenta BDD antes de existir uma decisao explicita sobre runner, linguagem dos cenarios e integracao com CI.
