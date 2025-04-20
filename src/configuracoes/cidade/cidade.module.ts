import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { EstadoModule } from '../estado/estado.module';

@Module({
  controllers: [CidadeController],
  providers: [CidadeService],
  imports: [EstadoModule],
  exports: [CidadeService],
})
export class CidadeModule {}
