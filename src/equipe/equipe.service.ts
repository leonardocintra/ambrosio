import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { BaseService } from 'src/commons/base.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { TipoEquipeService } from 'src/configuracoes/tipo-equipe/tipo-equipe.service';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Injectable()
export class EquipeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    private readonly tipoEquipeService: TipoEquipeService,
    private readonly pessoaService: PessoaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  async create(createEquipeDto: CreateEquipeDto) {
    this.validateCreateAbility('equipe');

    const tipoEquipe = await this.tipoEquipeService.findOne(
      createEquipeDto.tipoEquipeId,
    );

    for (const pessoa of createEquipeDto.pessoas) {
      // TODO: Pensar uma forma melhor de fazer isso
      await this.pessoaService.findOne(pessoa.id);
    }

    const result = await this.prisma.equipe.create({
      data: {
        descricao: createEquipeDto.descricao,
        tipoEquipeId: tipoEquipe.id,
        observacao: createEquipeDto.observacao,
      },
    });

    for (const pessoa of createEquipeDto.pessoas) {
      await this.prisma.equipePessoa.create({
        data: {
          equipeId: result.id,
          pessoaId: pessoa.id,
          observacao: `Equipe/Pessoa de: ${result.descricao}`,
        },
      });
    }

    return this.prisma.equipe.findUnique({
      where: { id: result.id },
      include: {
        tipoEquipe: true,
        equipePessoas: { include: { pessoa: true } },
      },
    });
  }

  findAll() {
    this.validateReadAbility('equipe');
    return this.prisma.equipe.findMany();
  }

  findOne(id: number) {
    this.validateReadAbility('equipe');
    return `This action returns a #${id} equipe`;
  }

  update(id: number, updateEquipeDto: UpdateEquipeDto) {
    this.validateUpdateAbility('equipe');
    return `This action updates a #${id} equipe. ${updateEquipeDto.descricao}`;
  }

  remove(id: number) {
    this.validateDeleteAbility('equipe');
    return `This action removes a #${id} equipe`;
  }
}
