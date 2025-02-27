import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';
import { LocalidadeModule } from 'src/localidade/localidade.module';
import { TipoLocalidadeModule } from '../tipo-localidade/tipo-localidade.module';
import { TipoDioceseModule } from '../tipo-diocese/tipo-diocese.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [LocalidadeModule, TipoLocalidadeModule, TipoDioceseModule]
})
export class DioceseModule { }
