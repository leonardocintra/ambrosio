import { Test, TestingModule } from '@nestjs/testing';
import { CasalService } from './casal.service.js';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { HttpModule } from '@nestjs/axios';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service.js';
import { ComunidadeService } from 'src/comunidade/comunidade.service.js';
import { HistoricoService } from 'src/comunidade/historico/historico.service.js';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service.js';
import { EstadoService } from 'src/configuracoes/estado/estado.service.js';
import { PaisService } from 'src/configuracoes/pais/pais.service.js';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service.js';
import { DioceseService } from 'src/diocese/diocese.service.js';
import { EnderecoService } from 'src/endereco/endereco.service.js';
import { SetorService } from 'src/mapa/setor/setor.service.js';
import { ParoquiaService } from 'src/paroquia/paroquia.service.js';

describe('CasalService', () => {
  let service: CasalService;
  let prismaService: PrismaService;
  let saoPedroPessoaService: SaoPedroPessoaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CasalService,
        PrismaService,
        ComunidadeService,
        SaoPedroPessoaService,
        SaoPedroAuthService,
        ParoquiaService,
        HistoricoService,
        DioceseService,
        TipoDioceseService,
        EnderecoService,
        EstadoService,
        CidadeService,
        SetorService,
        PaisService,
        CaslAbilityService,
      ],
    }).compile();

    service = await module.resolve<CasalService>(CasalService);
    prismaService = module.get<PrismaService>(PrismaService);
    saoPedroPessoaService = await module.resolve<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
