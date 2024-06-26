import { Controller, Get, Param } from '@nestjs/common';
import { EscolaridadeService } from './escolaridade.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Escolaridade')
@Controller('escolaridade')
export class EscolaridadeController {
  constructor(private readonly escolaridadeService: EscolaridadeService) {}

  @Get()
  findAll() {
    return this.escolaridadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escolaridadeService.findOne(+id);
  }
}
