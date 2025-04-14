import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';

import { TipoDioceseModule } from '../tipo-diocese/tipo-diocese.module';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [TipoDioceseModule, EnderecoModule],
})
export class DioceseModule {}
