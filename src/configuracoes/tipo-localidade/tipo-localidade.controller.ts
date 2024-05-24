import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoLocalidadeService } from './tipo-localidade.service';
import { CreateTipoLocalidadeDto } from './dto/create-tipo-localidade.dto';
import { UpdateTipoLocalidadeDto } from './dto/update-tipo-localidade.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Localidade')
@Controller('tipo-localidade')
export class TipoLocalidadeController {
  constructor(private readonly tipoLocalidadeService: TipoLocalidadeService) {}

  @Post()
  create(@Body() createTipoLocalidadeDto: CreateTipoLocalidadeDto) {
    return this.tipoLocalidadeService.create(createTipoLocalidadeDto);
  }

  @Get()
  findAll() {
    return this.tipoLocalidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoLocalidadeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoLocalidadeDto: UpdateTipoLocalidadeDto,
  ) {
    return this.tipoLocalidadeService.update(+id, updateTipoLocalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoLocalidadeService.remove(+id);
  }
}
