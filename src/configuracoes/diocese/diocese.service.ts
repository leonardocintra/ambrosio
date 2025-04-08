import { TipoDioceseService } from './../tipo-diocese/tipo-diocese.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { PrismaService } from 'src/prisma.service';
import { LocalidadeService } from 'src/localidade/localidade.service';
import { TipoLocalidadeService } from '../tipo-localidade/tipo-localidade.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class DioceseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(
    private prisma: PrismaService,
    private localidadeSerivce: LocalidadeService,
    private readonly tipoLocalidadeService: TipoLocalidadeService,
    private readonly tipoDiocese: TipoDioceseService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async create(createDioceseDto: CreateDioceseDto) {
    let dioceseId = 0;
    const tipoDiocese = await this.tipoDiocese.findOne(
      createDioceseDto.tipoDiocese.id,
    );
    const tipoLocalidade = await this.tipoLocalidadeService.findByName(
      tipoDiocese.descricao,
    );

    try {
      const diocese = await this.prisma.diocese.create({
        data: {
          descricao: createDioceseDto.descricao,
          tipoDioceseId: tipoDiocese.id,
        },
      });
      dioceseId = diocese.id;

      await this.localidadeSerivce.create({
        descricao: `${tipoLocalidade.descricao} - ${createDioceseDto.descricao}`,
        diocese,
        tipoLocalidade: {
          descricao: tipoLocalidade.descricao,
          id: tipoLocalidade.id,
        },
        observacao: createDioceseDto.observacao,
        endereco: {
          bairro: createDioceseDto.localidade[0].endereco.bairro,
          cep: createDioceseDto.localidade[0].endereco.cep,
          cidade: createDioceseDto.localidade[0].endereco.cidade,
          logradouro: createDioceseDto.localidade[0].endereco.logradouro,
          numero: createDioceseDto.localidade[0].endereco.numero,
          UF: createDioceseDto.localidade[0].endereco.UF,
          pais: createDioceseDto.localidade[0].endereco.pais,
        },
      });

      return diocese;
    } catch (error) {
      this.logger.error(error);
      if (dioceseId > 0) {
        this.prisma.diocese.delete({
          where: { id: dioceseId },
        });
        this.logger.warn(`Removido diocese ${dioceseId}`);
      }
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
        localidade: {
          include: {
            endereco: true,
          },
        },
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
        localidade: {
          include: {
            endereco: true,
          },
        },
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
    const ability = this.abilityService.ability;
    if (!ability.can('read', 'diocese')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar dioceses',
      );
    }
    return accessibleBy(ability, 'read').diocese;
  }
}
