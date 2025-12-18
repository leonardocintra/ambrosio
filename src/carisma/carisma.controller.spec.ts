import { Test, TestingModule } from '@nestjs/testing';
import { CarismaController } from './carisma.controller';
import { CarismaService } from './carisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

describe('CarismaController', () => {
  let controller: CarismaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarismaController],
      providers: [
        CarismaService,
        CaslAbilityService,
        PrismaService,
        PessoaService,
        SituacaoReligiosaService,
        SaoPedroAuthService,
        SaoPedroPessoaService,
        JwtService
      ],
      imports: [HttpModule],
    }).compile();

    controller = await module.resolve<CarismaController>(CarismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
