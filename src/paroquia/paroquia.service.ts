import { Injectable } from '@nestjs/common';
import { CreateParoquiaDto } from './dto/create-paroquia.dto';
import { UpdateParoquiaDto } from './dto/update-paroquia.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParoquiaService {
  constructor(private prisma: PrismaService) {}

  create(createParoquiaDto: CreateParoquiaDto) {
    return 'This action adds a new paroquia';
  }

  findAll() {
    return `This action returns all paroquia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paroquia`;
  }

  update(id: number, updateParoquiaDto: UpdateParoquiaDto) {
    return `This action updates a #${id} paroquia`;
  }

  remove(id: number) {
    return `This action removes a #${id} paroquia`;
  }
}
