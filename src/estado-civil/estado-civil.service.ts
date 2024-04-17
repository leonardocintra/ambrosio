import { Injectable } from '@nestjs/common';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EstadoCivilService {
  constructor(private prisma: PrismaService) {}

  create(createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.prisma.estadoCivil.create({
      data: {
        descricao: createEstadoCivilDto.descricao,
      },
    });
  }

  findAll() {
    return this.prisma.estadoCivil.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCivil`;
  }

  update(id: number, updateEstadoCivilDto: UpdateEstadoCivilDto) {
    return `This action updates a #${id} estadoCivil`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoCivil`;
  }
}
