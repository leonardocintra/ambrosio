import { Test, TestingModule } from '@nestjs/testing';
import { CasalService } from './casal.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { HttpModule } from '@nestjs/axios';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';
import { ComunidadeService } from 'src/comunidade/comunidade.service';
import { HistoricoService } from 'src/comunidade/historico/historico.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { SetorService } from 'src/mapa/setor/setor.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';

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
