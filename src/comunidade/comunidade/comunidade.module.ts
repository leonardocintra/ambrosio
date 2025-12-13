import { Module } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { ComunidadeController } from './comunidade.controller';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService],
})
export class ComunidadeModule {}
