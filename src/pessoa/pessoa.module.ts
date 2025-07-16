import { EscolaridadeModule } from './../configuracoes/escolaridade/escolaridade.module';
import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { EstadoCivilModule } from 'src/configuracoes/estado-civil/estado-civil.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { SituacaoReligiosaModule } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.module';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    SituacaoReligiosaModule,
    EnderecoModule,
  ],
})
export class PessoaModule {}
