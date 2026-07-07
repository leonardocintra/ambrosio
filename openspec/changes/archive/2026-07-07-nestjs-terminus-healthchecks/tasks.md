## 1. Dependências e Setup

- [x] 1.1 Instalar `@nestjs/terminus` com npm
- [x] 1.2 Criar diretório `src/health/` com `HealthModule`, `HealthController` e `PrismaHealthIndicator`

## 2. PrismaHealthIndicator

- [x] 2.1 Implementar `PrismaHealthIndicator` estendendo `HealthIndicator` que executa `$queryRaw('SELECT 1')` via PrismaService
- [x] 2.2 Registrar `PrismaHealthIndicator` como provider no `HealthModule`

## 3. HealthController

- [x] 3.1 Criar `HealthController` com rota `GET /health` usando `HealthCheckService` com indicadores Prisma, memória e disco
- [x] 3.2 Adicionar rota `GET /health/liveness` com health check básico (apenas HTTP)
- [x] 3.3 Adicionar rota `GET /health/readiness` com health check incluindo Prisma

## 4. HealthModule

- [x] 4.1 Criar `HealthModule` importando `TerminusModule` e declarando `HealthController` + `PrismaHealthIndicator`
- [x] 4.2 Exportar `HealthModule` e importá-lo no `AppModule`

## 5. Limpeza do código antigo

- [x] 5.1 Remover método `getPing()` do `AppService`
- [x] 5.2 Remover rota `health` do `AppController`
- [x] 5.3 Verificar e atualizar health checks no `docker-compose.yml` se necessário

## 6. Testes

- [x] 6.1 Escrever testes de integração para os endpoints `/health`, `/health/liveness` e `/health/readiness`
- [x] 6.2 Escrever testes unitários para `PrismaHealthIndicator`
