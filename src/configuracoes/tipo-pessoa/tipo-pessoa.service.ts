import { Injectable } from '@nestjs/common';
import { CreateTipoPessoaDto } from './dto/create-tipo-pessoa.dto';
import { UpdateTipoPessoaDto } from './dto/update-tipo-pessoa.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoPessoaService {
  constructor(private prisma: PrismaService) {}

  create(createTipoPessoaDto: CreateTipoPessoaDto) {
    return 'This action adds a new tipoPessoa';
  }

  findAll() {
    return this.prisma.tipoPessoa.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoPessoa.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateTipoPessoaDto: UpdateTipoPessoaDto) {
    return `This action updates a #${id} tipoPessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoPessoa`;
  }
}
