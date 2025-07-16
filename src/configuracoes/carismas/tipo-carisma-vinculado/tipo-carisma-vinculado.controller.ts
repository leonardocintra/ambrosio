import { Controller, Get, Param } from '@nestjs/common';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';

@Controller('carisma/vinculado')
export class TipoCarismaVinculadoController {
  constructor(
    private readonly tipoCarismaVinculadoService: TipoCarismaVinculadoService,
  ) {}

  @Get()
  findAll() {
    return this.tipoCarismaVinculadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarismaVinculadoService.findOne(+id);
  }
}
