import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPessoaService } from './tipo-pessoa.service';
import { CreateTipoPessoaDto } from './dto/create-tipo-pessoa.dto';
import { UpdateTipoPessoaDto } from './dto/update-tipo-pessoa.dto';

@Controller('tipo-pessoa')
export class TipoPessoaController {
  constructor(private readonly tipoPessoaService: TipoPessoaService) {}

  @Post()
  create(@Body() createTipoPessoaDto: CreateTipoPessoaDto) {
    return this.tipoPessoaService.create(createTipoPessoaDto);
  }

  @Get()
  findAll() {
    return this.tipoPessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPessoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPessoaDto: UpdateTipoPessoaDto) {
    return this.tipoPessoaService.update(+id, updateTipoPessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPessoaService.remove(+id);
  }
}
