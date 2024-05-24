import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUE_LOCALIDADE } from './commons/constants/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ambrosio')
    .setDescription('The CNC API documentation')
    .setVersion('1.0')
    .addTag('cnc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
