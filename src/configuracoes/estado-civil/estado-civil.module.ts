import { Module } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { EstadoCivilController } from './estado-civil.controller';

@Module({
  controllers: [EstadoCivilController],
  providers: [EstadoCivilService],
})
export class EstadoCivilModule {}
