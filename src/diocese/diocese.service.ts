import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
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
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { RABBIT_PATTERN_PAIS_UF_CIDADE_CREATED } from 'src/commons/constants/constants';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';

@Injectable()
export class DioceseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
    private readonly tipoDioceseService: TipoDioceseService,
    private readonly paisService: PaisService,
    private readonly estadoService: EstadoService,
    private readonly cidadeService: CidadeService,
    private readonly abilityService: CaslAbilityService,
    @Inject('PAIS_UF_CIDADE_SERVICE') private clientRabbit: ClientProxy,
  ) {}

  async create(createDioceseDto: CreateDioceseDto) {
    const tipoDiocese = await this.tipoDioceseService.findOne(
      createDioceseDto.tipoDiocese.id,
    );

    if (!tipoDiocese) {
      throw new NotFoundException('Tipo de diocese não encontrada');
    }

    const enderecoComObservacao = {
      ...createDioceseDto.endereco,
      observacao: `Endereço de ${tipoDiocese.descricao} ${createDioceseDto.descricao}. ${createDioceseDto.observacao || ''}`,
    };

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const endereco = await this.enderecoService.create(
          enderecoComObservacao,
          transaction,
        );

        return await transaction.diocese.create({
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
      });

      this.clientRabbit.emit(RABBIT_PATTERN_PAIS_UF_CIDADE_CREATED, {
        enderecoId: result.enderecoId,
      });
      this.logger.log(
        `Endereço id ${result.enderecoId} enviado para fila rabbitMQ`,
      );

      return result;
    } catch (error) {
      this.logger.error(error);
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
        tipoDiocese: {
          connect: {
            id: updateDioceseDto.tipoDiocese.id,
          },
        },
        endereco: {
          update: {
            bairro: updateDioceseDto.endereco.bairro,
            cep: updateDioceseDto.endereco.cep,
            cidade: updateDioceseDto.endereco.cidade,
            logradouro: updateDioceseDto.endereco.logradouro,
            numero: updateDioceseDto.endereco.numero,
            UF: updateDioceseDto.endereco.UF,
          },
        },
      },
      include: {
        endereco: true,
        tipoDiocese: true,
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

  async processQueuePaisUfCidade(
    data: { enderecoId: number },
    context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const id = data.enderecoId;
    const endereco = await this.enderecoService.findOne(id);

    if (!endereco) {
      this.logger.error(`Endereço id ${id} não encontrada.`);
      // TODO: add log no sentry
      return;
    }

    try {
      const pais = await this.paisService.create({ nome: endereco.pais });
      this.logger.log(
        `Cadastrado pais ${pais.nome} do endereco id ${id} ${endereco.observacao}`,
      );

      const uf = await this.estadoService.create({
        nome: endereco.UF,
        sigla: endereco.UF,
        pais: { id: pais.id, nome: pais.nome },
      });
      this.logger.log(
        `Cadastrado estado ${uf.nome} do endereco id ${id} ${endereco.observacao}`,
      );
    } catch (error) {
      this.logger.error(error);
    } finally {
      channel.ack(originalMsg);
    }
  }
}
