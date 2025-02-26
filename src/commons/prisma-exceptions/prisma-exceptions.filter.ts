import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  FOREIGN_KEY_CONSTRAINT,
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
      const meta = exception.meta as { target?: string[]; field_name?: string; table?: string };
      
      if (meta.target && meta.target.length) {
        return `O campo '${meta.target.join(', ')}' já existe cadastrado. Não permitimos duplicidade.`;
      }

      if (meta.field_name) {
        return `O campo '${meta.field_name}' não foi encontrado. Verifique.`;
      }

      if (meta.table) {
        return `O registro de '${meta.table}' não foi encontrado.`;
      }
    }
    return null;
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Erro inesperado. Tente novamente mais tarde.';

    if (exception.code === UNIQUE_CONSTRAINT_FAILED) {
      status = 400;
      message = this.extractErrorMessage(exception) ?? 'Já existe um registro com esses dados.';
    } else if (exception.code === RECORD_TO_DELETE_DOES_NOT_EXIST) {
      status = 404;
      message = this.extractErrorMessage(exception) ?? 'Registro não encontrado.';
    } else if (exception.code === FOREIGN_KEY_CONSTRAINT) {
      status = 404;
      message = this.extractErrorMessage(exception) ?? 'ID informado não encontrado.';
    } else {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    });
  }
}
