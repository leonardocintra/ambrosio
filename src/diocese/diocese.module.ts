import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { TipoDioceseModule } from 'src/configuracoes/tipo-diocese/tipo-diocese.module';
import { SetorModule } from 'src/mapa/setor/setor.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [TipoDioceseModule, EnderecoModule, SetorModule],
  exports: [DioceseService],
})
export class DioceseModule {}
