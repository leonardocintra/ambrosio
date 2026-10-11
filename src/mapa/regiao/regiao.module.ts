import { Module } from '@nestjs/common';
import { RegiaoService } from './regiao.service.js';
import { RegiaoController } from './regiao.controller.js';

@Module({
  controllers: [RegiaoController],
  providers: [RegiaoService],
})
export class RegiaoModule {}
