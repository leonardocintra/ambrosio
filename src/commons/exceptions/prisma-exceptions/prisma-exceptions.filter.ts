import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  FOREIGN_KEY_CONSTRAINT,
  RECORD_DOES_NOT_EXIST,
  UNIQUE_CONSTRAINT_FAILED,
} from 'src/commons/constants/constants';

const MODEL_NAME_MAP: Record<string, string> = {
  cidade: 'Cidade',
  diocese: 'Diocese',
  endereco: 'Endereço',
  escolaridade: 'Escolaridade',
  estado: 'Estado',
  estadocivil: 'Estado Civil',
  localidade: 'Localidade',
  pais: 'País',
  paroquia: 'Paroquia',
  pessoa: 'Pessoa',
  situacaoreligiosa: 'Situação Religiosa',
  tipodiocese: 'Tipo de Diocese',
  user: 'Usuário',
  carisma: 'Carisma',
  setor: 'Setor',
  macroregiao: 'Macro Região',
  comunidade: 'Comunidade',
  // adicione mais conforme o projeto for crescendo
  // Atenção: os nomes devem ser tudo minúsculo e sem acentos
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  private extractErrorMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string | null {
    // Aqui você pode implementar lógicas adicionais para extrair mensagens de diferentes tipos de erros
    const meta = exception.meta as {
      target?: string[];
      field_name?: string;
      table?: string;
      modelName: string;
    };

    if (meta?.target?.length) {
      return `O campo '${meta.target.join(', ')}' já existe cadastrado. Não permitimos duplicidade.`;
    } else if (meta?.field_name) {
      return `O campo '${meta.field_name}' não foi encontrado. Verifique.`;
    } else if (meta?.table) {
      return `O registro de '${meta.table}' não foi encontrado.`;
    } else if (meta?.modelName) {
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
