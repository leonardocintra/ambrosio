import { Controller, Get, Param } from '@nestjs/common';
import { TipoDioceseService } from './tipo-diocese.service';

@Controller('tipo-diocese')
export class TipoDioceseController {
  constructor(private readonly tipoDioceseService: TipoDioceseService) {}

  @Get()
  findAll() {
    return this.tipoDioceseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDioceseService.findOne(+id);
  }
}
