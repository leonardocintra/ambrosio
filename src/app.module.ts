import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaExceptionsFilter } from './commons/prisma-exceptions/prisma-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [EstadoCivilModule, PrismaModule],
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
