import { Test, TestingModule } from '@nestjs/testing';
import { EscolaridadeController } from './escolaridade.controller';
import { EscolaridadeService } from './escolaridade.service';

describe('EscolaridadeController', () => {
  let controller: EscolaridadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscolaridadeController],
      providers: [EscolaridadeService],
    }).compile();

    controller = module.get<EscolaridadeController>(EscolaridadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
