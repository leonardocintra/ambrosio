import { EscolaridadeModule } from './../configuracoes/escolaridade/escolaridade.module';
import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { EstadoCivilModule } from 'src/configuracoes/estado-civil/estado-civil.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { TipoPessoaModule } from 'src/configuracoes/tipo-pessoa/tipo-pessoa.module';
import { CarismaModule } from './carisma/carisma.module';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
  imports: [
    EscolaridadeModule,
    EstadoCivilModule,
    TipoPessoaModule,
    EnderecoModule,
    CarismaModule,
  ],
})
export class PessoaModule {}
