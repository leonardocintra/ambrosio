/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
} from '@nestjs/common';
import { PrismaExceptionsFilter } from '../prisma-exceptions/prisma-exceptions.filter';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { Prisma } from '@prisma/client';

@Injectable()
@Catch()
export class MultiexceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly prismaFilter: PrismaExceptionsFilter,
    private readonly sentryFilter: SentryGlobalFilter,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    // Primeiro, verifica se o erro é do Prisma
    if (this.isPrismaKnownRequestError(exception)) {
      // Se for erro do Prisma, delega para o PrismaExceptionsFilter para enviar a resposta
      this.prismaFilter.catch(exception, host);
      return; // Não continue, já enviamos a resposta
    }

    // Caso contrário, apenas loga o erro no Sentry (não tenta enviar resposta HTTP)
    this.sentryFilter.catch(exception, host);

    // Adicionar outros filter de exceptions se quiser
  }

  private isPrismaKnownRequestError(
    exception: any,
  ): exception is Prisma.PrismaClientKnownRequestError {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      'clientVersion' in exception &&
      exception instanceof Prisma.PrismaClientKnownRequestError
    );
  }
}
