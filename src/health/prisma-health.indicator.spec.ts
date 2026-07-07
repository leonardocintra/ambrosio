import { Test, TestingModule } from '@nestjs/testing';
import { PrismaHealthIndicator } from './prisma-health.indicator';
import { PrismaService } from 'src/prisma.service';

describe('PrismaHealthIndicator', () => {
  let indicator: PrismaHealthIndicator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    indicator = module.get<PrismaHealthIndicator>(PrismaHealthIndicator);
    prismaService = module.get<PrismaService>(PrismaService);
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
