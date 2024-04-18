import { Module } from '@nestjs/common';
import { EscolaridadeService } from './escolaridade.service';
import { EscolaridadeController } from './escolaridade.controller';

@Module({
  controllers: [EscolaridadeController],
  providers: [EscolaridadeService],
})
export class EscolaridadeModule {}
