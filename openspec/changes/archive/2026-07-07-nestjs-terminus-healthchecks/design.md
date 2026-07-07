## Context

Atualmente o projeto possui um health check simples em `AppController.getPing()` que retorna `"pong"`. Não há verificação de conectividade com o banco de dados PostgreSQL (Prisma), uso de memória, ou disco. O projeto é um monólito NestJS com 28+ módulos, usa Prisma ORM, PostgreSQL, e está preparado para deploy em container (Docker Compose) e potencialmente Kubernetes.

## Goals / Non-Goals

**Goals:**
- Substituir o health check atual por um implementado com `@nestjs/terminus`
- Adicionar health indicator para Prisma (conectividade com PostgreSQL)
- Adicionar health indicator para memória (heap/RSS)
- Adicionar health indicator para disco
- Expor rotas `GET /health`, `GET /health/liveness` e `GET /health/readiness`
- Manter compatibilidade com Docker Compose health checks atuais
- Criar `HealthModule` dedicado e removável

**Non-Goals:**
- Health checks para serviços externos (Resend, Sentry, São Pedro) — podem ser adicionados depois
- Métricas de performance ou tracing
- Dashboard de health na UI

## Decisions

1. **Usar `@nestjs/terminus` em vez de implementação customizada**
   - **Por quê**: Biblioteca oficial do NestJS, integração nativa com indicadores comuns, extensível com indicadores customizados.
   - **Alternativa**: Implementar manualmente — maior esforço de manutenção, sem padronização.

2. **Criar `HealthModule` separado em vez de manter no `AppModule`**
   - **Por quê**: Separação de responsabilidades; pode ser importado condicionalmente; facilita manutenção e testes.
   - **Alternativa**: Manter no `AppModule` — acoplamento desnecessário.

3. **Três rotas de health (liveness, readiness, health)**
   - **Por quê**: Kubernetes diferencia liveness (o app está vivo?) de readiness (o app está pronto para receber tráfego?). A rota `health` unificada mantém compatibilidade com consumers existentes.
   - **Alternativa**: Rota única — perde granularidade para orquestração.

4. **Prisma health indicator customizado**
   - **Por quê**: O `@nestjs/terminus` não possui um `PrismaHealthIndicator` nativo, mas fornece a interface `HealthIndicator` para implementação customizada via `$queryRaw('SELECT 1')`.
   - **Alternativa**: TypeORM health indicator não se aplica; usar `MikroOrmHealthIndicator` também não se aplica.

5. **Manter rota `GET /health` existente (mesmo path)**
   - **Por quê**: Compatibilidade reversa com scripts, Docker Compose, e deploy atual que usam `curl localhost:3000/health`.
   - **Formato da resposta**: Mudará de string `"pong"` para JSON do Terminus `{"status":"ok","info":{"prisma":{"status":"up"}},...}` — breaking change compatível com health checks HTTP (código 200 vs 503).

## Risks / Trade-offs

- **[Breaking] Resposta da API muda**: Consumers que esperam `"pong"` vão quebrar → Mitigação: Nenhum consumer conhecido além dos health checks de infra; todos usam código HTTP (200/503).
- **[Dependência] `@nestjs/terminus`**: Nova dependência que precisa ser mantida atualizada → Mitigação: Biblioteca oficial e madura do NestJS.
- **[Performance] Health checks no Prisma**: Consulta `SELECT 1` a cada chamada → Mitigação: Custos desprezíveis; pode-se adicionar cache se necessário.
