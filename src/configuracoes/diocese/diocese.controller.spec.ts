import { Test, TestingModule } from '@nestjs/testing';
import { DioceseController } from './diocese.controller';
import { DioceseService } from './diocese.service';

describe('DioceseController', () => {
  let controller: DioceseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DioceseController],
      providers: [DioceseService],
    }).compile();

    controller = module.get<DioceseController>(DioceseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
