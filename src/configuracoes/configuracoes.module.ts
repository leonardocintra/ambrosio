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
import { TipoCarismaServicoModule } from './carismas/tipo-carisma-servico/tipo-carisma-servico.module';
import { TipoCarismaVinculadoModule } from './carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.module';
import { TipoCarismaPrimitivoModule } from './carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.module';

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
    TipoCarismaServicoModule,
    TipoCarismaVinculadoModule,
    TipoCarismaPrimitivoModule,
  ],
})
export class ConfiguracoesModule {}
