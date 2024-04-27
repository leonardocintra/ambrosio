import { Injectable } from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from 'src/endereco/endereco.service';

@Injectable()
export class DioceseService {
  constructor(
    private prisma: PrismaService,
    private enderecoService: EnderecoService,
  ) {}
  async create(createDioceseDto: CreateDioceseDto) {
    const endereco = await this.enderecoService.create(
      createDioceseDto.endereco,
    );
    try {
      return this.prisma.diocese.create({
        data: {
          descricao: createDioceseDto.descricao,
          tipoDioceseId: createDioceseDto.tipo.id,
          enderecoId: endereco.id,
        },
      });
    } catch (error) {
      // TODO: implementar via enderecoService
      this.prisma.endereco.delete({
        where: {
          id: endereco.id,
        },
      });
    }
  }

  findAll() {
    return this.prisma.diocese.findMany({
      include: {
        tipoDiocese: true,
        endereco: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} diocese`;
  }

  update(id: number, updateDioceseDto: UpdateDioceseDto) {
    return `This action updates a #${id} diocese`;
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }
}
