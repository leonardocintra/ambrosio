import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SetorService {
  constructor(private prisma: PrismaService) {}

  findAll(regiaoId?: number) {
    return this.prisma.setor.findMany({
      where: regiaoId ? { regiaoId } : undefined,
      include: {
        regiao: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.setor.findUniqueOrThrow({
      where: { id },
      include: {
        regiao: true,
      },
    });
  }
}
