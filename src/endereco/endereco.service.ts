import { Injectable, Logger } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';

@Injectable()
export class EnderecoService {
  private readonly logger = new Logger(EnderecoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cidadeService: CidadeService,
    private readonly estadoService: EstadoService,
    private readonly paisService: PaisService,
  ) {}

  async createByPessoaId(
    createEnderecoDto: CreateEnderecoDto,
    pessoaId: number,
  ) {
    const pessoa = await this.prisma.pessoa.findFirstOrThrow({
      where: { id: pessoaId },
    });

    createEnderecoDto.observacao = `End. pessoa id: ${pessoa.id} (${pessoa.nome}). ${createEnderecoDto.observacao ?? ''}`;

    const endereco = await this.create(createEnderecoDto);
    await this.prisma.pessoaEndereco.create({
      data: {
        pessoaId: pessoa.id,
        enderecoId: endereco.id,
      },
    });

    this.logger.log(`Criado endereco ${endereco.id} para pessoa ${pessoaId}`);
    return endereco;
  }

  async create(
    createEnderecoDto: CreateEnderecoDto,
    transaction?: Prisma.TransactionClient,
  ) {
    const prismaClient = transaction || this.prisma;

    const pais = await this.paisService.createOrSelect({
      nome: createEnderecoDto.pais || 'Brasil',
    });

    const estado = await this.estadoService.createOrSelect({
      nome: createEnderecoDto.UF,
      sigla: createEnderecoDto.UF,
      pais: { id: pais.id, nome: pais.nome },
    });

    const cidade = await this.cidadeService.createOrSelect({
      nome: createEnderecoDto.cidade,
      estado: { sigla: estado.sigla },
    });

    this.logger.log(
      `Cadastrando endereco: ${createEnderecoDto.logradouro}, CEP: ${createEnderecoDto.cep}, cidade: ${cidade.nome} - ${estado.sigla}`,
    );
    return await prismaClient.endereco.create({
      data: {
        cep: createEnderecoDto.cep,
        logradouro: createEnderecoDto.logradouro,
        numero: createEnderecoDto.numero,
        bairro: createEnderecoDto.bairro,
        observacao: createEnderecoDto.observacao,
        cidadeId: cidade.id,
      },
    });
  }

  async findAllByPessoaId(pessoaId: number) {
    // TODO: colocar tudo num request so. Em vez de dois
    const pessoaEndereco = await this.prisma.pessoaEndereco.findMany({
      where: { pessoaId },
    });

    const enderecos = await this.prisma.endereco.findMany({
      where: {
        id: {
          in: pessoaEndereco.map((item) => item.enderecoId),
        },
      },
    });

    return enderecos;
  }

  findOne(id: number) {
    return this.prisma.endereco.findFirstOrThrow({
      where: { id },
    });
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
    transaction?: Prisma.TransactionClient,
  ) {
    const prismaClient = transaction || this.prisma;

    const pais = await this.paisService.createOrSelect({
      nome: updateEnderecoDto.pais || 'Brasil',
    });

    const estado = await this.estadoService.createOrSelect({
      nome: updateEnderecoDto.UF,
      sigla: updateEnderecoDto.UF,
      pais: { id: pais.id, nome: pais.nome },
    });

    const cidade = await this.cidadeService.createOrSelect({
      nome: updateEnderecoDto.cidade,
      estado: { sigla: estado.sigla },
    });

    return await prismaClient.endereco.update({
      data: {
        cep: updateEnderecoDto.cep,
        logradouro: updateEnderecoDto.logradouro,
        numero: updateEnderecoDto.numero,
        bairro: updateEnderecoDto.bairro,
        observacao: updateEnderecoDto.observacao,
        cidadeId: cidade.id,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.endereco.delete({
      where: {
        id,
      },
    });
  }
}
