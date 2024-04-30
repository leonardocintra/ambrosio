import { EscolaridadeModule } from './../configuracoes/escolaridade/escolaridade.module';
import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { EstadoCivilModule } from 'src/configuracoes/estado-civil/estado-civil.module';
import { TipoCarismaModule } from 'src/configuracoes/tipo-carisma/tipo-carisma.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { TipoPessoaModule } from 'src/configuracoes/tipo-pessoa/tipo-pessoa.module';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    TipoCarismaModule,
    TipoPessoaModule,
    EnderecoModule,
  ],
})
export class PessoaModule {}
