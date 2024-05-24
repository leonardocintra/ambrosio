import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_LOCALIDADE } from 'src/commons/constants/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCALIDADES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: QUEUE_LOCALIDADE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MessagingModule {}
