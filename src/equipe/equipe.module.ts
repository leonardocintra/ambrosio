import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { TipoEquipeModule } from 'src/configuracoes/tipo-equipe/tipo-equipe.module';
import { PessoaModule } from 'src/pessoa/pessoa.module';
import { CarismaModule } from 'src/carisma/carisma.module';

@Module({
  controllers: [EquipeController],
  providers: [EquipeService],
  imports: [TipoEquipeModule, PessoaModule, CarismaModule],
})
export class EquipeModule {}
