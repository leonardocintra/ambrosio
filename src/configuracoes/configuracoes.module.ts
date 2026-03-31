import { Module } from '@nestjs/common';
import { EscolaridadeModule } from './escolaridade/escolaridade.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { TipoDioceseModule } from './tipo-diocese/tipo-diocese.module';
import { TipoEquipeModule } from './tipo-equipe/tipo-equipe.module';
import { TipoLocalidadeModule } from './tipo-localidade/tipo-localidade.module';
import { PaisModule } from './pais/pais.module';
import { EstadoModule } from './estado/estado.module';
import { CidadeModule } from './cidade/cidade.module';
import { DioceseModule } from 'src/diocese/diocese.module';
import { SituacaoReligiosaModule } from './situacao-religiosa/situacao-religiosa.module';
import { EtapasService } from './etapas/etapas.service';
import { EtapasController } from './etapas/etapas.controller';

@Module({
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    TipoDioceseModule,
    DioceseModule,
    TipoEquipeModule,
    TipoLocalidadeModule,
    PaisModule,
    EstadoModule,
    CidadeModule,
    SituacaoReligiosaModule,
  ],
  providers: [EtapasService],
  controllers: [EtapasController],
})
export class ConfiguracoesModule {}
