import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoService } from './endereco.service';
import { PrismaService } from 'src/prisma.service';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecoService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EnderecoService>(EnderecoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
