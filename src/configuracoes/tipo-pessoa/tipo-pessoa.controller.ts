import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TipoPessoaService } from './tipo-pessoa.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Pessoa')
@Controller('tipo-pessoa')
export class TipoPessoaController {
  constructor(private readonly tipoPessoaService: TipoPessoaService) {}

  @Get()
  findAll() {
    return this.tipoPessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPessoaService.findOne(+id);
  }
}
