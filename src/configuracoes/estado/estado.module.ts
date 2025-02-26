import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { PaisModule } from '../pais/pais.module';

@Module({
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService],
  imports: [PaisModule]
})
export class EstadoModule { }
