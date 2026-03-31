import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EtapasService {
  constructor(private prisma: PrismaService) {}

  // ATENCAO: Não confundir esse serviço com as o modulo etapa da comunidade: /src/comunidade/etapa/etapa.service.ts

  findAll() {
    return this.prisma.etapa.findMany();
  }

  findOne(id: number) {
    return this.prisma.etapa.findFirstOrThrow({
      where: { id: +id },
    });
  }
}
