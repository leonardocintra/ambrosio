import { TipoDioceseService } from './../tipo-diocese/tipo-diocese.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { PrismaService } from 'src/prisma.service';
import { LocalidadeService } from 'src/localidade/localidade.service';
import { TipoLocalidadeService } from '../tipo-localidade/tipo-localidade.service';

@Injectable()
export class DioceseService {
  private readonly logger = new Logger(DioceseService.name);

  constructor(private prisma: PrismaService,
    private localidadeSerivce: LocalidadeService,
    private readonly tipoLocalidadeService: TipoLocalidadeService,
    private readonly tipoDiocese: TipoDioceseService) { }

  async create(createDioceseDto: CreateDioceseDto) {
    let dioceseId = 0;
    const tipoDiocese = await this.tipoDiocese.findOne(createDioceseDto.tipoDiocese.id);
    const tipoLocalidade = await this.tipoLocalidadeService.findByName(tipoDiocese.descricao);

    try {
      const diocese = await this.prisma.diocese.create({
        data: {
          descricao: createDioceseDto.descricao,
          tipoDioceseId: tipoDiocese.id
        },
      });
      dioceseId = diocese.id;

      await this.localidadeSerivce.create({
        descricao: createDioceseDto.descricao,
        diocese: {
          descricao: diocese.descricao,
          id: diocese.id,
        },
        tipoLocalidade: {
          descricao: tipoLocalidade.descricao,
          id: tipoLocalidade.id,
        },
        observacao: createDioceseDto.observacao,
        endereco: {
          bairro: createDioceseDto.endereco.bairro,
          cep: createDioceseDto.endereco.cep,
          cidade: createDioceseDto.endereco.cidade,
          logradouro: createDioceseDto.endereco.logradouro,
          numero: createDioceseDto.endereco.numero,
          UF: createDioceseDto.endereco.UF,
          pais: createDioceseDto.endereco.pais,
        },
      });

      return diocese;
    } catch (error) {
      this.logger.error(error);
      if (dioceseId > 0) {
        this.prisma.diocese.delete({
          where: { id: dioceseId }
        })
        this.logger.warn(`Removido diocese ${dioceseId}`);
      }
      throw new HttpException(`Ocorreu um erro ao cadastrar a diocese ${createDioceseDto.descricao}. Erro: ${error}`, HttpStatus.BAD_GATEWAY);
    }
  }

  findAll() {
    return this.prisma.diocese.findMany({
      include: {
        tipoDiocese: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.diocese.findFirstOrThrow({
      where: {
        id
      },
      include: {
        tipoDiocese: true
      }
    })
  }

  update(id: number, updateDioceseDto: UpdateDioceseDto) {
    return `This action updates a #${id} diocese e ${updateDioceseDto.descricao}`;
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }
}
