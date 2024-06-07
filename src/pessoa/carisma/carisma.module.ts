import { Module } from '@nestjs/common';
import { CarismaService } from './carisma.service';
import { CarismaController } from './carisma.controller';

@Module({
  controllers: [CarismaController],
  providers: [CarismaService],
})
export class CarismaModule {}
