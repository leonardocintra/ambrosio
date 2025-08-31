import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SaoPedroAuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private readonly http: HttpService) {}

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
      await this.login();
    }
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
