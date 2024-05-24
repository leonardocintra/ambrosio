import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { LocalidadeController } from './localidade.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  controllers: [LocalidadeController],
  providers: [LocalidadeService],
  imports: [EnderecoModule, MessagingModule],
})
export class LocalidadeModule {}
