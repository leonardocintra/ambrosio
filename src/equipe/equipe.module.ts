import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service.js';
import { EquipeController } from './equipe.controller.js';
import { TipoEquipeModule } from 'src/configuracoes/tipo-equipe/tipo-equipe.module.js';
import { PessoaModule } from 'src/pessoa/pessoa.module.js';
import { CarismaModule } from 'src/carisma/carisma.module.js';

@Module({
  controllers: [EquipeController],
  providers: [EquipeService],
  imports: [TipoEquipeModule, PessoaModule, CarismaModule],
})
export class EquipeModule {}
