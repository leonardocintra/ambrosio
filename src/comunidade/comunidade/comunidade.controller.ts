import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadeService } from './comunidade.service';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';

@Controller('comunidade')
export class ComunidadeController {
  constructor(private readonly comunidadeService: ComunidadeService) {}

  @Post()
  create(@Body() createComunidadeDto: CreateComunidadeDto) {
    return this.comunidadeService.create(createComunidadeDto);
  }

  @Get()
  findAll() {
    return this.comunidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunidadeDto: UpdateComunidadeDto) {
    return this.comunidadeService.update(+id, updateComunidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadeService.remove(+id);
  }
}
