import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service.js';
import { CreateEnderecoDto } from './dto/create-endereco.dto.js';
import { UpdateEnderecoDto } from './dto/update-endereco.dto.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Endereços')
@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post('/pessoa/:id')
  createByPessoaId(
    @Body() createEnderecoDto: CreateEnderecoDto,
    @Param('id') id: string,
  ) {
    return this.enderecoService.createByPessoaId(createEnderecoDto, +id);
  }

  @Get('pessoa/:id')
  findAll(@Param('id') id: string) {
    return this.enderecoService.findAllByPessoaId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.enderecoService.update(+id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(+id);
  }
}
