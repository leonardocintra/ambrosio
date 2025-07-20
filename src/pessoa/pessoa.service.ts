import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { SEXO_ENUM } from 'src/commons/enums/enums';
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
import { serializeEndereco } from 'src/commons/utils/serializers/serializerEndereco';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { CreatePessoaCarismasDto } from './dto/create-pessoa-carisma.dto';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';

@Injectable()
export class PessoaService {
  private readonly logger = new Logger(PessoaService.name);

  constructor(
    private prisma: PrismaService,
    private estadoCivilService: EstadoCivilService,
    private escolaridadeService: EscolaridadeService,
    private situacaoReligiosaService: SituacaoReligiosaService,
    private carismaVinculadoService: TipoCarismaVinculadoService,
    private carismaPrimitivoService: TipoCarismaPrimitivoService,
    private carismaServicoService: TipoCarismaServicoService,
    private abilityService: CaslAbilityService,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const { ability } = this.abilityService;
    if (!ability.can('create', 'pessoa')) {
      throw new ForbiddenException(
        'Você não tem permissão para criar uma pessoa',
      );
    }

    await this.analisarCPF(createPessoaDto.cpf);

    const [estadoCivil, escolaridade, situacaoReligiosa] = await Promise.all([
      await this.estadoCivilService.findOne(createPessoaDto.estadoCivil.id),
      await this.escolaridadeService.findOne(createPessoaDto.escolaridade.id),
      await this.situacaoReligiosaService.findOne(
        createPessoaDto.situacaoReligiosa.id,
      ),
    ]);

    return this.prisma.pessoa.create({
      data: {
        nome: createPessoaDto.nome,
        conhecidoPor: createPessoaDto.conhecidoPor,
        cpf: createPessoaDto.cpf,
        nacionalidade: createPessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: createPessoaDto.foto,
        escolaridadeId: escolaridade.id,
        situacaoReligiosaId: situacaoReligiosa.id,
        dataNascimento: createPessoaDto.dataNascimento
          ? new Date(createPessoaDto.dataNascimento)
          : null,
        sexo:
          createPessoaDto.sexo === 'MASCULINO'
            ? SEXO_ENUM.MASCULINO
            : SEXO_ENUM.FEMININO,
      },
    });
  }

  async findAll(page: number, limit: number) {
    const { ability } = this.abilityService;
    if (!ability.can('read', 'pessoa')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar pessoas',
      );
    }
    const where = accessibleBy(ability, 'read').pessoa;

    if (!page) page = PAGE_DEFAULT;
    if (!limit) limit = LIMIT_DEFAULT;

    const skip = (page - 1) * limit;

    const results = await this.prisma.pessoa.findMany({
      skip,
      take: limit,
      where,
      include: {
        estadoCivil: true,
        escolaridade: true,
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

    return results.map((result) => this.serializeResponse(result));
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

    if (pessoa.estadoCivilId !== Number(process.env.ESTADO_CIVIL_CASADO_ID)) {
      throw new HttpException(
        'Apenas pessoas com estado civil casado podem se casar',
        400,
      );
    }

    if (conjugue.estadoCivilId !== Number(process.env.ESTADO_CIVIL_CASADO_ID)) {
      throw new HttpException(
        'Apenas pessoas com estado civil casado podem se casar',
        400,
      );
    }

    if (pessoa.sexo === conjugue.sexo) {
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

    if (pessoa.sexo === SEXO_ENUM.MASCULINO) {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: pessoa.id,
          pessoaMulherId: conjugue.id,
        },
      });
    } else if (pessoa.sexo === SEXO_ENUM.FEMININO) {
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
    await this.findOne(pessoaId);

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

  async findOne(id: number) {
    const result: pessoa = await this.prisma.pessoa.findUniqueOrThrow({
      where: { id },
      include: {
        estadoCivil: true,
        escolaridade: true,
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

    const conjugue = await this.getConjugue(result);
    return this.serializeResponse(result, conjugue);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const [estadoCivil, escolaridade, situacaoReligiosa] = await Promise.all([
      this.estadoCivilService.findOne(updatePessoaDto.estadoCivil.id),
      this.escolaridadeService.findOne(updatePessoaDto.escolaridade.id),
      this.situacaoReligiosaService.findOne(
        updatePessoaDto.situacaoReligiosa.id,
      ),
    ]);

    const pessoa = await this.prisma.pessoa.update({
      where: { id },
      data: {
        nome: updatePessoaDto.nome,
        conhecidoPor: updatePessoaDto.conhecidoPor,
        cpf: updatePessoaDto.cpf,
        nacionalidade: updatePessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: updatePessoaDto.foto,
        escolaridadeId: escolaridade.id,
        situacaoReligiosaId: situacaoReligiosa.id,
        sexo:
          updatePessoaDto.sexo === 'MASCULINO'
            ? SEXO_ENUM.MASCULINO
            : SEXO_ENUM.FEMININO,
      },
    });

    const conjugue = await this.getConjugue(pessoa);
    return this.serializeResponse(pessoa, conjugue);
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serializeResponse(pessoa: any, conjugue?: any): Pessoa {
    return {
      id: pessoa.id,
      nome: pessoa.nome,
      conhecidoPor: pessoa.conhecidoPor,
      cpf: pessoa.cpf,
      sexo: pessoa.sexo,
      nacionalidade: pessoa.nacionalidade,
      estadoCivil: pessoa.estadoCivil,
      dataNascimento: pessoa.dataNascimento,
      conjugue,
      foto: pessoa.foto,
      ativo: pessoa.ativo,
      escolaridade: pessoa.escolaridade,
      situacaoReligiosa: pessoa.situacaoReligiosa,
      carismas: {
        primitivos: pessoa.carismasPrimitivo?.map((carisma) => ({
          id: carisma.tipoCarismaPrimitivo.id,
          descricao: carisma.tipoCarismaPrimitivo.descricao,
        })),
        servicos: pessoa.carismasServico?.map((carisma) => ({
          id: carisma.tipoCarismaServico.id,
          descricao: carisma.tipoCarismaServico.descricao,
        })),
        vinculados: pessoa.carismasVinculado?.map((carisma) => ({
          id: carisma.tipoCarismaVinculado.id,
          descricao: carisma.tipoCarismaVinculado.descricao,
        })),
      },
      enderecos: pessoa.enderecos?.map(serializeEndereco),
    };
  }

  private async getConjugue(pessoa) {
    if (pessoa.estadoCivilId !== Number(process.env.ESTADO_CIVIL_CASADO_ID)) {
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
          nome: true,
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

  private async analisarCPF(cpf: string) {
    // TODO: colocar validacao de CPF aqui

    if (cpf === undefined || cpf === '') {
      return;
    }

    const pessoa = await this.prisma.pessoa.findFirst({
      where: { cpf },
    });
    if (pessoa) {
      throw new ConflictException(
        `O CPF ja registrado para ${pessoa.nome} de id: ${pessoa.id}`,
      );
    }
  }
}
