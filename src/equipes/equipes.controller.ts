import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipesService } from './equipes.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';

@Controller('equipes')
export class EquipesController {
  constructor(private readonly equipesService: EquipesService) {}

  @Post()
  create(@Body() createEquipeDto: CreateEquipeDto) {
    return this.equipesService.create(createEquipeDto);
  }

  @Get()
  findAll() {
    return this.equipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipeDto: UpdateEquipeDto) {
    return this.equipesService.update(+id, updateEquipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipesService.remove(+id);
  }
}
