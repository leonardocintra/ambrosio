import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { PessoaService } from 'src/pessoa/pessoa.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly abilityService: CaslAbilityService,
    private readonly pessoaService: PessoaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.pessoaService.analisarCPF(createUserDto.cpf);

    let pessoaId: number | null = null;

    try {
      const pessoa = await this.pessoaService.findOneByCpf(createUserDto.cpf);
      pessoaId = pessoa?.id || null;
    } catch {
      this.logger.log(
        `Pessoa ${createUserDto.cpf} não encontrada, criando usuário sem vínculo`,
      );
    }

    await this.validateUniqueCpf(createUserDto.cpf);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prismaService.user.create({
      data: {
        pessoaId,
        ...createUserDto,
        password: hashedPassword,
        role: ROLE_ENUM.NAO_IDENTIFICADO,
      },
    });
  }

  findAll() {
    const { ability } = this.abilityService;
    if (!ability.can('read', 'user')) {
      throw new ForbiddenException(
        'Você não tem permissão para listar usuários',
      );
    }
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // If a password is provided in the update DTO, hash it before updating.
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  private async validateUniqueCpf(cpf: string) {
    const cpfAlreadyExists = await this.prismaService.user.findFirst({
      where: { cpf },
    });

    if (cpfAlreadyExists) {
      throw new ConflictException(`Já tem um usuario com esse CPF ${cpf}`);
    }
  }
}
