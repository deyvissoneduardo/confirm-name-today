Feature: Confirmar nome

  Scenario: Renderizar página simples
    Given que o usuário acessou a página de confirmação de nome
    When a página for carregada
    Then deve visualizar somente um campo de nome
    And deve visualizar somente um botão de confirmar
    And a página deve usar tema escuro
    And a página deve ser mobile-first

  Scenario: Confirmar nome vazio
    Given que o usuário acessou a página de confirmação de nome
    When ele clicar no botão confirmar sem preencher o nome
    Then deve visualizar uma mensagem informando que o nome é obrigatório

  Scenario: Confirmar nome novo
    Given que o usuário acessou a página de confirmação de nome
    And o nome "Carlos" ainda não existe no Firebase
    When ele preencher o nome "Carlos"
    And clicar no botão confirmar
    Then o nome deve ser salvo no Firebase
    And deve visualizar uma mensagem de sucesso

  Scenario: Confirmar nome já existente
    Given que o usuário acessou a página de confirmação de nome
    And o nome "Carlos" já existe no Firebase
    When ele preencher o nome "Carlos"
    And clicar no botão confirmar
    Then o nome não deve ser salvo novamente
    And deve visualizar a mensagem "Esse nome já foi confirmado. Escolha outro nome."

  Scenario: Erro ao consultar Firebase
    Given que o usuário acessou a página de confirmação de nome
    And o Firebase falha ao consultar nomes
    When ele preencher o nome "Carlos"
    And clicar no botão confirmar
    Then deve visualizar uma mensagem de erro

  Scenario: Erro ao salvar no Firebase
    Given que o usuário acessou a página de confirmação de nome
    And o nome "Carlos" ainda não existe no Firebase
    And o Firebase falha ao salvar o nome
    When ele preencher o nome "Carlos"
    And clicar no botão confirmar
    Then deve visualizar uma mensagem de erro

  Scenario: Tema escuro e mobile-first
    Given que o usuário acessou a página de confirmação de nome
    When a página for carregada em uma tela pequena
    Then a página deve usar fundo escuro
    And o texto deve ter contraste adequado
    And o formulário deve ocupar a largura disponível com limite máximo simples
    And o input e o botão devem ter área de toque adequada

  Scenario: Ler regras cadastradas
    Given que o usuário acessou a página de confirmação de nome
    When ele escolher a opção de ler regras
    Then deve visualizar as regras carregadas do Realtime Database
    And nenhuma regra deve ser alterada ou salva

  Scenario: Voltar das regras para confirmação de nome
    Given que o usuário acessou a página de regras
    When ele escolher voltar para confirmar nome
    Then deve retornar para a página de confirmação de nome
