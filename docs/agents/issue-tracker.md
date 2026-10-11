# Issue tracker: GitHub

Issues e specs deste repositório vivem como issues do GitHub. Use a CLI `gh` para todas as operações.

## Convenções

- **Criar uma issue**: `gh issue create --title "..." --body "..."`. Use heredoc para corpos multilinha.
- **Ler uma issue**: `gh issue view <number> --comments`, filtrando comentários com `jq` e também buscando labels.
- **Listar issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` com filtros `--label` e `--state` apropriados.
- **Comentar em uma issue**: `gh issue comment <number> --body "..."`
- **Aplicar / remover labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Fechar**: `gh issue close <number> --comment "..."`

Inferir o repositório a partir de `git remote -v`; o `gh` faz isso automaticamente quando executado dentro de um clone.

## Pull requests como superfície de triagem

**PRs como superfície de requisição: não.** _(Defina como `sim` se este repositório trata PRs externos como pedidos de funcionalidade; o `/triage` lê este sinalizador.)_

Quando definido como `sim`, PRs passam pelas mesmas labels e estados que as issues, usando os equivalentes `gh pr`:

- **Ler um PR**: `gh pr view <number> --comments` e `gh pr diff <number>` para o diff.
- **Listar PRs externos para triagem**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` e manter apenas `authorAssociation` igual a `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR` ou `NONE` (descarte `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comentar / rotular / fechar**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

O GitHub compartilha um único espaço de numeração entre issues e PRs, então um `#42` isolado pode ser qualquer um dos dois: resolva com `gh pr view 42` e recorra a `gh issue view 42`.

## Quando uma skill diz "publish to the issue tracker"

Crie uma issue no GitHub.

## Quando uma skill diz "fetch the relevant ticket"

Execute `gh issue view <number> --comments`.

## Operações de wayfinding

Usadas por `/wayfinder`. O **mapa** é uma única issue com **issues filhas** como tickets.

- **Mapa**: uma única issue rotulada `wayfinder:map`, contendo o corpo com Notas / Decisões até agora / Névoa. `gh issue create --label wayfinder:map`.
- **Ticket filho**: uma issue vinculada ao mapa como sub-issue do GitHub (`gh api` no endpoint de sub-issues). Onde sub-issues não estão habilitadas, adicione a filha a uma lista de tarefas no corpo do mapa e coloque `Part of #<map>` no topo do corpo da filha. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Uma vez reivindicada, o ticket é atribuído ao dev condutor.
- **Bloqueio**: as **dependências nativas de issues** do GitHub, a representação canônica visível na UI. Adicione uma aresta com `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, onde `<blocker-db-id>` é o **id numérico de banco** do bloqueador (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _não_ o `#number` nem o `node_id`). O GitHub reporta `issue_dependencies_summary.blocked_by` (apenas bloqueadores abertos, o portão vivo). Onde dependências não estão disponíveis, recorra a uma linha `Blocked by: #<n>, #<n>` no topo do corpo da filha. Um ticket está desbloqueado quando todos os bloqueadores estão fechados.
- **Consulta de fronteira**: liste as filhas abertas do mapa (`gh issue list --state open`, com escopo nas sub-issues / lista de tarefas do mapa), descarte as que têm bloqueador aberto (`issue_dependencies_summary.blocked_by > 0`, ou uma issue aberta na linha `Blocked by`) ou um responsável; a primeira na ordem do mapa vence.
- **Reivindicar**: `gh issue edit <n> --add-assignee @me`, a primeira escrita da sessão.
- **Resolver**: `gh issue comment <n> --body "<answer>"`, depois `gh issue close <n>`, depois anexe um ponteiro de contexto (gist + link) às Decisões até agora do mapa.
