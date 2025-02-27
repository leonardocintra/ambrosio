import { Module } from '@nestjs/common';
import { TipoLocalidadeService } from './tipo-localidade.service';
import { TipoLocalidadeController } from './tipo-localidade.controller';

@Module({
  controllers: [TipoLocalidadeController],
  providers: [TipoLocalidadeService],
  exports: [TipoLocalidadeService]
})
export class TipoLocalidadeModule { }
