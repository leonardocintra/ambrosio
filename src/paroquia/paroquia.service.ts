import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
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
import { Prisma } from '@prisma/client';
import { SetorService } from 'src/mapa/setor/setor.service';

@Injectable()
export class ParoquiaService {
  private readonly logger = new Logger(ParoquiaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly dioceseService: DioceseService,
    private readonly enderecoService: EnderecoService,
    private readonly setorService: SetorService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async create(createParoquiaDto: CreateParoquiaDto) {
    const { ability } = this.abilityService;
    if (!ability.can('create', 'paroquia')) {
      throw new ForbiddenException(
        'Você não tem permissão para criar paróquias',
      );
    }
    await this.dioceseService.findOne(createParoquiaDto.diocese.id);
    await this.setorService.findOne(createParoquiaDto.setor.id);

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        return this.createParoquiaTransaction(createParoquiaDto, transaction);
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Ocorreu um erro ao cadastrar a paroquia. Por favor tente novamente mais tarde. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll(dioceseId?: number) {
    const permissionWhere = this.asPermissions();
    const where = {
      ...permissionWhere,
    };

    if (dioceseId) {
      where.dioceseId = dioceseId;
    }

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

  async update(
    id: number,
    updateParoquiaDto: UpdateParoquiaDto,
  ): Promise<Paroquia> {
    const paroquia = await this.findOne(id);
    if (!paroquia) {
      throw new NotFoundException('Paroquia não encontrada');
    }

    const diocese = await this.dioceseService.findOne(
      updateParoquiaDto.diocese.id,
    );
    if (!diocese) {
      throw new NotFoundException('Diocese não encontrada');
    }

    this.validarEnderecoPertenceParoquia(
      paroquia.endereco.id,
      updateParoquiaDto.endereco.id,
    );

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const endereco = await this.enderecoService.update(
          updateParoquiaDto.endereco.id,
          updateParoquiaDto.endereco,
          transaction,
        );

        return await transaction.paroquia.update({
          data: {
            descricao: updateParoquiaDto.descricao,
            enderecoId: endereco.id,
            dioceseId: updateParoquiaDto.diocese.id,
          },
          select: PAROQUIA_SELECT,
          where: {
            id,
          },
        });
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} paroquia`;
  }

  private validarEnderecoPertenceParoquia(
    enderecoParoquia: number,
    enderecoPayload: number,
  ) {
    if (enderecoParoquia !== enderecoPayload) {
      throw new NotFoundException(
        `Endereço id ${enderecoPayload} não encontrada para essa paroquia.`,
      );
    }
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

  private async createParoquiaTransaction(
    createParoquiaDto: CreateParoquiaDto,
    transaction: Prisma.TransactionClient,
  ): Promise<Paroquia> {
    const endereco = await this.enderecoService.create(
      {
        ...createParoquiaDto.endereco,
        observacao: `End. da paróquia ${createParoquiaDto.descricao}.`,
      },
      transaction,
    );

    const paroquia = await transaction.paroquia.create({
      data: {
        descricao: createParoquiaDto.descricao,
        enderecoId: endereco.id,
        dioceseId: createParoquiaDto.diocese.id,
        setorId: createParoquiaDto.setor.id,
      },
      select: PAROQUIA_SELECT,
    });
    return this.serializeResponse(paroquia);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serializeResponse(paroquia: any): Paroquia {
    return {
      id: paroquia.id,
      descricao: paroquia.descricao,
      endereco: serializeEndereco(paroquia.endereco),
      setor: {
        id: paroquia.setor.id,
        descricao: paroquia.setor.descricao,
        ativo: paroquia.setor.ativo,
        regiao: null,
      },
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
