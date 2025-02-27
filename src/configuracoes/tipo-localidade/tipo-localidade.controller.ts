import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TipoLocalidadeService } from './tipo-localidade.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Localidade')
@Controller('tipo-localidade')
export class TipoLocalidadeController {
  constructor(private readonly tipoLocalidadeService: TipoLocalidadeService) { }

  @Get()
  findAll() {
    return this.tipoLocalidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoLocalidadeService.findOne(+id);
  }
}
