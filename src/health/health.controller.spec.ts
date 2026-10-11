import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.indicator.js';
import { PrismaService } from 'src/prisma.service.js';

describe('HealthController', () => {
  let app: TestingModule;
  let controller: HealthController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        PrismaHealthIndicator,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: vi.fn().mockResolvedValue([{ '1': 1 }]),
          },
        },
      ],
    }).compile();

    controller = app.get<HealthController>(HealthController);
  });

  afterEach(async () => {
    await app?.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
