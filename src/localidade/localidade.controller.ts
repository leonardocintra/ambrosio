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
import { LocalidadeService } from './localidade.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBIT_PATTERN_LOCALIDADE_CREATED } from 'src/commons/constants/constants';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Localidades do caminho')
@UseGuards(AuthGuard, RoleGuard)
@Controller('localidade')
export class LocalidadeController {
  constructor(private readonly localidadeService: LocalidadeService) {}

  @Post()
  create(@Body() createLocalidadeDto: CreateLocalidadeDto) {
    return this.localidadeService.create(createLocalidadeDto);
  }

  @Get()
  findAll() {
    return this.localidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalidadeDto: UpdateLocalidadeDto,
  ) {
    return this.localidadeService.update(+id, updateLocalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localidadeService.remove(+id);
  }

  @EventPattern(RABBIT_PATTERN_LOCALIDADE_CREATED)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.localidadeService.testeRabitao(data, context);
  }
}
