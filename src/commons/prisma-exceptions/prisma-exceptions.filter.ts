import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  RECORD_TO_DELETE_DOES_NOT_EXIST,
  UNIQUE_CONSTRAINT_FAILED,
} from 'src/commons/constants/constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  private extractErrorMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string | null {
    // Aqui você pode implementar lógicas adicionais para extrair mensagens de diferentes tipos de erros
    if (exception.meta && typeof exception.meta === 'object') {
      const meta = exception.meta as { target?: string[] };
      if (meta.target && meta.target.length) {
        return `O campo '${meta.target.join(', ')}' já existe cadastrado. Não permitimos duplicidade.`;
      }
    }
    return null;
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;

    if (exception.code === UNIQUE_CONSTRAINT_FAILED) {
      status = 400;
      const errorMessage = this.extractErrorMessage(exception);
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: errorMessage,
      });
    } else if (exception.code === RECORD_TO_DELETE_DOES_NOT_EXIST) {
      status = 404;
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: 'Registro não encontrado. Tente novamente',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exception.message,
      });
    }
  }
}
