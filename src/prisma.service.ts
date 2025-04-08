import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     log: ['info'], // 'query' para ver as querys executadas
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
  }
}
