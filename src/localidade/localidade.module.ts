import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service.js';
import { LocalidadeController } from './localidade.controller.js';
import { EnderecoModule } from 'src/endereco/endereco.module.js';

@Module({
  controllers: [LocalidadeController],
  providers: [LocalidadeService],
  imports: [EnderecoModule],
  exports: [LocalidadeService],
})
export class LocalidadeModule {}
