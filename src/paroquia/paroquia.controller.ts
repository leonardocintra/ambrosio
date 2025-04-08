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
import { ParoquiaService } from './paroquia.service';
import { CreateParoquiaDto } from './dto/create-paroquia.dto';
import { UpdateParoquiaDto } from './dto/update-paroquia.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Paróquias')
@UseGuards(AuthGuard, RoleGuard)
@Controller('paroquia')
export class ParoquiaController {
  constructor(private readonly paroquiaService: ParoquiaService) {}

  @Post()
  create(@Body() createParoquiaDto: CreateParoquiaDto) {
    return this.paroquiaService.create(createParoquiaDto);
  }

  @Get()
  findAll() {
    return this.paroquiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paroquiaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParoquiaDto: UpdateParoquiaDto,
  ) {
    return this.paroquiaService.update(+id, updateParoquiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paroquiaService.remove(+id);
  }
}
