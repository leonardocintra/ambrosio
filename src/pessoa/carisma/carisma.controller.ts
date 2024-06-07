import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarismaService } from './carisma.service';
import { CreateCarismaDto } from './dto/create-carisma.dto';
import { UpdateCarismaDto } from './dto/update-carisma.dto';

@Controller('pessoa/carisma')
export class CarismaController {
  constructor(private readonly carismaService: CarismaService) {}

  @Post()
  create(@Body() createCarismaDto: CreateCarismaDto) {
    return this.carismaService.create(createCarismaDto);
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
