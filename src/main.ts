import './instrument';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaExceptionsFilter } from './commons/exceptions/prisma-exceptions/prisma-exceptions.filter';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Ambrosio')
    .setDescription('The CNC API documentation')
    .setVersion('0.7.0')
    .addTag('cnc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    app.get(SentryGlobalFilter),
    app.get(PrismaExceptionsFilter),
  );

  await app.startAllMicroservices();
  await app.listen(3005);
}
bootstrap();
