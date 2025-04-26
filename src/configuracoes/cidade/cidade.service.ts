import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoService } from '../estado/estado.service';

@Injectable()
export class CidadeService {
  private readonly logger = new Logger(CidadeService.name);

  constructor(
    private prisma: PrismaService,
    private estadoService: EstadoService,
  ) {}

  async createOrSelect(createCidadeDto: CreateCidadeDto) {
    const cidade = await this.findByName(createCidadeDto.nome);

    if (cidade) {
      this.logger.warn(
        `Cidade ${createCidadeDto.nome} - ${createCidadeDto.estado.sigla} ja existe cadastrado.`,
      );
      return cidade;
    }

    const uf = await this.estadoService.findBySigla(
      createCidadeDto.estado.sigla,
    );

    if (!uf) {
      throw new NotFoundException('Estado não encontrado');
    }

    return this.prisma.cidade.create({
      data: {
        nome: createCidadeDto.nome,
        estadoId: uf.id,
      },
    });
  }

  findAll() {
    return `This action returns all cidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cidade`;
  }

  private async findByName(nome: string) {
    return await this.prisma.cidade.findFirst({
      where: { nome },
    });
  }
}
