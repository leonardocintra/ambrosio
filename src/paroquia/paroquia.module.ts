import { Module } from '@nestjs/common';
import { ParoquiaService } from './paroquia.service';
import { ParoquiaController } from './paroquia.controller';
import { DioceseModule } from 'src/diocese/diocese.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { SetorModule } from 'src/mapa/setor/setor.module';

@Module({
  controllers: [ParoquiaController],
  providers: [ParoquiaService],
  imports: [DioceseModule, EnderecoModule, SetorModule],
})
export class ParoquiaModule {}
