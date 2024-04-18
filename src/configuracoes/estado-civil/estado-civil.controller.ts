import { Controller, Get, Param } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';

@Controller('estado-civil')
export class EstadoCivilController {
  constructor(private readonly estadoCivilService: EstadoCivilService) {}

  @Get()
  findAll() {
    return this.estadoCivilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCivilService.findOne(+id);
  }
}
