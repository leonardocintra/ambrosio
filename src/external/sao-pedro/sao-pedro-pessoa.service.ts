import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { SaoPedroAuthService } from './sao-pedro-auth.service';
import { CreatePessoaDto } from 'src/pessoa/dto/create-pessoa.dto';
import { Pessoa } from 'neocatecumenal';
import { firstValueFrom } from 'rxjs';
import { ExternalResponsePessoaDto } from './dto/external-response-pessoa.dto';
import { BaseService } from 'src/commons/base.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import {
  serializeExternalPessoaResponse,
  serializeExternalPessoasResponse,
} from './sao-pedro-pessoa.serializer';
import { UpdatePessoaDto } from 'src/pessoa/dto/update-pessoa.dto';
import { CreatePessoaMapper } from './mapper/create-pessoa.mapper';
import { UpdatePessoaMapper } from './mapper/update-pessoa.mapper';
import { SEXO_ENUM } from 'src/commons/enums/enums';

@Injectable()
export class SaoPedroPessoaService extends BaseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: SaoPedroAuthService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  /**
   * Método centralizado para fazer requisições autenticadas com retry automático
   */
  private async executeAuthenticatedRequest<T>(
    requestFn: (token: string) => Promise<T>,
    operation: string,
  ): Promise<T> {
    try {
      // Primeira tentativa com token válido
      const token = await this.authService.getValidToken();
      return await requestFn(token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Se erro 401, tenta renovar token e repetir
      if (error.response?.status === 401) {
        this.logger.warn(`Token inválido durante ${operation}. Renovando...`);

        try {
          const newToken = await this.authService.handleAuthError();
          return await requestFn(newToken);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (retryError: any) {
          this.logger.error(
            `Falha em ${operation} após renovação de token:`,
            retryError.message,
          );
          throw new HttpException(
            `Erro ao executar ${operation}`,
            retryError.response?.status || 500,
          );
        }
      }

      // Para outros erros, propaga diretamente
      this.logger.error(`Erro em ${operation}:`, error.message);
      throw new HttpException(
        `Erro ao executar ${operation}`,
        error.response?.status || 500,
      );
    }
  }

  async findAllPessoas(limit: number = 5000): Promise<Pessoa[]> {
    this.logger.log(`Buscando todas as pessoas externas (limit: ${limit})`);

    return this.executeAuthenticatedRequest(async (token: string) => {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas?limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      );

      const pessoas = response.data.data || [];
      this.logger.log(`${pessoas.length} pessoas externas encontradas`);

      return pessoas.map((pessoa: ExternalResponsePessoaDto) =>
        serializeExternalPessoaResponse(pessoa),
      );
    }, 'busca de pessoas externas');
  }

  private async findByParams(
    params: Record<string, string>,
  ): Promise<Pessoa[]> {
    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');

    this.logger.log(`Buscando pessoas externas com parâmetros: ${queryString}`);

    return this.executeAuthenticatedRequest(async (token: string) => {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/?${queryString}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      );

      const pessoas = response.data.data || [];

      if (pessoas.length === 0) {
        this.logger.warn(
          `Nenhuma pessoa externa encontrada com parâmetros: ${queryString}`,
        );
        return [];
      }

      this.logger.log(`${pessoas.length} pessoa(s) externa(s) encontrada(s)`);
      return serializeExternalPessoasResponse(pessoas);
    }, `busca por parâmetros: ${queryString}`);
  }

  async getExternalPessoaByCpf(cpf: string): Promise<Pessoa | null> {
    this.logger.log(`Buscando pessoa externa por CPF: ${cpf}`);
    const pessoas = await this.findByParams({ cpf });
    return pessoas.length > 0 ? pessoas[0] : null;
  }

  async findExternalPessoaByUuid(uuid: string): Promise<Pessoa | null> {
    this.logger.log(`Buscando pessoa externa por UUID: ${uuid}`);
    const pessoas = await this.findByParams({ uuid });
    return pessoas.length > 0 ? pessoas[0] : null;
  }

  async getExternalPessoasEstadoCivilCasado(
    sexo: SEXO_ENUM,
  ): Promise<Pessoa[]> {
    this.logger.log(`Buscando pessoas externas casadas do sexo: ${sexo}`);
    return this.findByParams({
      estadoCivil: 'C',
      sexo: sexo === SEXO_ENUM.MASCULINO ? 'M' : 'F',
    });
  }

  async createExternalPessoa(
    createPessoaDto: CreatePessoaDto,
  ): Promise<Pessoa> {
    const payload = CreatePessoaMapper.toExternal(createPessoaDto);
    this.logger.log(
      `Criando pessoa externa: ${payload.nome} (CPF: ${payload.cpf})`,
    );

    return this.executeAuthenticatedRequest(async (token: string) => {
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

      const pessoa = serializeExternalPessoaResponse(response.data);
      this.logger.log(`Pessoa externa criada com sucesso - ID: ${pessoa.id}`);

      return pessoa;
    }, 'criação de pessoa externa');
  }

  async updateExternalPessoa(
    uuid: string,
    updatePessoaDto: Partial<UpdatePessoaDto>,
  ): Promise<Pessoa> {
    const payload = UpdatePessoaMapper.toExternal(updatePessoaDto);
    this.logger.log(`Atualizando pessoa externa UUID: ${uuid}`);

    return this.executeAuthenticatedRequest(async (token: string) => {
      const response = await firstValueFrom(
        this.httpService.patch(
          `${process.env.SAO_PEDRO_API_URL}/api/pessoas/${uuid}/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const pessoa = serializeExternalPessoaResponse(response.data);
      this.logger.log(`Pessoa externa atualizada com sucesso - UUID: ${uuid}`);

      return pessoa;
    }, `atualização de pessoa externa (UUID: ${uuid})`);
  }
}
