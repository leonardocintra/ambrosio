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

const SALT_OR_ROUNDS = 10;

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
    if (!pessoa) {
      throw new NotFoundException(
        `Não é possível criar um usuário sem uma pessoa vinculada. CPF ${createUserDto.cpf} não encontrado na base de pessoas.`,
      );
    }
    this.logger.log(
      `Pessoa para esse usuario encontrada: ${JSON.stringify(pessoa)}`,
    );
    await this.validateUniquePessoaForUser(pessoa.id);

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_OR_ROUNDS,
    );

    return await this.prismaService.user.create({
      data: {
        pessoaId: pessoa.id,
        email: createUserDto.email,
        whatsapp: createUserDto.whatsapp,
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
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // If a password is provided in the update DTO, hash it before updating.
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        SALT_OR_ROUNDS,
      );
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

  private async validateUniquePessoaForUser(pessoaId: number) {
    const cpfAlreadyExists = await this.prismaService.user.findFirst({
      where: { pessoaId },
    });

    if (cpfAlreadyExists) {
      throw new ConflictException(
        `Já tem um usuario com esse ID: ${pessoaId} - Email: ${cpfAlreadyExists.email}`,
      );
    }
  }
}
