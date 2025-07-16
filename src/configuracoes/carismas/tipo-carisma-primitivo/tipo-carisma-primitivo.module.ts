import { Module } from '@nestjs/common';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';
import { TipoCarismaPrimitivoController } from './tipo-carisma-primitivo.controller';

@Module({
  controllers: [TipoCarismaPrimitivoController],
  providers: [TipoCarismaPrimitivoService],
})
export class TipoCarismaPrimitivoModule {}
