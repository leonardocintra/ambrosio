import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { ESTADO_CIVIL_ENUM, SEXO_ENUM } from 'src/commons/enums/enums';
import { CreateCasalDto } from './dto/create-casal.dto';
import {
  ENDERECO_INCLUDE,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from 'src/commons/constants/constants';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';
import { Pessoa } from 'neocatecumenal';
import { pessoa } from '@prisma/client';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { CreatePessoaCarismasDto } from './dto/create-pessoa-carisma.dto';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { BaseService } from 'src/commons/base.service';
import { serializePessoaResponse } from './pessoa.serializer';

@Injectable()
export class PessoaService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private situacaoReligiosaService: SituacaoReligiosaService,
    private carismaVinculadoService: TipoCarismaVinculadoService,
    private carismaPrimitivoService: TipoCarismaPrimitivoService,
    private carismaServicoService: TipoCarismaServicoService,
    private readonly saoPedroPessoaService: SaoPedroPessoaService,
    abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createPessoaDto: CreatePessoaDto) {
    this.validateCreateAbility('pessoa');

    const situacaoReligiosa = await this.situacaoReligiosaService.findOne(
      createPessoaDto.situacaoReligiosa.id,
    );
    await this.analisarCPF(createPessoaDto.cpf);

    try {
      const external =
        await this.saoPedroPessoaService.createExternalPessoa(createPessoaDto);

      const pessoa = await this.prisma.pessoa.create({
        data: {
          externalId: external.externalId,
          situacaoReligiosaId: situacaoReligiosa.id,
        },
      });
      this.logger.log(
        `Pessoa ${external.nome} UUID: ${external.externalId} criada com ID ${pessoa.id}`,
      );
      return serializePessoaResponse(pessoa, external);
    } catch (error) {
      this.logger.error('Error posting external pessoa', error);
    }
  }

  async findAll(page: number, limit: number) {
    this.validateReadAbility('pessoa');
    const { ability } = this.abilityService;
    const where = accessibleBy(ability, 'read').pessoa;

    if (!page) page = PAGE_DEFAULT;
    if (!limit) limit = LIMIT_DEFAULT;

    const skip = (page - 1) * limit;

    const externalPessoas = await this.saoPedroPessoaService.findAllPessoas();
    this.logger.log(
      `Total de pessoas externas encontradas: ${externalPessoas.length}`,
    );

    const results = await this.prisma.pessoa.findMany({
      skip,
      take: limit,
      where,
      include: {
        situacaoReligiosa: true,
        carismasServico: {
          include: {
            tipoCarismaServico: true,
          },
        },
        carismasPrimitivo: {
          include: {
            tipoCarismaPrimitivo: true,
          },
        },
        carismasVinculado: {
          include: {
            tipoCarismaVinculado: true,
          },
        },
        enderecos: {
          include: {
            endereco: ENDERECO_INCLUDE,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Monta um dicionário com externalId como chave
    const externalMap = new Map(
      externalPessoas.map((ep) => [ep.externalId, ep]),
    );

    return results
      .map((pessoa) => {
        const externalPessoa = externalMap.get(pessoa.externalId);

        if (externalPessoa) {
          return serializePessoaResponse(pessoa, externalPessoa, undefined);
        } else {
          this.logger.warn(
            `Pessoa com ID ${pessoa.id} não encontrada na API externa (externalId: ${pessoa.externalId})`,
          );
          return null;
        }
      })
      .filter(Boolean); // Remove os nulls do array
  }

  async createCasal(createCasalDto: CreateCasalDto) {
    const pessoaId = createCasalDto.pessoaId;
    const conjugueId = createCasalDto.conjugueId;

    const [pessoa, conjugue] = await Promise.all([
      this.prisma.pessoa.findUniqueOrThrow({
        where: { id: pessoaId },
      }),
      this.prisma.pessoa.findUniqueOrThrow({
        where: { id: conjugueId },
      }),
    ]);

    const [pessoaExternal, conjugueExternal] = await Promise.all([
      this.saoPedroPessoaService.findExternalPessoaByUuid(pessoa.externalId),
      this.saoPedroPessoaService.findExternalPessoaByUuid(conjugue.externalId),
    ]);

    if (
      pessoaExternal.estadoCivil !== ESTADO_CIVIL_ENUM.CASADO.substring(0, 1) ||
      conjugueExternal.estadoCivil !== ESTADO_CIVIL_ENUM.CASADO.substring(0, 1)
    ) {
      throw new HttpException(
        'Apenas pessoas com estado civil casado podem se casar',
        400,
      );
    }

    if (pessoaExternal.sexo === conjugueExternal.sexo) {
      throw new HttpException(
        'Casal do mesmo sexo! Não existe casal do mesmo sexo. Verificar.',
        400,
      );
    }

    const existingConjugue = await this.prisma.pessoaCasal.findFirst({
      where: {
        OR: [
          {
            pessoaMaridoId: pessoa.id,
          },
          {
            pessoaMaridoId: conjugue.id,
          },
          {
            pessoaMulherId: pessoa.id,
          },
          {
            pessoaMulherId: conjugue.id,
          },
        ],
      },
    });

    if (existingConjugue) {
      throw new HttpException(
        'Marido ou mulher já está em outro relacionamento.',
        400,
      );
    }

    if (pessoaExternal.sexo === SEXO_ENUM.MASCULINO.substring(0, 1)) {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: pessoa.id,
          pessoaMulherId: conjugue.id,
        },
      });
    } else if (pessoaExternal.sexo === SEXO_ENUM.FEMININO.substring(0, 1)) {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: conjugue.id,
          pessoaMulherId: pessoa.id,
        },
      });
    } else {
      throw new HttpException(
        'Marido ou esposa esta com os sexo (F ou M) cadastrado de forma errada. Verificar.',
        400,
      );
    }
  }

  async createCarismas(pessoaId: number, dto: CreatePessoaCarismasDto) {
    const pessoa = await this.findOne(pessoaId);
    this.logger.log(
      `Registrando carismas para a pessoa: ${pessoa.id} - ${pessoa.nome}`,
    );

    const primitivos =
      await this.carismaPrimitivoService.registerCarismaPrimitivoPessoa({
        pessoaId,
        carismas: dto.carismas.primitivos || [],
      });
    this.logger.log(
      `Carismas primitivos registrados para a pessoa com ID ${pessoaId}`,
    );

    const servicos =
      await this.carismaServicoService.registerCarismaServicoPessoa({
        pessoaId,
        carismas: dto.carismas.servicos || [],
      });
    this.logger.log(
      `Carismas serviços registrados para a pessoa com ID ${pessoaId}`,
    );

    const vinculados =
      await this.carismaVinculadoService.registerCarismaVinculadoPessoa({
        pessoaId,
        carismas: dto.carismas.vinculados || [],
      });
    this.logger.log(
      `Carismas vinculados registrados para a pessoa com ID ${pessoaId}`,
    );

    return {
      carismas: {
        primitivos,
        servicos,
        vinculados,
      },
    };
  }

  async findAllBySexoEstadoCivilCasado(sexo: string) {
    // Funcao para buscar todas as pessoas com estado civil casado que não estao vinculados marido e mulher
    const param = sexo === 'M' ? SEXO_ENUM.MASCULINO : SEXO_ENUM.FEMININO;
    const estadoCivilId = Number(process.env.ESTADO_CIVIL_CASADO_ID);

    // TODO: pensar uma alternativa para essa query, pois queryRamUnsafe é perigoso. Nesse caso se nao tiver alteração na query esta tudo bem.
    return await this.prisma.$queryRawUnsafe(
      `SELECT p.id, p.nome
          FROM pessoa p 
          LEFT JOIN "pessoaCasal" marido 
            ON marido."pessoaMaridoId" = p.id 
          LEFT JOIN "pessoaCasal" mulher 
            ON mulher."pessoaMulherId" = p.id 
          WHERE 
            p."estadoCivilId" = ${estadoCivilId}
            AND mulher.id IS NULL 
            AND marido.id IS NULL
            AND p.sexo = '${param}'`,
    );
  }

  async findOneByCpf(cpf: string): Promise<Pessoa> {
    const externalPessoa =
      await this.saoPedroPessoaService.getExternalPessoaByCpf(cpf);

    if (!externalPessoa) {
      return null;
    }

    const pessoa = await this.prisma.pessoa.findUnique({
      where: { externalId: externalPessoa.externalId },
    });
    return pessoa ? serializePessoaResponse(pessoa, externalPessoa) : null;
  }

  async findOne(id: number): Promise<Pessoa> {
    return this.findBy({ id });
  }

  async findByExternalId(externalId: string): Promise<Pessoa> {
    return this.findBy({ externalId });
  }

  private async remove(id: number) {
    return this.prisma.pessoa.delete({
      where: { id },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async findBy(where: any): Promise<Pessoa> {
    const result: pessoa = await this.prisma.pessoa.findUniqueOrThrow({
      where,
      include: {
        situacaoReligiosa: true,
        carismasPrimitivo: {
          include: {
            tipoCarismaPrimitivo: true,
          },
        },
        carismasServico: {
          include: {
            tipoCarismaServico: true,
          },
        },
        carismasVinculado: {
          include: {
            tipoCarismaVinculado: true,
          },
        },
        enderecos: {
          include: {
            endereco: ENDERECO_INCLUDE,
          },
        },
      },
    });

    const externalPessoa =
      await this.saoPedroPessoaService.findExternalPessoaByUuid(
        result.externalId,
      );
    const conjugue = await this.getConjugue(externalPessoa);
    return serializePessoaResponse(result, externalPessoa, conjugue);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.findOne(id);

    if (updatePessoaDto.situacaoReligiosa) {
      const situacaoReligiosa = await this.situacaoReligiosaService.findOne(
        updatePessoaDto.situacaoReligiosa.id,
      );
      await this.prisma.pessoa.update({
        where: { id },
        data: {
          situacaoReligiosaId: situacaoReligiosa.id,
        },
      });
    }

    const externalPessoa =
      await this.saoPedroPessoaService.updateExternalPessoa(
        pessoa.externalId,
        updatePessoaDto,
      );

    const conjugue = await this.getConjugue(externalPessoa);
    return serializePessoaResponse(pessoa, externalPessoa, conjugue);
  }

  private async getConjugue(pessoa: Pessoa) {
    if (pessoa.estadoCivil !== ESTADO_CIVIL_ENUM.CASADO.substring(0, 1)) {
      return;
    }

    let where = {};

    if (pessoa.sexo === SEXO_ENUM.MASCULINO) {
      where = {
        pessoaMaridoId: pessoa.id,
      };
    } else {
      where = {
        pessoaMulherId: pessoa.id,
      };
    }
    const casal = await this.prisma.pessoaCasal.findFirst({ where });

    if (casal) {
      return await this.prisma.pessoa.findUniqueOrThrow({
        select: {
          id: true,
        },
        where: {
          id:
            pessoa.sexo === SEXO_ENUM.MASCULINO
              ? casal.pessoaMulherId
              : casal.pessoaMaridoId,
        },
      });
    }
  }

  async analisarCPF(cpf: string) {
    // TODO: colocar validacao de CPF aqui
    if (cpf === undefined || cpf === '') {
      this.logger.log('CPF não informado');
      return;
    }

    const pessoa = await this.findOneByCpf(cpf);
    this.logger.log(`External pessoa fetched: ${JSON.stringify(pessoa)}`);

    if (pessoa) {
      this.logger.warn(`CPF ${cpf} já está cadastrado`);
      throw new ConflictException(
        `O CPF ja registrado para ${pessoa.nome} de id: ${pessoa.id}`,
      );
    }
  }
}
