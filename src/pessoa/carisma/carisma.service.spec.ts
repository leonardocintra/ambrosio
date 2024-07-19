import { Test, TestingModule } from '@nestjs/testing';
import { CarismaService } from './carisma.service';
import { PrismaService } from 'src/prisma.service';

describe('CarismaService', () => {
  let service: CarismaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarismaService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarismaService>(CarismaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
