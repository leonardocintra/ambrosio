/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { SaoPedroAuthService } from './sao-pedro-auth.service';
import { CreatePessoaDto } from 'src/pessoa/dto/create-pessoa.dto';
import { Pessoa } from 'neocatecumenal';
import { firstValueFrom } from 'rxjs';
import {
  ESCOLARIDADE_ENUM,
  ESCOLARIDADE_MAP,
  SEXO_ENUM,
} from 'src/commons/enums/enums';
import { ExternalCreatePessoaDto } from './dto/external-create-pessoa.dto';
import { ExternalResponsePessoaDto } from './dto/external-response-pessoa.dto';
import { BaseService } from 'src/commons/base.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class SaoPedroPessoaService extends BaseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: SaoPedroAuthService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async getExternalPessoaByCpf(cpf: string): Promise<Pessoa> {
    this.logger.log(`Fetching external pessoa with CPF: ${cpf}`);
    const token = await this.authService.getAccessToken();

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/?cpf=${cpf}`,
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
        this.logger.log(`No external pessoa found with CPF: ${cpf}`);
        return null;
      }

      this.logger.warn(
        `External pessoa fetched: ${JSON.stringify(pessoas[0])}`,
      );
      return this.serializePessoa(pessoas[0]);
    } catch (err) {
      this.logger.error(
        `Error fetching external pessoa with CPF ${cpf}: ${err.message}`,
      );
      throw new HttpException(
        'Erro ao buscar pessoa externa',
        err.response?.status || 500,
      );
    }
  }

  async postExternalPessoa(
    createPessoaDto: CreatePessoaDto,
    escolaridade: string,
    estadoCivil: string,
  ): Promise<Pessoa> {
    const token = await this.authService.getAccessToken();
    const payload: ExternalCreatePessoaDto = this.buildPayload(
      createPessoaDto,
      escolaridade,
      estadoCivil,
    );

    this.logger.log(
      `Posting external pessoa with payload: ${JSON.stringify(payload)}`,
    );

    const responseData = await this.tryPostPessoa(payload, token);

    this.logger.log(
      `External pessoa created with response: ${JSON.stringify(responseData)}`,
    );

    return this.serializePessoa(responseData);
  }

  private buildPayload(
    createPessoaDto: CreatePessoaDto,
    escolaridade: string,
    estadoCivil: string,
  ): ExternalCreatePessoaDto {
    return {
      ...createPessoaDto,
      sexo: createPessoaDto.sexo === SEXO_ENUM.MASCULINO ? 'M' : 'F',
      dataNascimento: createPessoaDto.dataNascimento,
      estadoCivil: estadoCivil.substring(0, 1).toUpperCase(),
      escolaridade:
        ESCOLARIDADE_MAP[escolaridade] || ESCOLARIDADE_ENUM.NAO_INFORMADO,
    };
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

  private serializePessoa(data: ExternalResponsePessoaDto): Pessoa {
    return {
      id: data.id,
      externalId: data.uuid,
      nome: data.nome,
      cpf: data.cpf,
      ativo: data.ativo,
      conhecidoPor: data.conhecidoPor,
      dataNascimento: data.dataNascimento,
      escolaridade: data.escolaridade,
      estadoCivil: data.estadoCivil,
      nacionalidade: data.nacionalidade,
      sexo: data.sexo,
      situacaoReligiosa: data.situacaoReligiosa,
      foto: data.foto,
    };
  }
}
