import { INestApplication } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PaginationInterceptor } from "src/commons/interceptors/pagination.interceptors";
import { PrismaExceptionsFilter } from "src/commons/prisma-exceptions/prisma-exceptions.filter";

export const setupTestModule = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],  // Aqui você importa o AppModule, sem necessidade de repetir os módulos
  })
    .overrideProvider(APP_INTERCEPTOR)
    .useValue(PaginationInterceptor)
    .overrideProvider(APP_FILTER)
    .useValue(PrismaExceptionsFilter)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};