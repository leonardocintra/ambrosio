import { Test, TestingModule } from '@nestjs/testing';
import { DioceseService } from './diocese.service';

describe('DioceseService', () => {
  let service: DioceseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DioceseService],
    }).compile();

    service = module.get<DioceseService>(DioceseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
