import { Module } from '@nestjs/common';
import { SetorService } from './setor.service.js';
import { SetorController } from './setor.controller.js';

@Module({
  controllers: [SetorController],
  providers: [SetorService],
  exports: [SetorService],
})
export class SetorModule {}
