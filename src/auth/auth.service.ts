import { Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { packRules } from '@casl/ability/extra';
import { createHash, randomBytes } from 'crypto';
import { SendEmailService } from 'src/external/send-email/send-email.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: SendEmailService,
    private readonly userService: UsersService,
    private readonly abilityService: CaslAbilityService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

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

  async forgotPassword(email: string) {
    this.logger.log(`Iniciando processo de recuperação de senha para ${email}`);
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return { message: 'Email de recuperação enviado se o usuário existir.' };
    }

    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const tempPassword = Math.random().toString(36).slice(-8);

    await this.userService.update(user.id, {
      password: tempPassword,
      resetPasswordToken: tokenHash,
      resetPasswordExpires: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

    this.mailService.sendRecoveryEmail(user.email, resetLink, tempPassword);
    return { message: 'Email de recuperação enviado se o usuário existir.' };
  }
}
