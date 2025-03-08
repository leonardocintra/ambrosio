import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { PrismaService } from 'src/prisma.service';
import { PaisService } from '../pais/pais.service';

@Injectable()
export class EstadoService {
  private readonly logger = new Logger(EstadoService.name);

  constructor(private prisma: PrismaService, private paisService: PaisService) { }

  async create(createEstadoDto: CreateEstadoDto) {
    const uf = await this.prisma.estado.findFirst({
      where: {
        sigla: createEstadoDto.sigla
      }
    });

    if (uf) {
      this.logger.warn("Estado com essa nome/sigla já existe.")
      throw new ConflictException('Estado com essa nome/sigla já existe.');
    }

    // TODO: criar validacao se o estado realmente pertence ao pais
    const pais = await this.paisService.findOne(createEstadoDto.pais.id);

    return await this.prisma.estado.create({
      data: {
        nome: createEstadoDto.nome,
        sigla: createEstadoDto.sigla,
        paisId: pais.id
      }
    })
  }

  findAll() {
    return `This action returns all estado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  findBySigla(sigla: string) {
    return this.prisma.estado.findFirstOrThrow({
      where: { sigla }
    })
  }
}
