import { Module } from '@nestjs/common';
import { EscolaridadeModule } from './escolaridade/escolaridade.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { TipoCarismaModule } from './tipo-carisma/tipo-carisma.module';
import { TipoDioceseModule } from './tipo-diocese/tipo-diocese.module';
import { DioceseModule } from './diocese/diocese.module';
import { TipoEquipeModule } from './tipo-equipe/tipo-equipe.module';
import { TipoPessoaModule } from './tipo-pessoa/tipo-pessoa.module';
import { TipoLocalidadeModule } from './tipo-localidade/tipo-localidade.module';

@Module({
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    TipoCarismaModule,
    TipoDioceseModule,
    DioceseModule,
    TipoEquipeModule,
    TipoPessoaModule,
    TipoLocalidadeModule,
  ],
})
export class ConfiguracoesModule {}
