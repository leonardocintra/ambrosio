import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
