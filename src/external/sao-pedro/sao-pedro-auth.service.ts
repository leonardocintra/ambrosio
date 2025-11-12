import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface AuthResponse {
  access: string;
  refresh: string;
}

@Injectable()
export class SaoPedroAuthService {
  private readonly logger = new Logger(SaoPedroAuthService.name);
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiryTime: number | null = null;

  constructor(private readonly http: HttpService) {}

  private async login(): Promise<void> {
    this.logger.log('Fazendo login na API externa...');

    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(
          `${process.env.SAO_PEDRO_API_URL}/api/token/`,
          {
            username: process.env.SAO_PEDRO_API_USER,
            password: process.env.SAO_PEDRO_API_PASS,
          },
        ),
      );

      this.accessToken = response.data.access;
      this.refreshToken = response.data.refresh;

      // Define expiração em 30 minutos (assumindo JWT padrão)
      this.tokenExpiryTime = Date.now() + 30 * 60 * 1000;

      this.logger.log('Login realizado com sucesso');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error('Erro ao fazer login:', error.message);
      throw new UnauthorizedException('Falha na autenticação com API externa');
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      this.logger.warn('Refresh token não disponível, fazendo login novamente');
      await this.login();
      return;
    }

    this.logger.log('Renovando access token...');

    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(
          `${process.env.SAO_PEDRO_API_URL}/api/token/refresh/`,
          {
            refresh: this.refreshToken,
          },
        ),
      );

      this.accessToken = response.data.access;

      // Atualiza refresh token se fornecido
      if (response.data.refresh) {
        this.refreshToken = response.data.refresh;
      }

      // Atualiza tempo de expiração
      this.tokenExpiryTime = Date.now() + 30 * 60 * 1000; // 30 minutos

      this.logger.log('Token renovado com sucesso');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error('Erro ao renovar token:', error.message);
      // Se falhar no refresh, tenta login completo
      await this.login();
    }
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiryTime) return true;
    // Considera expirado 5 minutos antes do tempo real para evitar requests com token expirado
    return Date.now() >= this.tokenExpiryTime - 5 * 60 * 1000;
  }

  async getValidToken(): Promise<string> {
    // Se não tem token ou está expirado, renova
    if (!this.accessToken || this.isTokenExpired()) {
      if (this.refreshToken) {
        await this.refreshAccessToken();
      } else {
        await this.login();
      }
    }

    return this.accessToken!;
  }

  async handleAuthError(): Promise<string> {
    this.logger.warn('Tratando erro de autenticação - renovando token...');
    await this.refreshAccessToken();
    return this.accessToken!;
  }

  // Método para limpar tokens (logout)
  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiryTime = null;
    this.logger.log('Tokens limpos');
  }
}
