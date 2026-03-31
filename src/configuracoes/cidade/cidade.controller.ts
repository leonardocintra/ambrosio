import { Controller, Get, Param } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cidades')
@Controller('cidade')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Get()
  findAll() {
    return this.cidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadeService.findOne(+id);
  }
}
