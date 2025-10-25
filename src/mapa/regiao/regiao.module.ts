import { Module } from '@nestjs/common';
import { RegiaoService } from './regiao.service';
import { RegiaoController } from './regiao.controller';

@Module({
  controllers: [RegiaoController],
  providers: [RegiaoService],
})
export class RegiaoModule {}
