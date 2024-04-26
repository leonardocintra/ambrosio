import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoDioceseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoDiocese.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDiocese`;
  }
}
