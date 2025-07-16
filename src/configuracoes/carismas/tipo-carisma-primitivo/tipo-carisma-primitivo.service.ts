import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoCarismaPrimitivoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoCarismaPrimitivo.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaPrimitivo.findUniqueOrThrow({
      where: { id },
    });
  }
}
