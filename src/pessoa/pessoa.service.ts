import { HttpException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { Sexo } from 'src/commons/enums/enums';
import { TipoPessoaService } from 'src/configuracoes/tipo-pessoa/tipo-pessoa.service';
import { CreateCasalDto } from './dto/create-casal.dto';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from 'src/commons/constants/constants';

@Injectable()
export class PessoaService {
  constructor(
    private prisma: PrismaService,
    private estadoCivilService: EstadoCivilService,
    private escolaridadeService: EscolaridadeService,
    private tipoPessoaService: TipoPessoaService,
  ) { }

  async create(createPessoaDto: CreatePessoaDto) {

    await this.analisarCPF(createPessoaDto.cpf);

    const [estadoCivil, escolaridade, tipoPessoa] = await Promise.all([
      await this.estadoCivilService.findOne(createPessoaDto.estadoCivil.id),
      await this.escolaridadeService.findOne(createPessoaDto.escolaridade.id),
      await this.tipoPessoaService.findOne(createPessoaDto.tipoPessoa.id),
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
        tipoPessoaId: tipoPessoa.id,
        dataNascimento: createPessoaDto.dataNascimento ? new Date(createPessoaDto.dataNascimento) : null,
        sexo:
          createPessoaDto.sexo === 'MASCULINO' ? Sexo.MASCULINO : Sexo.FEMININO,
      },
    });
  }

  async findAll(page: number, limit: number) {
    if (!page) page = PAGE_DEFAULT;
    if (!limit) limit = LIMIT_DEFAULT;

    const skip = (page - 1) * limit;

    const results = await this.prisma.pessoa.findMany({
      skip,
      take: limit,
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoPessoa: true,
        pessoaCarisma: {
          include: {
            tipoCarisma: true,
          },
        },
        enderecos: {
          include: {
            endereco: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return results.map((result) => this.handleResponsePessoa(result));
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

    if (pessoa.sexo === Sexo.MASCULINO) {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: pessoa.id,
          pessoaMulherId: conjugue.id,
        },
      });
    } else if (pessoa.sexo === Sexo.FEMININO) {
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

  async findAllBySexoEstadoCivilCasado(sexo: string) {
    // Funcao para buscar todas as pessoas com estado civil casado que não estao vinculados marido e mulher
    const param = sexo === 'M' ? Sexo.MASCULINO : Sexo.FEMININO;
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
    const result = await this.prisma.pessoa.findUniqueOrThrow({
      where: { id },
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoPessoa: true,
        pessoaCarisma: {
          include: {
            tipoCarisma: true,
          },
        },
        enderecos: {
          include: {
            endereco: true,
          },
        },
      },
    });

    const conjugue = await this.getConjugue(result);

    const pessoa = this.handleResponsePessoa(result, conjugue);
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const [estadoCivil, escolaridade, tipoPessoa] = await Promise.all([
      this.estadoCivilService.findOne(updatePessoaDto.estadoCivil.id),
      this.escolaridadeService.findOne(updatePessoaDto.escolaridade.id),
      this.tipoPessoaService.findOne(updatePessoaDto.tipoPessoa.id),
    ]);

    return await this.prisma.pessoa.update({
      where: { id },
      data: {
        nome: updatePessoaDto.nome,
        conhecidoPor: updatePessoaDto.conhecidoPor,
        cpf: updatePessoaDto.cpf,
        nacionalidade: updatePessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: updatePessoaDto.foto,
        escolaridadeId: escolaridade.id,
        tipoPessoaId: tipoPessoa.id,
        sexo:
          updatePessoaDto.sexo === 'MASCULINO' ? Sexo.MASCULINO : Sexo.FEMININO,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }

  private handleResponsePessoa(pessoa: any, conjugue?: any) {
    const response = {
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
      tipoPessoa: pessoa.tipoPessoa,
      carismas: pessoa.pessoaCarisma.map((carisma) => {
        return {
          id: carisma.tipoCarisma.id,
          descricao: carisma.tipoCarisma.descricao,
        };
      }),
      enderecos: pessoa.enderecos.map((end) => {
        return {
          id: end.endereco.id,
          cep: end.endereco.cep,
          logradouro: end.endereco.logradouro,
          cidade: end.endereco.cidade,
          UF: end.endereco.UF,
          numero: end.endereco.numero,
          bairro: end.endereco.bairro,
        };
      }),
    };

    return response;
  }

  private async getConjugue(pessoa) {
    if (pessoa.estadoCivilId !== Number(process.env.ESTADO_CIVIL_CASADO_ID)) {
      return;
    }

    let where = {};

    if (pessoa.sexo === Sexo.MASCULINO) {
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
            pessoa.sexo === Sexo.MASCULINO
              ? casal.pessoaMulherId
              : casal.pessoaMaridoId,
        },
      });
    }
  }

  private async analisarCPF(cpf: string) {
    // TODO: colocar validacao de CPF aqui

    if (cpf === undefined || cpf === "") return;

    const pessoa = await this.prisma.pessoa.findFirst({
      where: { cpf },
    });
    if (pessoa) {
      throw new HttpException(`O CPF ja registrado para ${pessoa.nome}`, 409);
    }
  }
}
