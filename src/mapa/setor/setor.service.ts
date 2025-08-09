import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SetorService {
  constructor(private prisma: PrismaService) {}

  findAll(macroRegiaoId?: number) {
    return this.prisma.setor.findMany({
      where: macroRegiaoId ? { macroRegiaoId } : undefined,
      include: {
        macroRegiao: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.setor.findUniqueOrThrow({
      where: { id },
      include: {
        macroRegiao: true,
      },
    });
  }
}
