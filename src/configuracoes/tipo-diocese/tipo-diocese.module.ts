import { Module } from '@nestjs/common';
import { TipoDioceseService } from './tipo-diocese.service';
import { TipoDioceseController } from './tipo-diocese.controller';

@Module({
  controllers: [TipoDioceseController],
  providers: [TipoDioceseService],
  exports: [TipoDioceseService],
})
export class TipoDioceseModule {}
