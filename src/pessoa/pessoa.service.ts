import { escolaridade, tipoCarisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { TipoCarismaService } from 'src/configuracoes/tipo-carisma/tipo-carisma.service';

@Injectable()
export class PessoaService {
  constructor(
    private prisma: PrismaService,
    private estadoCivilService: EstadoCivilService,
    private escolaridadeService: EscolaridadeService,
    private tipoCarismaService: TipoCarismaService,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const estadoCivil = await this.estadoCivilService.findOne(
      createPessoaDto.estadoCivil.id,
    );

    const escolaridade = await this.escolaridadeService.findOne(
      createPessoaDto.escolaridade.id,
    );

    const tipoCarisma = await this.tipoCarismaService.findOne(
      createPessoaDto.tipoCarisma.id,
    );

    return this.prisma.pessoa.create({
      data: {
        nome: createPessoaDto.nome,
        nacionalidade: createPessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: createPessoaDto.foto,
        tipoCarismaId: tipoCarisma.id,
        escolaridadeId: escolaridade.id,
      },
    });
  }

  findAll() {
    return this.prisma.pessoa.findMany();
  }

  findOne(id: number) {
    return this.prisma.pessoa.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
