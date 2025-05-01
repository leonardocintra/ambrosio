import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateParoquiaDto } from './dto/create-paroquia.dto';
import { UpdateParoquiaDto } from './dto/update-paroquia.dto';
import { PrismaService } from 'src/prisma.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';
import { Paroquia } from 'neocatecumenal';
import { serializeEndereco } from 'src/commons/utils/serializers/serializerEndereco';
import { PAROQUIA_SELECT } from 'src/prisma/selects/paroquia.select';

@Injectable()
export class ParoquiaService {
  private readonly logger = new Logger(ParoquiaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly dioceseService: DioceseService,
    private readonly enderecoService: EnderecoService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async create(createParoquiaDto: CreateParoquiaDto) {
    await this.dioceseService.findOne(createParoquiaDto.diocese.id);

    const enderecoComObservacao = {
      ...createParoquiaDto.endereco,
      observacao: `End. da paróquia ${createParoquiaDto.descricao}.`,
    };

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const endereco = await this.enderecoService.create(
          enderecoComObservacao,
          transaction,
        );
        return await transaction.paroquia.create({
          data: {
            descricao: createParoquiaDto.descricao,
            dioceseId: createParoquiaDto.diocese.id,
            enderecoId: endereco.id,
          },
          select: PAROQUIA_SELECT,
        });
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Ocorreu um erro ao cadastrar a paroquia ${createParoquiaDto.descricao}. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    const where = this.asPermissions();
    const results = await this.prisma.paroquia.findMany({
      where,
      select: PAROQUIA_SELECT,
    });

    return results.map((result) => this.serializeResponse(result));
  }

  findOne(id: number) {
    const wherePermissions = this.asPermissions();
    return this.prisma.paroquia.findFirstOrThrow({
      where: {
        AND: [{ id }, wherePermissions],
      },
      select: PAROQUIA_SELECT,
    });
  }

  update(id: number, updateParoquiaDto: UpdateParoquiaDto) {
    return `This action updates a #${id} paroquia ${updateParoquiaDto.descricao}`;
  }

  remove(id: number) {
    return `This action removes a #${id} paroquia`;
  }

  private asPermissions() {
    const { ability } = this.abilityService;
    if (!ability.can('read', 'paroquia')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar paroquias',
      );
    }
    return accessibleBy(ability, 'read').paroquia;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serializeResponse(paroquia: any): Paroquia {
    return {
      id: paroquia.id,
      descricao: paroquia.descricao,
      endereco: serializeEndereco(paroquia.endereco),
      diocese: {
        id: paroquia.diocese.id,
        descricao: paroquia.diocese.descricao,
        endereco: serializeEndereco(paroquia.diocese.endereco),
        tipoDiocese: {
          id: paroquia.diocese.tipoDiocese.id,
          descricao: paroquia.diocese.tipoDiocese.descricao,
        },
      },
    };
  }
}
