import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
