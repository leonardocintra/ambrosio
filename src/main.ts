import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_LOCALIDADE } from './commons/constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3005);

  const msRMQLocalidade: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: QUEUE_LOCALIDADE,
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  };

  const microserviceLocalidade =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      msRMQLocalidade,
    );

  await microserviceLocalidade.listen();
}
bootstrap();
