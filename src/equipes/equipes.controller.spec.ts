import { Test, TestingModule } from '@nestjs/testing';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';

describe('EquipesController', () => {
  let controller: EquipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipesController],
      providers: [EquipesService],
    }).compile();

    controller = module.get<EquipesController>(EquipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
