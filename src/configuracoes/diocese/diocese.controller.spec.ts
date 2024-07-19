import { Test, TestingModule } from '@nestjs/testing';
import { DioceseController } from './diocese.controller';
import { DioceseService } from './diocese.service';
import { PrismaService } from 'src/prisma.service';

describe('DioceseController', () => {
  let controller: DioceseController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DioceseController],
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

    controller = module.get<DioceseController>(DioceseController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
