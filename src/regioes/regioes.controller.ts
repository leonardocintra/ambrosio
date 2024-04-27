import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { CreateRegiaoDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';

@Controller('regioes')
export class RegioesController {
  constructor(private readonly regioesService: RegioesService) {}

  @Post()
  create(@Body() createRegioeDto: CreateRegiaoDto) {
    return this.regioesService.create(createRegioeDto);
  }

  @Get()
  findAll() {
    return this.regioesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regioesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegioeDto: UpdateRegioeDto) {
    return this.regioesService.update(+id, updateRegioeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regioesService.remove(+id);
  }
}
