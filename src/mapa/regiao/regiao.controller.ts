import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { RegiaoService } from './regiao.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Regiões')
@Controller('regiao')
export class RegiaoController {
  constructor(private readonly regiaoService: RegiaoService) {}

  @Get()
  @ApiOkResponse({ description: 'Retorna todas as regiões' })
  findAll() {
    return this.regiaoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retorna uma região pelo ID' })
  findOne(@Param('id') id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
      throw new BadRequestException(
        'O parâmetro "id" deve ser um número inteiro positivo válido.',
      );
    }
    return this.regiaoService.findOne(parsedId);
  }
}
