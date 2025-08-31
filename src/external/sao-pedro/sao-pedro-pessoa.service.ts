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
    let token = await this.authService.getAccessToken();

    // corpo da requisição, para evitar duplicar código
    const payload = {
      ...createPessoaDto,
      sexo: createPessoaDto.sexo === SEXO_ENUM.MASCULINO ? 'M' : 'F',
      data_nascimento: createPessoaDto.dataNascimento,
      estado_civil: estadoCivil.substring(0, 1).toUpperCase(),
      escolaridade:
        ESCOLARIDADE_MAP[escolaridade] || ESCOLARIDADE_ENUM.NAO_INFORMADO,
    };

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
      return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        // token expirou → pega um novo
        token = await this.authService.handleExpiredToken();
        this.logger.log('Token expirado. Novo token obtido.');

        // repete o POST agora com o token válido
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
        return response.data.data;
      }
      throw err;
    }
  }
}
