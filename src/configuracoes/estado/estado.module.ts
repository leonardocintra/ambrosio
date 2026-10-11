import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service.js';
import { EstadoController } from './estado.controller.js';
import { PaisModule } from '../pais/pais.module.js';

@Module({
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService],
  imports: [PaisModule]
})
export class EstadoModule { }
