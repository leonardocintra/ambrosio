import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service.js';

@Injectable()
export class TipoDioceseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoDiocese.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoDiocese.findFirstOrThrow({
      where: { id },
    });
  }
}
