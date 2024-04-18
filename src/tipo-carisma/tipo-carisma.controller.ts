import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCarismaService } from './tipo-carisma.service';
import { CreateTipoCarismaDto } from './dto/create-tipo-carisma.dto';
import { UpdateTipoCarismaDto } from './dto/update-tipo-carisma.dto';

@Controller('tipo-carisma')
export class TipoCarismaController {
  constructor(private readonly tipoCarismaService: TipoCarismaService) {}

  @Post()
  create(@Body() createTipoCarismaDto: CreateTipoCarismaDto) {
    return this.tipoCarismaService.create(createTipoCarismaDto);
  }

  @Get()
  findAll() {
    return this.tipoCarismaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCarismaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCarismaDto: UpdateTipoCarismaDto) {
    return this.tipoCarismaService.update(+id, updateTipoCarismaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCarismaService.remove(+id);
  }
}
