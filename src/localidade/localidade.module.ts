import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { LocalidadeController } from './localidade.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { RabbitmqModule } from 'src/configuracoes/rabbitmq/rabbitmq.module';

@Module({
  controllers: [LocalidadeController],
  providers: [LocalidadeService],
  imports: [EnderecoModule, RabbitmqModule],
})
export class LocalidadeModule {}
