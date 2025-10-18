import { Controller, Get, Param, Query } from '@nestjs/common';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  findAll(@Query('regiaoId') regiaoId?: string) {
    const regiaoIdNumber = regiaoId ? +regiaoId : undefined;
    return this.setorService.findAll(regiaoIdNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setorService.findOne(+id);
  }
}
