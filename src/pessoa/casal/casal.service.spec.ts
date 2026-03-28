import { Test, TestingModule } from '@nestjs/testing';
import { CasalService } from './casal.service';

describe('CasalService', () => {
  let service: CasalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasalService],
    }).compile();

    service = module.get<CasalService>(CasalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
