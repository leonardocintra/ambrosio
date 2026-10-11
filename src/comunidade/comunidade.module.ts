import { Module } from '@nestjs/common';
import { ComunidadeController } from './comunidade.controller.js';
import { ParoquiaModule } from 'src/paroquia/paroquia.module.js';
import { ComunidadeService } from './comunidade.service.js';
import { HistoricoService } from './historico/historico.service.js';
import { EtapaComunidadeService } from './etapa/etapa-comunidade.service.js';
import { EtapaComunidadeController } from './etapa/etapa-comunidade.controller.js';

@Module({
  controllers: [ComunidadeController, EtapaComunidadeController],
  providers: [ComunidadeService, HistoricoService, EtapaComunidadeService],
  imports: [ParoquiaModule],
  exports: [ComunidadeService],
})
export class ComunidadeModule {}
