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
import { ComunidadeService } from './comunidade.service';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comunidade')
@UseGuards(AuthGuard, RoleGuard)
@Controller('comunidade')
export class ComunidadeController {
  constructor(private readonly comunidadeService: ComunidadeService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Comunidade criada com sucesso.' })
  create(@Body() createComunidadeDto: CreateComunidadeDto) {
    return this.comunidadeService.create(createComunidadeDto);
  }

  @Get()
  findAll() {
    return this.comunidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComunidadeDto: UpdateComunidadeDto,
  ) {
    return this.comunidadeService.update(+id, updateComunidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadeService.remove(+id);
  }
}
