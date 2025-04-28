import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { CidadeModule } from 'src/configuracoes/cidade/cidade.module';
import { EstadoModule } from 'src/configuracoes/estado/estado.module';
import { PaisModule } from 'src/configuracoes/pais/pais.module';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService],
  imports: [CidadeModule, EstadoModule, PaisModule],
})
export class EnderecoModule {}
