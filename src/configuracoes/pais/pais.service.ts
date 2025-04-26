import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IPaisOnu } from './IPaisOnu';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UNIQUE_CONSTRAINT_FAILED } from 'src/commons/constants/constants';

@Injectable()
export class PaisService {
  private readonly logger = new Logger(PaisService.name);

  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createOrSelect(createPaisDto: CreatePaisDto) {
    const paisOnu: IPaisOnu = await this.buscaPaisOnu(createPaisDto);

    try {
      return await this.prisma.pais.create({
        data: {
          nome: paisOnu.nome.abreviado,
          capital: paisOnu.governo.capital.nome,
          isoAlpha2: paisOnu.id['ISO-3166-1-ALPHA-2'],
          lingua: paisOnu.linguas[0].nome,
          regiao: paisOnu.localizacao.regiao.nome,
          subRegiao: paisOnu.localizacao['sub-regiao'].nome,
          regiaoIntermediaria:
            paisOnu.localizacao['regiao-intermediaria']?.nome,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === UNIQUE_CONSTRAINT_FAILED
      ) {
        this.logger.warn(
          `Pais ${createPaisDto.nome} ja existe cadastrado no banco de dados.`,
        );
        return await this.findByName(createPaisDto.nome);
      } else {
        this.logger.error(error);
        throw new HttpException('Erro ao cadastrar pais', 500);
      }
    }
  }

  findAll() {
    return this.prisma.pais.findMany();
  }

  findOne(id: number) {
    return this.prisma.pais.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updatePaisDto: UpdatePaisDto) {
    return `This action updates a #${id} pai $${updatePaisDto.nome}`;
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }

  private findByName(nome: string) {
    return this.prisma.pais.findFirstOrThrow({
      where: { nome },
    });
  }

  private async buscaPaisOnu(createPaisDto: CreatePaisDto): Promise<IPaisOnu> {
    const { data: dataAll } = await firstValueFrom(
      this.httpService
        .get<
          IPaisOnu[]
        >('https://servicodados.ibge.gov.br/api/v1/paises/listar-todos')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(
              `API de paises com erro. Erro: ${error.message}`,
              502,
            );
          }),
        ),
    );

    if (!dataAll) {
      throw new HttpException(
        'Não foi possivel validar o pais digitado. Erro na busca de paises da ONU',
        400,
      );
    }

    const paisesValidos = Array.from(
      new Map(
        dataAll.map((p) => [
          p.nome.abreviado,
          { id: p.id, nome: p.nome.abreviado },
        ]),
      ).values(),
    );

    const paisEncontrado = paisesValidos.find(
      (p) =>
        p.nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase() ===
        createPaisDto.nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase(),
    );

    if (!paisEncontrado) {
      throw new HttpException(
        'Pais não encontrado. Verifique se digitou corretamente o nome e tente novamente',
        404,
      );
    }

    const idPaisOnu = paisEncontrado.id['ISO-3166-1-ALPHA-2'];

    const { data: dataOne } = await firstValueFrom(
      this.httpService
        .get<
          IPaisOnu[]
        >(`https://servicodados.ibge.gov.br/api/v1/paises/${idPaisOnu}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(
              `API de paises com erro. Erro: ${error.message}`,
              502,
            );
          }),
        ),
    );

    return dataOne[0];
  }
}
