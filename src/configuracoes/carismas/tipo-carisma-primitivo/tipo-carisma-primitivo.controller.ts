import { Controller, Get, Param } from '@nestjs/common';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';

@Controller('carisma/primitivo')
export class TipoCarismaPrimitivoController {
  constructor(
    private readonly tipoCarismaPrimitivoService: TipoCarismaPrimitivoService,
  ) {}

  @Get()
  findAll() {
    return this.tipoCarismaPrimitivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarismaPrimitivoService.findOne(+id);
  }
}
