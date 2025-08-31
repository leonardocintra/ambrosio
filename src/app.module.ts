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

@Module({
  imports: [
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
