import { Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { EtapaEnum } from 'neocatecumenal';

@Injectable()
export class EtapaService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createEtapaDto: CreateEtapaDto) {
    this.validateCreateAbility('etapa');
    this.logger.log(
      `Creating etapa for comunidade ${createEtapaDto.comunidadeId}`,
    );

    const etapaId = this.getEtapaIndex(createEtapaDto.etapa);

    return this.prisma.comunidadeEtapa.create({
      data: {
        etapaId,
        comunidadeId: createEtapaDto.comunidadeId,
        dataInicio: createEtapaDto.dataInicio,
        observacao: createEtapaDto.observacao,
        localConvivencia: createEtapaDto.localConvivencia,
      },
    });
  }

  findAll(comunidadeId: number) {
    this.validateReadAbility('etapa');
    return this.findAllByComunidade(comunidadeId);
  }

  findOne(id: number) {
    this.validateReadAbility('etapa');
    return this.prisma.comunidadeEtapa.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateEtapaDto) {
    return this.prisma.comunidadeEtapa.update({
      where: { id },
      data: {
        equipeId: dto.equipeId,
        localConvivencia: dto.localConvivencia,
        dataInicio: dto.dataInicio,
        observacao: dto.observacao,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} etapa`;
  }

  private findAllByComunidade(comunidadeId: number) {
    return this.prisma.comunidadeEtapa.findMany({
      where: { comunidadeId },
      orderBy: { etapaId: 'asc' },
    });
  }

  private getEtapaIndex(etapa: EtapaEnum): number {
    const etapas = Object.values(EtapaEnum);
    const index = etapas.indexOf(etapa);

    if (index === -1) {
      throw new Error(`Etapa inválida: ${etapa}`);
    }

    return index + 1;
  }
}
