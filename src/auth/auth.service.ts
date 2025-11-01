import { Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { packRules } from '@casl/ability/extra';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      this.logger.log(`Usuario não encontrado. Email ${loginDto.email} `);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      String(user.password),
    );

    if (!isPasswordValid) {
      this.logger.log(`Senha invalida. User ${user.email}`);
      return null;
    }

    const ability = this.abilityService.createForUser(user);
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: packRules(ability.rules),
    });

    return { access_token: token, access_token_type: 'Bearer' };
  }
}
