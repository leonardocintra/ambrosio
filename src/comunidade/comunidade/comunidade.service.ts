import { Injectable } from '@nestjs/common';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { Comunidade, EtapaEnum } from 'neocatecumenal';
import { ENDERECO_INCLUDE } from 'src/commons/constants/constants';
import { EtapaService } from '../etapa/etapa.service';

@Injectable()
export class ComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly paroquiaService: ParoquiaService,
    private readonly etapaService: EtapaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createComunidadeDto: CreateComunidadeDto) {
    this.validateCreateAbility('comunidade');

    const paroquia = await this.paroquiaService.findOne(
      createComunidadeDto.paroquiaId,
    );

    const comunidade = await this.prisma.comunidade.create({
      data: {
        descricao: createComunidadeDto.descricao,
        numeroDaComunidade: createComunidadeDto.numeroDaComunidade,
        quantidadeMembros: createComunidadeDto.quantidadeMembros,
        paroquiaId: paroquia.id,
        observacao: createComunidadeDto.observacao,
      },
    });
    try {
      await this.etapaService.create({
        comunidadeId: comunidade.id,
        observacao: createComunidadeDto.observacao,
        dataInicio: createComunidadeDto.dataInicio,
        localConvivencia: createComunidadeDto.local,
      });
    } catch (error) {
      await this.remove(comunidade.id);
      this.logger.error(
        `Erro ao criar etapa inicial para comunidade ${comunidade.numeroDaComunidade} - (ID: ${comunidade.id}): ${error.message}`,
      );
    }
    return await this.findOne(comunidade.id);
  }

  findAll(paroquiaId?: number) {
    this.validateReadAbility('comunidade');
    return this.prisma.comunidade.findMany({
      where: paroquiaId ? { paroquiaId } : undefined,
      include: {
        paroquia: true,
      },
      orderBy: { numeroDaComunidade: 'asc' },
    });
  }

  async findOne(id: number): Promise<Comunidade> {
    this.validateReadAbility('comunidade');
    const comunidade = await this.prisma.comunidade.findFirstOrThrow({
      where: { id },
      include: {
        comunidadeEtapas: {
          include: {
            equipe: true,
          },
        },
        paroquia: {
          include: {
            diocese: {
              include: {
                tipoDiocese: true,
                endereco: ENDERECO_INCLUDE,
              },
            },
          },
        },
      },
    });

    const result: Comunidade = {
      id: comunidade.id,
      descricao: comunidade.descricao,
      numeroDaComunidade: comunidade.numeroDaComunidade,
      quantidadeMembros: comunidade.quantidadeMembros,
      observacao: comunidade.observacao,
      comunidadeEtapas: comunidade.comunidadeEtapas.map((etapa) => ({
        id: etapa.id,
        etapaId: etapa.etapaId,
        etapa: Object.values(EtapaEnum)[etapa.etapaId - 1],
        comunidadeId: etapa.comunidadeId,
        dataInicio: etapa.dataInicio,
        dataFim: etapa.dataFim,
        equipe: etapa.equipe
          ? {
              id: etapa.equipe.id,
              descricao: etapa.equipe.descricao,
              tipoEquipeId: etapa.equipe.tipoEquipeId,
              observacao: etapa.equipe.observacao,
              createdAt: etapa.equipe.createdAt,
              updatedAt: etapa.equipe.updatedAt,
              tipoEquipe: null,
              pessoas: [],
            }
          : null,
        observacao: etapa.observacao,
      })),
      paroquia: {
        id: comunidade.paroquia.id,
        descricao: comunidade.paroquia.descricao,
        endereco: null,
        setor: null,
        diocese: {
          id: comunidade.paroquia.diocese.id,
          descricao: comunidade.paroquia.diocese.descricao,
          tipoDiocese: {
            id: comunidade.paroquia.diocese.tipoDiocese.id,
            descricao: comunidade.paroquia.diocese.tipoDiocese.descricao,
          },
          endereco: comunidade.paroquia.diocese.endereco,
        },
      },
    };
    return result;
  }

  update(id: number, updateComunidadeDto: UpdateComunidadeDto) {
    this.validateUpdateAbility('comunidade');
    return (
      `This action updates a #${id} comunidade` + updateComunidadeDto.toString()
    );
  }

  remove(id: number) {
    this.validateDeleteAbility('comunidade');
    this.logger.log(`Removendo comunidade de id ${id}`);
    return this.prisma.comunidade.delete({
      where: { id },
    });
  }
}
