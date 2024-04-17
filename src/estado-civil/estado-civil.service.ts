import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EstadoCivilService {
  constructor(private prisma: PrismaService) {}

  async create(createEstadoCivilDto: CreateEstadoCivilDto) {
    return await this.prisma.estadoCivil.create({
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
    return this.prisma.estadoCivil.delete({
      where: { id },
    });
  }
}
