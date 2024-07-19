import { Test, TestingModule } from '@nestjs/testing';
import { DioceseService } from './diocese.service';
import { PrismaService } from 'src/prisma.service';

describe('DioceseService', () => {
  let service: DioceseService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DioceseService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DioceseService>(DioceseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
