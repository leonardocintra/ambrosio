/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { SaoPedroAuthService } from './sao-pedro-auth.service';
import { CreatePessoaDto } from 'src/pessoa/dto/create-pessoa.dto';
import { Pessoa } from 'neocatecumenal';
import { firstValueFrom } from 'rxjs';
import {
  ESCOLARIDADE_ENUM,
  ESCOLARIDADE_MAP,
  SEXO_ENUM,
} from 'src/commons/enums/enums';

@Injectable()
export class SaoPedroPessoaService {
  private readonly logger = new Logger(SaoPedroPessoaService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly authService: SaoPedroAuthService,
  ) {}

  async postExternalPessoa(
    createPessoaDto: CreatePessoaDto,
    escolaridade: string,
    estadoCivil: string,
  ): Promise<Pessoa> {
    const token = await this.authService.getAccessToken();
    const payload = this.buildPayload(
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
  ) {
    return {
      ...createPessoaDto,
      sexo: createPessoaDto.sexo === SEXO_ENUM.MASCULINO ? 'M' : 'F',
      data_nascimento: createPessoaDto.dataNascimento,
      estado_civil: estadoCivil.substring(0, 1).toUpperCase(),
      escolaridade:
        ESCOLARIDADE_MAP[escolaridade] || ESCOLARIDADE_ENUM.NAO_INFORMADO,
    };
  }

  private async tryPostPessoa(payload: any, token: string): Promise<any> {
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

  private serializePessoa(data: any): Pessoa {
    return {
      id: data.id,
      externalId: data.uuid,
      nome: data.nome,
      cpf: data.cpf,
      ativo: data.ativo,
      conhecidoPor: data.conhecidoPor,
      dataNascimento: data.data_nascimento,
      escolaridade: data.escolaridade,
      estadoCivil: data.estado_civil,
      nacionalidade: data.nacionalidade,
      sexo: data.sexo,
      situacaoReligiosa: data.situacao_religiosa,
      foto: data.foto,
    };
  }
}
