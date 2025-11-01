import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { SaoPedroAuthService } from './sao-pedro-auth.service';
import { CreatePessoaDto } from 'src/pessoa/dto/create-pessoa.dto';
import { Pessoa } from 'neocatecumenal';
import { firstValueFrom } from 'rxjs';
import { ExternalCreatePessoaDto } from './dto/external-create-pessoa.dto';
import { ExternalResponsePessoaDto } from './dto/external-response-pessoa.dto';
import { BaseService } from 'src/commons/base.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { serializeExternalPessoaResponse } from './sao-pedro-pessoa.serializer';
import { UpdatePessoaDto } from 'src/pessoa/dto/update-pessoa.dto';
import { CreatePessoaMapper } from './mapper/create-pessoa.mapper';
import { UpdatePessoaMapper } from './mapper/update-pessoa.mapper';

@Injectable()
export class SaoPedroPessoaService extends BaseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: SaoPedroAuthService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async findAllPessoas(limit: number = 2000): Promise<Pessoa[]> {
    this.logger.log('Fetching all external pessoas');
    const token = await this.authService.getAccessToken();

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      const pessoas = response.data.data;
      return pessoas.map((pessoa: ExternalResponsePessoaDto) =>
        serializeExternalPessoaResponse(pessoa),
      );
    } catch (err) {
      this.logger.error(`Error fetching all external pessoas: ${err.message}`);
      throw new HttpException(
        'Erro ao buscar pessoas externas',
        err.response?.status || 500,
      );
    }
  }

  private async findByParam(param: string, value: string): Promise<Pessoa> {
    this.logger.log(`Fetching external pessoa with ${param}: ${value}`);
    const token = await this.authService.getAccessToken();

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/?${param}=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      this.logger.log(
        `External pessoa response: ${JSON.stringify(response.data)}`,
      );
      const pessoas = response.data.data;
      if (pessoas.length === 0) {
        this.logger.log(`No external pessoa found with ${param}: ${value}`);
        return null;
      }

      this.logger.warn(
        `External pessoa fetched: ${JSON.stringify(pessoas[0])}`,
      );
      return serializeExternalPessoaResponse(pessoas[0]);
    } catch (err) {
      this.logger.error(
        `Error fetching external pessoa with ${param} ${value}: ${err.message}`,
      );
      throw new HttpException(
        'Erro ao buscar pessoa externa',
        err.response?.status || 500,
      );
    }
  }

  async updateExternalPessoa(
    uuid: string,
    updatePessoaDto: Partial<UpdatePessoaDto>,
  ): Promise<Pessoa> {
    this.logger.log(`Updating external pessoa with UUID: ${uuid}`);
    const token = await this.authService.getAccessToken();

    const data = UpdatePessoaMapper.toExternal(updatePessoaDto);

    try {
      const response = await firstValueFrom(
        this.httpService.patch(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/${uuid}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(
        `External pessoa updated with response: ${JSON.stringify(
          response.data,
        )}`,
      );

      return serializeExternalPessoaResponse(response.data);
    } catch (err) {
      this.logger.error(
        `Error updating external pessoa with UUID ${uuid}: ${err.message}`,
      );
      throw new HttpException(
        'Erro ao atualizar pessoa externa',
        err.response?.status || 500,
      );
    }
  }

  async findExternalPessoaByUuid(uuid: string): Promise<Pessoa> {
    this.logger.log(`Fetching external pessoa with UUID: ${uuid}`);
    return this.findByParam('uuid', uuid);
  }

  async getExternalPessoaByCpf(cpf: string): Promise<Pessoa> {
    this.logger.log(`Fetching external pessoa with CPF: ${cpf}`);
    return this.findByParam('cpf', cpf);
  }

  async createExternalPessoa(
    createPessoaDto: CreatePessoaDto,
  ): Promise<Pessoa> {
    const token = await this.authService.getAccessToken();
    const payload: ExternalCreatePessoaDto =
      CreatePessoaMapper.toExternal(createPessoaDto);

    this.logger.log(
      `Posting external pessoa with payload: ${JSON.stringify(payload)}`,
    );

    const responseData = await this.tryPostPessoa(payload, token);

    this.logger.log(
      `External pessoa created with response: ${JSON.stringify(responseData)}`,
    );

    return serializeExternalPessoaResponse(responseData);
  }

  private async tryPostPessoa(
    payload: ExternalCreatePessoaDto,
    token: string,
  ): Promise<ExternalResponsePessoaDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        // token expirou → pega um novo
        token = await this.authService.handleExpiredToken();
        this.logger.warn('Token expirado. Novo token obtido.');

        const response = await firstValueFrom(
          this.httpService.post(
            `${process.env.SAO_PEDRO_API_URL}/api/pessoas/`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          ),
        );
        return response.data;
      }
      throw err;
    }
  }
}
