import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscolaridadeService } from './escolaridade.service';
import { CreateEscolaridadeDto } from './dto/create-escolaridade.dto';
import { UpdateEscolaridadeDto } from './dto/update-escolaridade.dto';

@Controller('escolaridade')
export class EscolaridadeController {
  constructor(private readonly escolaridadeService: EscolaridadeService) {}

  @Post()
  create(@Body() createEscolaridadeDto: CreateEscolaridadeDto) {
    return this.escolaridadeService.create(createEscolaridadeDto);
  }

  @Get()
  findAll() {
    return this.escolaridadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escolaridadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscolaridadeDto: UpdateEscolaridadeDto) {
    return this.escolaridadeService.update(+id, updateEscolaridadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escolaridadeService.remove(+id);
  }
}
