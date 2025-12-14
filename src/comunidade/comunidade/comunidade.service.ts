import { Injectable } from '@nestjs/common';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';

@Injectable()
export class ComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly paroquiaService: ParoquiaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createComunidadeDto: CreateComunidadeDto) {
    this.validateCreateAbility('comunidade');

    const paroquia = await this.paroquiaService.findOne(
      createComunidadeDto.paroquiaId,
    );

    return this.prisma.comunidade.create({
      data: {
        descricao: createComunidadeDto.descricao,
        numeroDaComunidade: createComunidadeDto.numeroDaComunidade,
        quantidadeMembros: createComunidadeDto.quantidadeMembros,
        paroquiaId: paroquia.id,
        observacao: createComunidadeDto.observacao,
      },
      select: {
        id: true,
        descricao: true,
        numeroDaComunidade: true,
        quantidadeMembros: true,
        observacao: true,
        paroquia: true,
      },
    });
  }

  findAll() {
    return this.prisma.comunidade.findMany();
  }

  findOne(id: number) {
    return this.prisma.comunidade.findUnique({
      where: { id },
    });
  }

  update(id: number, updateComunidadeDto: UpdateComunidadeDto) {
    return (
      `This action updates a #${id} comunidade` + updateComunidadeDto.toString()
    );
  }

  remove(id: number) {
    this.logger.log(`Removendo comunidade de id ${id}`);
    return this.prisma.comunidade.delete({
      where: { id },
    });
  }
}
