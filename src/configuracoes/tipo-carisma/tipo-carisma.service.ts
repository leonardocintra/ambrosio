import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoCarismaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoCarisma.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarisma.findFirstOrThrow({
      where: { id },
    });
  }
}
