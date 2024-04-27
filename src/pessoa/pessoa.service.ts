import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { TipoCarismaService } from 'src/configuracoes/tipo-carisma/tipo-carisma.service';
import { Sexo } from 'src/commons/enums/enums';

@Injectable()
export class PessoaService {
  constructor(
    private prisma: PrismaService,
    private estadoCivilService: EstadoCivilService,
    private escolaridadeService: EscolaridadeService,
    private tipoCarismaService: TipoCarismaService,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const [estadoCivil, escolaridade, tipoCarisma] = await Promise.all([
      await this.estadoCivilService.findOne(createPessoaDto.estadoCivil.id),
      await this.escolaridadeService.findOne(createPessoaDto.escolaridade.id),
      await this.tipoCarismaService.findOne(createPessoaDto.tipoCarisma.id),
    ]);

    return this.prisma.pessoa.create({
      data: {
        nome: createPessoaDto.nome,
        nacionalidade: createPessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: createPessoaDto.foto,
        tipoCarismaId: tipoCarisma.id,
        escolaridadeId: escolaridade.id,
        sexo:
          createPessoaDto.sexo === 'MASCULINO' ? Sexo.MASCULINO : Sexo.FEMININO,
      },
    });
  }

  findAll() {
    return this.prisma.pessoa.findMany({
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoCarisma: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const pessoa = await this.prisma.pessoa.findUniqueOrThrow({
      where: { id },
      include: {
        estadoCivil: true,
        escolaridade: true,
        tipoCarisma: true,
        enderecos: {
          include: {
            endereco: true,
          },
        },
      },
    });

    const response = this.handleResponsePessoa(pessoa);
    return response;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const [estadoCivil, escolaridade, tipoCarisma] = await Promise.all([
      this.estadoCivilService.findOne(updatePessoaDto.estadoCivil.id),
      this.escolaridadeService.findOne(updatePessoaDto.escolaridade.id),
      this.tipoCarismaService.findOne(updatePessoaDto.tipoCarisma.id),
    ]);

    return await this.prisma.pessoa.update({
      where: { id },
      data: {
        nome: updatePessoaDto.nome,
        nacionalidade: updatePessoaDto.nacionalidade,
        estadoCivilId: estadoCivil.id,
        foto: updatePessoaDto.foto,
        tipoCarismaId: tipoCarisma.id,
        escolaridadeId: escolaridade.id,
        sexo:
          updatePessoaDto.sexo === 'MASCULINO' ? Sexo.MASCULINO : Sexo.FEMININO,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }

  private handleResponsePessoa(pessoa: any) {
    const response = {
      id: pessoa.id,
      nome: pessoa.nome,
      sexo: pessoa.sexo,
      nacionalidade: pessoa.nacionalidade,
      estadoCivil: pessoa.estadoCivil,
      foto: pessoa.foto,
      ativo: pessoa.ativo,
      escolaridade: pessoa.escolaridade,
      tipoCarisma: pessoa.tipoCarisma,
      enderecos: pessoa.enderecos.map((end) => {
        return {
          id: end.endereco.id,
          cep: end.endereco.cep,
          logradouro: end.endereco.logradouro,
          cidade: end.endereco.cidade,
          UF: end.endereco.UF,
          numero: end.endereco.numero,
          bairro: end.endereco.bairro,
        };
      }),
    };

    return response;
  }
}
