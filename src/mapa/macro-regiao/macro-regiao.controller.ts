import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MacroRegiaoService } from './macro-regiao.service';
import { CreateMacroRegiaoDto } from './dto/create-macro-regiao.dto';
import { UpdateMacroRegiaoDto } from './dto/update-macro-regiao.dto';

@Controller('macro-regiao')
export class MacroRegiaoController {
  constructor(private readonly macroRegiaoService: MacroRegiaoService) {}

  @Post()
  create(@Body() createMacroRegiaoDto: CreateMacroRegiaoDto) {
    return this.macroRegiaoService.create(createMacroRegiaoDto);
  }

  @Get()
  findAll() {
    return this.macroRegiaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.macroRegiaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMacroRegiaoDto: UpdateMacroRegiaoDto) {
    return this.macroRegiaoService.update(+id, updateMacroRegiaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.macroRegiaoService.remove(+id);
  }
}
