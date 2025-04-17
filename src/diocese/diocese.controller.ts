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
import { DioceseService } from './diocese.service';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Diocese')
@Controller('diocese')
export class DioceseController {
  constructor(private readonly dioceseService: DioceseService) {}

  @Post()
  create(@Body() createDioceseDto: CreateDioceseDto) {
    return this.dioceseService.create(createDioceseDto);
  }

  @Get()
  findAll() {
    return this.dioceseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dioceseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDioceseDto: UpdateDioceseDto) {
    return this.dioceseService.update(+id, updateDioceseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dioceseService.remove(+id);
  }
}
