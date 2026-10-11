import { Module } from '@nestjs/common';
import { EscolaridadeService } from './escolaridade.service.js';
import { EscolaridadeController } from './escolaridade.controller.js';

@Module({
  controllers: [EscolaridadeController],
  providers: [EscolaridadeService],
  exports: [EscolaridadeService],
})
export class EscolaridadeModule {}
