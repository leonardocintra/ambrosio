import { Module } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';
import { EtapaModule } from '../etapa/etapa.module';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService],
  imports: [ParoquiaModule, EtapaModule],
})
export class ComunidadeModule {}
