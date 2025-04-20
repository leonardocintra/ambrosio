import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { REFLECTOR_IS_PUBLIC } from 'src/commons/constants/constants';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      REFLECTOR_IS_PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    // Para permitir somente request vindo de Restful (HTTP). E não do rabbitMQ, GPRC, Kafka, etc
    const request: Request = context.switchToHttp().getRequest();

    const { path } = request.route;
    if (path === '/users' && request.method === 'POST') {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    const token = authHeader.substring('Bearer '.length).trim();

    if (!token) {
      throw new UnauthorizedException('No token provided');
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

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;
      this.abilityService.createForUser(user);

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token', { cause: error });
    }
  }
}
