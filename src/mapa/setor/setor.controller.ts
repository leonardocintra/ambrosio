import { Controller, Get, Param } from '@nestjs/common';
import { SetorService } from './setor.service';

@Controller('setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  findAll() {
    return this.setorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setorService.findOne(+id);
  }
}
