import { Module } from '@nestjs/common';
import { TipoDioceseService } from './tipo-diocese.service.js';
import { TipoDioceseController } from './tipo-diocese.controller.js';

@Module({
  controllers: [TipoDioceseController],
  providers: [TipoDioceseService],
  exports: [TipoDioceseService],
})
export class TipoDioceseModule {}
