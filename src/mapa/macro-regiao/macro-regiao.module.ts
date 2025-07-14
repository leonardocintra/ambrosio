import { Module } from '@nestjs/common';
import { MacroRegiaoService } from './macro-regiao.service';
import { MacroRegiaoController } from './macro-regiao.controller';

@Module({
  controllers: [MacroRegiaoController],
  providers: [MacroRegiaoService],
})
export class MacroRegiaoModule {}
