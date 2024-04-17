import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';

@Controller('estado-civil')
export class EstadoCivilController {
  constructor(private readonly estadoCivilService: EstadoCivilService) {}

  @Post()
  create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.estadoCivilService.create(createEstadoCivilDto);
  }

  @Get()
  findAll() {
    return this.estadoCivilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCivilService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoCivilDto: UpdateEstadoCivilDto) {
    return this.estadoCivilService.update(+id, updateEstadoCivilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoCivilService.remove(+id);
  }
}
