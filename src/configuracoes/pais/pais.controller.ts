import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Post()
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto);
  }

  @Get()
  findAll() {
    return this.paisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePaiDto: UpdatePaisDto) {
    return this.paisService.update(+id, updatePaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paisService.remove(+id);
  }
}
