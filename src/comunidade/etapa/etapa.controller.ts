import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtapaService } from './etapa.service';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';

@Controller('etapa')
export class EtapaController {
  constructor(private readonly etapaService: EtapaService) {}

  @Post()
  create(@Body() createEtapaDto: CreateEtapaDto) {
    return this.etapaService.create(createEtapaDto);
  }

  @Get()
  findAll() {
    return this.etapaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etapaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtapaDto: UpdateEtapaDto) {
    return this.etapaService.update(+id, updateEtapaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etapaService.remove(+id);
  }
}
