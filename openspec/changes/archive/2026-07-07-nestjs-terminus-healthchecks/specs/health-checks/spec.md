## ADDED Requirements

### Requirement: Health check endpoint retorna status detalhado
O sistema SHALL expor um endpoint `GET /health` que retorna o status de saúde do sistema em formato JSON estruturado pelo `@nestjs/terminus`.

#### Scenario: Todos os indicadores saudáveis
- **WHEN** uma requisição GET é feita para `/health`
- **THEN** o sistema retorna HTTP 200 com um JSON contendo `status: "ok"` e detalhes de cada health indicator

#### Scenario: Indicador de Prisma falha
- **WHEN** o banco de dados PostgreSQL está indisponível
- **THEN** o endpoint `/health` retorna HTTP 503 com `status: "error"` e o indicador Prisma marcado como `"down"`

### Requirement: Liveness probe endpoint
O sistema SHALL expor um endpoint `GET /health/liveness` que verifica apenas se o processo da aplicação está respondendo.

#### Scenario: Aplicação funcionando
- **WHEN** uma requisição GET é feita para `/health/liveness`
- **THEN** o sistema retorna HTTP 200 com status `"ok"`

### Requirement: Readiness probe endpoint
O sistema SHALL expor um endpoint `GET /health/readiness` que verifica se a aplicação está pronta para receber tráfego, incluindo conectividade com o banco de dados.

#### Scenario: Banco de dados disponível
- **WHEN** uma requisição GET é feita para `/health/readiness`
- **THEN** o sistema retorna HTTP 200 com `status: "ok"`

#### Scenario: Banco de dados indisponível
- **WHEN** o banco de dados PostgreSQL está indisponível
- **THEN** o endpoint `/health/readiness` retorna HTTP 503 com `status: "error"`

### Requirement: Prisma health indicator
O sistema SHALL verificar a conectividade com o banco de dados PostgreSQL através do Prisma, executando `SELECT 1`.

#### Scenario: Conexão bem-sucedida
- **WHEN** o Prisma consegue executar a query de verificação
- **THEN** o health indicator retorna `{ prisma: { status: 'up' } }`

#### Scenario: Conexão falha
- **WHEN** o Prisma não consegue executar a query de verificação
- **THEN** o health indicator lança uma exceção que resulta em `{ prisma: { status: 'down' } }`

### Requirement: Memory health indicator
O sistema SHALL verificar o uso de memória heap do Node.js.

#### Scenario: Memória dentro do limite
- **WHEN** o uso de memória heap está abaixo do limiar configurado
- **THEN** o health indicator retorna `{ memory: { status: 'up' } }`

#### Scenario: Memória acima do limite
- **WHEN** o uso de memória heap excede o limiar configurado
- **THEN** o health indicator retorna `{ memory_heap: { status: 'down' } }`

### Requirement: Disk health indicator
O sistema SHALL verificar o espaço em disco disponível no sistema de arquivos.

#### Scenario: Disco com espaço suficiente
- **WHEN** o espaço em disco disponível está acima do limiar configurado
- **THEN** o health indicator retorna `{ disk: { status: 'up' } }`

#### Scenario: Disco quase cheio
- **WHEN** o espaço em disco disponível está abaixo do limiar configurado
- **THEN** o health indicator retorna `{ disk: { status: 'down' } }`

### Requirement: Health module modular
O sistema SHALL ter um `HealthModule` separado, importado pelo `AppModule`.

#### Scenario: HealthModule importado
- **WHEN** o `AppModule` é inicializado
- **THEN** o `HealthModule` está registrado e os endpoints de health estão disponíveis
