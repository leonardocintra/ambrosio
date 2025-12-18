import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarismaService } from './carisma.service';
import { CreateCarismaDto } from './dto/create-carisma.dto';
import { UpdateCarismaDto } from './dto/update-carisma.dto';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCarismaDaPessoaDto } from './dto/create-carisma-da-pessoa.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Carisma')
@UseGuards(AuthGuard, RoleGuard)
@Controller('carismas')
export class CarismaController {
  constructor(private readonly carismaService: CarismaService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Carisma criado com sucesso.' })
  create(@Body() createCarismaDto: CreateCarismaDto) {
    return this.carismaService.create(createCarismaDto);
  }

  @Post('pessoa/:pessoaId')
  @ApiCreatedResponse({
    description: 'Carismas adicionados à pessoa com sucesso.',
  })
  addCarismaToPessoa(
    @Param('pessoaId') pessoaId: string,
    @Body() createCarismaDto: CreateCarismaDaPessoaDto,
  ) {
    return this.carismaService.addCarismaToPessoa(+pessoaId, createCarismaDto);
  }

  @Delete('pessoa/:pessoaId/carisma/:carismaId')
  removeCarismaFromPessoa() {
    return 'Implementação futura';
  }

  @Get()
  findAll() {
    return this.carismaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carismaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarismaDto: UpdateCarismaDto) {
    return this.carismaService.update(+id, updateCarismaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carismaService.remove(+id);
  }
}
