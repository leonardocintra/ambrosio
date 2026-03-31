import { Controller, Get, Param } from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Etapas do Caminho Neocatecumenal')
@Controller('etapas')
export class EtapasController {
  constructor(private readonly etapasService: EtapasService) {}

  @Get()
  findAll() {
    return this.etapasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.etapasService.findOne(id);
  }
}
