import { EscolaridadeModule } from './../configuracoes/escolaridade/escolaridade.module';
import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { EstadoCivilModule } from 'src/configuracoes/estado-civil/estado-civil.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { SituacaoReligiosaModule } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.module';
import { TipoCarismaVinculadoModule } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.module';
import { TipoCarismaPrimitivoModule } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.module';
import { TipoCarismaServicoModule } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.module';
import { SaoPedroModule } from 'src/external/sao-pedro/sao-pedro.module';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
  exports: [PessoaService],
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    SituacaoReligiosaModule,
    EnderecoModule,
    TipoCarismaVinculadoModule,
    TipoCarismaPrimitivoModule,
    TipoCarismaServicoModule,
    SaoPedroModule,
  ],
})
export class PessoaModule {}
