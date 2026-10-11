import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service.js';

@Injectable()
export class SituacaoReligiosaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.situacaoReligiosa.findMany();
  }

  findOne(id: number) {
    return this.prisma.situacaoReligiosa.findFirstOrThrow({
      where: { id },
    });
  }
}
