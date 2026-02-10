import { Injectable } from '@nestjs/common';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { SEM_INFORMACAO } from 'src/commons/constants/constants';

@Injectable()
export class HistoricoService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  create(createHistoricoDto: CreateHistoricoDto) {
    const descricao = `Comunidade: ${createHistoricoDto.numeroComunidade}
      # Catequistas: ${createHistoricoDto.catequistas ?? SEM_INFORMACAO}
      # Local Convivência: ${createHistoricoDto.localConvivencia ?? SEM_INFORMACAO}
      # Data Convivência: ${createHistoricoDto.dataConvivencia?.toString() ?? SEM_INFORMACAO}
      # Responsável: ${createHistoricoDto.responsavel ?? SEM_INFORMACAO}
      # Co-Responsável: ${createHistoricoDto.coResponsavel ?? SEM_INFORMACAO}
      # Observação: ${createHistoricoDto.descricao}`;

    return this.prisma.comunidadeHistorico.create({
      data: {
        comunidadeId: createHistoricoDto.comunidadeId,
        descricao,
      },
    });
  }

  findAll() {
    return this.prisma.comunidadeHistorico.findMany();
  }

  findOne(id: number) {
    return this.prisma.comunidadeHistorico.findUnique({ where: { id } });
  }
}
