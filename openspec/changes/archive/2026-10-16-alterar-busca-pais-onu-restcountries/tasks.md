# Tasks

## 1. Integração com a API RestCountries

- [x] 1.1 Confirmar o formato real do response da RestCountries (DQ1 do design.md) com uma chamada `curl` usando o token real e conferir o envelope (ex.: `data.objects`, `data.data` ou array direto) contra `docs/api-contries.json`; registrar o envelope confirmado num comentário do helper de parse
- [x] 1.2 Adicionar env var `RESTCOUNTRIES_API_TOKEN` ao `.env-sample` (seguindo o padrão das `SAO_PEDRO_*`) e, se aplicável, ao `.env` de desenvolvimento; conferir que o valor aparece em `process.env` ao subir o app
- [x] 1.3 Reescrever `buscaPaisOnu` em `pais.service.ts` para fazer uma única chamada `GET https://api.restcountries.com/countries/v5?q={CreatePaisDto.nome}` com header `Authorization: Bearer ${process.env.RESTCOUNTRIES_API_TOKEN}`, mantendo o `httpsAgent` e o `catchError` (logout + `HttpException` 502); verificar via `npm run build` que o código compila
- [x] 1.4 Implementar o parse centralizado do response (helper privado) que lê a lista de países do envelope e extrai do primeiro resultado cujo nome `por` (`names.translations.por.common`) case em `names.translations.por.common` bata exatamente com o nome digitado (normalização acento-insensível igual à atual em `pais.service.ts`); não havendo resultado, mantém o `HttpException` 404 "Pais não encontrado..."; verificar com `npm run build`

## 2. Resultado esguio e gravação

- [x] 2.1 Redefinir `IPaisOnu` em `IPaisOnu.ts` para `{ nome: string; lingua: string; capital: string }` e remover os tipos profundos da IBGE que ficarem sem uso; conferir que nenhum outro arquivo referencia os tipos removidos (grep por `IPaisOnu` e pelos campos antigos)
- [x] 2.2 Em `buscaPaisOnu`, montar o `IPaisOnu` extraindo: `nome` = `names.translations.por.common`; `capital` = `name` da entrada de `capitals` com `attributes.primary === true`; `lingua` = `name` da entrada de `languages` com `iso639_1 === 'pt'`; campo ausente assume o placeholder `'dados não informados'`; verificar com `npm run build`
- [x] 2.3 Em `createOrSelect`, gravar `{ nome: paisOnu.nome, capital: paisOnu.capital, lingua: paisOnu.lingua }` e `{ isoAlpha2, regiao, subRegiao, regiaoIntermediaria }` com o valor `'dados não informados'` (constante local); manter o tratamento de duplicidade (retorna o já cadastrado) e o 500 para falhas; verificar com `npm run build`

## 3. Testes e2e

- [x] 3.1 Atualizar `test/configuracoes/pais.e2e-spec.ts` para os novos valores gravados: POST de "Argentina" passa a esperar `lingua`/`capital`/`nome` vindos da RestCountries e esperar `'dados não informados'` em `isoAlpha2`, `regiao`, `subRegiao`, `regiaoIntermediaria`; citar no teste a dependência do token real no ambiente (`RESTCOUNTRIES_API_TOKEN`); verificar com `npm run test:e2e` que a suíte passa com token configurado

## 4. Verificação final

- [x] 4.1 Rodar `npm run lint` e `npm run build` (e, se o CI cobrir, `npm test`) sem erros no estado final
- [x] 4.2 Validar o change com `openspec validate` apontando para `openspec/changes/alterar-busca-pais-onu-restcountries`

## Workflow follow-up

- Arquive o change após os requisitos de review do projeto serem atendidos (`openspec archive`).
- Confirme o resultado arquivado.