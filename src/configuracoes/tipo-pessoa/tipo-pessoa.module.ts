import { Module } from '@nestjs/common';
import { TipoPessoaService } from './tipo-pessoa.service';
import { TipoPessoaController } from './tipo-pessoa.controller';

@Module({
  controllers: [TipoPessoaController],
  providers: [TipoPessoaService],
  exports: [TipoPessoaService],
})
export class TipoPessoaModule {}
