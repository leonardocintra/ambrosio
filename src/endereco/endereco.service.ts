import { Injectable, Logger } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnderecoService {
  private readonly logger = new Logger(EnderecoService.name);

  constructor(private prisma: PrismaService) {}

  async createByPessoaId(
    createEnderecoDto: CreateEnderecoDto,
    pessoaId: number,
  ) {
    
    // TODO: validar se precisa fazer request se pessoaId existe
    const endereco = await this.prisma.endereco.create({
      data: {
        cep: createEnderecoDto.cep,
        logradouro: createEnderecoDto.logradouro,
        numero: createEnderecoDto.numero,
        cidade: createEnderecoDto.cidade,
        bairro: createEnderecoDto.bairro,
        pais: createEnderecoDto.pais,
        UF: createEnderecoDto.UF.toUpperCase(),
      },
    });

    await this.prisma.pessoaEndereco.create({
      data: {
        pessoaId: pessoaId,
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

    return await prismaClient.endereco.create({
      data: {
        cep: createEnderecoDto.cep,
        logradouro: createEnderecoDto.logradouro,
        numero: createEnderecoDto.numero,
        cidade: createEnderecoDto.cidade,
        bairro: createEnderecoDto.bairro,
        pais: createEnderecoDto.pais,
        UF: createEnderecoDto.UF.toUpperCase(),
        observacao: createEnderecoDto.observacao,
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

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco ${updateEnderecoDto.cep}`;
  }

  async remove(id: number) {
    return await this.prisma.endereco.delete({
      where: {
        id,
      },
    });
  }
}
