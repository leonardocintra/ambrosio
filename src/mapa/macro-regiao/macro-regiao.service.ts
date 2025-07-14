import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MacroRegiaoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.macroRegiao.findMany();
  }

  findOne(id: number) {
    return this.prisma.macroRegiao.findUnique({
      where: { id },
    });
  }
}
