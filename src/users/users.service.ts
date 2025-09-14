import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { BaseService } from 'src/commons/base.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    private readonly prismaService: PrismaService,
    abilityService: CaslAbilityService,
    private readonly pessoaService: PessoaService,
  ) {
    super(abilityService);
  }

  async create(createUserDto: CreateUserDto) {
    const pessoa = await this.pessoaService.findOneByCpf(createUserDto.cpf);
    this.logger.log(
      `Pessoa para esse usuario encontrada: ${JSON.stringify(pessoa)}`,
    );

    if (!pessoa) {
      throw new NotFoundException(
        `Não é possível criar um usuário sem uma pessoa vinculada. CPF ${createUserDto.cpf} não encontrado na base de pessoas.`,
      );
    }
    await this.validateUniqueCpfForUser(createUserDto.cpf, pessoa.nome);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prismaService.user.create({
      data: {
        pessoaId: pessoa.id,
        ...createUserDto,
        password: hashedPassword,
        role: ROLE_ENUM.NAO_IDENTIFICADO,
      },
    });
  }

  findAll() {
    this.validateReadAbility('user');
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

  private async validateUniqueCpfForUser(cpf: string, nomeDaPessoa: string) {
    const cpfAlreadyExists = await this.prismaService.user.findFirst({
      where: { cpf },
    });

    if (cpfAlreadyExists) {
      throw new ConflictException(
        `Já tem um usuario com esse CPF ${cpf} - Pessoa: ${nomeDaPessoa}`,
      );
    }
  }
}
