import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';

describe('UsersController', () => {
  let controller: UsersController;
  let prismaService: PrismaService;
  let jwtservice: JwtService;
  let abilityService: CaslAbilityService;
  let pessoaService: PessoaService;
  let saoPedroPessoaService: SaoPedroPessoaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        JwtService,
        CaslAbilityService,
        PessoaService,
        EstadoCivilService,
        TipoCarismaPrimitivoService,
        TipoCarismaVinculadoService,
        TipoCarismaServicoService,
        EscolaridadeService,
        SituacaoReligiosaService,
        {
          provide: SaoPedroPessoaService,
          useValue: {
            getPessoas: jest.fn().mockResolvedValue([]),
            postExternalPessoa: jest
              .fn()
              .mockResolvedValue({ id: 1, nome: 'João' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    pessoaService = module.get<PessoaService>(PessoaService);
    prismaService = module.get<PrismaService>(PrismaService);
    saoPedroPessoaService = module.get<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    jwtservice = module.get<JwtService>(JwtService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(jwtservice).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(pessoaService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
  });
});
