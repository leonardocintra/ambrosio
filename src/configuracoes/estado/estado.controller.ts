import { Controller, Get, Param } from '@nestjs/common';
import { EstadoService } from './estado.service';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Get()
  findAll() {
    return this.estadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoService.findOne(+id);
  }
}
