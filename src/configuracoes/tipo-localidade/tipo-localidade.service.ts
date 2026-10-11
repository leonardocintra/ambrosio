import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service.js';

@Injectable()
export class TipoLocalidadeService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.tipoLocalidade.findMany();
  }

  findByName(name: string) {
    return this.prisma.tipoLocalidade.findFirstOrThrow({
      where: { descricao: name },
    });
  }

  findOne(id: number) {
    return this.prisma.tipoLocalidade.findFirstOrThrow({
      where: { id },
    });
  }
}
