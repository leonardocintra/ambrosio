import 'dotenv/config';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { PrismaClient } from 'src/prisma/generated-client';

const { DATABASE_URL, DB_SCHEMA, NODE_ENV } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined.');
}

const schemaFromUrl = (() => {
  try {
    const parsedUrl = new URL(DATABASE_URL);
    return parsedUrl.searchParams.get('schema') ?? undefined;
  } catch {
    return undefined;
  }
})();

const shouldForceSchema = NODE_ENV === 'production';
const targetSchema = shouldForceSchema ? DB_SCHEMA ?? schemaFromUrl : undefined;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

if (targetSchema) {
  const safeSchema = targetSchema.replace(/"/g, '');
  pool.on('connect', (client) => {
    void client.query(`SET search_path TO "${safeSchema}"`);
  });
}

const adapter = new PrismaPg(pool);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
