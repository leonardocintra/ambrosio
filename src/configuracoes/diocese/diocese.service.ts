import { Injectable } from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DioceseService {
  constructor(private prisma: PrismaService) { }

  async create(createDioceseDto: CreateDioceseDto) {
    try {
      return this.prisma.diocese.create({
        data: {
          descricao: createDioceseDto.descricao,
          tipoDioceseId: createDioceseDto.tipoDiocese.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.prisma.diocese.findMany({
      include: {
        tipoDiocese: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.diocese.findFirstOrThrow({
      where: {
        id
      },
      include: {
        tipoDiocese: true
      }
    })
  }

  update(id: number, updateDioceseDto: UpdateDioceseDto) {
    return `This action updates a #${id} diocese`;
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }
}
