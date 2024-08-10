import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { QUEUE_LOCALIDADE } from './commons/constants/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Ambrosio')
    .setDescription('The CNC API documentation')
    .setVersion('1.0')
    .addTag('cnc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const queues = [QUEUE_LOCALIDADE];

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
