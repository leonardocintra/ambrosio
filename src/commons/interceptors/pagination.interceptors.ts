/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../constants/constants';

interface Pagination {
  server: string;
  total: number;
  page: number;
  limit: number;
  data: any[];
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const host = `${req.hostname}${req.url}`;

        const server = host;
        const isArray = Array.isArray(data);
        const total = isArray ? data.length : 1;
        const page = parseInt(req.query.page) || PAGE_DEFAULT;
        let limit = LIMIT_DEFAULT;

        if (req.query.limit) {
          limit = parseInt(req.query.limit);
        }

        if (total < limit) {
          limit = total;
        }

        return {
          server,
          total,
          page,
          limit,
          data,
        } as Pagination;
      }),
    );
  }
}
