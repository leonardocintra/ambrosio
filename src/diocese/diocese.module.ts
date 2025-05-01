import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { TipoDioceseModule } from 'src/configuracoes/tipo-diocese/tipo-diocese.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [TipoDioceseModule, EnderecoModule],
  exports: [DioceseService],
})
export class DioceseModule {}
