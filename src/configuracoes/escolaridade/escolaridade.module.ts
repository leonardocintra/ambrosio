import { Module } from '@nestjs/common';
import { EscolaridadeService } from './escolaridade.service';
import { EscolaridadeController } from './escolaridade.controller';

@Module({
  controllers: [EscolaridadeController],
  providers: [EscolaridadeService],
  exports: [EscolaridadeService],
})
export class EscolaridadeModule {}
