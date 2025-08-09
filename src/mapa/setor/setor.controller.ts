import { Controller, Get, Param, Query } from '@nestjs/common';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  findAll(@Query('macroRegiaoId') macroRegiaoId?: string) {
    const macroRegiaoIdNumber = macroRegiaoId ? +macroRegiaoId : undefined;
    return this.setorService.findAll(macroRegiaoIdNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setorService.findOne(+id);
  }
}
