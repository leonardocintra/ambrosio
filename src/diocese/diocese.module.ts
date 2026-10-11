import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service.js';
import { DioceseController } from './diocese.controller.js';
import { EnderecoModule } from 'src/endereco/endereco.module.js';
import { TipoDioceseModule } from 'src/configuracoes/tipo-diocese/tipo-diocese.module.js';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [TipoDioceseModule, EnderecoModule],
  exports: [DioceseService],
})
export class DioceseModule {}
