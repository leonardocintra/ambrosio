import { Controller, Get, Param } from '@nestjs/common';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';

@Controller('carisma/servico')
export class TipoCarismaServicoController {
  constructor(
    private readonly tipoCarismaServicoService: TipoCarismaServicoService,
  ) {}

  @Get()
  findAll() {
    return this.tipoCarismaServicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarismaServicoService.findOne(+id);
  }
}
