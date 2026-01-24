import { Injectable } from '@nestjs/common';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { Comunidade } from 'neocatecumenal';
import { ENDERECO_INCLUDE } from 'src/commons/constants/constants';
import { EtapaService } from '../etapa/etapa.service';
import serializeComunidadeResponse from './comunidade.serialize';
import { HistoricoService } from '../historico/historico.service';

@Injectable()
export class ComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly paroquiaService: ParoquiaService,
    private readonly etapaService: EtapaService,
    private readonly historicoService: HistoricoService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createComunidadeDto: CreateComunidadeDto) {
    // TODO: refatorar essa funcao para modo de transacao
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
      this.logger.log(
        `Criando etapa inicial para comunidade ${comunidade.numeroDaComunidade} - (ID: ${comunidade.id})`,
      );
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

    try {
      await this.historicoService.create({
        comunidadeId: comunidade.id,
        descricao: `Comunidade ${comunidade.numeroDaComunidade} criada.`,
        catequistas: `Não informado`,
        numeroComunidade: comunidade.numeroDaComunidade,
        localConvivencia: createComunidadeDto.local,
        dataConvivencia: createComunidadeDto.dataInicio ?? new Date(),
      });
    } catch (error) {
      await this.remove(comunidade.id);
      this.logger.error(
        `Erro ao criar historico para comunidade ${comunidade.numeroDaComunidade} - (ID: ${comunidade.id}): ${error.message}`,
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
    return serializeComunidadeResponse(comunidade);
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
