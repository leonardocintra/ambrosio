import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EscolaridadeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.escolaridade.findMany();
  }

  findOne(id: number) {
    return this.prisma.escolaridade.findFirstOrThrow({
      where: { id },
    });
  }
}
