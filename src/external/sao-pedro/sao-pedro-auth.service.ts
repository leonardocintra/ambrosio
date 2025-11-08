import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { BaseService } from 'src/commons/base.service';

@Injectable()
export class SaoPedroAuthService extends BaseService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private readonly http: HttpService) {
    super(new CaslAbilityService());
  }

  private async login() {
    const response = await firstValueFrom(
      this.http.post(`${process.env.SAO_PEDRO_API_URL}/api/token/`, {
        username: process.env.SAO_PEDRO_API_USER,
        password: process.env.SAO_PEDRO_API_PASS,
      }),
    );
    this.accessToken = response.data.access;
    this.refreshToken = response.data.refresh;
  }

  private async refresh() {
    if (!this.refreshToken) {
      this.logger.warn('Ambrosio: No refresh token available');
      throw new UnauthorizedException('No refresh token available');
    }
    const response = await firstValueFrom(
      this.http.post(`${process.env.SAO_PEDRO_API_URL}/api/token/refresh/`, {
        refresh: this.refreshToken,
      }),
    );
    this.accessToken = response.data.access;
    if (response.data.refresh) {
      this.refreshToken = response.data.refresh;
    }
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken) {
      this.logger.warn('Ambrosio: No access token available');
      await this.login();
    }
    this.logger.log(`Ambrosio: Access token retrieved`);
    return this.accessToken!;
  }

  async handleExpiredToken(): Promise<string> {
    try {
      await this.refresh();
      return this.accessToken!;
    } catch {
      await this.login();
      return this.accessToken!;
    }
  }
}
