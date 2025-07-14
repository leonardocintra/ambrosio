import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SetorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.setor.findMany();
  }

  findOne(id: number) {
    return this.prisma.setor.findUnique({
      where: { id },
    });
  }
}
