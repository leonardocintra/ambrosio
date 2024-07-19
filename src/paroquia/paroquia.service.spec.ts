import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaService } from './paroquia.service';
import { PrismaService } from 'src/prisma.service';

describe('ParoquiaService', () => {
  let service: ParoquiaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParoquiaService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParoquiaService>(ParoquiaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
