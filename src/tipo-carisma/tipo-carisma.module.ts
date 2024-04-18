import { Module } from '@nestjs/common';
import { TipoCarismaService } from './tipo-carisma.service';
import { TipoCarismaController } from './tipo-carisma.controller';

@Module({
  controllers: [TipoCarismaController],
  providers: [TipoCarismaService],
})
export class TipoCarismaModule {}
