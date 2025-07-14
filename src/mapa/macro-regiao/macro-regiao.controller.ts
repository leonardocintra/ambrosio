import { Controller, Get, Param } from '@nestjs/common';
import { MacroRegiaoService } from './macro-regiao.service';

@Controller('macro-regiao')
export class MacroRegiaoController {
  constructor(private readonly macroRegiaoService: MacroRegiaoService) {}

  @Get()
  findAll() {
    return this.macroRegiaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.macroRegiaoService.findOne(+id);
  }
}
