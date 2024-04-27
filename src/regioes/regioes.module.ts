import { Module } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { RegioesController } from './regioes.controller';

@Module({
  controllers: [RegioesController],
  providers: [RegioesService],
})
export class RegioesModule {}
