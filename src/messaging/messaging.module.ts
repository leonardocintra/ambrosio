import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_PAIS_UF_CIDADE } from 'src/commons/constants/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAIS_UF_CIDADE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: QUEUE_PAIS_UF_CIDADE,
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
