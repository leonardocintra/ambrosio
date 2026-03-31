import { Controller, Get, Param } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estados')
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
