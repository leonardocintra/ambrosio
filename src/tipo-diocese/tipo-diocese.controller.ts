import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoDioceseService } from './tipo-diocese.service';
import { CreateTipoDioceseDto } from './dto/create-tipo-diocese.dto';
import { UpdateTipoDioceseDto } from './dto/update-tipo-diocese.dto';

@Controller('tipo-diocese')
export class TipoDioceseController {
  constructor(private readonly tipoDioceseService: TipoDioceseService) {}

  @Post()
  create(@Body() createTipoDioceseDto: CreateTipoDioceseDto) {
    return this.tipoDioceseService.create(createTipoDioceseDto);
  }

  @Get()
  findAll() {
    return this.tipoDioceseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDioceseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDioceseDto: UpdateTipoDioceseDto) {
    return this.tipoDioceseService.update(+id, updateTipoDioceseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDioceseService.remove(+id);
  }
}
