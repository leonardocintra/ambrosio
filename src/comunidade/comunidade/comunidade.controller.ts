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
import { ComunidadeService } from './comunidade.service';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'paroquiaId',
    required: false,
    description: 'ID da paróquia para filtrar as comunidades',
    type: Number,
  })
  @ApiQuery({
    name: 'numeroDaComunidade',
    required: false,
    description: 'Número da comunidade para filtrar as comunidades',
    type: Number,
  })
  findAll(
    @Query(
      'paroquiaId',
      new ParseIntPipe({
        optional: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    paroquiaId?: number,
    @Query(
      'numeroDaComunidade',
      new ParseIntPipe({
        optional: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    numeroDaComunidade?: number,
  ) {
    return this.comunidadeService.findAll(
      paroquiaId ? paroquiaId : undefined,
      numeroDaComunidade ? numeroDaComunidade : undefined,
    );
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
