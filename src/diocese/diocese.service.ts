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

@Injectable()
export class DioceseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
    private readonly tipoDioceseService: TipoDioceseService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async create(createDioceseDto: CreateDioceseDto): Promise<Diocese> {
    await this.tipoDioceseService.findOne(createDioceseDto.tipoDiocese.id);

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
    const where = this.asPermissions();
    const results = await this.prisma.diocese.findMany({
      where,
      select: DIOCESE_SELECT,
    });

    return results.map((result) => this.serializeResponse(result));
  }

  async findOne(id: number): Promise<Diocese> {
    const wherePermissions = this.asPermissions();
    const diocese = await this.prisma.diocese.findFirstOrThrow({
      where: {
        AND: [{ id }, wherePermissions],
      },
      include: {
        tipoDiocese: true,
        endereco: ENDERECO_INCLUDE,
      },
    });

    return this.serializeResponse(diocese);
  }

  async update(
    id: number,
    updateDioceseDto: UpdateDioceseDto,
  ): Promise<Diocese> {
    const tipoDiocese = await this.tipoDioceseService.findOne(
      updateDioceseDto.tipoDiocese.id,
    );

    const diocese = await this.findOne(id);
    if (!diocese) {
      throw new NotFoundException('Diocese não encontrada');
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
            tipoDioceseId: tipoDiocese.id,
            enderecoId: endereco.id,
          },
          include: {
            endereco: ENDERECO_INCLUDE,
            tipoDiocese: true,
          },
          where: {
            id,
          },
        });
      });

      return this.serializeResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Ocorreu um erro ao editar a diocese ${updateDioceseDto.descricao}. Erro: ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
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

  private serializeResponse(dio): Diocese {
    return {
      id: dio.id,
      descricao: dio.descricao,
      tipoDiocese: {
        id: dio.tipoDiocese.id,
        descricao: dio.tipoDiocese.descricao,
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
