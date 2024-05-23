import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('localidade')
export class LocalidadeController {
  constructor(private readonly localidadeService: LocalidadeService) {}

  @Post()
  create(@Body() createLocalidadeDto: CreateLocalidadeDto) {
    return this.localidadeService.create(createLocalidadeDto);
  }

  @Get()
  findAll() {
    return this.localidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalidadeDto: UpdateLocalidadeDto,
  ) {
    return this.localidadeService.update(+id, updateLocalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localidadeService.remove(+id);
  }

  @EventPattern('localidade_created')
  async onLocalidadeCreated(data: string) {
    console.log('Localidade created', data);
  }
}
