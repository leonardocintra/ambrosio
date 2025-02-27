import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoDioceseService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.tipoDiocese.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoDiocese.findUniqueOrThrow({
      where: { id },
    })
  }
}
