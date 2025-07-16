import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ApiTags } from '@nestjs/swagger';
import { SexoQueryParamDto } from './dto/sexo.dto';
import { CreateCasalDto } from './dto/create-casal.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { CreateCarismasDto } from './dto/create-carisma.dto';

@ApiTags('Pessoas')
@UseGuards(AuthGuard, RoleGuard)
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Post('/casal')
  createCasal(@Body() createCasalDto: CreateCasalDto) {
    return this.pessoaService.createCasal(createCasalDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.pessoaService.findAll(Number(page), Number(limit));
  }

  @Get('/conjugue')
  findAllConjugue(@Query() query: SexoQueryParamDto) {
    return this.pessoaService.findAllBySexoEstadoCivilCasado(
      query.sexo.toUpperCase(),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }

  @Post(':id/carisma')
  createCarisma(@Param('id') id: string, @Body() dto: CreateCarismasDto) {
    return this.pessoaService.createCarismas(+id, dto);
  }
}
