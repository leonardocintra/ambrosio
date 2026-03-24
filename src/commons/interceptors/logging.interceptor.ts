/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  private getRequestId(req: Request): string | undefined {
    const requestIdHeader = req.headers['x-request-id'];
    if (typeof requestIdHeader === 'string') {
      return requestIdHeader;
    }

    if (Array.isArray(requestIdHeader) && requestIdHeader.length > 0) {
      return requestIdHeader[0];
    }

    if (typeof (req as any).id === 'string') {
      return (req as any).id;
    }

    return undefined;
  }

  private getRequestBody(req: Request): Record<string, any> | undefined {
    const body = (req as any).body;
    if (!body || Object.keys(body).length === 0) {
      return undefined;
    }
    return body;
  }

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
                body: this.getRequestBody(req),
                durationMs: duration,
                error: errorResponse || error.message,
                requestId: this.getRequestId(req),
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
      body: this.getRequestBody(req),
      duration: `${duration}ms`,
      durationMs: duration,
      requestId: this.getRequestId(req),
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
      // Success - INFO
      this.logger.info(logData, `${req.method} ${req.path} - ${statusCode}`);
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
