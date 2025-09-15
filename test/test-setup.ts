import { INestApplication, Type } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionsFilter } from '../src/commons/exceptions/prisma-exceptions/prisma-exceptions.filter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Override = { provider: Type<any>; value: any };

export const setupTestModule = async (
  overrides: Override[] = [],
): Promise<INestApplication> => {
  const moduleBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  overrides.forEach(({ provider, value }) => {
    moduleBuilder.overrideProvider(provider).useValue(value);
  });

  const moduleFixture: TestingModule = await moduleBuilder.compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionsFilter());

  await app.startAllMicroservices();
  await app.init();
  return app;
};
