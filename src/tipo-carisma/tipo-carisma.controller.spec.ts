import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaController } from './tipo-carisma.controller';
import { TipoCarismaService } from './tipo-carisma.service';

describe('TipoCarismaController', () => {
  let controller: TipoCarismaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaController],
      providers: [TipoCarismaService],
    }).compile();

    controller = module.get<TipoCarismaController>(TipoCarismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
