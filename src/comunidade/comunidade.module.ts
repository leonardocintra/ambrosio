import { Module } from '@nestjs/common';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';
import { ComunidadeService } from './comunidade.service';
import { HistoricoService } from './historico/historico.service';
import { EtapaService } from './etapa/etapa.service';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService, HistoricoService, EtapaService],
  imports: [ParoquiaModule],
})
export class ComunidadeModule {}
