import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { QUEUE_PAIS_UF_CIDADE } from 'src/commons/constants/constants';
import { PaginationInterceptor } from 'src/commons/interceptors/pagination.interceptors';
import { PrismaExceptionsFilter } from 'src/commons/prisma-exceptions/prisma-exceptions.filter';

export const setupTestModule = async (): Promise<INestApplication> => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Não é permitido rodar testes em produção!');
    process.exit(1); // Encerra o processo se estiver em produção
  }

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule], // Aqui você importa o AppModule, sem necessidade de repetir os módulos
  })
    .overrideProvider(APP_INTERCEPTOR)
    .useValue(PaginationInterceptor)
    .overrideProvider(APP_FILTER)
    .useValue(PrismaExceptionsFilter)
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  // rabbitMQ
  const queues = [QUEUE_PAIS_UF_CIDADE];

  for (const queue of queues) {
    await app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue,
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  await app.startAllMicroservices();
  await app.init();
  return app;
};
