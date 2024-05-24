import { Controller, Get, Param } from '@nestjs/common';
import { TipoCarismaService } from './tipo-carisma.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Carisma')
@Controller('tipo-carisma')
export class TipoCarismaController {
  constructor(private readonly tipoCarismaService: TipoCarismaService) {}

  @Get()
  findAll() {
    return this.tipoCarismaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarismaService.findOne(+id);
  }
}
