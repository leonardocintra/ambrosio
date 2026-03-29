import { Module } from '@nestjs/common';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';
import { ComunidadeService } from './comunidade.service';
import { HistoricoService } from './historico/historico.service';
import { EtapaService } from './etapa/etapa.service';
import { EtapaController } from './etapa/etapa.controller';
import { HistoricoController } from './historico/historico.controller';

@Module({
  controllers: [ComunidadeController, EtapaController, HistoricoController],
  providers: [ComunidadeService, HistoricoService, EtapaService],
  imports: [ParoquiaModule],
  exports: [ComunidadeService],
})
export class ComunidadeModule {}
