import { HttpException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { TipoCarismaService } from 'src/configuracoes/tipo-carisma/tipo-carisma.service';
import { Sexo } from 'src/commons/enums/enums';
import { TipoPessoaService } from 'src/configuracoes/tipo-pessoa/tipo-pessoa.service';
import { CreateCasalDto } from './dto/create-casal.dto';

@Injectable()
export class PessoaService {
  constructor(
    private prisma: PrismaService,
    private estadoCivilService: EstadoCivilService,
    private escolaridadeService: EscolaridadeService,
    private tipoCarismaService: TipoCarismaService,
    private tipoPessoaService: TipoPessoaService,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const [estadoCivil, escolaridade, tipoCarisma, tipoPessoa] =
      await Promise.all([
        await this.estadoCivilService.findOne(createPessoaDto.estadoCivil.id),
        await this.escolaridadeService.findOne(createPessoaDto.escolaridade.id),
        await this.tipoCarismaService.findOne(createPessoaDto.tipoCarisma.id),
        await this.tipoPessoaService.findOne(createPessoaDto.tipoPessoa.id),
      ]);

    return this.prisma.pessoa.create({
      data: {
        nome: createPessoaDto.nome,
        nacionalidade: createPessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: createPessoaDto.foto,
        tipoCarismaId: tipoCarisma.id,
        escolaridadeId: escolaridade.id,
        tipoPessoaId: tipoPessoa.id,
        sexo:
          createPessoaDto.sexo === 'MASCULINO' ? Sexo.MASCULINO : Sexo.FEMININO,
      },
    });
  }

  findAll() {
    return this.prisma.pessoa.findMany({
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoCarisma: true,
        tipoPessoa: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
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

    if (pessoa.sexo === Sexo.MASCULINO) {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: pessoa.id,
          pessoaMulherId: conjugue.id,
        },
      });
    } else {
      return await this.prisma.pessoaCasal.create({
        data: {
          pessoaMaridoId: conjugue.id,
          pessoaMulherId: pessoa.id,
        },
      });
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
    const pessoa = await this.prisma.pessoa.findUniqueOrThrow({
      where: { id },
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoCarisma: true,
        tipoPessoa: true,
        enderecos: {
          include: {
            endereco: true,
          },
        },
      },
    });

    const response = this.handleResponsePessoa(pessoa);
    return response;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const [estadoCivil, escolaridade, tipoCarisma, tipoPessoa] =
      await Promise.all([
        this.estadoCivilService.findOne(updatePessoaDto.estadoCivil.id),
        this.escolaridadeService.findOne(updatePessoaDto.escolaridade.id),
        this.tipoCarismaService.findOne(updatePessoaDto.tipoCarisma.id),
        this.tipoPessoaService.findOne(updatePessoaDto.tipoPessoa.id),
      ]);

    return await this.prisma.pessoa.update({
      where: { id },
      data: {
        nome: updatePessoaDto.nome,
        nacionalidade: updatePessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: updatePessoaDto.foto,
        tipoCarismaId: tipoCarisma.id,
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

  private handleResponsePessoa(pessoa: any) {
    const response = {
      id: pessoa.id,
      nome: pessoa.nome,
      sexo: pessoa.sexo,
      nacionalidade: pessoa.nacionalidade,
      estadoCivil: pessoa.estadoCivil,
      foto: pessoa.foto,
      ativo: pessoa.ativo,
      escolaridade: pessoa.escolaridade,
      tipoCarisma: pessoa.tipoCarisma,
      tipoPessoa: pessoa.tipoPessoa,
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
}
