import { Module } from '@nestjs/common';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';
import { TipoCarismaVinculadoController } from './tipo-carisma-vinculado.controller';

@Module({
  controllers: [TipoCarismaVinculadoController],
  providers: [TipoCarismaVinculadoService],
})
export class TipoCarismaVinculadoModule {}
