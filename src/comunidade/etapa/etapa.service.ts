import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

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

    await this.ensureCorrectEtapaSequence(
      createEtapaDto.comunidadeId,
      createEtapaDto.etapaId,
    );

    return this.prisma.comunidadeEtapa.create({ data: createEtapaDto });
  }

  findAll(comunidadeId: number) {
    this.validateReadAbility('etapa');
    return this.findAllByComunidade(comunidadeId);
  }

  findOne(id: number) {
    return `This action returns a #${id} etapa`;
  }

  update(id: number, dto: UpdateEtapaDto) {
    return this.prisma.comunidadeEtapa.update({
      where: { id },
      data: {
        equipeId: dto.equipeId,
        localConvivencia: dto.localConvivencia,
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
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

  private async ensureCorrectEtapaSequence(
    comunidadeId: number,
    etapaId: number,
  ) {
    const etapasExistentes = await this.findAllByComunidade(comunidadeId);

    const proximaEtapaEsperada =
      etapasExistentes.length > 0
        ? etapasExistentes[etapasExistentes.length - 1].etapaId + 1
        : 1;

    if (etapaId !== proximaEtapaEsperada) {
      throw new BadRequestException(
        `Não é permitido pular etapas. A próxima etapa esperada é ${proximaEtapaEsperada}`,
      );
    }
  }
}
