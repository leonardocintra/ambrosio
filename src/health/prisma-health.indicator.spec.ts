import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.indicator.js';
import { PrismaService } from 'src/prisma.service.js';

describe('PrismaHealthIndicator', () => {
  let app: TestingModule;
  let indicator: PrismaHealthIndicator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [TerminusModule],
      providers: [
        PrismaHealthIndicator,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: vi.fn(),
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
    vi.spyOn(prismaService, '$queryRaw').mockResolvedValue([{ '1': 1 }]);

    const result = await indicator.isHealthy('prisma');

    expect(result.prisma.status).toBe('up');
  });

  it('should return down status when database fails', async () => {
    vi
      .spyOn(prismaService, '$queryRaw')
      .mockRejectedValue(new Error('Connection refused'));

    const result = await indicator.isHealthy('prisma');

    expect(result.prisma.status).toBe('down');
  });
});
