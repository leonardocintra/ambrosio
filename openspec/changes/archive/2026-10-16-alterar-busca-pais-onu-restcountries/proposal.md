# Proposal

## Why

A manutenção do cadastro de países usa hoje a API IBGE SIDRA (`servicodados.ibge.gov.br`), que está sem manutenção (retorna dados incompletos e inconsistentes). O time quer trocar a fonte para a API pública **RestCountries** (`api.restcountries.com`), que responde com nome, língua e capital em português (atributo `por`), com os demais campos do cadastro sendo gravados como placeholder até que suas colunas sejam removidas do banco.

## What Changes

- `PaisService.buscaPaisOnu` passa a consultar `GET https://api.restcountries.com/countries/v5?q={nomeDigitado}` com autenticação `Authorization: Bearer <token>` (token vindo de env var), no lugar das duas chamadas à API do IBGE.
- O método retorna apenas os atributos em português do Brasil: nome do país (`por`), língua (`por`/"português") e capital (primária) — não mais o objeto completo da API.
- `PaisService.createOrSelect` grava no banco: `nome`, `capital` e `lingua` vindos da RestCountries; `isoAlpha2`, `regiao`, `subRegiao` e `regiaoIntermediaria` recebem o valor placeholder `"dados não informados"` até essas colunas serem removidas do Prisma/banco.
- A busca valida o nome digitado contra o nome em português do país retornado (match completo, sem acento e case-insensitive); não encontrando nenhum, mantém o erro 404 "Pais não encontrado...".
- `IPaisOnu` deixa de refletir o contrato da IBGE e passa a modelar apenas o resultado `{ nome, lingua, capital }` consumido por `createOrSelect`.
- Nova env var `RESTCOUNTRIES_API_TOKEN`, documentada em `.env-sample`.

## Capabilities

### New Capabilities
- `pais-onu`: Consulta e normalização de dados de país na API RestCountries para o cadastro de países — busca por nome, extração dos atributos em português (nome, língua, capital) e gravação no cadastro. Comportamento durável de "resolver dados de país a partir de fonte externa".

### Modified Capabilities
<!-- Nenhuma: não há specs existentes no projeto (openspec/specs/ está vazio). -->

## Impact

- **Código**: `src/configuracoes/pais/pais.service.ts`, `src/configuracoes/pais/IPaisOnu.ts`.
- **Configuração**: `.env-sample` (nova `RESTCOUNTRIES_API_TOKEN`); variável de ambiente correspondente no runtime/CI.
- **Sem dependência nova**: `@nestjs/axios`/`axios` e `https` já são usados pelo serviço.
- **Banco**: os valores gravados em `isoAlpha2`, `regiao`, `subRegiao`, `regiaoIntermediaria` passam a ser um placeholder (`"dados não informados"`); nenhuma alteração de schema/migração neste change (colunas serão removidas pelo time em trabalho separado).
- **API externa**: troca da fonte IBGE por RestCountries; o endpoint exige token Bearer.