import { Module } from '@nestjs/common';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';
import { ComunidadeService } from './comunidade.service';
import { HistoricoService } from './historico/historico.service';
import { EtapaComunidadeService } from './etapa/etapa-comunidade.service';
import { EtapaComunidadeController } from './etapa/etapa-comunidade.controller';

@Module({
  controllers: [ComunidadeController, EtapaComunidadeController],
  providers: [ComunidadeService, HistoricoService, EtapaComunidadeService],
  imports: [ParoquiaModule],
  exports: [ComunidadeService],
})
export class ComunidadeModule {}
