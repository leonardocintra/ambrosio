import { Test, TestingModule } from '@nestjs/testing';
import { RegioesController } from './regioes.controller';
import { RegioesService } from './regioes.service';

describe('RegioesController', () => {
  let controller: RegioesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegioesController],
      providers: [RegioesService],
    }).compile();

    controller = module.get<RegioesController>(RegioesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
