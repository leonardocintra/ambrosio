import 'dotenv/config';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/prisma/generated-client';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined.');
}

const schema = process.env.DB_SCHEMA ?? undefined;

const adapter = new PrismaPg(
  { connectionString: process.env.DATABASE_URL },
  schema ? { schema } : {},
);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
