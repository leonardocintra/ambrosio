# Design

## Context

Ver `proposal.md` — motivação. Estado atual relevante:

- `PaisService.buscaPaisOnu` faz **duas** chamadas à IBGE (`listar-todos` + busca por nome, depois `/paises/{id}`) e devolve o objeto completo do país.
- `createOrSelect` mapeia campos profundos do objeto IBGE para o `create` do Prisma (`isoAlpha2`, `regiao`, `subRegiao`, `regiaoIntermediaria`).
- O schema Prisma (`model pais`) exige: `nome`, `capital`, `lingua`, `isoAlpha2`, `regiao`, `subRegiao` — todos não-nulos. Nenhuma migração acontece neste change (as colunas a remover sairão em trabalho separado).
- Consumidores de `createOrSelect`: `endereco.service.ts` (2 usos) e `pais.controller.ts`. Não há spec unitária do `PaisService`; há e2e em `test/configuracoes/pais.e2e-spec.ts`.
- Respostas registradas da RestCountries: `docs/api-contries.json` (busca `q=canada`), com atributos `por` (nome-trad.), `languages[].name="Portuguese"`, `capitals[].name` com `attributes.primary`.

## Goals / Non-Goals

**Goals:**
- Trocar a fonte externa de IBGE para RestCountries com uma única chamada `?q={nome}`.
- Extrair apenas nome, língua e capital em português (`por`) e gravar com o resto como placeholder `"dados não informados"`.
- Manter o comportamento público de `createOrSelect`: cria, retorna o já cadastrado se duplicar, 404 se país não encontrado, 502 se a API externa falhar.

**Non-Goals:**
- Remover/alterar colunas no banco ou Prisma (feito pelo time depois).
- Histórico de países/edição de países (`update`/`remove` continuam sem ação).
- Autenticação de usuário para o endpoint — o token da RestCountries é segredo do app, não do usuário.

## Decisions

### D1 — Uma única chamada RestCountries com `q` + validação local
Troca as duas chamadas IBGE por `GET https://api.restcountries.com/countries/v5?q={nome}`. A API já filtra por nome, então a validação de "país existe" vira uma seleção local: do array retornado, escolher o primeiro cujo nome `por` case em `names.translations.por.common` bata **exatamente** (normalizando minúsculas e removendo acentos) com o nome digitado (`CreatePaisDto.nome`). Vale matcher acento-insensível com `normalize('NFD').replace(/[\u0300-\u036f]/g, '')`, igual ao já usado no código atual.
- Alternativa descartada: trocar a busca por `?name=`/código (exige conhecer o código antes) ou chamadas em duas etapas como a IBGE — a `q` é o formato pedido e uma etapa única basta.
- `buscaPaisOnu` mantém-se `private`; mudam apenas URL/comportamento internos.

### D2 — `IPaisOnu` vira o resultado esguio `{ nome, lingua, capital }`
`createOrSelect` só precisa de nome, língua e capital. Redefine a interface `IPaisOnu` em `IPaisOnu.ts` como:
```ts
export interface IPaisOnu {
  nome: string;
  lingua: string;
  capital: string;
}
```
`buscaPaisOnu` monta esse objeto a partir do país selecionado:
- `nome` = `names.translations.por.common`
- `capital` = primeira entrada de `capitals` com `attributes.primary === true` → `name`
- `lingua` = entrada de `languages` com `iso639_1 === 'pt'` → `name` (ex.: "Portuguese")
- Qualquer atributo ausente → placeholder `DADOS_NAO_INFORMADOS`.

### D3 — Placeholder constante e `createOrSelect` deixa de ler campos profundos
Constante `DADOS_NAO_INFORMADOS = 'dados não informados'` (resposta do usuário). O `create` do Prisma passa a usar:
```ts
data: {
  nome: paisOnu.nome,
  capital: paisOnu.capital,
  lingua: paisOnu.lingua,
  isoAlpha2: DADOS_NAO_INFORMADOS,
  regiao: DADOS_NAO_INFORMADOS,
  subRegiao: DADOS_NAO_INFORMADOS,
  regiaoIntermediaria: DADOS_NAO_INFORMADOS,
}
```
As colunas seguem não-nulas no schema (nenhuma migração); o placeholder garante valores válidos até a remoção futura.

### D4 — Token via env var
Leitura de `process.env.RESTCOUNTRIES_API_TOKEN` no header `Authorization: Bearer <token>`, seguindo o padrão do repo (ex.: `SAO_PEDRO_*` em `sao-pedro-pessoa.service.ts`). Documentar no `.env-sample` e participar do `.env` de dev/CI. Sem token configurado, a chamada falha com 502 e o erro é logado (mesmo fluxo de `catchError` já existente).
- Alternativa descartada: token fixo no código — vazamento e sem rotação.

### D5 — Modelagem do payload RestCountries
O `docs/api-contries.json` registra um envelope com `data` (contendo lista de países) e `meta`. Para não acoplar a estrutura exata antes de validar com o response real, o serviço expõe um parse único e centralizado (helper privado) que lê a lista de países do envelope; a forma exata do envelope (`data.objects` vs. array direto) é confirmada no apply com uma chamada real (ver DQ1). Tipagem de leitura mínima (só os campos consumidos: `names.translations.por.common`, `capitals[].name`, `languages[].name`/`iso639_1`).

### D6 — Testes e fixtures
Trocar a fonte muda valores gravados (ex.: `lingua` deixa de ser `'portugues'` minúsculo e vira o nome em inglês "Portuguese"; `isoAlpha2`/regiões viram o placeholder). Consequência direta:
- `test/configuracoes/pais.e2e-spec.ts` tem asserções hardcoded da IBGE → atualizar para os novos valores (nome/capital continuam; placeholder nos demais). Como o POST real chama a API externa, essas asserções dependem do token real no ambiente de teste.
- Bases de dados de seed com colunas não-derivadas do PRIME (`prisma/data/all-datas.sql`, `prisma/seed.ts`) continuam válidas (valores explícitos independentes da API) — **não** são alteradas. País criado via POST passa a gravar o placeholder.

## Risks / Trade-offs

- **[Token ausente/inválido no deploy] →** falha em tempo de execução nas chamadas à RestCountries. Mitigação: token em env var, logado o erro (sem vazar o token) e 502 com mensagem de que a API de países falhou; adicionar `RESTCOUNTRIES_API_TOKEN` ao `.env-sample` e checar no ambiente.
- **[Formato real do envelope RestCountries diferente de `docs/api-contries.json`] →** centralizar o parse e confirmar com uma chamada real logo no início do apply (evita retrabalho).
- **[Dependência de rede/rate-limit da API externa] →** uma chamada única por POST; já era padrão da casa tratar erros de rede como 502.
- **[Valores diferentes nos e2e existentes] →** atualizar as asserções de `pais.e2e-spec.ts` no mesmo change; sem isso a suíte quebra.
- **[Nome digitado ≠ nome `por` (ex.: usuário digita "America") →** 404 "País não encontrado", mesmo comportamento atual; aceito.

## Migration Plan

- **Deploy**: adicionar `RESTCOUNTRIES_API_TOKEN` à infra antes/na mesma janela deste change; sem migração de schema (tabela inalterada).
- **Rollback**: reverter o commit — `createOrSelect` volta a gravar os valores IBGE nos campos existentes; nada estrutural a desfazer.
- **Dados**: registros já existem e não são tocados; novas gravações usam o placeholder.

## Open Questions

- **DQ1 — Envelope exato do response da RestCountries**: o exemplo em `docs/api-contries.json` mostra `data` → lista de países, mas a API (com token real) pode responder em estrutura de `dataSet`/`data = []`/lista direta. Deferido intencionalmente: confirmar com uma chamada real no início da implementação, ajustando só o helper de parse — não muda spec, abordagem ou tarefas.