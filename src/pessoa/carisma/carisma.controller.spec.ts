import { Test, TestingModule } from '@nestjs/testing';
import { CarismaController } from './carisma.controller';
import { CarismaService } from './carisma.service';

describe('CarismaController', () => {
  let controller: CarismaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarismaController],
      providers: [CarismaService],
    }).compile();

    controller = module.get<CarismaController>(CarismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
