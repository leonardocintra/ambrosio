import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { EtapaService } from './etapa.service';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comunidade Etapa')
@UseGuards(AuthGuard, RoleGuard)
@Controller('etapa')
export class EtapaController {
  constructor(private readonly etapaService: EtapaService) {}

  @Post()
  create(@Body() createEtapaDto: CreateEtapaDto) {
    return this.etapaService.create(createEtapaDto);
  }

  @Get()
  findAll(
    @Query(
      'comunidadeId',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    comunidadeId: number,
  ) {
    return this.etapaService.findAll(comunidadeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etapaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtapaDto: UpdateEtapaDto) {
    return this.etapaService.update(+id, updateEtapaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etapaService.remove(+id);
  }
}
