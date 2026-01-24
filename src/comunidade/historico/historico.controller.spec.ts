import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('HistoricoController', () => {
  let controller: HistoricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoController],
      providers: [HistoricoService, PrismaService, CaslAbilityService],
    }).compile();

    controller = await module.resolve<HistoricoController>(HistoricoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
