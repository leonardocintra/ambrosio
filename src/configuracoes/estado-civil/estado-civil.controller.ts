import { Controller, Get, Param } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estado Civil')
@Controller('estado-civil')
export class EstadoCivilController {
  constructor(private readonly estadoCivilService: EstadoCivilService) {}

  @Get()
  findAll() {
    return this.estadoCivilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estadoCivilService.findOne(id);
  }
}
