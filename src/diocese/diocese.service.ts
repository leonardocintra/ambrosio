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
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { ENDERECO_INCLUDE } from 'src/commons/constants/constants';
import { Diocese } from 'neocatecumenal';
import { serializeEndereco } from 'src/commons/utils/serializers/serializerEndereco';
import { DIOCESE_SELECT } from 'src/prisma/selects/diocese.select';
import { SetorService } from 'src/mapa/setor/setor.service';
import { BaseService } from 'src/commons/base.service';

@Injectable()
export class DioceseService extends BaseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
    private readonly tipoDioceseService: TipoDioceseService,
    private readonly setorService: SetorService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createDioceseDto: CreateDioceseDto): Promise<Diocese> {
    this.validateCreateAbility('diocese');
    await this.tipoDioceseService.findOne(createDioceseDto.tipoDiocese.id);
    await this.setorService.findOne(createDioceseDto.setor.id);

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const endereco = await this.enderecoService.create(
          {
            ...createDioceseDto.endereco,
            observacao: `End. de ${createDioceseDto.tipoDiocese.descricao} ${createDioceseDto.descricao}. ${createDioceseDto.observacao || ''}`,
          },
          transaction,
        );

        return await transaction.diocese.create({
          data: {
            descricao: createDioceseDto.descricao,
            tipoDioceseId: createDioceseDto.tipoDiocese.id,
            enderecoId: endereco.id,
            setorId: createDioceseDto.setor.id,
          },
          select: DIOCESE_SELECT,
        });
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Ocorreu um erro ao cadastrar a diocese ${createDioceseDto.descricao}. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll(): Promise<Diocese[]> {
    const where = this.asPermissionsRead();
    const results = await this.prisma.diocese.findMany({
      where,
      select: DIOCESE_SELECT,
    });

    return results.map((result) => this.serializeResponse(result));
  }

  async findOne(id: number): Promise<Diocese> {
    const wherePermissions = this.asPermissionsRead();
    const diocese = await this.prisma.diocese.findFirstOrThrow({
      where: {
        AND: [{ id }, wherePermissions],
      },
      select: DIOCESE_SELECT,
    });

    return this.serializeResponse(diocese);
  }

  async update(
    id: number,
    updateDioceseDto: UpdateDioceseDto,
  ): Promise<Diocese> {
    this.validateUpdateAbility('diocese');

    const diocese = await this.findOne(id);

    let setorId = diocese.setor.id;
    let tipoDioceseId = diocese.tipoDiocese.id;

    if (updateDioceseDto.setor) {
      await this.setorService.findOne(updateDioceseDto.setor.id);
      setorId = updateDioceseDto.setor.id;
    }

    if (updateDioceseDto.tipoDiocese) {
      await this.tipoDioceseService.findOne(updateDioceseDto.tipoDiocese.id);
      tipoDioceseId = updateDioceseDto.tipoDiocese.id;
    }

    this.validarEnderecoPertenceDiocese(
      diocese.endereco.id,
      updateDioceseDto.endereco.id,
    );

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const endereco = await this.enderecoService.update(
          updateDioceseDto.endereco.id,
          updateDioceseDto.endereco,
          transaction,
        );

        return await transaction.diocese.update({
          data: {
            descricao: updateDioceseDto.descricao,
            tipoDioceseId,
            setorId,
            enderecoId: endereco.id,
          },
          include: {
            endereco: ENDERECO_INCLUDE,
            tipoDiocese: true,
            setor: {
              include: {
                macroRegiao: true,
              },
            },
          },
          where: {
            id,
          },
        });
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        `Ocorreu um erro ao editar a diocese ${updateDioceseDto.descricao}. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }

  private asPermissionsRead() {
    const { ability } = this.abilityService;
    if (!ability.can('read', 'diocese')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar dioceses',
      );
    }
    return accessibleBy(ability, 'read').diocese;
  }

  private serializeResponse(dio): Diocese {
    return {
      id: dio.id,
      descricao: dio.descricao,
      tipoDiocese: {
        id: dio.tipoDiocese.id,
        descricao: dio.tipoDiocese.descricao,
      },
      setor: {
        id: dio.setor.id,
        descricao: dio.setor.descricao,
        ativo: dio.setor.ativo,
        macroRegiao: {
          id: dio.setor.macroRegiao.id,
          descricao: dio.setor.macroRegiao.descricao,
          ativo: dio.setor.macroRegiao.ativo,
        },
      },
      endereco: serializeEndereco(dio.endereco),
    };
  }

  private validarEnderecoPertenceDiocese(
    enderecoDiocese: number,
    enderecoPayload: number,
  ) {
    if (enderecoDiocese !== enderecoPayload) {
      throw new NotFoundException(
        `Endereço id ${enderecoPayload} não encontrada para essa diocese`,
      );
    }
  }
}
