import { Injectable } from '@nestjs/common';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { BaseService } from 'src/commons/base.service.js';
import { PrismaService } from 'src/prisma.service.js';

@Injectable()
export class TipoEquipeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  findAll() {
    return this.prisma.tipoEquipe.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoEquipe.findUnique({
      where: { id },
    });
  }
}
