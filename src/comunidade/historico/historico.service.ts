import { Injectable } from '@nestjs/common';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

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
      # Catequistas: ${createHistoricoDto.catequistas}
      # Local Convivência: ${createHistoricoDto.localConvivencia}
      # Data Convivência: ${createHistoricoDto.dataConvivencia.toString() || 'Não informado'}
      # Responsável: ${createHistoricoDto.responsavel ?? 'Não informado'}
      # Co-Responsável: ${createHistoricoDto.coResponsavel ?? 'Não informado'}
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
