import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RegiaoService } from './regiao.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Regiões')
@Controller('regiao')
@UseGuards(AuthGuard, RoleGuard)
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
    return this.regiaoService.findOne(+id);
  }
}
