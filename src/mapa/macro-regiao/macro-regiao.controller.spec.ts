import { Test, TestingModule } from '@nestjs/testing';
import { MacroRegiaoController } from './macro-regiao.controller';
import { MacroRegiaoService } from './macro-regiao.service';

describe('MacroRegiaoController', () => {
  let controller: MacroRegiaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MacroRegiaoController],
      providers: [MacroRegiaoService],
    }).compile();

    controller = module.get<MacroRegiaoController>(MacroRegiaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
