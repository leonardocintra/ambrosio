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
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('equipe')
@ApiTags('Equipe')
@UseGuards(AuthGuard, RoleGuard)
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Equipe criada com sucesso.' })
  create(@Body() createEquipeDto: CreateEquipeDto) {
    return this.equipeService.create(createEquipeDto);
  }

  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipeDto: UpdateEquipeDto) {
    return this.equipeService.update(+id, updateEquipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.remove(+id);
  }
}
