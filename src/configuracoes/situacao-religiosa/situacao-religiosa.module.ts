import { Module } from '@nestjs/common';
import { SituacaoReligiosaService } from './situacao-religiosa.service';
import { SituacaoReligiosaController } from './situacao-religiosa.controller';

@Module({
  controllers: [SituacaoReligiosaController],
  providers: [SituacaoReligiosaService],
  exports: [SituacaoReligiosaService],
})
export class SituacaoReligiosaModule {}
