import { Module } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';
import { HistoricoModule } from '../historico/historico.module';
import { EtapaModule } from '../etapa/etapa.module';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService],
  imports: [ParoquiaModule, HistoricoModule, EtapaModule],
})
export class ComunidadeModule {}
