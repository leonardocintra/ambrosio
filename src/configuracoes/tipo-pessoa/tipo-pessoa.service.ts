import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoPessoaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tipoPessoa.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoPessoa.findFirstOrThrow({
      where: { id },
    });
  }
}
