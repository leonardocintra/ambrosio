import { Module } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { ComunidadeController } from './comunidade.controller';
import { ParoquiaModule } from 'src/paroquia/paroquia.module';

@Module({
  controllers: [ComunidadeController],
  providers: [ComunidadeService],
  imports: [ParoquiaModule],
})
export class ComunidadeModule {}
