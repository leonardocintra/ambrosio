import { Module } from '@nestjs/common';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';
import { TipoCarismaServicoController } from './tipo-carisma-servico.controller';

@Module({
  controllers: [TipoCarismaServicoController],
  providers: [TipoCarismaServicoService],
})
export class TipoCarismaServicoModule {}
