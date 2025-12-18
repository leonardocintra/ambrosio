import { Test, TestingModule } from '@nestjs/testing';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { TipoEquipeService } from 'src/configuracoes/tipo-equipe/tipo-equipe.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

describe('EquipeController', () => {
  let controller: EquipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipeController],
      providers: [
        EquipeService,
        PrismaService,
        CaslAbilityService,
        TipoEquipeService,
        PessoaService,
        SaoPedroPessoaService,
        SaoPedroAuthService,
        SituacaoReligiosaService,
        JwtService
      ],
      imports: [HttpModule],
    }).compile();

    controller = await module.resolve<EquipeController>(EquipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
