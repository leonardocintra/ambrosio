import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoCarismaVinculadoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoCarismaVinculado.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaVinculado.findUniqueOrThrow({
      where: { id },
    });
  }
}
