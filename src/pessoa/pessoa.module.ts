import { EscolaridadeModule } from './../configuracoes/escolaridade/escolaridade.module';
import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { EstadoCivilModule } from 'src/configuracoes/estado-civil/estado-civil.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { SituacaoReligiosaModule } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.module';
import { SaoPedroModule } from 'src/external/sao-pedro/sao-pedro.module';
import { ComunidadeModule } from 'src/comunidade/comunidade.module';
import { CasalService } from './casal/casal.service';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService, CasalService],
  exports: [PessoaService],
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    SituacaoReligiosaModule,
    EnderecoModule,
    SaoPedroModule,
    ComunidadeModule,
  ],
})
export class PessoaModule {}
