import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EstadoCivilService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.estadoCivil.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoCivil`;
  }
}
