import { Module } from '@nestjs/common';
import { ParoquiaService } from './paroquia.service.js';
import { ParoquiaController } from './paroquia.controller.js';
import { DioceseModule } from 'src/diocese/diocese.module.js';
import { EnderecoModule } from 'src/endereco/endereco.module.js';
import { SetorModule } from 'src/mapa/setor/setor.module.js';

@Module({
  controllers: [ParoquiaController],
  providers: [ParoquiaService],
  imports: [DioceseModule, EnderecoModule, SetorModule],
  exports: [ParoquiaService],
})
export class ParoquiaModule {}
