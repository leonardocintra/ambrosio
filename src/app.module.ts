import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoCivilModule } from './configuracoes/estado-civil/estado-civil.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaExceptionsFilter } from './commons/prisma-exceptions/prisma-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { EscolaridadeModule } from './configuracoes/escolaridade/escolaridade.module';
import { TipoCarismaModule } from './configuracoes/tipo-carisma/tipo-carisma.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TipoDioceseModule } from './configuracoes/tipo-diocese/tipo-diocese.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';

@Module({
  imports: [
    EstadoCivilModule,
    PrismaModule,
    EscolaridadeModule,
    TipoCarismaModule,
    EnderecoModule,
    PessoaModule,
    TipoDioceseModule,
    ConfiguracoesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionsFilter,
    },
  ],
})
export class AppModule {}
