import { Controller, Get, Param } from '@nestjs/common';
import { SituacaoReligiosaService } from './situacao-religiosa.service';

@Controller('situacao-religiosa')
export class SituacaoReligiosaController {
  constructor(
    private readonly situacaoReligiosaService: SituacaoReligiosaService,
  ) {}

  @Get()
  findAll() {
    return this.situacaoReligiosaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situacaoReligiosaService.findOne(+id);
  }
}
