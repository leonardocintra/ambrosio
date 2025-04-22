import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { LocalidadeController } from './localidade.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  controllers: [LocalidadeController],
  providers: [LocalidadeService],
  imports: [EnderecoModule],
  exports: [LocalidadeService],
})
export class LocalidadeModule {}
