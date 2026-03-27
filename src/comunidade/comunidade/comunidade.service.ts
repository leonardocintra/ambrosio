import { Injectable } from '@nestjs/common';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { Comunidade } from 'neocatecumenal';
import { Prisma } from 'src/prisma/generated-client';
import { HistoricoService } from '../historico/historico.service';
import { ENDERECO_INCLUDE } from 'src/commons/prisma/includes';
import serializeComunidadeResponse from './comunidade.serialize';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';

@Injectable()
export class ComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly paroquiaService: ParoquiaService,
    private readonly historicoService: HistoricoService,
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
        numeroDaComunidade: createComunidadeDto.numeroDaComunidade,
        quantidadeMembros: createComunidadeDto.quantidadeMembros,
        paroquiaId: paroquia.id,
        observacao: createComunidadeDto.observacao,
      },
    });

    try {
      await this.historicoService.create({
        comunidadeId: comunidade.id,
        numeroComunidade: comunidade.numeroDaComunidade,
        descricao: `Comunidade ${comunidade.numeroDaComunidade} cadastrada no sistema.`,
      });
    } catch (error) {
      await this.remove(comunidade.id);
      this.logger.error(
        `Erro ao criar historico para comunidade ${comunidade.numeroDaComunidade} - (ID: ${comunidade.id}): ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return await this.findOne(comunidade.id);
  }

  async findAll(paroquiaId?: number, numeroDaComunidade?: number) {
    this.validateReadAbility('comunidade');
    const where: Prisma.comunidadeWhereInput = {
      ...(paroquiaId != null && { paroquiaId }),
      ...(numeroDaComunidade != null && { numeroDaComunidade }),
    };

    const comunidades = await this.prisma.comunidade.findMany({
      where,
      include: {
        paroquia: {
          include: {
            endereco: ENDERECO_INCLUDE,
            diocese: {
              include: {
                tipoDiocese: true,
                endereco: ENDERECO_INCLUDE,
              },
            },
          },
        },
        comunidadeEtapas: true,
      },
      orderBy: { numeroDaComunidade: 'asc' },
    });
    return comunidades.map(serializeComunidadeResponse);
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
    return serializeComunidadeResponse(comunidade);
  }

  async update(id: number, updateComunidadeDto: UpdateComunidadeDto) {
    this.validateUpdateAbility('comunidade');

    await this.historicoService.create({
      comunidadeId: id,
      numeroComunidade: updateComunidadeDto.numeroDaComunidade,
      descricao: `Comunidade com ${updateComunidadeDto.quantidadeMembros} membros.`,
    });

    return this.prisma.comunidade.update({
      where: { id },
      data: {
        numeroDaComunidade: updateComunidadeDto.numeroDaComunidade,
        quantidadeMembros: updateComunidadeDto.quantidadeMembros,
        observacao: updateComunidadeDto.observacao,
        etapaAtualId: updateComunidadeDto.etapaAtualId,
      },
    });
  }

  remove(id: number) {
    this.validateDeleteAbility('comunidade');
    this.logger.log(`Removendo comunidade de id ${id}`);
    return this.prisma.comunidade.delete({
      where: { id },
    });
  }
}
