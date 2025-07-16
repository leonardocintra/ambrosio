import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoCarismaServicoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoCarismaServico.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaServico.findUniqueOrThrow({
      where: { id },
    });
  }
}
