import { Module } from '@nestjs/common';
import { TipoEquipeService } from './tipo-equipe.service';
import { TipoEquipeController } from './tipo-equipe.controller';

@Module({
  controllers: [TipoEquipeController],
  providers: [TipoEquipeService],
})
export class TipoEquipeModule {}
