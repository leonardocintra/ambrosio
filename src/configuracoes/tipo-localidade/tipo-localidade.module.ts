import { Module } from '@nestjs/common';
import { TipoLocalidadeService } from './tipo-localidade.service.js';
import { TipoLocalidadeController } from './tipo-localidade.controller.js';

@Module({
  controllers: [TipoLocalidadeController],
  providers: [TipoLocalidadeService],
  exports: [TipoLocalidadeService]
})
export class TipoLocalidadeModule { }
