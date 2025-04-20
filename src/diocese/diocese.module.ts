import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { TipoDioceseModule } from 'src/configuracoes/tipo-diocese/tipo-diocese.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { PaisModule } from 'src/configuracoes/pais/pais.module';
import { CidadeModule } from 'src/configuracoes/cidade/cidade.module';
import { EstadoModule } from 'src/configuracoes/estado/estado.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [
    TipoDioceseModule,
    EnderecoModule,
    MessagingModule,
    PaisModule,
    CidadeModule,
    EstadoModule,
  ],
})
export class DioceseModule {}
