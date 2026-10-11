import { Module } from '@nestjs/common';
import { CarismaService } from './carisma.service.js';
import { CarismaController } from './carisma.controller.js';
import { PessoaModule } from 'src/pessoa/pessoa.module.js';

@Module({
  controllers: [CarismaController],
  providers: [CarismaService],
  exports: [CarismaService],
  imports: [PessoaModule],
})
export class CarismaModule {}
