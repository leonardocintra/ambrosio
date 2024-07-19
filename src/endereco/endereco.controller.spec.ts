import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { PrismaService } from 'src/prisma.service';

describe('EnderecoController', () => {
  let controller: EnderecoController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
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

    controller = module.get<EnderecoController>(EnderecoController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
