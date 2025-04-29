import { Module } from '@nestjs/common';
import { EscolaridadeModule } from './escolaridade/escolaridade.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { TipoCarismaModule } from './tipo-carisma/tipo-carisma.module';
import { TipoDioceseModule } from './tipo-diocese/tipo-diocese.module';
import { TipoEquipeModule } from './tipo-equipe/tipo-equipe.module';
import { TipoLocalidadeModule } from './tipo-localidade/tipo-localidade.module';
import { PaisModule } from './pais/pais.module';
import { EstadoModule } from './estado/estado.module';
import { CidadeModule } from './cidade/cidade.module';
import { DioceseModule } from 'src/diocese/diocese.module';
import { SituacaoReligiosaModule } from './situacao-religiosa/situacao-religiosa.module';

@Module({
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    TipoCarismaModule,
    TipoDioceseModule,
    DioceseModule,
    TipoEquipeModule,
    TipoLocalidadeModule,
    PaisModule,
    EstadoModule,
    CidadeModule,
    SituacaoReligiosaModule,
  ],
})
export class ConfiguracoesModule {}
