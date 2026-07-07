import { Test, TestingModule } from '@nestjs/testing';
import { PrismaHealthIndicator } from './prisma-health.indicator';
import { PrismaService } from 'src/prisma.service';

describe('PrismaHealthIndicator', () => {
  let app: TestingModule;
  let indicator: PrismaHealthIndicator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        PrismaHealthIndicator,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    indicator = app.get<PrismaHealthIndicator>(PrismaHealthIndicator);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await app?.close();
  });

  it('should be defined', () => {
    expect(indicator).toBeDefined();
  });

  it('should return healthy status when database responds', async () => {
    jest.spyOn(prismaService, '$queryRaw').mockResolvedValue([{ '1': 1 }]);

    const result = await indicator.isHealthy('prisma');

    expect(result.prisma.status).toBe('up');
  });

  it('should throw HealthCheckError when database fails', async () => {
    jest
      .spyOn(prismaService, '$queryRaw')
      .mockRejectedValue(new Error('Connection refused'));

    await expect(indicator.isHealthy('prisma')).rejects.toThrow();
  });
});
