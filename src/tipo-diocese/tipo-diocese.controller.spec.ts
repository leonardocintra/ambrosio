import { Test, TestingModule } from '@nestjs/testing';
import { TipoDioceseController } from './tipo-diocese.controller';
import { TipoDioceseService } from './tipo-diocese.service';

describe('TipoDioceseController', () => {
  let controller: TipoDioceseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDioceseController],
      providers: [TipoDioceseService],
    }).compile();

    controller = module.get<TipoDioceseController>(TipoDioceseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
