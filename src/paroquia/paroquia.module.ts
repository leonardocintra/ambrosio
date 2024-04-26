import { Module } from '@nestjs/common';
import { ParoquiaService } from './paroquia.service';
import { ParoquiaController } from './paroquia.controller';

@Module({
  controllers: [ParoquiaController],
  providers: [ParoquiaService],
})
export class ParoquiaModule {}
