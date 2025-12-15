/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoCivilModule } from './configuracoes/estado-civil/estado-civil.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EscolaridadeModule } from './configuracoes/escolaridade/escolaridade.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TipoDioceseModule } from './configuracoes/tipo-diocese/tipo-diocese.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { ParoquiaModule } from './paroquia/paroquia.module';
import { LocalidadeModule } from './localidade/localidade.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { PaginationInterceptor } from './commons/interceptors/pagination.interceptors';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { PrismaExceptionsFilter } from './commons/exceptions/prisma-exceptions/prisma-exceptions.filter';
import { SetorModule } from './mapa/setor/setor.module';
import { MacroRegiaoModule } from './mapa/macro-regiao/macro-regiao.module';
import { SaoPedroModule } from './external/sao-pedro/sao-pedro.module';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';
import { RegiaoModule } from './mapa/regiao/regiao.module';
import { ComunidadeModule } from './comunidade/comunidade/comunidade.module';
import { EtapaModule } from './comunidade/etapa/etapa.module';
import { EquipeModule } from './equipe/equipe.module';
import * as rTracer from 'cls-rtracer';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level:
          process.env.NODE_ENV === 'test'
            ? 'silent'
            : process.env.NODE_ENV === 'production'
              ? 'info'
              : 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        genReqId: (
          req: IncomingMessage,
          res: ServerResponse<IncomingMessage>,
        ): string => {
          const id = rTracer.id();
          if (id) return String(id);
          if ('id' in req && typeof (req as any).id !== 'undefined') {
            return String((req as any).id);
          }
          return crypto.randomUUID();
        },
        customProps: (req): Record<string, any> => ({
          context: 'HTTP',
          requestId: rTracer.id?.(),
          body: (req as any).body,
        }),
      },
    }),
    SentryModule.forRoot(),
    ScheduleModule.forRoot(),
    EstadoCivilModule,
    PrismaModule,
    EscolaridadeModule,
    EnderecoModule,
    PessoaModule,
    TipoDioceseModule,
    ConfiguracoesModule,
    ParoquiaModule,
    LocalidadeModule,
    UsersModule,
    AuthModule,
    CaslModule,
    SetorModule,
    MacroRegiaoModule,
    SaoPedroModule,
    RegiaoModule,
    ComunidadeModule,
    EtapaModule,
    EquipeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaExceptionsFilter,
    SentryGlobalFilter,
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },
  ],
})
export class AppModule {}
