# Spec Delta

## Purpose

Resolve dados de país a partir da API externa RestCountries — busca por nome, extração dos atributos em português do Brasil (nome, língua, capital) e gravação no cadastro de países com placeholder para os campos a remover.

## ADDED Requirements

### Requirement: Buscar e validar país pela API RestCountries
O sistema SHALL consultar a API externa RestCountries buscando o nome de país digitado pelo usuário e SHALL selecionar o resultado cujo nome em português corresponda exatamente ao nome digitado (ignorando maiúsculas/minúsculas e acentos). Se nenhum resultado corresponder, o sistema SHALL retornar erro informando que o país não foi encontrado.

#### Scenario: País encontrado pelo nome em português
- **WHEN** o usuário informa o nome de um país existente (ex.: "Brasil")
- **THEN** o sistema consulta a RestCountries com esse nome e seleciona o primeiro resultado cujo nome em português corresponda exatamente, sem considerar maiúsculas, minúsculas ou acentos

#### Scenario: País não encontrado
- **WHEN** o usuário informa um nome que não corresponde a nenhum resultado em português
- **THEN** o sistema retorna erro 404 com mensagem orientando a conferir o nome digitado e tentar novamente

#### Scenario: Falha na API externa
- **WHEN** a consulta à API RestCountries falha (erro de rede, HTTP não-2xx, etc.)
- **THEN** o sistema registra o erro e retorna uma falha 502 indicando que a API de países apresentou erro

### Requirement: Extrair atributos em português do país
Do país selecionado na resposta da RestCountries, o sistema SHALL extrair: o nome comum em português (`por`), o nome da língua em português e o nome da capital primária. Quando o resultado não contiver algum desses atributos em português, o sistema SHALL usar o valor padrão de dados não informados para esse campo.

#### Scenario: Resultado com atributos em português
- **WHEN** o país selecionado possui nome, língua e capital em português
- **THEN** o sistema extrai o nome comum em português, o nome da língua em português e o nome da capital primária

#### Scenario: Resultado sem atributo em português
- **WHEN** o país selecionado não possui o nome, a língua ou a capital em português
- **THEN** o sistema preenche o campo ausente com o valor padrão de dados não informados

### Requirement: Gravar o país no cadastro
O sistema SHALL gravar o país no banco com nome, capital e língua vindos da RestCountries e SHALL gravar os demais campos do cadastro (código alfa-2, região, sub-região e região intermediária) sempre com o valor padrão de dados não informados. Ao tentar gravar um país que já existe, o sistema SHALL retornar o registro já cadastrado em vez de duplicá-lo.

#### Scenario: Gravação de país novo
- **WHEN** o país selecionado ainda não está cadastrado
- **THEN** o sistema cria o registro com nome, capital e língua extraídos da RestCountries e com o valor padrão de dados não informados nos demais campos

#### Scenario: País já cadastrado
- **WHEN** o país selecionado já existe no banco
- **THEN** o sistema não duplica o registro e retorna o país já cadastrado

#### Scenario: Falha ao gravar
- **WHEN** ocorre uma falha ao gravar que não seja de duplicidade
- **THEN** o sistema registra o erro e retorna uma falha 500 de erro ao cadastrar país