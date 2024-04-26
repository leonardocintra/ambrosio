import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaController } from './paroquia.controller';
import { ParoquiaService } from './paroquia.service';

describe('ParoquiaController', () => {
  let controller: ParoquiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParoquiaController],
      providers: [ParoquiaService],
    }).compile();

    controller = module.get<ParoquiaController>(ParoquiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
