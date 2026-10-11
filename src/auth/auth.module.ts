import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ExternalModule } from 'src/external/external.module.js';
import { UsersModule } from 'src/users/users.module.js';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'seu-jwt-secret',
      signOptions: { expiresIn: '5h', algorithm: 'HS256' },
    }),
    ExternalModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
