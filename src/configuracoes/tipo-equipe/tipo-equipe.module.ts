import { Module } from '@nestjs/common';
import { TipoEquipeService } from './tipo-equipe.service.js';
import { TipoEquipeController } from './tipo-equipe.controller.js';

@Module({
  controllers: [TipoEquipeController],
  providers: [TipoEquipeService],
  exports: [TipoEquipeService],
})
export class TipoEquipeModule {}
