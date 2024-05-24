import { Inject, Injectable } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { ClientProxy } from '@nestjs/microservices';
import { RABBIT_PATTERN_LOCALIDADE_CREATED } from 'src/commons/constants/constants';

@Injectable()
export class LocalidadeService {
  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
    @Inject('LOCALIDADES_SERVICE') private clientRabbit: ClientProxy,
  ) {}

  async create(createLocalidadeDto: CreateLocalidadeDto) {
    const endereco = await this.enderecoService.create(
      createLocalidadeDto.endereco,
    );

    try {
      const localidade = await this.prisma.localidade.create({
        data: {
          descricao: createLocalidadeDto.descricao,
          diocese: {
            connect: {
              id: createLocalidadeDto.diocese.id,
            },
          },
          tipoLocalidade: {
            connect: {
              id: createLocalidadeDto.tipoLocalidade.id,
            },
          },
          observacao: createLocalidadeDto.observacao,
          endereco: {
            connect: {
              id: endereco.id,
            },
          },
        },
      });

      this.clientRabbit.emit('localidade_created', localidade.id);

      return localidade;
    } catch (err) {
      await this.enderecoService.remove(endereco.id);
    }
  }

  findAll() {
    return this.prisma.localidade.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} localidade`;
  }

  update(id: number, updateLocalidadeDto: UpdateLocalidadeDto) {
    return `This action updates a #${id} localidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} localidade`;
  }

  testeRabbitao() {
    return `Entrei no bagulho aqui manooo`;
  }
}
