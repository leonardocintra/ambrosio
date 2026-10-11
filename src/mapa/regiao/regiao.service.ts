import { Injectable } from '@nestjs/common';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { BaseService } from 'src/commons/base.service.js';
import { PrismaService } from 'src/prisma.service.js';

@Injectable()
export class RegiaoService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  findAll() {
    return this.prisma.regiao.findMany({
      include: {
        macroRegiao: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.regiao.findUniqueOrThrow({
      where: { id },
      include: { macroRegiao: true },
    });
  }
}
