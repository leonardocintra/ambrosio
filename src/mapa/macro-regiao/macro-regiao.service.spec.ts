import { Test, TestingModule } from '@nestjs/testing';
import { MacroRegiaoService } from './macro-regiao.service';

describe('MacroRegiaoService', () => {
  let service: MacroRegiaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MacroRegiaoService],
    }).compile();

    service = module.get<MacroRegiaoService>(MacroRegiaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
