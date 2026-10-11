import { Module } from '@nestjs/common';
import { SaoPedroPessoaService } from './sao-pedro-pessoa.service.js';
import { SaoPedroAuthService } from './sao-pedro-auth.service.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SaoPedroPessoaService, SaoPedroAuthService],
  exports: [SaoPedroPessoaService],
})
export class SaoPedroModule {}
