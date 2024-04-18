import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaExceptionsFilter } from './commons/prisma-exceptions/prisma-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { EscolaridadeModule } from './escolaridade/escolaridade.module';
import { TipoCarismaModule } from './tipo-carisma/tipo-carisma.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TipoDioceseModule } from './tipo-diocese/tipo-diocese.module';

@Module({
  imports: [EstadoCivilModule, PrismaModule, EscolaridadeModule, TipoCarismaModule, EnderecoModule, PessoaModule, TipoDioceseModule],
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
