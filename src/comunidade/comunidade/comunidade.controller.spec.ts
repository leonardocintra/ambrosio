import { Test, TestingModule } from '@nestjs/testing';
import { ComunidadeController } from './comunidade.controller';
import { ComunidadeService } from './comunidade.service';

describe('ComunidadeController', () => {
  let controller: ComunidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunidadeController],
      providers: [ComunidadeService],
    }).compile();

    controller = module.get<ComunidadeController>(ComunidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
