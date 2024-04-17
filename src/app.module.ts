import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EstadoCivilModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
