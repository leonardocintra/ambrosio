import { Module } from '@nestjs/common';
import { SituacaoReligiosaService } from './situacao-religiosa.service.js';
import { SituacaoReligiosaController } from './situacao-religiosa.controller.js';

@Module({
  controllers: [SituacaoReligiosaController],
  providers: [SituacaoReligiosaService],
  exports: [SituacaoReligiosaService],
})
export class SituacaoReligiosaModule {}
