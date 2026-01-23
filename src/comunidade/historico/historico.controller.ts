import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { CreateHistoricoDto } from './dto/create-historico.dto';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Post()
  create(@Body() createHistoricoDto: CreateHistoricoDto) {
    return this.historicoService.create(createHistoricoDto);
  }

  @Get()
  findAll() {
    return this.historicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoService.findOne(+id);
  }
}
