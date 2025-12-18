import { Controller, Get, Param } from '@nestjs/common';
import { TipoEquipeService } from './tipo-equipe.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Equipe')
@Controller('tipo-equipe')
export class TipoEquipeController {
  constructor(private readonly tipoEquipeService: TipoEquipeService) {}

  @Get()
  findAll() {
    return this.tipoEquipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEquipeService.findOne(+id);
  }
}
