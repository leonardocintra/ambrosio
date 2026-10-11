import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service.js';
import { EnderecoController } from './endereco.controller.js';
import { CidadeModule } from 'src/configuracoes/cidade/cidade.module.js';
import { EstadoModule } from 'src/configuracoes/estado/estado.module.js';
import { PaisModule } from 'src/configuracoes/pais/pais.module.js';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService],
  imports: [CidadeModule, EstadoModule, PaisModule],
})
export class EnderecoModule {}
