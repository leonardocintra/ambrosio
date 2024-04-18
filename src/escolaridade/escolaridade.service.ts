import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EscolaridadeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.escolaridade.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} escolaridade`;
  }
}
