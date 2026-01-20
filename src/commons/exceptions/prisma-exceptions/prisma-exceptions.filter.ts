import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from 'src/prisma/generated-client';
import {
  FOREIGN_KEY_CONSTRAINT,
  MODEL_NAME_MAP,
  RECORD_DOES_NOT_EXIST,
  UNIQUE_CONSTRAINT_FAILED,
} from 'src/commons/constants/constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  private extractErrorMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string | null {
    // Cast para 'any' para navegar com segurança na estrutura variável do meta
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (exception.meta || {}) as any;

    // ------------------------------------------------------------------
    // CORREÇÃO PARA PRISMA 7 + DRIVER ADAPTER (PG):
    // Verifica se o 'target' está na raiz (padrão antigo/nativo)
    // OU aninhado dentro do driverAdapterError (padrão novo/pg)
    // ------------------------------------------------------------------
    const target =
      meta.target || meta.driverAdapterError?.cause?.constraint?.fields;

    if (Array.isArray(target) && target.length > 0) {
      return `O campo '${target.join(', ')}' já existe cadastrado. Não permitimos duplicidade.`;
    }

    // Mantém as verificações originais para outros tipos de erro
    if (meta.field_name) {
      return `O campo '${meta.field_name}' não foi encontrado. Verifique.`;
    }

    if (meta.table) {
      return `O registro de '${meta.table}' não foi encontrado.`;
    }

    if (meta.modelName) {
      const modelName = MODEL_NAME_MAP[meta.modelName.toLowerCase()];
      if (modelName) {
        return `O registro de '${modelName}' não foi encontrado.`;
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

    switch (exception.code) {
      case UNIQUE_CONSTRAINT_FAILED:
        status = 400;
        message =
          this.extractErrorMessage(exception) ??
          'Já existe um registro com esses dados.';
        break;

      case RECORD_DOES_NOT_EXIST:
        status = 404;
        message =
          this.extractErrorMessage(exception) ?? 'Registro não encontrado.';
        break;

      case FOREIGN_KEY_CONSTRAINT:
        status = 404;
        message =
          this.extractErrorMessage(exception) ?? 'ID informado não encontrado.';
        break;

      default:
        // Mantive exception.message como fallback igual ao original
        message = exception.message;
        break;
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
