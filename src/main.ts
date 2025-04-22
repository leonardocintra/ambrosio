import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { QUEUE_PAIS_UF_CIDADE } from './commons/constants/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Ambrosio')
    .setDescription('The CNC API documentation')
    .setVersion('0.0.2')
    .addTag('cnc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
  await app.listen(3005);
}
bootstrap();
