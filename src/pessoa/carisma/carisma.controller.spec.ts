import { Test, TestingModule } from '@nestjs/testing';
import { CarismaController } from './carisma.controller';
import { CarismaService } from './carisma.service';
import { PrismaService } from 'src/prisma.service';

describe('CarismaController', () => {
  let controller: CarismaController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarismaController],
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

    controller = module.get<CarismaController>(CarismaController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
