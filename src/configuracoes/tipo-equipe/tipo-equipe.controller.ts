import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEquipeService } from './tipo-equipe.service';
import { CreateTipoEquipeDto } from './dto/create-tipo-equipe.dto';
import { UpdateTipoEquipeDto } from './dto/update-tipo-equipe.dto';

@Controller('tipo-equipe')
export class TipoEquipeController {
  constructor(private readonly tipoEquipeService: TipoEquipeService) {}

  @Post()
  create(@Body() createTipoEquipeDto: CreateTipoEquipeDto) {
    return this.tipoEquipeService.create(createTipoEquipeDto);
  }

  @Get()
  findAll() {
    return this.tipoEquipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEquipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEquipeDto: UpdateTipoEquipeDto) {
    return this.tipoEquipeService.update(+id, updateTipoEquipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEquipeService.remove(+id);
  }
}
