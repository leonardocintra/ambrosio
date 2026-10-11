import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service.js';
import { CidadeController } from './cidade.controller.js';
import { EstadoModule } from '../estado/estado.module.js';

@Module({
  controllers: [CidadeController],
  providers: [CidadeService],
  imports: [EstadoModule],
  exports: [CidadeService],
})
export class CidadeModule {}
