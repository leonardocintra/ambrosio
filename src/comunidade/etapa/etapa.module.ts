import { Module } from '@nestjs/common';
import { EtapaService } from './etapa.service';
import { EtapaController } from './etapa.controller';

@Module({
  controllers: [EtapaController],
  providers: [EtapaService],
})
export class EtapaModule {}
