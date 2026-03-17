/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: any): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logResponse(req, res, data, startTime);
        },
        error: (error) => {
          // Erros são capturados pelos filters, mas podemos logar aqui também
          const duration = Date.now() - startTime;
          const statusCode = error.getStatus?.() || 500;
          const errorResponse = error.getResponse?.();

          if (statusCode >= 400) {
            this.logger.error(
              {
                statusCode,
                method: req.method,
                path: req.path,
                duration: `${duration}ms`,
                error: errorResponse || error.message,
                requestId: (req as any).id,
              },
              `${req.method} ${req.path} - ${statusCode}`,
            );
          }
        },
      }),
    );
  }

  private logResponse(
    req: Request,
    res: Response,
    data: any,
    startTime: number,
  ): void {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logData = {
      statusCode,
      method: req.method,
      path: req.path,
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      duration: `${duration}ms`,
      requestId: (req as any).id,
      response: this.safeStringify(data),
    };

    // Logar com prioridade diferente para erros
    if (statusCode >= 500) {
      // Erros 5xx - ERROR
      this.logger.error(logData, `${req.method} ${req.path} - ${statusCode}`);
    } else if (statusCode >= 400) {
      // Erros 4xx - WARN
      this.logger.warn(logData, `${req.method} ${req.path} - ${statusCode}`);
    } else if (statusCode >= 300) {
      // Redirects - INFO
      this.logger.info(logData, `${req.method} ${req.path} - ${statusCode}`);
    } else {
      // Success - DEBUG
      this.logger.debug(logData, `${req.method} ${req.path} - ${statusCode}`);
    }

    // Também setar o status no response para pino-http capturar
    res.statusCode = statusCode;
  }

  private safeStringify(obj: any, maxLength = 500): string {
    try {
      const str = JSON.stringify(obj);
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
      }
      return str;
    } catch {
      return String(obj);
    }
  }
}
