import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { LocalidadeController } from './localidade.controller';

@Module({
  controllers: [LocalidadeController],
  providers: [LocalidadeService],
})
export class LocalidadeModule {}
