// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as express from 'express';
import type { user } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}
