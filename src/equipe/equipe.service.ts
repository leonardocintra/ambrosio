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

    const result = await this.prisma.equipe.create({
      data: {
        descricao: createEquipeDto.descricao,
        tipoEquipeId: tipoEquipe.id,
        observacao: createEquipeDto.observacao,
      },
    });

    await this.syncEquipePessoas(
      result.id,
      result.descricao,
      createEquipeDto.pessoas,
    );

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
      const pessoa = await this.pessoaService.findOne(pessoaEquipe.pessoaId);
      if (pessoa) {
        pessoas.push(pessoa);
      }
    }
    return serializeEquipeResponse(result, pessoas);
  }

  async update(id: number, updateEquipeDto: UpdateEquipeDto) {
    this.validateUpdateAbility('equipe');
    await this.prisma.equipe.update({
      where: { id },
      data: {
        descricao: updateEquipeDto.descricao,
        observacao: updateEquipeDto.observacao,
        tipoEquipeId: updateEquipeDto.tipoEquipeId,
      },
    });

    await this.syncEquipePessoas(
      id,
      updateEquipeDto.descricao,
      updateEquipeDto.pessoas,
    );

    return this.prisma.equipe.findUnique({
      where: { id },
      include: {
        tipoEquipe: true,
        equipePessoas: { include: { pessoa: true } },
      },
    });
  }

  remove(id: number) {
    this.validateDeleteAbility('equipe');
    return `This action removes a #${id} equipe`;
  }

  private async syncEquipePessoas(
    equipeId: number,
    descricaoEquipe: string,
    pessoas: { id: number }[],
  ) {
    for (const pessoa of pessoas) {
      await this.pessoaService.findOne(pessoa.id);
      await this.prisma.equipePessoa.upsert({
        where: {
          equipeId_pessoaId: {
            equipeId,
            pessoaId: pessoa.id,
          },
        },
        update: {
          observacao: `Equipe/Pessoa de: ${descricaoEquipe}`,
        },
        create: {
          equipeId,
          pessoaId: pessoa.id,
          observacao: `Equipe/Pessoa de: ${descricaoEquipe}`,
        },
      });
    }
  }
}
