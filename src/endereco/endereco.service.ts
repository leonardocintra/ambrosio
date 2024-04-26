import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnderecoService {
  constructor(private prisma: PrismaService) {}

  async create(createEnderecoDto: CreateEnderecoDto) {
    // TODO: validar se precisa fazer request se pessoaId existe

    const endereco = await this.prisma.endereco.create({
      data: {
        cep: createEnderecoDto.cep,
        logradouro: createEnderecoDto.logradouro,
        numero: createEnderecoDto.numero,
        cidade: createEnderecoDto.cidade,
        bairro: createEnderecoDto.bairro,
        pais: createEnderecoDto.pais,
        UF: createEnderecoDto.UF,
      },
    });

    await this.prisma.pessoaEndereco.create({
      data: {
        pessoaId: createEnderecoDto.pessoaId,
        enderecoId: endereco.id,
      },
    });

    return endereco;
  }

  async findAll(id: number) {
    const pessoaEndereco = await this.prisma.pessoaEndereco.findMany({
      where: {
        pessoaId: id,
      },
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
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
