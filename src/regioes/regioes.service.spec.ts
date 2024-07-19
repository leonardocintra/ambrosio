import { Test, TestingModule } from '@nestjs/testing';
import { RegioesService } from './regioes.service';
import { PrismaService } from 'src/prisma.service';

describe('RegioesService', () => {
  let service: RegioesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegioesService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RegioesService>(RegioesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
