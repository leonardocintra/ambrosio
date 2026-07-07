## Why

O endpoint de health atual (`GET /health`) apenas retorna `"pong"`, sem verificar a conectividade com o banco de dados PostgreSQL ou outros serviços essenciais. Isso torna o health check pouco útil para orquestradores (Kubernetes, Docker Compose) e monitoramento. A implementação do `@nestjs/terminus` trará health checks baseados em indicadores reais (Prisma, disco, memória), seguindo as práticas recomendadas pela documentação oficial do NestJS.

## What Changes

- Substituir o health check simples (`getPing()` no `AppService`) por um health check robusto usando `@nestjs/terminus`
- Criar um `HealthModule` dedicado com controllers e indicadores
- Adicionar health indicators para:
  - **Prisma** (conectividade com o banco PostgreSQL)
  - **Memória** (disponibilidade de heap/rss)
  - **Disco** (espaço em disco)
  - **Custom health check** com lógica específica do domínio
- Manter a rota `GET /health` como padrão, mas com resposta estruturada (JSON com status detalhado)
- Expor rota adicional `GET /health/readiness` (readiness probe) e `GET /health/liveness` (liveness probe) para Kubernetes
- Adicionar dependência `@nestjs/terminus` no `package.json`

## Capabilities

### New Capabilities
- `health-checks`: Health check avançado com indicadores de Prisma, memória e disco

### Modified Capabilities
<!-- Nenhuma capability existente é modificada, pois não há specs anteriores -->

## Impact

- **Dependências**: Adicionar `@nestjs/terminus` ao `package.json`
- **Código existente**: Remover método `getPing()` do `AppService` e rota `health` do `AppController` (será movida para `HealthController`)
- **API**: Resposta do `GET /health` mudará de `"pong"` para JSON estruturado do Terminus
- **Orquestração**: Health checks compatíveis com Kubernetes liveness/readiness probes
