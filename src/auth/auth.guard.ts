import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { path } = request.route;

    // Permitir criação de usuário sem autenticação
    if (path === '/users' && request.method === 'POST') {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token = authHeader.substring('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const decoded = this.jwtService.decode(token) as { exp?: number };
    if (!decoded?.exp) {
      throw new UnauthorizedException('Invalid token structure');
    }

    if (dayjs().unix() >= decoded.exp) {
      throw new UnauthorizedException('Token expired');
    }

    try {
      const payload = this.jwtService.verify<{
        sub: string;
        name: string;
        email: string;
        roles: ROLE_ENUM;
        permissions: string[];
      }>(token, {
        algorithms: ['HS256'],
      });

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) throw new UnauthorizedException('User not found');

      request.user = user;
      this.abilityService.createForUser(user);

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
