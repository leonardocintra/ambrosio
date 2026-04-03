import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ComunidadeService } from '../comunidade.service';
import { ComunidadeEtapa } from 'neocatecumenal';

@Injectable()
export class EtapaComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly comunidadeService: ComunidadeService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(comunidadeId: number, createEtapaDto: CreateEtapaDto) {
    this.validateCreateAbility('etapa');
    this.logger.log(`Creating etapa for comunidade ${comunidadeId}`);

    this.validateDateRange(createEtapaDto.dataInicio, createEtapaDto.dataFim);

    const etapa = await this.prisma.comunidadeEtapa.create({
      data: {
        comunidadeId,
        etapaId: createEtapaDto.etapaId,
        equipeId: createEtapaDto.equipeId,
        dataInicio: createEtapaDto.dataInicio,
        dataFim: createEtapaDto.dataFim,
        observacao: createEtapaDto.observacao,
        localConvivencia: createEtapaDto.localConvivencia,
      },
    });

    // Atualiza a etapaAtualId da comunidade para a etapa recém-criada
    await this.comunidadeService.update(etapa.comunidadeId, {
      etapaAtualId: etapa.etapaId,
    });

    return etapa;
  }

  findAll(comunidadeId: number): Promise<ComunidadeEtapa[]> {
    this.validateReadAbility('etapa');
    // TODO: futuramente vai precisar de listar a equipe. Nesse caso precisa criar um arquivo serializador
    return this.prisma.comunidadeEtapa.findMany({
      where: { comunidadeId },
      include: {
        etapa: true,
      },
      orderBy: { etapaId: 'asc' },
    });
  }

  findOne(comunidadeId: number, id: number): Promise<ComunidadeEtapa> {
    this.validateReadAbility('etapa');
    return this.prisma.comunidadeEtapa.findFirstOrThrow({
      where: { id, comunidadeId },
      include: {
        etapa: true,
      },
    });
  }

  async update(comunidadeId: number, id: number, dto: UpdateEtapaDto) {
    this.validateUpdateAbility('etapa');

    const etapaAtual = await this.prisma.comunidadeEtapa.findFirstOrThrow({
      where: { id, comunidadeId },
      select: {
        dataInicio: true,
        dataFim: true,
      },
    });

    this.validateDateRange(
      dto.dataInicio === undefined ? etapaAtual?.dataInicio : dto.dataInicio,
      dto.dataFim === undefined ? etapaAtual?.dataFim : dto.dataFim,
    );

    return this.prisma.comunidadeEtapa.update({
      where: { id },
      data: {
        etapaId: dto.etapaId,
        equipeId: dto.equipeId,
        localConvivencia: dto.localConvivencia,
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        observacao: dto.observacao,
      },
    });
  }

  async remove(comunidadeId: number, id: number) {
    this.validateDeleteAbility('etapa');

    await this.prisma.comunidadeEtapa.findFirstOrThrow({
      where: { id, comunidadeId },
      select: { id: true },
    });

    this.logger.log(`Removendo etapa ${id} da comunidade ${comunidadeId}`);

    return this.prisma.comunidadeEtapa.delete({
      where: { id },
    });
  }

  private validateDateRange(
    dataInicio?: Date | null,
    dataFim?: Date | null,
  ): void {
    if (!dataInicio || !dataFim) {
      return;
    }

    if (dataInicio >= dataFim) {
      throw new BadRequestException('dataInicio deve ser menor que dataFim');
    }
  }
}
