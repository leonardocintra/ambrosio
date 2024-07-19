import { Test, TestingModule } from '@nestjs/testing';
import { LocalidadeService } from './localidade.service';
import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from 'src/endereco/endereco.service';

describe('LocalidadeService', () => {
  let service: LocalidadeService;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalidadeService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
        {
          provide: EnderecoService,
          useValue: {
            createByPessoaId: jest.fn(),
            create: jest.fn(),
            findAllByPessoaId: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocalidadeService>(LocalidadeService);
    prismaService = module.get<PrismaService>(PrismaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(enderecoService).toBeDefined();
  });
});
