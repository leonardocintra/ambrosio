import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

function buildDatabaseUrl(): string {
  const url = env('DATABASE_URL')
  const schema = process.env.DB_SCHEMA
  if (!schema) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}schema=${schema}`
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: buildDatabaseUrl(),
    // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
})
