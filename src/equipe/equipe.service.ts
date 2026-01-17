import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { BaseService } from 'src/commons/base.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { TipoEquipeService } from 'src/configuracoes/tipo-equipe/tipo-equipe.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { Equipe, Pessoa } from 'neocatecumenal';
import {
  serializeEquipeResponse,
  serializeEquipeResponseList,
} from './equipe.serializer';

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

  async findAll(): Promise<Equipe[]> {
    this.validateReadAbility('equipe');
    const result = await this.prisma.equipe.findMany({
      select: {
        id: true,
        descricao: true,
        tipoEquipe: true,
        observacao: true,
        createdAt: true,
      },
    });
    return serializeEquipeResponseList(result);
  }

  async findOne(id: number): Promise<Equipe> {
    this.validateReadAbility('equipe');
    const result = await this.prisma.equipe.findFirstOrThrow({
      where: { id },
      include: {
        tipoEquipe: true,
        equipePessoas: { include: { pessoa: true } },
      },
    });

    const pessoas: Pessoa[] = [];

    for (const pessoaEquipe of result.equipePessoas) {
      console.log('Fetching pessoa for equipe:', pessoaEquipe);
      const pessoa = await this.pessoaService.findOne(pessoaEquipe.pessoaId);
      if (pessoa) {
        pessoas.push(pessoa);
      }
    }
    return serializeEquipeResponse(result, pessoas);
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
