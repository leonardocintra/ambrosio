import { Module } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service.js';
import { EstadoCivilController } from './estado-civil.controller.js';

@Module({
  controllers: [EstadoCivilController],
  providers: [EstadoCivilService],
  exports: [EstadoCivilService],
})
export class EstadoCivilModule {}
