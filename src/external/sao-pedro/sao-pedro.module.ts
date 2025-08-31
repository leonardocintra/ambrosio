import { Module } from '@nestjs/common';
import { SaoPedroPessoaService } from './sao-pedro-pessoa.service';
import { SaoPedroAuthService } from './sao-pedro-auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SaoPedroPessoaService, SaoPedroAuthService],
  exports: [SaoPedroPessoaService],
})
export class SaoPedroModule {}
