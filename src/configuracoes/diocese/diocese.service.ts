import { TipoDioceseService } from './../tipo-diocese/tipo-diocese.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';
import { EnderecoService } from 'src/endereco/endereco.service';

@Injectable()
export class DioceseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
    private readonly tipoDioceseService: TipoDioceseService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async create(createDioceseDto: CreateDioceseDto) {
    const tipoDiocese = await this.tipoDioceseService.findOne(
      createDioceseDto.tipoDiocese.id,
    );

    if (!tipoDiocese) {
      throw new NotFoundException('Tipo de diocese não encontrada');
    }

    const endereco = await this.enderecoService.create({
      ...createDioceseDto.endereco,
      observacao: `Endereço de ${tipoDiocese.descricao} ${createDioceseDto.descricao}. ${createDioceseDto.observacao ? createDioceseDto.observacao : ''}`,
    });

    try {
      return await this.prisma.diocese.create({
        data: {
          descricao: createDioceseDto.descricao,
          tipoDioceseId: tipoDiocese.id,
          enderecoId: endereco.id,
        },
        include: {
          endereco: true,
          tipoDiocese: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      this.enderecoService.remove(endereco.id);
      this.logger.warn(`Removido diocese ${endereco.id}`);

      throw new HttpException(
        `Ocorreu um erro ao cadastrar a diocese ${createDioceseDto.descricao}. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  findAll() {
    const where = this.asPermissions();
    return this.prisma.diocese.findMany({
      where,
      include: {
        tipoDiocese: true,
        endereco: true,
      },
    });
  }

  findOne(id: number) {
    const wherePermissions = this.asPermissions();
    return this.prisma.diocese.findFirstOrThrow({
      where: {
        AND: [{ id }, wherePermissions],
      },
      include: {
        tipoDiocese: true,
        endereco: true,
      },
    });
  }

  async update(id: number, updateDioceseDto: UpdateDioceseDto) {
    return await this.prisma.diocese.update({
      where: { id },
      data: {
        descricao: updateDioceseDto.descricao,
        tipoDioceseId: updateDioceseDto.tipoDiocese.id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }

  private asPermissions() {
    const { ability } = this.abilityService;
    if (!ability.can('read', 'diocese')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar dioceses',
      );
    }
    return accessibleBy(ability, 'read').diocese;
  }
}
