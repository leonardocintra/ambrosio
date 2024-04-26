import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaService } from './paroquia.service';

describe('ParoquiaService', () => {
  let service: ParoquiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParoquiaService],
    }).compile();

    service = module.get<ParoquiaService>(ParoquiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
